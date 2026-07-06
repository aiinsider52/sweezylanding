#!/usr/bin/env bash
# Generate glossy 3D icons for the landing page, then cut out backgrounds → transparent PNG.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images/3d"
mkdir -p "$OUT"
LOG="$OUT/generation.log"
: > "$LOG"

gen() {
  local file="$1" model="$2" ratio="$3" prompt="$4"
  echo "[$(date +%H:%M:%S)] START $file ($model)" | tee -a "$LOG"
  local url
  if ! url=$(higgsfield generate create "$model" \
    --prompt "$prompt" \
    --aspect_ratio "$ratio" \
    --quality high \
    --resolution 2k \
    --wait --wait-timeout 8m 2>>"$LOG"); then
    echo "[$(date +%H:%M:%S)] FAIL  $file (generation error)" | tee -a "$LOG"
    return 1
  fi

  local tmp="$OUT/$file.part"
  if ! curl -fsSL "$url" -o "$tmp"; then
    echo "[$(date +%H:%M:%S)] FAIL  $file (download error)" | tee -a "$LOG"
    rm -f "$tmp"
    return 1
  fi
  if [ ! -s "$tmp" ]; then
    echo "[$(date +%H:%M:%S)] FAIL  $file (empty download)" | tee -a "$LOG"
    rm -f "$tmp"
    return 1
  fi
  mv "$tmp" "$OUT/$file"
  echo "[$(date +%H:%M:%S)] DONE  $file" | tee -a "$LOG"
}

wait_batch() {
  local pid rc=0
  for pid in "$@"; do
    wait "$pid" || rc=1
  done
  return $rc
}

export -f gen
export OUT LOG
FAILED=0

# Solid black studio backdrop — easy to flood-fill into transparency in cutout-3d-assets.py
STYLE="glossy 3D render, product visualization, soft studio lighting, subtle reflections, single centered object, isolated on pure solid black background, high detail, clean minimal composition, no text, no logos, no watermarks"
PALETTE="glossy emerald green and teal glass material with soft highlights"

pids=()

gen "hero-badge.jpg" gpt_image_2 1:1 \
  "A single glossy 3D Swiss cross emblem badge floating, $PALETTE, $STYLE" & pids+=($!)

gen "icon-launch.jpg" gpt_image_2 1:1 \
  "A single glossy 3D rocket icon floating, $PALETTE, $STYLE" & pids+=($!)

gen "icon-cart.jpg" gpt_image_2 1:1 \
  "A single glossy 3D shopping bag icon floating, $PALETTE, $STYLE" & pids+=($!)

gen "icon-gear.jpg" gpt_image_2 1:1 \
  "A single glossy 3D gear settings icon floating, $PALETTE, $STYLE" & pids+=($!)

wait_batch "${pids[@]}" || FAILED=1

if [ "$FAILED" -ne 0 ]; then
  echo "One or more 3D asset generations failed — see $LOG" >&2
  exit 1
fi

echo "Cutting out backgrounds → transparent PNG..."
python3 "$ROOT/scripts/cutout-3d-assets.py" | tee -a "$LOG"

echo "All 3D asset generations complete. PNG files in $OUT"
ls -la "$OUT"/*.png 2>/dev/null | wc -l
