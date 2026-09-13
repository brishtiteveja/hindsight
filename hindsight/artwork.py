"""Generated cover art — deterministic geometric SVGs, one per issue family.

No stock-photo dependency and no licensing question: each cover is drawn from
the family's own hue and key, so the same issue always looks the same and new
issues get art for free. The motifs echo the product — layered strata (an
archive), arcs (drift), and a scatter of points (clips).
"""

import hashlib

W, H = 480, 300
INK = "#0c0b09"


def _rng(seed: str):
    """Small deterministic PRNG from a string seed."""
    h = hashlib.sha256(seed.encode()).digest()
    i = 0

    def nxt(lo: float = 0.0, hi: float = 1.0) -> float:
        nonlocal i
        v = h[i % len(h)] / 255.0
        i += 1
        return lo + v * (hi - lo)
    return nxt


def cover(key: str, hue: str, motif: str = "strata") -> str:
    """An SVG cover for one issue/facet. `hue` is the family colour."""
    r = _rng(key)
    parts = [
        f'<rect width="{W}" height="{H}" fill="{INK}"/>',
        f'<rect width="{W}" height="{H}" fill="url(#g)"/>',
    ]

    if motif == "arcs":                      # drift / evolution
        for i in range(7):
            y = H * (0.25 + 0.09 * i)
            amp = 18 + r(0, 26)
            parts.append(
                f'<path d="M0,{y:.0f} Q{W*0.25:.0f},{y-amp:.0f} {W*0.5:.0f},{y:.0f} '
                f'T{W},{y:.0f}" fill="none" stroke="{hue}" '
                f'stroke-width="{1 + r(0, 1.6):.1f}" opacity="{0.14 + 0.07*i:.2f}"/>')
    elif motif == "grid":                    # systems / governance
        for i in range(12):
            x = W * i / 12
            parts.append(f'<line x1="{x:.0f}" y1="0" x2="{x:.0f}" y2="{H}" '
                         f'stroke="{hue}" stroke-width="1" opacity="{r(0.05,0.3):.2f}"/>')
        for i in range(8):
            y = H * i / 8
            parts.append(f'<line x1="0" y1="{y:.0f}" x2="{W}" y2="{y:.0f}" '
                         f'stroke="{hue}" stroke-width="1" opacity="{r(0.05,0.25):.2f}"/>')
    else:                                    # strata — layered archive
        y = H
        for i in range(6):
            y -= r(24, 52)
            tilt = r(-16, 16)
            parts.append(
                f'<path d="M0,{y+tilt:.0f} L{W},{y:.0f} L{W},{H} L0,{H} Z" '
                f'fill="{hue}" opacity="{0.07 + 0.05*i:.2f}"/>')

    # a scatter of clips
    for _ in range(26):
        parts.append(f'<circle cx="{r(0,W):.0f}" cy="{r(0,H):.0f}" '
                     f'r="{r(0.8,2.6):.1f}" fill="{hue}" opacity="{r(0.15,0.6):.2f}"/>')

    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
        f'width="{W}" height="{H}">'
        f'<defs><radialGradient id="g" cx="30%" cy="15%">'
        f'<stop offset="0%" stop-color="{hue}" stop-opacity=".30"/>'
        f'<stop offset="100%" stop-color="{hue}" stop-opacity="0"/>'
        f'</radialGradient></defs>' + "".join(parts) + "</svg>"
    )
