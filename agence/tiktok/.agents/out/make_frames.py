#!/usr/bin/env python3
"""Génère les visuels d'une vidéo TikTok verticale (1080x1920) en local, sans réseau."""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1080, 1920
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "frames")
os.makedirs(OUT, exist_ok=True)

# Tente de charger des polices; sinon fallback sur une police par défaut.
def font(size):
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf",
        "C:/Windows/Fonts/segoeui.ttf",
        "DejaVuSans-Bold.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            try:
                return ImageFont.truetype(c, size)
            except Exception:
                pass
    return ImageFont.load_default()

# Palettes (du haut vers le bas) par scène.
SCENES = [
    {"name": "intro", "title": "L'AGENCE", "sub": "Création TikTok & IA",
     "top": (18, 18, 34), "bottom": (72, 12, 168), "accent": (255, 200, 60)},
    {"name": "mid", "title": "CONCEPT → CLIP", "sub": "Script, prompts, génération",
     "top": (6, 24, 60), "bottom": (0, 160, 140), "accent": (255, 255, 255)},
    {"name": "end", "title": "PRÊT À POSTER", "sub": "9:16 · 15s · off-the-shelf",
     "top": (40, 10, 60), "bottom": (180, 30, 90), "accent": (255, 220, 90)},
]

def gradient(top, bottom):
    t = np.array(top, dtype=float)
    b = np.array(bottom, dtype=float)
    ramp = np.linspace(0, 1, H)[:, None, None]  # (H,1,1)
    arr = t[None, None, :] * (1 - ramp) + b[None, None, :] * ramp
    arr = np.tile(arr, (1, W, 1))
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")

def rounded_rect(draw, box, radius, fill):
    draw.rounded_rectangle(box, radius=radius, fill=fill)

def make_scene(spec, i):
    img = gradient(spec["top"], spec["bottom"])
    # Légère vignette pour le côté cinéma.
    vig = Image.new("L", (W, H), 0)
    vd = ImageDraw.Draw(vig)
    vd.ellipse([-W*0.6, -H*0.6, W*1.6, H*1.6], fill=255)
    vig = vig.filter(ImageFilter.GaussianBlur(120))
    black = Image.new("RGB", (W, H), (0, 0, 0))
    img = Image.composite(img, black, vig)

    d = ImageDraw.Draw(img)
    # Barre d'accentur
    bar_w = 260
    d.rounded_rectangle([W//2 - bar_w//2, H*0.40, W//2 + bar_w//2, H*0.40 + 14],
                        radius=7, fill=spec["accent"])

    # Titre
    f_title = font(150)
    t = spec["title"]
    tw = d.textlength(t, font=f_title)
    d.text(((W - tw) / 2, H*0.44), t, font=f_title, fill=(255, 255, 255))

    # Sous-titre
    f_sub = font(56)
    s = spec["sub"]
    sw = d.textlength(s, font=f_sub)
    d.text(((W - sw) / 2, H*0.60), s, font=f_sub, fill=(235, 235, 245))

    # Petit badge "out/XX"
    f_badge = font(40)
    badge = "scene %02d" % (i + 1)
    bw = d.textlength(badge, font=f_badge)
    d.text(((W - bw) / 2, H*0.72), badge, font=f_badge, fill=(160, 160, 180))

    return img

for i, spec in enumerate(SCENES):
    img = make_scene(spec, i)
    p = os.path.join(OUT, "scene_%02d.png" % (i + 1))
    img.save(p)
    print("wrote", p)
print("done")
