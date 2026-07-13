from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "cabinet-of-curiosities" / "assets"
PHOTO_PATH = ASSETS / "cabinet-original-photo.jpg"
SEED_PATH = ASSETS / "cabinet-authentic-objects-v2.webp"
CONTEXT_PATH = ROOT / "work" / "cabinet-board-context-mask-v2.png"
SURROUND_SOURCE_PATH = ASSETS / "cabinet-surround-woven-v4.webp"
GENERATED_PANEL_PATH = ROOT / "work" / "generated-board-grey-v5.png"
SURROUND_PATH = ASSETS / "cabinet-surround-grey-v5.webp"
CONTENT_PATH = ASSETS / "cabinet-board-content-v8.webp"
PREVIEW_PATH = ROOT.parent / "cabinet-board-v8-preview.jpg"

SCALE = 4
RNG = np.random.default_rng(7132026)


def fill_holes(binary: np.ndarray) -> np.ndarray:
    """Fill holes in a small binary mask by flooding its exterior."""
    height, width = binary.shape
    exterior = np.zeros_like(binary, dtype=bool)
    queue: deque[tuple[int, int]] = deque()

    for x in range(width):
        if not binary[0, x]:
            exterior[0, x] = True
            queue.append((0, x))
        if not binary[height - 1, x]:
            exterior[height - 1, x] = True
            queue.append((height - 1, x))
    for y in range(height):
        if not binary[y, 0]:
            exterior[y, 0] = True
            queue.append((y, 0))
        if not binary[y, width - 1]:
            exterior[y, width - 1] = True
            queue.append((y, width - 1))

    while queue:
        y, x = queue.popleft()
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if (
                0 <= ny < height
                and 0 <= nx < width
                and not binary[ny, nx]
                and not exterior[ny, nx]
            ):
                exterior[ny, nx] = True
                queue.append((ny, nx))

    return ~exterior


def retain_largest(binary: np.ndarray) -> np.ndarray:
    """Retain the largest 8-connected component in a small binary mask."""
    height, width = binary.shape
    seen = np.zeros_like(binary, dtype=bool)
    largest: list[tuple[int, int]] = []

    for y in range(height):
        for x in range(width):
            if not binary[y, x] or seen[y, x]:
                continue
            component: list[tuple[int, int]] = []
            queue: deque[tuple[int, int]] = deque([(y, x)])
            seen[y, x] = True
            while queue:
                cy, cx = queue.popleft()
                component.append((cy, cx))
                for ny in range(max(0, cy - 1), min(height, cy + 2)):
                    for nx in range(max(0, cx - 1), min(width, cx + 2)):
                        if binary[ny, nx] and not seen[ny, nx]:
                            seen[ny, nx] = True
                            queue.append((ny, nx))
            if len(component) > len(largest):
                largest = component

    output = np.zeros_like(binary, dtype=bool)
    for y, x in largest:
        output[y, x] = True
    return output


def orthogonal_hull(binary: np.ndarray) -> np.ndarray:
    """Fill every occupied row and column, retaining a concave outer contour."""
    row_hull = np.zeros_like(binary, dtype=bool)
    for y in range(binary.shape[0]):
        xs = np.flatnonzero(binary[y])
        if len(xs):
            row_hull[y, xs[0] : xs[-1] + 1] = True

    column_hull = np.zeros_like(binary, dtype=bool)
    for x in range(binary.shape[1]):
        ys = np.flatnonzero(binary[:, x])
        if len(ys):
            column_hull[ys[0] : ys[-1] + 1, x] = True

    return fill_holes(row_hull & column_hull)


def orthogonal_cover(binary: np.ndarray) -> np.ndarray:
    """Build a broad but still irregular cover without deep open notches."""
    row_hull = np.zeros_like(binary, dtype=bool)
    for y in range(binary.shape[0]):
        xs = np.flatnonzero(binary[y])
        if len(xs):
            row_hull[y, xs[0] : xs[-1] + 1] = True

    column_hull = np.zeros_like(binary, dtype=bool)
    for x in range(binary.shape[1]):
        ys = np.flatnonzero(binary[:, x])
        if len(ys):
            column_hull[ys[0] : ys[-1] + 1, x] = True

    return fill_holes(row_hull | column_hull)


def build_main_island(seed_alpha: Image.Image) -> Image.Image:
    """Create one continuous, concave island around the occupied pinboard."""
    small = seed_alpha.resize(
        (seed_alpha.width // SCALE, seed_alpha.height // SCALE), Image.Resampling.NEAREST
    )
    seed = np.asarray(small, dtype=np.uint8) > 36

    # The freestanding Paradai wrapper sits on the shelf. It is intentionally
    # excluded from the main pinboard island and restored as a separate shelf
    # object later, so it cannot pull a broad rectangular bridge downward.
    seed[225:, :112] = False

    image = Image.fromarray(np.where(seed, 255, 0).astype(np.uint8), "L")
    # Protect crochet fibres, join neighbouring objects, then close the spaces
    # between them. These operations happen at quarter resolution so their
    # source-image radii are approximately 32 px and 72 px respectively.
    image = image.filter(ImageFilter.MaxFilter(17))
    image = image.filter(ImageFilter.MaxFilter(37))
    image = image.filter(ImageFilter.MinFilter(37))

    # Keep the naturally irregular exterior of the connected collection.
    # The former orthogonal hull filled each occupied row and column and made
    # the collection read as a softened rectangle.
    joined = retain_largest(fill_holes(np.asarray(image) > 96))

    # Let the occupied-area envelope define the perimeter. A former hard
    # board-quad intersection produced long straight top and bottom runs that
    # read as a softened rectangle. Source pixels outside the true pinboard
    # are already replaced by the clean plate during compositing.
    core = Image.fromarray(np.where(joined, 255, 0).astype(np.uint8), "L")
    core = core.filter(ImageFilter.GaussianBlur(1.2))
    core = core.point(lambda value: 255 if value >= 112 else 0)
    core = core.filter(ImageFilter.MaxFilter(3))
    return core.resize(seed_alpha.size, Image.Resampling.LANCZOS)


def expand_and_feather(mask: Image.Image, expansion: int, feather: float) -> Image.Image:
    """Expand at quarter resolution, then feather only outside the opaque core."""
    small = mask.resize(
        (mask.width // SCALE, mask.height // SCALE), Image.Resampling.LANCZOS
    )
    radius = max(1, round(expansion / SCALE))
    expanded = small.filter(ImageFilter.MaxFilter(radius * 2 + 1))
    expanded = expanded.resize(mask.size, Image.Resampling.LANCZOS)
    glow = expanded.filter(ImageFilter.GaussianBlur(feather / 2.25))
    return ImageChops.lighter(mask, glow)


def physical_board_mask(size: tuple[int, int]) -> Image.Image:
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    draw.polygon([(225, 182), (1342, 177), (1345, 999), (224, 1003)], fill=255)
    return mask


def woven_plate_from_surround(size: tuple[int, int]) -> Image.Image:
    """Map the new cabinet's integrated woven recess into board coordinates."""
    surround = Image.open(SURROUND_PATH).convert("RGB")
    # This crop contains only the clean woven recess. It deliberately excludes
    # the carved frame so the collection can use the same material right up to
    # its single irregular perimeter.
    left = round(surround.width * 0.225)
    top = round(surround.height * 0.105)
    right = round(surround.width * 0.825)
    bottom = round(surround.height * 0.855)
    plate = surround.crop((left, top, right, bottom)).resize(size, Image.Resampling.LANCZOS)

    return plate


def build_grey_surround() -> Image.Image:
    """Replace only the woven recess; retain the original sharp outer scene."""
    base = Image.open(SURROUND_SOURCE_PATH).convert("RGB")
    generated = Image.open(GENERATED_PANEL_PATH).convert("RGB")
    if generated.size != base.size:
        generated = generated.resize(base.size, Image.Resampling.LANCZOS)

    width, height = base.size
    scale_x, scale_y = width / 1672, height / 941

    # Follow the inside of the carved frame rather than drawing a rectangular
    # replacement. The short feather lies under the dark inner moulding.
    panel = Image.new("L", base.size, 0)
    points = [
        (round(420 * scale_x), round(75 * scale_y)),
        (round(1248 * scale_x), round(75 * scale_y)),
        (round(1328 * scale_x), round(83 * scale_y)),
        (round(1375 * scale_x), round(111 * scale_y)),
        (round(1393 * scale_x), round(158 * scale_y)),
        (round(1393 * scale_x), round(742 * scale_y)),
        (round(1381 * scale_x), round(790 * scale_y)),
        (round(1342 * scale_x), round(819 * scale_y)),
        (round(374 * scale_x), round(819 * scale_y)),
        (round(342 * scale_x), round(795 * scale_y)),
        (round(331 * scale_x), round(746 * scale_y)),
        (round(331 * scale_x), round(154 * scale_y)),
        (round(346 * scale_x), round(112 * scale_y)),
        (round(380 * scale_x), round(86 * scale_y)),
    ]
    ImageDraw.Draw(panel).polygon(points, fill=255)
    panel = panel.filter(ImageFilter.GaussianBlur(max(2.0, 5.0 * scale_x)))

    # The generated edit supplies a neutral textile surface. Grade only its
    # low-saturation fabric pixels to the measured authentic board mean. Wood,
    # lamp, window, flowers and furniture remain pixels from the base asset.
    gen = np.asarray(generated, dtype=np.float32)
    smooth = np.asarray(generated.filter(ImageFilter.GaussianBlur(24)), dtype=np.float32)
    detail = gen - smooth
    center = smooth[
        round(170 * scale_y) : round(760 * scale_y),
        round(470 * scale_x) : round(1210 * scale_x),
    ]
    center_median = np.median(center, axis=(0, 1))
    target = np.array([171.0, 163.0, 154.0], dtype=np.float32)
    graded = target + 0.20 * (smooth - center_median) + 0.74 * detail
    graded = np.clip(graded, 0, 255).astype(np.uint8)

    # Restrict the colour correction to neutral woven fibres. Decorative
    # bronze leaves that overlap the recess stay untouched and sharp.
    channel_span = gen.max(axis=2) - gen.min(axis=2)
    luminance = gen.mean(axis=2)
    fabric = np.where((channel_span < 38) & (luminance > 54), 255, 0).astype(np.uint8)
    fabric_mask = Image.fromarray(fabric, "L").filter(ImageFilter.GaussianBlur(1.5))
    fabric_mask = ImageChops.multiply(fabric_mask, panel)
    neutral_panel = Image.composite(Image.fromarray(graded, "RGB"), generated, fabric_mask)

    result = Image.composite(neutral_panel, base, panel)
    result.save(SURROUND_PATH, "WEBP", quality=96, method=6)
    return result


def build_object_mask(source: Image.Image, seed_alpha: Image.Image) -> Image.Image:
    """Create one aggregate object mask while excluding the photographed case."""
    board = physical_board_mask(source.size)
    crisp = seed_alpha.point(lambda value: 255 if value >= 72 else 0)
    objects = ImageChops.multiply(crisp, board)

    # The long right-hand crochet figure overlaps the original display rail.
    # Remove that narrow photographed strip from the aggregate seed before
    # restoring only the yarn through a constrained support mask below.
    ImageDraw.Draw(objects).rectangle((1292, 160, 1370, 710), fill=0)

    # Reuse the carefully constrained crochet masks for the two figures that
    # cross the physical board edge. These protect fibres without admitting the
    # ceiling, rails or white side walls from the source photograph.
    edge_objects = Image.new("L", source.size, 0)
    edge_draw = ImageDraw.Draw(edge_objects)

    blue_head_shape = Image.new("L", source.size, 0)
    ImageDraw.Draw(blue_head_shape).ellipse((203, 198, 315, 286), fill=255)
    edge_objects = ImageChops.lighter(
        edge_objects,
        ImageChops.multiply(seed_alpha, blue_head_shape),
    )

    blue_strand_box = (214, 225, 365, 435)
    blue_hsv = np.asarray(source.crop(blue_strand_box).convert("HSV"), dtype=np.uint8)
    blue_strands = Image.fromarray(
        np.where((blue_hsv[:, :, 1] > 58) & (blue_hsv[:, :, 2] > 42), 255, 0).astype(np.uint8),
        "L",
    ).filter(ImageFilter.MaxFilter(3))
    edge_objects.paste(
        ImageChops.lighter(edge_objects.crop(blue_strand_box), blue_strands),
        blue_strand_box[:2],
    )

    pink_support = Image.new("L", source.size, 0)
    pink_draw = ImageDraw.Draw(pink_support)
    pink_draw.ellipse((1258, 174, 1357, 254), fill=255)
    pink_draw.line(
        [(1309, 226), (1315, 270), (1310, 311), (1319, 352),
         (1313, 392), (1321, 432), (1316, 474), (1324, 515),
         (1319, 556), (1326, 596), (1321, 637), (1326, 671)],
        fill=255,
        width=58,
        joint="curve",
    )
    edge_objects = ImageChops.lighter(
        edge_objects,
        ImageChops.multiply(seed_alpha, pink_support),
    )

    objects = ImageChops.lighter(objects, edge_objects)
    return objects.filter(ImageFilter.GaussianBlur(0.65))


def reconstruct_board_texture(
    source: Image.Image, seed_alpha: Image.Image, board_mask: Image.Image
) -> Image.Image:
    """Reconstruct the board from its own clean grey woven samples."""
    rgb = np.asarray(source.convert("RGB"), dtype=np.float32)
    seed = np.asarray(seed_alpha, dtype=np.uint8)
    board = np.asarray(board_mask, dtype=np.uint8) > 128

    channel_span = rgb.max(axis=2) - rgb.min(axis=2)
    luminance = rgb.mean(axis=2)
    valid = board & (seed < 18) & (channel_span < 54) & (luminance > 112) & (luminance < 220)

    if valid.sum() < 1000:
        raise RuntimeError("No clean authentic board samples were found")

    # A controlled lighting field based on robust regional medians measured
    # from the real pinboard. This avoids copying colour casts from wrappers
    # into the reconstructed background while retaining the photographed
    # top-to-bottom and left-to-right light falloff.
    yy, xx = np.mgrid[0 : source.height, 0 : source.width].astype(np.float32)
    u = np.clip((xx - 214) / (1364 - 214), 0, 1)[:, :, None]
    v = np.clip((yy - 175) / (1012 - 175), 0, 1)[:, :, None]
    top_left = np.array([160, 153, 145], dtype=np.float32)
    top_right = np.array([148, 144, 143], dtype=np.float32)
    bottom_left = np.array([179, 172, 162], dtype=np.float32)
    bottom_right = np.array([167, 160, 152], dtype=np.float32)
    top = top_left * (1 - u) + top_right * u
    bottom = bottom_left * (1 - u) + bottom_right * u
    low_frequency = top * (1 - v) + bottom * v

    center_bump = np.exp(
        -(((xx - 805) / 430) ** 2 + ((yy - 585) / 340) ** 2)
    )[:, :, None]
    low_frequency += center_bump * np.array([9.2, 12.2, 12.6], dtype=np.float32)

    broad_noise = RNG.normal(0, 1, (36, 48)).astype(np.float32)
    broad_image = Image.fromarray(
        np.clip(128 + broad_noise * 18, 0, 255).astype(np.uint8), "L"
    ).resize(source.size, Image.Resampling.BICUBIC)
    broad_image = broad_image.filter(ImageFilter.GaussianBlur(28))
    broad = (np.asarray(broad_image, dtype=np.float32) - 128)[:, :, None] * 0.13
    low_frequency += broad

    # These are verified clean 32 px samples of the photographed woven board.
    patch_origins = [
        (604, 494), (556, 414), (908, 382), (484, 422),
        (404, 886), (908, 590), (908, 542), (356, 518),
        (700, 766), (1268, 830), (892, 838), (516, 886),
        (692, 606), (716, 838),
    ]
    patch_size = 32
    patches: list[np.ndarray] = []
    for x, y in patch_origins:
        patch = rgb[y : y + patch_size, x : x + patch_size].copy()
        smooth = np.asarray(
            Image.fromarray(patch.astype(np.uint8), "RGB").filter(ImageFilter.GaussianBlur(5)),
            dtype=np.float32,
        )
        residual = patch - smooth
        residual -= residual.mean(axis=(0, 1), keepdims=True)
        patches.append(residual)

    step = 22
    window_1d = np.hanning(patch_size).astype(np.float32)
    window = np.maximum(np.outer(window_1d, window_1d), 0.035)[:, :, None]
    detail = np.zeros_like(rgb, dtype=np.float32)
    weights = np.zeros((source.height, source.width, 1), dtype=np.float32)

    for y in range(-patch_size // 2, source.height, step):
        for x in range(-patch_size // 2, source.width, step):
            patch = patches[int(RNG.integers(0, len(patches)))]
            if RNG.random() < 0.5:
                patch = patch[:, ::-1]
            if RNG.random() < 0.5:
                patch = patch[::-1]

            x0, y0 = max(0, x), max(0, y)
            x1, y1 = min(source.width, x + patch_size), min(source.height, y + patch_size)
            if x1 <= x0 or y1 <= y0:
                continue
            px0, py0 = x0 - x, y0 - y
            px1, py1 = px0 + (x1 - x0), py0 + (y1 - y0)
            local_window = window[py0:py1, px0:px1]
            detail[y0:y1, x0:x1] += patch[py0:py1, px0:px1] * local_window
            weights[y0:y1, x0:x1] += local_window

    detail /= np.maximum(weights, 1e-5)
    noise = RNG.normal(0, 0.45, rgb.shape).astype(np.float32)
    detail = np.clip(detail, -12, 12)
    texture = np.clip(low_frequency + detail * 0.88 + noise, 0, 255)

    # Bring the reconstruction to the measured authentic-board global median.
    texture_median = np.median(texture[board], axis=0)
    target_median = np.array([171.0, 163.0, 154.0], dtype=np.float32)
    texture += target_median - texture_median
    texture_image = Image.fromarray(np.clip(texture, 0, 255).astype(np.uint8), "RGB")
    texture_smooth = np.asarray(
        texture_image.filter(ImageFilter.GaussianBlur(24)), dtype=np.float32
    )
    texture_detail = texture - texture_smooth
    smooth_median = np.median(texture_smooth[board], axis=0)
    texture = target_median + 0.20 * (texture_smooth - smooth_median) + 0.74 * texture_detail
    return Image.fromarray(np.clip(texture, 0, 255).astype(np.uint8), "RGB")


def build_layers() -> tuple[Image.Image, Image.Image]:
    source = Image.open(PHOTO_PATH).convert("RGB")
    seed_layer = Image.open(SEED_PATH).convert("RGBA")
    seed_alpha = seed_layer.getchannel("A")

    object_mask = build_object_mask(source, seed_alpha)
    main_core = build_main_island(object_mask)
    board_mask = physical_board_mask(source.size)
    context_mask = Image.open(CONTEXT_PATH).convert("L")
    context_mask = ImageChops.multiply(context_mask, board_mask)

    # The contextual breathing room uses a clean plate reconstructed from the
    # authentic grey pinboard. Only actual objects come from the photograph.
    # This preserves crochet fibres and package shadows without reintroducing
    # darker rectangular patches around grouped mini bars.
    plate = woven_plate_from_surround(source.size)
    hybrid = Image.composite(source, plate, object_mask)
    content_alpha = ImageChops.lighter(object_mask, context_mask)

    # Restore the one shelf object without allowing it to distort the main
    # island. Its geometry remains in the original 4:3 coordinate system.
    shelf_mask = Image.new("L", source.size, 0)
    shelf_mask.paste(seed_alpha.crop((145, 888, 432, 1100)), (145, 888))
    shelf_mask = shelf_mask.point(lambda value: 255 if value >= 72 else 0).filter(ImageFilter.GaussianBlur(0.65))
    content_alpha = ImageChops.lighter(content_alpha, shelf_mask)

    # The shelf wrapper itself must also come from the photograph rather than
    # from the clean woven plate.
    hybrid = Image.composite(source, hybrid, shelf_mask)

    content = hybrid.convert("RGBA")
    content.putalpha(content_alpha)

    return content, main_core


def render_preview(content: Image.Image) -> None:
    viewport = (1795, 900)
    surround = Image.open(SURROUND_PATH).convert("RGBA")
    scale = max(viewport[0] / surround.width, viewport[1] / surround.height)
    surround = surround.resize(
        (round(surround.width * scale), round(surround.height * scale)),
        Image.Resampling.LANCZOS,
    )
    left = (surround.width - viewport[0]) // 2
    top = (surround.height - viewport[1]) // 2
    canvas = surround.crop((left, top, left + viewport[0], top + viewport[1]))

    board_width = min(1350, round((viewport[1] - 60) * 1.56), round((viewport[0] - 20) * 1.34))
    board_height = round(board_width * 3 / 4)
    x = (viewport[0] - board_width) // 2
    y = (viewport[1] - board_height) // 2 - 8
    resized = content.resize((board_width, board_height), Image.Resampling.LANCZOS)
    canvas.alpha_composite(resized, (x, y))

    canvas.convert("RGB").save(PREVIEW_PATH, quality=94, subsampling=0)


def main() -> None:
    build_grey_surround()
    content, core = build_layers()
    # Quality 96 preserves lettering and wrapper detail while keeping the two
    # responsive layers light enough for a portfolio page. WebP alpha remains
    # lossless, so the hand-built masks are not degraded.
    content.save(CONTENT_PATH, "WEBP", quality=96, method=6)
    render_preview(content)

    alpha = np.asarray(content.getchannel("A"), dtype=np.uint8)
    core_array = np.asarray(core, dtype=np.uint8)
    print(
        {
            "content": str(CONTENT_PATH),
            "content_bytes": CONTENT_PATH.stat().st_size,
            "preview": str(PREVIEW_PATH),
            "alpha_bbox": content.getchannel("A").getbbox(),
            "content_coverage": round(float(alpha.mean() / 255), 4),
            "core_coverage": round(float(core_array.mean() / 255), 4),
        }
    )


if __name__ == "__main__":
    main()
