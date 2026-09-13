"""Generate the app icons and splash from code, so the brand marks are
reproducible and reviewable in a diff rather than being opaque binaries.

    uv run --with pillow python assets/generate_icons.py

The mark: an open ring (the archive, a tape reel, a clock face) with tick marks
around it and a left-pointing play triangle at the centre — rewind, look back.
Drawn at 4x and downsampled, because PIL's arc/polygon are not anti-aliased.
"""

from pathlib import Path

from PIL import Image, ImageDraw

INK = (12, 11, 9)
AMBER = (240, 178, 67)
AMBER_DIM = (125, 116, 95)

SS = 4  # supersample factor
HERE = Path(__file__).parent


def draw_mark(size: int, *, transparent: bool = False, scale: float = 1.0) -> Image.Image:
    """The Hindsight mark on a square canvas. `scale` shrinks the glyph inside
    the canvas — Android adaptive icons crop hard, so the foreground needs room."""
    w = size * SS
    img = Image.new("RGBA", (w, w), (0, 0, 0, 0) if transparent else (*INK, 255))
    d = ImageDraw.Draw(img)

    cx = cy = w / 2
    r = w * 0.34 * scale          # ring radius
    th = max(2, int(w * 0.044 * scale))  # ring thickness

    # Open ring: a gap at the top reads as a dial rather than a plain circle.
    d.arc(
        [cx - r, cy - r, cx + r, cy + r],
        start=291,
        end=249 + 360,
        fill=AMBER,
        width=th,
    )

    # Tick marks just inside the ring — the sense of a timeline being measured.
    import math

    for i in range(12):
        ang = math.radians(i * 30 - 90)
        if 250 <= (i * 30 - 90) % 360 <= 290:
            continue
        inner = r - th * 1.95
        outer = r - th * 1.15
        d.line(
            [
                cx + math.cos(ang) * inner,
                cy + math.sin(ang) * inner,
                cx + math.cos(ang) * outer,
                cy + math.sin(ang) * outer,
            ],
            fill=AMBER_DIM,
            width=max(1, int(th * 0.36)),
        )

    # Left-pointing play triangle: rewind. Kept well clear of the tick ring so
    # the two elements read as separate marks at launcher size.
    tw = r * 0.40
    thh = r * 0.44
    d.polygon(
        [(cx - tw * 0.78, cy), (cx + tw * 0.55, cy - thh), (cx + tw * 0.55, cy + thh)],
        fill=AMBER,
    )

    return img.resize((size, size), Image.LANCZOS)


def write(img: Image.Image, name: str, *, rgb: bool = False) -> None:
    path = HERE / name
    out = img
    if rgb:
        # iOS rejects icons with an alpha channel.
        flat = Image.new("RGB", img.size, INK)
        flat.paste(img, mask=img.split()[3] if img.mode == "RGBA" else None)
        out = flat
    out.save(path)
    print(f"  {name}  {out.size[0]}x{out.size[1]}  {out.mode}")


def main() -> None:
    print("Writing icons:")
    # iOS/store icon — no alpha, glyph fills the tile.
    write(draw_mark(1024), "icon.png", rgb=True)

    # Android adaptive foreground: the launcher crops to a circle, so the glyph
    # sits inside the 66% safe zone on a transparent field.
    write(draw_mark(1024, transparent=True, scale=0.62), "adaptive-icon.png")

    write(draw_mark(196), "favicon.png", rgb=True)

    # Splash: the mark centred on ink, sized for `resizeMode: contain`.
    splash = Image.new("RGB", (1242, 1242), INK)
    mark = draw_mark(560, transparent=True)
    splash.paste(mark, ((1242 - 560) // 2, (1242 - 560) // 2), mark)
    write(splash, "splash.png")


if __name__ == "__main__":
    main()
