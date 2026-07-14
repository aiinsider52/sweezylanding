# Sweezy cinematic showcase — design QA

## Source visual truth

- Selected composition reference: `/var/folders/h0/856jbdbx62dc4n9mfh_35k540000gn/T/TemporaryItems/NSIRD_screencaptureui_z0YWMd/Bildschirmfoto 2026-07-14 um 14.05.41.png`
- Rejected previous implementation: `/var/folders/h0/856jbdbx62dc4n9mfh_35k540000gn/T/TemporaryItems/NSIRD_screencaptureui_5gZ8In/Bildschirmfoto 2026-07-14 um 14.06.00.png`
- Product imagery: 16 supplied Sweezy app frames in `public/app-frames/`.

## Implementation evidence

- Desktop, Market state: `/Users/vladyslav.katash/.codex/visualizations/2026/07/13/019f5c1f-683c-7960-90ab-9b351dbe5d68/sweezy-showcase-cinematic/desktop-market.png`
- Mobile 390 × 844, Market screen 2: `/Users/vladyslav.katash/.codex/visualizations/2026/07/13/019f5c1f-683c-7960-90ab-9b351dbe5d68/sweezy-showcase-cinematic/mobile-market.png`
- Same-input source/implementation comparison: `/Users/vladyslav.katash/.codex/visualizations/2026/07/13/019f5c1f-683c-7960-90ab-9b351dbe5d68/sweezy-showcase-cinematic/comparison.png`

## Viewports and state

- Desktop verification: 1600 × 900, `/uk#product`, `Маркет і спільнота`, screen 1.
- Mobile verification: 390 × 844, `/uk#product`, `Маркет і спільнота`, screen 2.
- Background, card positions, counter, and pressed states change with selected screen.

## Full-view comparison evidence

Combined comparison shows shared composition: one dominant vertical card, two receded side cards, photographic full-panel background, rounded framing, depth through scale/rotation, and bright lime action state. Implementation uses real Sweezy screens rather than generic article cards. Previous four-column grid and empty/broken image boxes are absent.

## Focused-region comparison evidence

Focused desktop and mobile captures were required because card overlap, full-frame crop, bottom CTA visibility, active counter, and side-card peeks are core fidelity surfaces. Desktop cards remain legible and fully loaded. Mobile center card retains CTA, side cards remain visible, controls stay below content, and document width equals 390 px.

## Comparison history

### Pass 1

- [P1] Four equal columns contradicted selected reference hierarchy.
  - Evidence: rejected implementation gave all four screens equal weight.
  - Fix: replaced grid with stateful three-card deck: main, left, right, hidden.
- [P1] Broken product images destroyed showcase credibility.
  - Evidence: rejected screenshot displayed broken-image icons inside all four frames.
  - Fix: render supplied `/app-frames/*.png` assets directly; browser check confirms `complete: true` and `naturalWidth: 1179` for every active image.
- [P2] Flat black rail lacked photographic atmosphere.
  - Evidence: source uses selected image as deep background field.
  - Fix: added crossfading blurred backdrop built from active real frame, with restrained dark overlay.
- [P2] No meaningful motion or spatial transition.
  - Evidence: equal grid only changed selection border.
  - Fix: added 320–560 ms transform/opacity choreography, coordinated background crossfade, interruptible clicks, keyboard navigation, and reduced-motion fallback.

### Pass 2

- [P1] Old and new category titles briefly persisted together after keyed copy replacement.
  - Evidence: browser DOM contained two `showcaseCopy` nodes after category change.
  - Fix: keep stable copy node and update content in place. Post-fix DOM contains one copy node and one heading.
- [P2] Desktop side cards occupied too little horizontal space compared with source.
  - Fix: widened receded cards, spread them toward panel edges, reduced brightness, retained center dominance.
- [P2] Mobile numeric controls overlapped center CTA.
  - Fix: increased mobile stage height to 670 px; controls now sit below full card.

### Pass 3

- Same-input comparison reviewed after fixes.
- No open P0/P1/P2 findings.

## Fidelity surfaces

- Fonts and typography: Sweezy landing display/mono system preserved. App typography remains raster-exact inside supplied frames. Category heading stays compact so cards dominate.
- Spacing and layout rhythm: central card leads; side cards align behind it and reach toward panel edges. Mobile keeps balanced side peeks without document overflow.
- Colors and tokens: existing ink, paper, sky, and lime tokens retained. Selected imagery supplies atmospheric color; no unrelated palette introduced.
- Image quality and asset fidelity: original 1179 × 2556 PNG screens render directly. No placeholders, CSS drawings, generated substitutes, or custom SVG art.
- Copy and content: localized EN/UK/DE landing copy preserved. Original app copy remains inside source frames.
- Icons: all visible app icons remain part of original raster frames; no substitutions.
- Motion: state change uses transform/opacity/filter only, natural ease-out/ease-in-out curves, total choreography under 600 ms, and `prefers-reduced-motion` override.
- Accessibility: semantic category tabs retain ArrowLeft/ArrowRight/Home/End. Deck supports ArrowLeft/ArrowRight. Cards and numeric controls are labeled buttons with pressed/current state and focus-visible treatment.
- Responsiveness: desktop scroll width equals viewport width. Mobile document and body width equal 390 px.

## Interactions tested

- Switched `Шлях і знання` to `Маркет і спільнота`.
- Selected screen 2 through numeric control.
- Selected screen 2 through deck `ArrowRight` keyboard input.
- Verified card positions rotate to `left / main / right / hidden`.
- Verified every active image loads at natural width 1179.
- Browser console exposed duplicate dynamic keys during HMR iteration; both category-copy and deck keys were removed. Stable nodes now update in place.
- `npx tsc --noEmit`: passed before build.
- `npm run build`: passed.

## Follow-up polish

- P3: optional touch-drag gesture. Current card clicks, numeric controls, and keyboard input cover core navigation.

## Final result

passed
