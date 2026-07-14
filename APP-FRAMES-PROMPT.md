# Sweezy — standalone app frames export prompt

Use existing Sweezy app design, components, typography, tokens, photography, and Ukrainian product copy as source of truth. Do not redesign Sweezy and do not create a generic AI mobile UI.

## Goal

Create/export 16 standalone production-ready iPhone app screens for Sweezy landing page. Each asset must contain exactly one complete app screen. Landing will compose screens separately.

## Output

- 1179 × 2556 px, 9:19.5 iPhone screen ratio
- PNG, sRGB, sharp 2×/3× UI rendering
- Full app viewport only
- Include Sweezy status bar and Dynamic Island when present in original design
- No phone hardware bezel
- No device mockup
- No outer background, canvas, presentation board, tabs, captions, section labels, browser UI, shadows, or marketing text outside app screen
- Keep full screen visible. Nothing cropped at top or bottom.
- Use clean filenames exactly as listed below

## Design invariants

- Preserve original Sweezy design language: near-black `#101210`, bone `#F2F3EE`, acid lime `#B6FF00`, sky blue `#82C8FF`, graphite translucent panels.
- Preserve existing grotesk typography, mono utility labels, radii, spacing, stroke weight, icon family, status bar, and photo treatment.
- Use real Swiss photography already used by Sweezy: alpine landscapes, Zürich streets, lakefront, community scenes.
- Use real, coherent Ukrainian UI copy. Never generate unreadable pseudo-text.
- Keep hierarchy and controls plausible for a shipping iOS app.
- No gradients unless already present in original Sweezy screen.
- No glassmorphism glow, neon glow, decorative blobs, 3D objects, fake charts, emoji, stock-dashboard styling, or generic fintech UI.
- Do not repeat same layout across screens. Every screen represents a distinct product task.

## Required screens and filenames

### 01 — Path & knowledge

1. `path-journey.png`
   - Journey home screen
   - Alpine background
   - `Твій прогрес · 43%`
   - `Шлях до НОВОГО ЖИТТЯ`
   - Vertical lime journey with nodes 7–3, node 5 active
   - Bottom next-step card: `НАСТУПНИЙ КРОК`, `Дозвіл на проживання`

2. `path-first-30-days.png`
   - Editorial guide screen
   - `12 хв · Документи`
   - `Перші 30 днів у Швейцарії`
   - Summary list: `Реєстрація у громаді`, `Страхування`, `Банківський рахунок`
   - Bottom action: `Читати далі →`

3. `path-permit-checklist.png`
   - Permit B checklist
   - Lake and tree background
   - `ЧЕК-ЛІСТ`, `Дозвіл B`, progress `68%`, `5 з 8`
   - Completed and pending checklist rows
   - Lime bottom action: `Продовжити крок →`

4. `path-city-hub.png`
   - Zürich city hub
   - Zürich street photography
   - `CITY HUB`, `Твій Zürich`
   - Active chip `Відкрити`
   - Zürichsee recommendation card
   - Useful-today card and living-cost detail

### 02 — Work & documents

5. `work-ai-match.png`
   - AI job matching screen
   - `AI MATCH`, `Робота, що підходить тобі`
   - Profile match `87%`
   - Three realistic job matches with scores
   - Bottom action: `Відкрити 24 вакансії →`

6. `work-experience.png`
   - Light bone CV experience editor
   - `КРОК 3 З 6`, `Досвід роботи`
   - Role, company, period, achievements fields
   - Lime AI improvement action

7. `work-landlord-letter.png`
   - Landlord letter generator
   - Photo-led dark header, light bone form
   - `ШАБЛОН ДОКУМЕНТА`, `Лист орендодавцю`
   - Name, address, move-out date, notes fields
   - Black bottom action: `Створити документ →`

8. `work-support-calculator.png`
   - Swiss family support calculator
   - `КАЛЬКУЛЯТОР`, `Що вам належить`
   - Chips for Zürich, family size, permit
   - Income and children inputs
   - Result card: `ОРІЄНТОВНО`, `CHF 620`, `Підтримка`

### 03 — Market & community

9. `market-relocation-service.png`
   - Service detail screen
   - Zürich lake background with bone content sheet
   - `ZÜRICH · ПОСЛУГА`
   - `Допомога з переїздом`
   - `Наталія М.`, `CHF 80`, Ukrainian language, rating
   - Bottom action: `Написати автору →`

10. `market-community-event.png`
    - Community event detail
    - Zürich old-town photo
    - Lime date strip `18 ЛИПНЯ · 18:30`
    - `Зустріч спільноти`
    - Zürich Zentrum, distance, attendees, free entry, languages
    - Lime action: `Приєднатися →`

11. `market-new-listing.png`
    - Light bone marketplace listing form
    - `НОВЕ ОГОЛОШЕННЯ`, `Що ви пропонуєте?`
    - Real Zürich image
    - Name, category, service/item/event chips, description

12. `market-expert.png`
    - Verified expert profile
    - Portrait and Zürich street background
    - Lime badge `Перевірений експерт`
    - `Наталія М.`
    - Relocation and documents in Zürich
    - Response count, rating, languages

### 04 — Profile & access

13. `profile-settings.png`
    - Dark photo-led settings screen
    - `НАЛАШТУВАННЯ`, `Привіт, Влад`
    - Profile completion `82%`
    - Personal data, language, notifications, theme, privacy rows

14. `profile-situation.png`
    - Personal situation screen
    - Sky and tree background, bone lower sheet
    - `МІЙ ПРОФІЛЬ`, `Твоя ситуація у Швейцарії`
    - Completion `82%`
    - Canton Zürich, permit B, arrival date, family
    - Work/language/housing chips

15. `profile-passport.png`
    - Sweezy Passport progress screen
    - Zürich street photography
    - `SWEEZY PASSPORT`, `Рівень 5`, lime highlight `Місцевий`
    - `1 840 XP`, `72%`
    - Achievement badges rendered with existing Sweezy visual system

16. `profile-access.png`
    - Registration/access screen
    - Alpine background
    - `SWEEZY`, `Почнемо разом`
    - Short value statement
    - Progress-preservation and next-step benefits
    - Lime action: `Створити акаунт →`
    - Secondary action: `Увійти`

## Quality gate

Reject and regenerate any frame containing:

- distorted or misspelled Ukrainian text
- invented brand logo
- multiple phones in one image
- tab bar from presentation board
- external title or caption
- generic template cards inconsistent with Sweezy
- cropped bottom CTA
- fake placeholder copy
- mismatched font, color, radius, or icon style

Return all 16 files in one folder. Also return editable source links/files when possible.
