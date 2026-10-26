"""Build the sticker base cutouts (base/*.png, 1024x1024 with white border) from the masters in brand/chuk/.
Run from this folder: python3 make-bases.py"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from cutout import cutout, keep_main
from outline import stickerize

M = os.path.join('..', '..')
os.makedirs('base', exist_ok=True)

# full-body renders: keep the upper body (the caption covers the rest)
for name, f in [('wave', 'chuk-wave.png'), ('thumbs', 'chuk-thumbs-up.png')]:
    im = Image.open(os.path.join(M, f)).convert('RGB')
    c = keep_main(cutout(im), (im.width // 2, im.height // 3))
    c = c.crop(c.getbbox())
    c = c.crop((0, 0, c.width, int(c.height * 0.62)))
    stickerize(c, box=(880, 640), top=40)[0].save(f'base/{name}.png')

# faces: 3x2 grid of 600px tiles in chuk-expressions.png
sheet = Image.open(os.path.join(M, 'chuk-expressions.png')).convert('RGB')
faces = ['smile', 'talking', 'laughing', 'thoughtful', 'surprised', 'wink']
for i, name in enumerate(faces):
    x, y = (i % 3) * 600, (i // 3) * 600
    im = sheet.crop((x, y, x + 600, y + 596))
    c = keep_main(cutout(im, seeds=[(0, 0), (599, 0), (5, 300), (594, 300)]), (300, 300))
    # the bottom corners are walled off from the margin seeds; flood them by colour
    f = im.copy()
    for s in [(2, 590), (597, 590)]:
        ImageDraw.floodfill(f, s, (255, 0, 255), thresh=14)
    bg = (np.asarray(f) == [255, 0, 255]).all(-1)
    bg = np.asarray(Image.fromarray((bg * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))) > 0
    a = np.asarray(c.getchannel('A')).copy(); a[bg] = 0
    c.putalpha(Image.fromarray(a).filter(ImageFilter.GaussianBlur(0.8)))
    stickerize(c, box=(700, 640), top=40)[0].save(f'base/{name}.png')
