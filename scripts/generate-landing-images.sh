#!/usr/bin/env bash
# Generate Sweezy landing image pack via Higgsfield CLI
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/images"
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

STYLE="premium editorial photography, cinematic lighting, photorealistic, shallow depth of field, no text, no logos, no watermarks"
GREEN="subtle emerald green color accent in scene, modern fintech app aesthetic"

# Batch 1 — hero + features (parallel)
pids=()
gen "hero.jpg" z_image 16:9 \
  "Young expat professional holding smartphone on Zurich lake promenade at golden hour, Swiss Alps and city skyline, warm cinematic lifestyle, $STYLE, $GREEN" & pids+=($!)

gen "feature-guides.jpg" z_image 4:3 \
  "Minimal desk flatlay with Swiss residence permit documents, passport, pen, warm desk lamp, organized bureaucracy setup, $STYLE" & pids+=($!)

gen "feature-checklists.jpg" z_image 4:3 \
  "Close-up hands holding modern smartphone with green UI checklist app, cozy apartment window light, $STYLE, $GREEN" & pids+=($!)

gen "feature-map.jpg" soul_location 4:3 \
  "Aerial view of Zurich old town and lake with location pins concept, Swiss city map atmosphere, $STYLE" & pids+=($!)

gen "feature-marketplace.jpg" z_image 4:3 \
  "Two professionals shaking hands in bright modern Swiss coworking space, trust and services, $STYLE" & pids+=($!)

wait_batch "${pids[@]}" || FAILED=1

# Batch 2 — more features + testimonials
pids=()
gen "feature-cv.jpg" z_image 4:3 \
  "Minimal home office laptop showing CV resume document, mountain view through window, Swiss expat workspace, $STYLE" & pids+=($!)

gen "feature-languages.jpg" z_image 4:3 \
  "Diverse group of expats chatting in Zurich cafe, multicultural friendly atmosphere, $STYLE" & pids+=($!)

gen "testimonial-olena.jpg" soul_cast 1:1 \
  "Portrait headshot of friendly Ukrainian woman age 28, natural smile, soft studio lighting, professional expat, $STYLE" & pids+=($!)

gen "testimonial-marco.jpg" soul_cast 1:1 \
  "Portrait headshot of confident Italian man age 35, business casual, warm smile, professional expat, $STYLE" & pids+=($!)

gen "testimonial-sarah.jpg" soul_cast 1:1 \
  "Portrait headshot of British woman age 32, outdoor jacket, approachable smile, professional expat, $STYLE" & pids+=($!)

wait_batch "${pids[@]}" || FAILED=1

# Batch 3 — cantons
pids=()
gen "canton-zurich.jpg" soul_location 16:9 \
  "Zurich Bahnhofstrasse and lake panorama, iconic Swiss cityscape, golden hour, $STYLE" & pids+=($!)

gen "canton-geneva.jpg" soul_location 16:9 \
  "Geneva Jet d'Eau fountain and lake with mountains, elegant international city, $STYLE" & pids+=($!)

gen "canton-bern.jpg" soul_location 16:9 \
  "Bern UNESCO old town arcades and cathedral, charming Swiss capital, $STYLE" & pids+=($!)

gen "canton-basel.jpg" soul_location 16:9 \
  "Basel Rhine river and historic bridges, vibrant Swiss city, $STYLE" & pids+=($!)

gen "canton-lausanne.jpg" soul_location 16:9 \
  "Lausanne Lavaux vineyard terraces above Lake Geneva, stunning Swiss landscape, $STYLE" & pids+=($!)

wait_batch "${pids[@]}" || FAILED=1

# Batch 4 — lucerne + steps + cta
pids=()
gen "canton-lucerne.jpg" soul_location 16:9 \
  "Lucerne Chapel Bridge Kapellbrücke at dusk with lake and mountains, iconic Swiss scene, $STYLE" & pids+=($!)

gen "step-download.jpg" z_image 4:3 \
  "Hand holding iPhone showing App Store download screen, blurred Swiss city background, $STYLE, $GREEN" & pids+=($!)

gen "step-guides.jpg" text2image_soul_v2 4:3 \
  "Young expat reading smartphone guide while sitting in Swiss tram, everyday relocation moment, $STYLE" & pids+=($!)

gen "step-settle.jpg" text2image_soul_v2 4:3 \
  "Happy young family with luggage smiling in front of Swiss Alps chalet, successful relocation, $STYLE" & pids+=($!)

gen "cta-banner.jpg" soul_location 21:9 \
  "Zurich city skyline at blue hour night with lights reflecting on lake, cinematic wide banner, moody premium, $STYLE, $GREEN" & pids+=($!)

wait_batch "${pids[@]}" || FAILED=1

if [ "$FAILED" -ne 0 ]; then
  echo "One or more image generations failed — see $LOG" >&2
  exit 1
fi

echo "All generations complete. Files in $OUT"
ls -la "$OUT"/*.jpg 2>/dev/null | wc -l
