#!/usr/bin/env bash
# Generate BloomFi-style glossy 3D asset pack via Higgsfield CLI
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

# Bare `wait` always returns 0 regardless of job outcomes, so failures must
# be tracked per-PID or they get silently swallowed at the batch level.
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

STYLE="glossy 3D render, product visualization, soft studio lighting, subtle reflections, soft shadow beneath object, isolated on a smooth pastel mint-to-cream gradient background, high detail, clean minimal composition, no text, no logos, no watermarks"
PALETTE="glossy emerald green and teal glass material with soft highlights"

pids=()

gen "hero-badge.jpg" gpt_image_2 1:1 \
  "A single glossy 3D Swiss cross emblem badge floating, $PALETTE, $STYLE" & pids+=($!)

gen "cta-scene.jpg" gpt_image_2 16:9 \
  "Abstract 3D scene of glossy glass mountain peaks and floating spheres, $PALETTE, dreamy soft pastel mint and cream gradient background, cinematic product-render aesthetic, $STYLE" & pids+=($!)

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

echo "All 3D asset generations complete. Files in $OUT"
ls -la "$OUT"/*.jpg 2>/dev/null | wc -l
