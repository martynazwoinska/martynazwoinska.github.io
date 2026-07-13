from __future__ import annotations

import json
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
PHOTO_PATH = ROOT / "cabinet-of-curiosities/assets/cabinet-original-photo.jpg"
DATA_PATH = ROOT / "cabinet-of-curiosities/cabinet-data.js"
OUTPUT_PATH = ROOT / "cabinet-of-curiosities/assets/cabinet-authentic-objects-v2.webp"
CONTEXT_PATH = ROOT / "work/cabinet-board-context-mask-v2.png"
NODE = Path(r"C:\Users\Legion\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe")


def load_objects() -> list[dict]:
    js = (
        "const fs=require('fs');global.window={};"
        f"eval(fs.readFileSync({json.dumps(str(DATA_PATH))},'utf8'));"
        "process.stdout.write(JSON.stringify(window.CABINET_OBJECTS));"
    )
    result = subprocess.run(
        [str(NODE), "-e", js], check=True, capture_output=True, text=True
    )
    return json.loads(result.stdout)


def pixel_box(box: list[float], size: tuple[int, int], pad: int = 1) -> tuple[int, int, int, int]:
    left, top, width, height = box
    image_width, image_height = size
    return (
        max(0, round(image_width * left / 100) - pad),
        max(0, round(image_height * top / 100) - pad),
        min(image_width, round(image_width * (left + width) / 100) + pad),
        min(image_height, round(image_height * (top + height) / 100) + pad),
    )


def tighten_rectangle_from_local_background(
    source: Image.Image, box: tuple[int, int, int, int]
) -> tuple[int, int, int, int]:
    left, top, right, bottom = box
    width, height = right - left, bottom - top
    if width < 46 or height < 46:
        return box

    image = np.asarray(source.convert("RGB"), dtype=np.int16)
    margin = 8
    outer_left, outer_top = max(0, left - margin), max(0, top - margin)
    outer_right = min(source.width, right + margin)
    outer_bottom = min(source.height, bottom + margin)
    outer = image[outer_top:outer_bottom, outer_left:outer_right]
    ring = np.ones(outer.shape[:2], dtype=bool)
    ring[top - outer_top : bottom - outer_top, left - outer_left : right - outer_left] = False
    ring_pixels = outer[ring]
    if len(ring_pixels) < 20:
        return box
    background = np.median(ring_pixels, axis=0)

    crop = image[top:bottom, left:right]
    distance = np.sqrt(((crop - background) ** 2).sum(axis=2))
    foreground = distance >= 19
    active_columns = np.flatnonzero(foreground.mean(axis=0) >= 0.18)
    active_rows = np.flatnonzero(foreground.mean(axis=1) >= 0.18)
    if len(active_columns) == 0 or len(active_rows) == 0:
        return box

    x0, x1 = int(active_columns[0]), int(active_columns[-1] + 1)
    y0, y1 = int(active_rows[0]), int(active_rows[-1] + 1)
    if (x1 - x0) < width * 0.55 or (y1 - y0) < height * 0.55:
        return box

    return (
        max(left, left + x0 - 1),
        max(top, top + y0 - 1),
        min(right, left + x1 + 1),
        min(bottom, top + y1 + 1),
    )


def add_geometric_object(source: Image.Image, mask: Image.Image, item: dict) -> None:
    draw = ImageDraw.Draw(mask)
    mask_pad = int(item.get("mask_pad", 0))
    left, top, right, bottom = pixel_box(item["box"], mask.size, pad=mask_pad)
    shape = item.get("shape", "rectangle")

    if shape == "circle":
        # The padded circles intentionally retain a narrow ring of the real
        # grey pinboard. This keeps crochet rays and the Taza disc from looking
        # shaved off once they are mounted on the matching fantasy backing.
        inset_factor = 0 if item.get("kind") == "crochet" or mask_pad else 0.03
        inset_x = max(1, round((right - left) * inset_factor))
        inset_y = max(1, round((bottom - top) * inset_factor))
        left, top = left + inset_x, top + inset_y
        right, bottom = right - inset_x, bottom - inset_y
        draw.ellipse((left, top, right, bottom), fill=255)
    elif shape == "triangle":
        draw.polygon(
            ((left + right) // 2, top, right, bottom, left, bottom), fill=255
        )
    else:
        if not mask_pad:
            left, top, right, bottom = tighten_rectangle_from_local_background(
                source, (left, top, right, bottom)
            )
            inset_x = max(1, round((right - left) * 0.03))
            inset_y = max(1, round((bottom - top) * 0.03))
            left, top = left + inset_x, top + inset_y
            right, bottom = right - inset_x, bottom - inset_y
        radius = max(1, round(min(right - left, bottom - top) * 0.025))
        draw.rounded_rectangle((left, top, right, bottom), radius=radius, fill=255)


def add_saturated_irregular_object(
    source: Image.Image,
    mask: Image.Image,
    box_percent: tuple[float, float, float, float],
    saturation_threshold: int = 34,
) -> None:
    box = pixel_box(list(box_percent), source.size, pad=3)
    crop = source.crop(box).convert("HSV")
    saturation = np.asarray(crop, dtype=np.uint8)[:, :, 1]
    local = Image.fromarray(
        np.where(saturation >= saturation_threshold, 255, 0).astype(np.uint8), "L"
    )

    # Join coloured yarn strands and fill small low-saturation details such as eyes.
    local = local.filter(ImageFilter.MaxFilter(15))
    local = local.filter(ImageFilter.MinFilter(9))
    local = local.filter(ImageFilter.MaxFilter(5))
    local = local.filter(ImageFilter.GaussianBlur(0.8))
    mask.paste(ImageChops.lighter(mask.crop(box), local), box[:2])


def main() -> None:
    source = Image.open(PHOTO_PATH).convert("RGBA")
    objects = load_objects()
    mask = Image.new("L", source.size, 0)

    # The yellow Paradai wrapper is rotated and is handled by its true corners below.
    box_overrides = {
        "black-cherry-70": [61.1, 48.6, 9.3, 16.8],
        "date-cashew-vegan": [33.66, 79.6, 11.46, 7.03],
        "green-crocheted-eye": [59.3, 33.3, 11.7, 16.5],
        "yellow-crocheted-eye": [34.6, 64.4, 11.7, 16.4],
        "sfoodies-sticker": [28.5, 80.1, 5.6, 6.8],
    }
    for item in objects:
        if item["id"] in {
            "paradai-chanthaburi-yellow",
            "omnom-craft-madagascar-66",
        }:
            continue
        adjusted_item = dict(item)
        adjusted_item["box"] = box_overrides.get(item["id"], item["box"])
        # Several very small Zotter packages, the Taza disc and the crochet
        # eyes need a little authentic board around their silhouettes. The
        # former global contraction made these objects visibly too tight.
        if item.get("maker") == "Zotter" and item["box"][2] < 6.5:
            adjusted_item["mask_pad"] = 2
        if item["id"] == "taza-round-package":
            adjusted_item["mask_pad"] = 4
        if item["id"] == "green-crocheted-eye":
            adjusted_item["mask_pad"] = 5
        if item["id"] == "yellow-crocheted-eye":
            adjusted_item["mask_pad"] = 4
        add_geometric_object(source, mask, adjusted_item)

    width, height = source.size
    draw = ImageDraw.Draw(mask)

    # Shared contextual pieces of the authentic grey backing. These stop the
    # smallest packages and crochet rays from reading as individually clipped
    # stickers. Each group has enough breathing room to preserve its edge and
    # shadow, while remaining well inside the real pinboard.
    context = Image.new("L", source.size, 0)
    context_draw = ImageDraw.Draw(context)
    for box, radius in (
        ((470, 174, 939, 291), 18),   # Zotter and other mini bars, top run
        ((879, 270, 1168, 386), 18),  # Tanzania and Uganda mini-bar run
        ((352, 382, 675, 640), 28),   # Taza disc, Kamm triangle and portrait
        ((890, 372, 1102, 590), 34),  # green crochet eye and all outer fibres
        ((410, 710, 729, 1025), 34),  # yellow eye, sticker and Date & Cashew
    ):
        context_draw.rounded_rectangle(box, radius=radius, fill=255)
    context = context.filter(ImageFilter.GaussianBlur(3.8))
    draw = ImageDraw.Draw(mask)

    # The Omnom display is two adjacent physical packages, not one large panel.
    for box in ((60.35, 15.54, 6.65, 9.03), (67.45, 15.54, 6.77, 9.03)):
        left, top, right, bottom = pixel_box(list(box), source.size, pad=0)
        draw.rounded_rectangle((left, top, right, bottom), radius=3, fill=255)

    # Exact quadrilateral of the freestanding yellow Paradai wrapper.
    draw.polygon(
        [
            (round(width * 0.113), round(height * 0.797)),
            (round(width * 0.259), round(height * 0.787)),
            (round(width * 0.2625), round(height * 0.890)),
            (round(width * 0.114), round(height * 0.930)),
        ],
        fill=255,
    )

    # Non-indexed objects that are part of the authentic display.
    # Blue crocheted figure and the pink/blue crocheted worm are colour-segmented
    # so their irregular yarn outlines remain, instead of becoming rectangles.
    add_saturated_irregular_object(source, mask, (12.4, 14.4, 11.8, 22.0), 58)
    add_saturated_irregular_object(source, mask, (82.0, 13.3, 6.1, 43.5), 46)
    # Restore the pale strands in the long worm as a narrow curving yarn path.
    # The saturated colour mask above supplies its detailed outer contour.
    worm_points_percent = [
        (85.2, 20.0), (85.6, 23.5), (85.3, 27.0), (85.9, 30.5),
        (85.5, 34.0), (86.0, 37.5), (85.7, 41.0), (86.1, 44.5),
        (85.8, 48.0), (86.2, 51.5), (85.9, 55.0), (86.2, 58.0),
    ]
    worm_points = [
        (round(width * x / 100), round(height * y / 100))
        for x, y in worm_points_percent
    ]
    draw.line(worm_points, fill=255, width=32, joint="curve")
    head_box = pixel_box([82.5, 13.9, 4.9, 7.4], source.size, pad=1)
    draw.ellipse(head_box, fill=255)

    # Small pieces of ephemera visible on the photographed display.
    for box in (
        (14.7, 72.6, 8.8, 8.1),   # Chocolate of the month note
        (24.5, 47.7, 2.6, 7.2),   # miniature portrait wrapper
    ):
        left, top, right, bottom = pixel_box(list(box), source.size)
        draw.rounded_rectangle((left, top, right, bottom), radius=3, fill=255)

    # Keep the physical edges intact and use only a narrow antialiased fringe.
    # The new fantasy backing is colour-matched to this photographed grey
    # pinboard, so there is no longer a reason to shave a pixel off every item.
    mask = mask.filter(ImageFilter.GaussianBlur(0.55))

    output = source.copy()
    output.putalpha(mask)
    output.save(OUTPUT_PATH, "WEBP", lossless=True, method=6)
    context.save(CONTEXT_PATH, "PNG", optimize=True)
    print(
        json.dumps(
            {
                "output": str(OUTPUT_PATH),
                "context": str(CONTEXT_PATH),
                "bytes": OUTPUT_PATH.stat().st_size,
                "objects": len(objects),
                "coverage": round(np.asarray(mask, dtype=np.uint8).mean() / 255, 4),
            }
        )
    )


if __name__ == "__main__":
    main()
