"""Fit a cutout into a square canvas and give it a white sticker border + soft shadow."""
import numpy as np
from PIL import Image, ImageFilter

def stickerize(cut, size=1024, box=(880, 800), top=40, border=18):
    c = cut.copy(); c.thumbnail(box, Image.LANCZOS)
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    x = (size - c.width) // 2
    canvas.alpha_composite(c, (x, top))
    a = canvas.getchannel('A')
    # round white border: blur the alpha, then threshold
    grown = a.filter(ImageFilter.GaussianBlur(border * 0.6)).point(lambda v: 255 if v > 8 else 0)
    grown = grown.filter(ImageFilter.GaussianBlur(1.2))
    white = Image.new('RGBA', (size, size), (255, 255, 255, 0)); white.putalpha(grown)
    shadow = Image.new('RGBA', (size, size), (18, 46, 37, 0))
    shadow.putalpha(grown.point(lambda v: v * 0.28).filter(ImageFilter.GaussianBlur(10)))
    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    out.alpha_composite(shadow, (0, 8)); out.alpha_composite(white); out.alpha_composite(canvas)
    return out, (x, top, c.width, c.height)
