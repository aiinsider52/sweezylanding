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
    echo "[$(date +%H:%M:%S)] FAIL  $file" | tee -a "$LOG"
    return 1
  fi
  curl -fsSL "$url" -o "$OUT/$file"
  echo "[$(date +%H:%M:%S)] DONE  $file" | tee -a "$LOG"
}

export -f gen
export OUT LOG

STYLE="premium editorial photography, cinematic lighting, photorealistic, shallow depth of field, no text, no logos, no watermarks"
GREEN="subtle emerald green color accent in scene, modern fintech app aesthetic"

# Batch 1 — hero + features (parallel)
gen "hero.jpg" z_image 16:9 \
  "Young expat professional holding smartphone on Zurich lake promenade at golden hour, Swiss Alps and city skyline, warm cinematic lifestyle, $STYLE, $GREEN" &

gen "feature-guides.jpg" z_image 4:3 \
  "Minimal desk flatlay with Swiss residence permit documents, passport, pen, warm desk lamp, organized bureaucracy setup, $STYLE" &

gen "feature-checklists.jpg" z_image 4:3 \
  "Close-up hands holding modern smartphone with green UI checklist app, cozy apartment window light, $STYLE, $GREEN" &

gen "feature-map.jpg" soul_location 4:3 \
  "Aerial view of Zurich old town and lake with location pins concept, Swiss city map atmosphere, $STYLE" &

gen "feature-marketplace.jpg" z_image 4:3 \
  "Two professionals shaking hands in bright modern Swiss coworking space, trust and services, $STYLE" &

wait

# Batch 2 — more features + testimonials
gen "feature-cv.jpg" z_image 4:3 \
  "Minimal home office laptop showing CV resume document, mountain view through window, Swiss expat workspace, $STYLE" &

gen "feature-languages.jpg" z_image 4:3 \
  "Diverse group of expats chatting in Zurich cafe, multicultural friendly atmosphere, $STYLE" &

gen "testimonial-olena.jpg" soul_cast 1:1 \
  "Portrait headshot of friendly Ukrainian woman age 28, natural smile, soft studio lighting, professional expat, $STYLE" &

gen "testimonial-marco.jpg" soul_cast 1:1 \
  "Portrait headshot of confident Italian man age 35, business casual, warm smile, professional expat, $STYLE" &

gen "testimonial-sarah.jpg" soul_cast 1:1 \
  "Portrait headshot of British woman age 32, outdoor jacket, approachable smile, professional expat, $STYLE" &

wait

# Batch 3 — cantons
gen "canton-zurich.jpg" soul_location 16:9 \
  "Zurich Bahnhofstrasse and lake panorama, iconic Swiss cityscape, golden hour, $STYLE" &

gen "canton-geneva.jpg" soul_location 16:9 \
  "Geneva Jet d'Eau fountain and lake with mountains, elegant international city, $STYLE" &

gen "canton-bern.jpg" soul_location 16:9 \
  "Bern UNESCO old town arcades and cathedral, charming Swiss capital, $STYLE" &

gen "canton-basel.jpg" soul_location 16:9 \
  "Basel Rhine river and historic bridges, vibrant Swiss city, $STYLE" &

gen "canton-lausanne.jpg" soul_location 16:9 \
  "Lausanne Lavaux vineyard terraces above Lake Geneva, stunning Swiss landscape, $STYLE" &

wait

# Batch 4 — lucerne + steps + cta
gen "canton-lucerne.jpg" soul_location 16:9 \
  "Lucerne Chapel Bridge Kapellbrücke at dusk with lake and mountains, iconic Swiss scene, $STYLE" &

gen "step-download.jpg" z_image 4:3 \
  "Hand holding iPhone showing App Store download screen, blurred Swiss city background, $STYLE, $GREEN" &

gen "step-guides.jpg" text2image_soul_v2 4:3 \
  "Young expat reading smartphone guide while sitting in Swiss tram, everyday relocation moment, $STYLE" &

gen "step-settle.jpg" text2image_soul_v2 4:3 \
  "Happy young family with luggage smiling in front of Swiss Alps chalet, successful relocation, $STYLE" &

gen "cta-banner.jpg" soul_location 21:9 \
  "Zurich city skyline at blue hour night with lights reflecting on lake, cinematic wide banner, moody premium, $STYLE, $GREEN" &

wait

echo "All generations complete. Files in $OUT"
ls -la "$OUT"/*.jpg 2>/dev/null | wc -l
