#!/usr/bin/env python3
"""Clean the collage-cropped doctor website assets.

- strips the baked-in label chips
- removes the residual neutral/checkerboard background with a border flood fill
  (interior whites such as the lab coat are preserved)
- despeckles leftover background flecks
- isolates icon glyphs by saturation instead of by card outline
"""
import os
from collections import deque

import numpy as np
from PIL import Image, ImageFilter

SRC = "/Users/yogeshgurani/Downloads/doctor_website_section_assets"
OUT = "/Users/yogeshgurani/doctor-website/public/assets"
COLLAGE = "/Users/yogeshgurani/.claude/image-cache/f5cb0f7f-c0ea-47aa-8673-93b5ea9b8f1a/1.png"

os.makedirs(OUT, exist_ok=True)


def _label(mask):
    """Label connected components (8-neighbour). Returns (labels, sizes)."""
    h, w = mask.shape
    labels = np.zeros((h, w), np.int32)
    sizes = [0]
    cur = 0
    for sy in range(h):
        for sx in range(w):
            if not mask[sy, sx] or labels[sy, sx]:
                continue
            cur += 1
            q = deque([(sy, sx)])
            labels[sy, sx] = cur
            n = 0
            while q:
                y, x = q.popleft()
                n += 1
                for dy in (-1, 0, 1):
                    for dx in (-1, 0, 1):
                        ny, nx = y + dy, x + dx
                        if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not labels[ny, nx]:
                            labels[ny, nx] = cur
                            q.append((ny, nx))
            sizes.append(n)
    return labels, np.array(sizes)


def background_mask(rgb, v_min=205, s_max=30, alpha=None):
    """Light, desaturated pixels reachable from the border = background.

    Pixels that are already transparent count as background as well, otherwise
    they wall the flood fill off from checkerboard patches further in.
    """
    mx = rgb.max(axis=2).astype(np.int16)
    mn = rgb.min(axis=2).astype(np.int16)
    candidate = (mx >= v_min) & ((mx - mn) <= s_max)
    if alpha is not None:
        candidate |= alpha < 16

    h, w = candidate.shape
    bg = np.zeros((h, w), bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if candidate[y, x] and not bg[y, x]:
                bg[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if candidate[y, x] and not bg[y, x]:
                bg[y, x] = True
                q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and candidate[ny, nx] and not bg[ny, nx]:
                bg[ny, nx] = True
                q.append((ny, nx))
    return bg


def despeckle(img, min_area=60):
    """Drop small opaque islands left behind by the checkerboard residue."""
    arr = np.array(img)
    vis = arr[:, :, 3] > 40
    labels, sizes = _label(vis)
    if len(sizes) <= 1:
        return img
    keep = sizes >= min_area
    keep[0] = False
    arr[:, :, 3] = np.where(keep[labels], arr[:, :, 3], 0)
    return Image.fromarray(arr, "RGBA")


def clean(img, v_min=205, s_max=30, feather=1.0, speck=60, seed_alpha=True):
    img = img.convert("RGBA")
    arr = np.array(img)
    bg = background_mask(arr[:, :, :3], v_min, s_max, arr[:, :, 3] if seed_alpha else None)

    alpha = arr[:, :, 3].astype(np.float32)
    alpha[bg] = 0.0

    a = Image.fromarray(alpha.astype(np.uint8), "L")
    if feather:
        a = a.filter(ImageFilter.GaussianBlur(feather))
        # re-tighten so the feather eats the halo instead of widening the subject
        a = a.point(lambda v: 0 if v < 110 else min(255, int((v - 110) * 255 / 120)))
    arr[:, :, 3] = np.array(a)
    out = Image.fromarray(arr, "RGBA")
    return despeckle(out, speck) if speck else out


def strip_chip(img, dark=95, frac=0.30):
    """Cut the baked-in navy label chip: a dark band hugging the bottom edge."""
    arr = np.array(img)
    vis = arr[:, :, 3] > 40
    dark_px = (arr[:, :, :3].max(axis=2) < dark) & vis
    cut = None
    for y in range(img.height - 1, max(0, img.height - 70), -1):
        n = vis[y].sum()
        if n and dark_px[y].sum() / n >= frac:
            cut = y
    return img.crop((0, 0, img.width, max(1, cut - 3))) if cut else img


def photo_rect(img, sat_min=30, pad=0):
    """Bounding rect of actual photo content inside a checkerboard frame."""
    a = np.array(img.convert("RGB")).astype(np.int16)
    vivid = (a.max(2) - a.min(2)) >= sat_min
    ys, xs = np.where(vivid)
    return img.crop((
        max(0, xs.min() - pad), max(0, ys.min() - pad),
        min(img.width, xs.max() + 1 + pad), min(img.height, ys.max() + 1 + pad),
    ))


def inpaint_disc(img, blur=11, search=0.45, v_min=232, s_max=22, pad=3):
    """Blur out the play button baked into the still, so a crisp one can sit on top."""
    arr = np.array(img.convert("RGB")).astype(np.int16)
    h, w = arr.shape[:2]
    y0, y1 = int(h * (0.5 - search / 2)), int(h * (0.5 + search / 2))
    x0, x1 = int(w * (0.5 - search / 2)), int(w * (0.5 + search / 2))
    region = arr[y0:y1, x0:x1]
    hit = (region.max(2) >= v_min) & ((region.max(2) - region.min(2)) <= s_max)
    if hit.sum() < 40:
        return img
    ys, xs = np.where(hit)
    cy, cx = y0 + ys.mean(), x0 + xs.mean()
    radius = max(ys.max() - ys.min(), xs.max() - xs.min()) / 2 + pad

    yy, xx = np.mgrid[0:h, 0:w]
    dist = np.sqrt((yy - cy) ** 2 + (xx - cx) ** 2)
    mask = np.clip((radius + 2 - dist) / 3.0, 0, 1)

    base = img.convert("RGB")
    blurred = base.filter(ImageFilter.GaussianBlur(blur))
    out = (np.array(base) * (1 - mask[..., None]) + np.array(blurred) * mask[..., None])
    return Image.fromarray(out.astype(np.uint8), "RGB").convert("RGBA")


def largest_only(img):
    """Keep just the biggest island: drops the stray blob and keying residue."""
    arr = np.array(img)
    labels, sizes = _label(arr[:, :, 3] > 40)
    if len(sizes) <= 1:
        return img
    big = int(np.argmax(sizes[1:])) + 1
    arr[:, :, 3] = np.where(labels == big, arr[:, :, 3], 0)
    return Image.fromarray(arr, "RGBA")


def knockout(img, x0f, y0f, x1f=1.0, y1f=1.0, feather=2.0):
    """Erase a fractional rectangle: used to cut keying residue beside a cutout."""
    arr = np.array(img)
    h, w = arr.shape[:2]
    cut = np.zeros((h, w), np.float32)
    cut[int(y0f * h):int(y1f * h), int(x0f * w):int(x1f * w)] = 255
    cut = np.array(Image.fromarray(cut.astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(feather)))
    arr[:, :, 3] = (arr[:, :, 3].astype(np.float32) * (1 - cut / 255)).astype(np.uint8)
    return Image.fromarray(arr, "RGBA")


def autocrop(img, pad=2):
    a = np.array(img)[:, :, 3]
    ys, xs = np.where(a > 12)
    if len(ys) == 0:
        return img
    y0, y1 = max(0, ys.min() - pad), min(img.height, ys.max() + 1 + pad)
    x0, x1 = max(0, xs.min() - pad), min(img.width, xs.max() + 1 + pad)
    return img.crop((x0, y0, x1, y1))


def square(img):
    """Centre-crop to a square so CSS can round it without clipping the face."""
    s = min(img.width, img.height)
    left = (img.width - s) // 2
    top = (img.height - s) // 2
    return img.crop((left, top, left + s, top + s))


def save(img, name, scale=1):
    if scale != 1:
        img = img.resize((int(img.width * scale), int(img.height * scale)), Image.LANCZOS)
    img.save(os.path.join(OUT, name + ".png"), optimize=True)
    print(f"  {name}.png  {img.width}x{img.height}")


def load(fname, bottom_crop=0, top_crop=0, left_crop=0):
    img = Image.open(os.path.join(SRC, fname)).convert("RGBA")
    if bottom_crop or top_crop or left_crop:
        img = img.crop((left_crop, top_crop, img.width, img.height - bottom_crop))
    return img


def bands(flags, min_run=12, max_gap=6):
    """Runs of True in a 1-D profile, merging short gaps."""
    runs = []
    start = None
    gap = 0
    for i, v in enumerate(flags):
        if v:
            if start is None:
                start = i
            gap = 0
        elif start is not None:
            gap += 1
            if gap > max_gap:
                if i - gap - start >= min_run:
                    runs.append((start, i - gap))
                start = None
                gap = 0
    if start is not None and len(flags) - start >= min_run:
        runs.append((start, len(flags)))
    return runs


def split_grid(src, names, cols, rows, pad=6, v_min=200, s_max=26, scale=2, sat_min=100):
    """Split an icon card sheet on the grid implied by its vivid glyph pixels.

    The cards' pale dashed outlines are desaturated, so a high saturation floor
    isolates the glyphs themselves and their row/column bands give the grid.
    """
    arr = np.array(src.convert("RGB")).astype(np.int16)
    vivid = ((arr.max(2) - arr.min(2)) >= sat_min) & (arr.max(2) >= 70)
    col_bands = bands(vivid.any(0))
    row_bands = bands(vivid.any(1))
    print(f"  grid {len(col_bands)}x{len(row_bands)} (want {cols}x{rows})")

    i = 0
    for ry in row_bands[:rows]:
        for cx in col_bands[:cols]:
            if i >= len(names):
                return
            box = (
                max(0, cx[0] - pad), max(0, ry[0] - pad),
                min(src.width, cx[1] + pad), min(src.height, ry[1] + pad),
            )
            piece = src.crop(box)
            save(autocrop(clean(piece, v_min=v_min, s_max=s_max, feather=0.7, speck=24)), names[i], scale)
            i += 1


print("hero / feature imagery")
# 01 doctor hero portrait: aggressive key kills the grey card panel behind him
portrait = autocrop(largest_only(clean(load("01_doctor_hero_portrait.png"), v_min=176, s_max=42, speck=0, seed_alpha=False)))
# Below the crossed arms the sleeve keyed into a jagged flame edge, because that
# part of him overlapped the blue blob. Crop above the damage: a waist-up
# portrait, feathered in CSS, beats a torn one.
portrait = portrait.crop((0, 0, portrait.width, int(portrait.height * 0.755)))
# one speck of keying residue survives below his sleeve
portrait = knockout(portrait, 0.0, 0.88, 0.22)
save(autocrop(portrait), "doctor-portrait", 3)

# 10_doctor_full_figure is not shipped: the doctor keys cleanly but the blue
# blobs behind him tear into a ragged silhouette that is obvious on the dark
# sections. doctor-portrait covers the same job without the torn edges.

# 04 about surgeon video still: a rectangular photo. Crop it out of the
# checkerboard frame and leave it opaque — keying a photo chews its edges.
about = load("04_about_surgeon_visual.png").crop((13, 11, 287, 135))
about = Image.alpha_composite(Image.new("RGBA", about.size, (9, 17, 49, 255)), about)
save(inpaint_disc(about), "about-video", 3)

save(autocrop(strip_chip(clean(load("07_medicine_store_products.png"), v_min=204, s_max=26, speck=120))), "medicine-group", 2)
save(autocrop(strip_chip(clean(load("08_healthcare_heart_graphic.png"), v_min=200, s_max=30, speck=120))), "heart-graphic", 2)
save(autocrop(strip_chip(clean(load("09_medical_equipment_graphic.png"), v_min=200, s_max=30, speck=120))), "equipment-graphic", 2)
save(autocrop(largest_only(clean(load("11_decorative_abstract_shapes.png", bottom_crop=40), v_min=208, s_max=24, speck=0))), "wave-decor", 2)
# 14_misc_medical_decor is too checkerboard-contaminated to rescue; those sparkles
# and crosses are rebuilt in CSS/Three.js instead.

print("clinic building (cropped from the collage: the shipped crop is mostly form UI)")
collage = Image.open(COLLAGE).convert("RGBA")
save(collage.crop((1126, 80, 1290, 191)), "clinic-building", 4)

print("service icons")
split_grid(
    load("03_services_icons.png"),
    ["icon-general", "icon-cardiology", "icon-neurology", "icon-dermatology", "icon-orthopedics", "icon-pediatrics"],
    cols=2, rows=3, v_min=198, s_max=28,
)

print("trust icons")
split_grid(
    load("05_trust_feature_icons.png", bottom_crop=30),
    ["icon-shield", "icon-diamond", "icon-handshake", "icon-support"],
    cols=2, rows=2, v_min=198, s_max=28,
)

print("testimonial avatars")
av = clean(load("06_testimonial_portraits.png", bottom_crop=26), v_min=216, s_max=18, feather=0.8, speck=400)
boxes = []
arr = np.array(av)[:, :, 3] > 40
labels, sizes = _label(arr)
for i in range(1, len(sizes)):
    if sizes[i] < 900:
        continue
    ys, xs = np.where(labels == i)
    boxes.append((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
boxes.sort(key=lambda b: (b[1] // 40, b[0]))
for name, b in zip(["avatar-1", "avatar-2", "avatar-3", "avatar-4"], boxes):
    save(square(av.crop(b)), name, 3)

print("medicine product shots")
group = Image.open(os.path.join(OUT, "medicine-group.png")).convert("RGBA")
# boxes are in medicine-group.png's own 386x254 space
for name, box in [
    ("med-orange-bottle", (86, 60, 176, 204)),
    ("med-blue-bottle", (181, 26, 243, 165)),
    ("med-white-bottle", (246, 42, 356, 200)),
    ("med-blister-purple", (2, 100, 76, 198)),
    ("med-tablet-strip", (178, 158, 288, 240)),
    ("med-capsules", (48, 182, 132, 232)),
]:
    save(autocrop(group.crop(box)), name, 2)

print("done ->", OUT)
