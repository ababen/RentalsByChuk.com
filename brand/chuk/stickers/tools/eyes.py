"""Recolor brown irises to light blue. eyes = [(cx, cy, r), ...] in pixel coords."""
import numpy as np
from PIL import Image, ImageFilter

def _rgb_to_hsv(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(-1), a.min(-1); d = mx - mn
    h = np.zeros_like(mx)
    m = d > 1e-6
    rr = m & (mx == r); gg = m & (mx == g) & ~rr; bb = m & ~rr & ~gg
    h[rr] = ((g - b)[rr] / d[rr]) % 6
    h[gg] = (b - r)[gg] / d[gg] + 2
    h[bb] = (r - g)[bb] / d[bb] + 4
    s = np.where(mx > 0, d / np.maximum(mx, 1e-6), 0)
    return h * 60, s, mx

def _hsv_to_rgb(h, s, v):
    c = v * s; x = c * (1 - np.abs((h / 60) % 2 - 1)); m = v - c
    z = np.zeros_like(h)
    i = (h // 60).astype(int) % 6
    r = np.choose(i, [c, x, z, z, x, c]); g = np.choose(i, [x, c, c, x, z, z]); b = np.choose(i, [z, z, x, c, c, x])
    return np.stack([r + m, g + m, b + m], -1)

def recolor(img, eyes, hue=205, sat=0.42, lift=1.45, hue_min=20, v_max=0.66, v_min=0.10, pupil=0.0, top=1.0):
    a = np.asarray(img.convert('RGB')).astype(np.float32) / 255
    H, W, _ = a.shape
    h, s, v = _rgb_to_hsv(a)
    yy, xx = np.mgrid[0:H, 0:W]
    region = np.zeros((H, W), bool)
    for cx, cy, r in eyes:
        d = np.hypot(xx - cx, yy - cy)
        region |= (d <= r) & (d >= r * pupil) & (yy >= cy - r * top)
    iris = region & ~((s < 0.10) & (v > 0.55)) & (v <= v_max) & (h >= hue_min) & (v >= v_min)
    mask = Image.fromarray((iris * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7))
    m = (np.asarray(mask).astype(np.float32) / 255)[..., None]
    blue = _hsv_to_rgb(np.full_like(v, hue), np.minimum(0.65, sat * (0.6 + s)), np.minimum(1.0, v * lift))
    out = a * (1 - m) + blue * m
    return Image.fromarray((out * 255).round().astype(np.uint8))
