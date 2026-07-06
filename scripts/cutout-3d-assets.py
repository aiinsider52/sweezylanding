#!/usr/bin/env python3
"""Flood-fill remove light studio backgrounds from 3D icon renders → transparent PNG."""
from __future__ import annotations

import sys
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "public" / "images" / "3d"

# Icons + hero badge only — full scenes need a different treatment.
CUTOUTS = [
    ("icon-launch.jpg", "icon-launch.png"),
    ("icon-cart.jpg", "icon-cart.png"),
    ("icon-gear.jpg", "icon-gear.png"),
    ("hero-badge.jpg", "hero-badge.png"),
]


def color_dist(a: tuple[int, ...], b: tuple[int, ...]) -> int:
    return abs(a[0] - b[0]) + abs(a[1] - b[1]) + abs(a[2] - b[2])


def is_background(px: tuple[int, ...], refs: list[tuple[int, int, int]], fuzz: int) -> bool:
    rgb = px[:3]
    return any(color_dist(rgb, ref) <= fuzz for ref in refs)


def cutout(src: Path, dst: Path, fuzz: int = 42) -> None:
    img = Image.open(src).convert("RGBA")
    pixels = img.load()
    w, h = img.size

    refs = [
        pixels[2, 2][:3],
        pixels[w - 3, 2][:3],
        pixels[2, h - 3][:3],
        pixels[w - 3, h - 3][:3],
    ]

    visited: set[tuple[int, int]] = set()
    queue: deque[tuple[int, int]] = deque([(x, y) for x, y in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]])

    while queue:
        x, y = queue.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or (x, y) in visited:
            continue
        px = pixels[x, y]
        if px[3] < 10 or not is_background(px, refs, fuzz):
            continue
        visited.add((x, y))
        pixels[x, y] = (px[0], px[1], px[2], 0)
        queue.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    img.save(dst, optimize=True)
    print(f"OK  {src.name} → {dst.name}")


def main() -> int:
    failed = 0
    for src_name, dst_name in CUTOUTS:
        src = SRC_DIR / src_name
        dst = SRC_DIR / dst_name
        if not src.exists():
            print(f"SKIP missing {src}", file=sys.stderr)
            failed += 1
            continue
        cutout(src, dst)
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
