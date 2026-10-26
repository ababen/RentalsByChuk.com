"""Cut a character off a flat cream background -> RGBA. Pure numpy + PIL."""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

def cutout(img, tol=16, grad_thr=7.0, seeds=None, extra_seeds=(), floor_y=None, floor_tol=45):
    a = np.asarray(img.convert('RGB')).astype(np.float32)
    H, W, _ = a.shape
    # per-row background estimate from the left/right margins (bg has a vertical gradient)
    edge = np.concatenate([a[:, :12], a[:, -12:]], axis=1)
    bg = np.median(edge, axis=1)[:, None, :]
    dist = np.sqrt(((a - bg) ** 2).sum(-1))
    L = np.asarray(img.convert('L').filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32)
    gx = np.zeros_like(L); gy = np.zeros_like(L)
    gx[:, 1:-1] = L[:, 2:] - L[:, :-2]; gy[1:-1] = L[2:] - L[:-2]
    grad = np.hypot(gx, gy)
    wall = Image.fromarray(((grad > grad_thr) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))
    allowed = (dist < tol) & (np.asarray(wall) == 0)
    if floor_y is not None:
        # floor shadow: warm and fairly bright; soles are neutral white, shoes are dark
        R, G, B = a[..., 0], a[..., 1], a[..., 2]
        warm = ((R - B) > 22) & ((R + G + B) / 3 > 150)
        allowed[floor_y:] = warm[floor_y:]
    m = Image.fromarray((allowed * 255).astype(np.uint8)).copy()  # floodfill is a no-op on array-backed images
    for s in (seeds or [(0, 0), (W - 1, 0), (0, H - 1), (W - 1, H - 1), (W // 2, 0), (0, H // 2), (W - 1, H // 2)]) + list(extra_seeds):
        if m.getpixel(s) == 255:
            ImageDraw.floodfill(m, s, 128, thresh=0)
    bgmask = np.asarray(m) == 128
    # grow the background over the soft rim (pixels still bg-ish next to filled bg)
    near = np.asarray(Image.fromarray((bgmask * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5))) > 0
    bgmask |= near & (dist < tol * 1.6)
    alpha = np.where(bgmask, 0, 255).astype(np.uint8)
    al = Image.fromarray(alpha).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    out = img.convert('RGBA'); out.putalpha(al)
    return out

def keep_main(rgba, seed):
    """Drop alpha islands not connected to `seed` (a point inside the figure)."""
    a = np.asarray(rgba)[..., 3]
    m = Image.fromarray(((a > 100) * 255).astype(np.uint8)).copy()
    ImageDraw.floodfill(m, seed, 128, thresh=0)
    keep = Image.fromarray(((np.asarray(m) == 128) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))
    na = np.minimum(a, np.asarray(keep))
    out = rgba.copy(); out.putalpha(Image.fromarray(na.astype(np.uint8)))
    return out
