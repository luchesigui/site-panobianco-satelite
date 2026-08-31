# Panobianco 2026 CSS-first Graphic Modules Rebrand Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Convert the Next.js website into the official 2026 Panobianco visual system by introducing reusable HTML/CSS modules derived from the brand symbol’s 45° chamfers, then migrating the public site without changing its business, tracking, SEO, checkout, or form contracts.

**Architecture:** Keep Tailwind and Next.js 14. Add a **local** brand foundation (`app/styles/panobianco-brand.css`) imported by `app/globals.css`; it supplies palette, typography roles, contrast-safe controls, and CSS-first chamfer/mask/repetition primitives. Do not publish a package or add a dependency: this is a single application, and the primitives must be testable in the rendered website before any future extraction. React components own semantic structure and content; CSS owns the graphic construction. Use official SVG/logo/icon assets only for marks and icons—never recreate either in CSS.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS 3, CSS custom properties / `clip-path` / pseudo-elements, `next/font/local` after font licensing is resolved, Lucide only as an interim non-brand UI-icon fallback.

---

## Evidence and non-negotiable inputs

- **Official source:** `/Users/guilhermeluchesi/Desktop/Branding_Guide_Panobianco_-_2026.pdf` (manual v01). It supersedes the stale project documentation and any prior token approximation.
- **Exact palette:** `#FF6100` orange, `#CC3300` warm orange, `#330000` grená, `#F4EDE4` off-white, `#87756B` concrete, `#3D3336` graphite, `#161515` black, `#FFFFFF` white. Correct the current incorrect `#FAEDE4` in `app/globals.css` and `tailwind.config.js`; do not add near-neighbour brand colors.
- **Graphic rule:** modules originate in the symbol construction and use 45° chamfers. They may scale, crop photography, contain copy, create depth, or repeat. This is conceptually similar to a CSS shape recipe but **not** a generic octagon library: no equal-sided/octagonal shorthand, arbitrary rotations, outlined modules, or unrelated polygon silhouettes. Do not repeat a decorative module more than three times in one composition.
- **Brand assets already tracked:** `public/logo-white.svg`, `public/logo-black.svg`, `public/logo-orange.svg`, and `public/logo.svg`; `components/Logo.tsx` currently switches only black/white by `ThemeContext`.
- **Missing prerequisites:** no Forma DJR Micro font files are tracked (only `public/fonts/SFCompact.ttf`); `app/layout.tsx` loads Archivo, Bebas Neue, Montserrat, and Roboto from Google; `app/globals.css` merely names Forma in fallbacks. Obtain written font licence plus `Regular`, `Medium`, and `Bold` webfont files and the approved 2026 positive/negative/monochrome/tagline/vertical logo exports plus approved solid icon SVGs before calling the refactor visually complete.

## Explicit boundaries

- Preserve routes, metadata/schema objects, server/API routes, pricing and A/B flag logic, `PlanCTAButton` analytics, contact/quiz/work-with-us flows, and `FloatingWhatsApp`’s `/sorteio` exclusion.
- Preserve meaningful affordances and native semantics (`button`, `a`, `details`/`summary`, form fields). A clipped visual surface must not become the only focus target or obscure the focus indicator.
- Do **not** mechanically convert every `rounded-*`, `glass-card`, gradient, Lucide icon, or Tailwind `bg-*` occurrence. Conversion depends on semantic role, detailed below.
- Keep no implementation dependent on `https://cdn.prod.website-files.com`; `app/promo-orange/page.tsx` and `components/HeroOrange.tsx` currently depend on it, so copy licensed approved assets to `public/` before their visual migration.

## Target CSS contract

Create `app/styles/panobianco-brand.css`; import it after Tailwind directives from `app/globals.css`. Keep the component class names semantic and small; pages compose these classes rather than repeating inline `clip-path` strings.

```css
:root {
  --pb-orange: #FF6100;
  --pb-orange-warm: #CC3300;
  --pb-grena: #330000;
  --pb-off-white: #F4EDE4;
  --pb-concrete: #87756B;
  --pb-graphite: #3D3336;
  --pb-black: #161515;
  --pb-white: #FFFFFF;
  --pb-chamfer: clamp(0.75rem, 3vw, 2.5rem);
}

.pb-module {
  position: relative;
  clip-path: polygon(0 0, calc(100% - var(--pb-chamfer)) 0, 100% var(--pb-chamfer), 100% 100%, 0 100%);
}
.pb-module--reverse {
  clip-path: polygon(var(--pb-chamfer) 0, 100% 0, 100% 100%, 0 100%, 0 var(--pb-chamfer));
}
.pb-module--frame::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(135deg, var(--pb-orange), transparent 65%);
  opacity: .28;
}
.pb-module--photo { overflow: hidden; isolation: isolate; }
.pb-module--photo > img { clip-path: inherit; }
```

Build a deliberate family around this base: `.pb-module` (copy/utility surface), `--reverse` (opposite 45° corner), `--photo` (image mask), `--frame` (depth layer), `.pb-module-stack` (one to three offset layers), `.pb-section-cut` (section edge), `.pb-control` / `--primary` / `--secondary`, `.pb-icon-tile`, and `.pb-focus-ring`. Each modifier must use approved tokens, preserve readable content bounds, and include `@supports not (clip-path: polygon(...))` rectangular fallbacks. Use responsive `--pb-chamfer`, not fixed desktop pixels. Respect `prefers-reduced-motion`; animation may not be required to understand an action.

## Tasks

### Task 1: Establish assets, typography, and source-of-truth documentation

**Objective:** Make official, licensable resources available before visual changes and record the current-versus-target rules.

**Files:**
- Create: `docs/brand-assets/README.md`
- Create (only after licence approval): `public/fonts/FormaDJRMicro-Regular.woff2`, `public/fonts/FormaDJRMicro-Medium.woff2`, `public/fonts/FormaDJRMicro-Bold.woff2`
- Add approved files only after receiving them: `public/brand/` (SVG marks, tagline variants, vertical lockup, avatar symbol, solid icon set, photography/graphic source exports)
- Modify: `app/layout.tsx`, `components/Logo.tsx`

**Steps:**
1. Inventory every supplied asset with owner, approval/version, intended background, intrinsic viewBox, and licence. Require an exact positive/negative/monochrome mark, tagline lockup, vertical wordmark without symbol, avatar symbol, and solid icon set. Do not treat existing filenames as proof that all required variants are approved.
2. Replace the unverified `"Forma DJR Micro"` CSS reference with `next/font/local` definitions in `app/layout.tsx` only after real licensed files exist; map Regular/Medium/Bold to a single `--font-forma-djr-micro` variable. Until then, retain Archivo as explicit temporary fallback and document the visual-approval blocker.
3. Update `Logo` to select an approved asset by an explicit semantic `variant` (`light-on-dark`, `dark-on-light`, `orange-on-approved-surface`, `tagline`, `vertical`) rather than theme alone. Preserve alt text, dimensions, link behaviour, and `priority` only where it is truly LCP-relevant.
4. Delete unused Google display-font loading only after all consuming pages have migrated; do not remove it before `/promo-orange` and `HeroOrange` stop using `font-bebas`, `font-montserrat`, and `font-roboto`.

**Verification:** `npm run build`; inspect network/font rendering in the browser (no 404 fonts or unapproved remote mark/graphic dependency); compare mark clear space/minimum digital size (16 px from the guide) and contrast against the target backgrounds.

### Task 2: Replace conflicting tokens and install the CSS-first primitive layer

**Objective:** Make official palette and proprietary geometry available without a broad page rewrite.

**Files:**
- Create: `app/styles/panobianco-brand.css`
- Modify: `app/globals.css`, `tailwind.config.js`, `design.json`, `README.md`

**Steps:**
1. Add the eight literal palette values as CSS variables and Tailwind aliases; preserve existing aliases temporarily where they prevent a wholesale change, but point them to exact approved values. Add semantic aliases for surface, ink, subdued text, separator, and focus—not arbitrary orange shade scales.
2. Implement the target CSS contract above plus documented geometry variables: `--pb-chamfer`, `--pb-module-gap`, `--pb-module-depth`. Give primary orange controls `#161515` text by default; permit white only after per-control measured contrast verifies it.
3. Add `:focus-visible` for links, controls, `summary`, and the mobile menu using a high-contrast, non-clipped outline/box-shadow. Ensure `pb-module` descendants do not cut off focus rings.
4. Update `design.json` and README from the obsolete green/`#ff5e29`/generic-radius/glass design system to the official CSS-first system. The README’s current “dark with green accents” assertion is false.
5. Do not change all current global `.card`, `.input-field`, `.btn-*`, or `.glass-card` consumers in this task; stabilize the new contract first.

**Verification:** `npm run lint:biome`; `npm run build`; browser-check a primary control, a secondary control, light/dark text, `clip-path` fallback emulation, keyboard focus, 320 px width, and 200% zoom.

### Task 3: Migrate the shared shell and shared editorial modules

**Objective:** Convert the highest-reuse visual surfaces first so individual pages inherit consistent treatment.

**Files:**
- Modify: `components/Header.tsx`, `components/Footer.tsx`, `components/FloatingWhatsApp.tsx`, `components/ContactCtaSection.tsx`, `components/QuizCtaBanner.tsx`, `components/QuizCtaCard.tsx`, `components/ScheduleModal.tsx`, `components/ModalidadesFilterGrid.tsx`, `components/ModalidadePage.tsx`
- Modify: `components/modalidades/ModalidadeHero.tsx`, `components/modalidades/ModalidadeAbout.tsx`, `components/modalidades/ModalidadeBenefits.tsx`

**Steps:**
1. Replace rounded/glass/orange-pill repetitions in headers, CTAs, promo callouts, feature cards, photo cards, modal shells, and modality section frames with the semantic `pb-*` modules. Keep fully pill-shaped compact utility controls only when their task demands it.
2. Use approved solid icon assets in branded `pb-icon-tile` contexts. Lucide remains acceptable for generic functional controls (menu, close, chevron, external/social actions) until a supplied brand icon matches the semantic meaning; do not force brand graphics onto every UI control.
3. Make hero imagery operate through `.pb-module--photo` wrappers instead of clipping the image element alone. Give decorative graphic layers `aria-hidden="true"`; retain useful image alt text.
4. Use the approved signature asset in the footer/header only where specified by the asset map; do not recreate the logo/tagline from text. Keep logo selection independent of the optional site theme.
5. Retain current analytics handlers, link destinations, dialog semantics, menu `aria-label`, and existing mobile breakpoint behaviour.

**Verification:** browser keyboard and touch review of menu, CTAs, modal, quiz card, and WhatsApp; no clipped focus state; logo remains legible at mobile header size; no module overlaps its copy at 320/768/1280 px.

### Task 4: Roll out public editorial and conversion pages in this order

**Objective:** Apply the shared system page-by-page, protecting high-conversion paths first.

**Files and rollout order:**
1. `app/page.tsx` — hero, feature cards, modalities, testimonials, location, plan teaser.
2. `app/planos/page.tsx`, `app/checkout/[plan]/page.tsx`, `app/promo-orange/page.tsx`, `components/HeroOrange.tsx` — conversion and campaign paths.
3. `app/servicos/page.tsx`, `app/servicos/musculacao/page.tsx`, `app/servicos/treino-personalizado/page.tsx`, `app/aulas-coletivas/page.tsx`, then every `app/aulas-coletivas/*/page.tsx` through the migrated `ModalidadePage` contract.
4. `app/sobre-nos/page.tsx`, `app/contato/page.tsx`, `app/parceiros/page.tsx`, `app/trabalhe-conosco/page.tsx`.
5. `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `components/blog/BlogCard.tsx`, `components/blog/BlogGrid.tsx`, `components/blog/BlogArticle.tsx`, `components/blog/BlogArticle.module.css`.
6. `app/quiz/QuizClient.tsx`, `app/area-do-aluno/*`, `app/treinamento/*`, and `app/sorteio/page.tsx` as product/utility surfaces, only after the marketing flow proves the foundation.

**Steps:**
1. For each route, migrate section containers, CTA hierarchy, image masks, icons, and decorative modules; do not rewrite the route’s data, schema JSON-LD, API interaction, or copy merely to accommodate styling.
2. Use one module for a hero/offer/photo frame; use up to three only when repetition creates intentional depth. On small screens, collapse stacks to one module or simplify decoration before reducing body-copy readability.
3. For `app/promo-orange/page.tsx` and `components/HeroOrange.tsx`, replace CDN graphics only with approved local copies and replace their inline `#ff6101`, `#2a2f31`, generic rounded buttons, and legacy font utilities. Maintain promotion dates/prices and A/B analytics exactly as data/business logic.
4. Apply the guide photography direction to newly supplied/replaced imagery: real gym context, warm/high-contrast light, diverse people, natural exercise/social/detail framing, functional neutral clothing with controlled orange. Existing photos may remain while asset review is pending; do not claim them approved by recoloring them.

**Per-route verification:** check 320, 768, 1280, and 1440 px; keyboard-only tab flow; `prefers-reduced-motion`; text on every orange/photographic surface; screen-reader names for CTA/icon-only controls; no horizontal overflow; preserved form submission, quiz events, checkout routes, and plan flag rendering.

### Task 5: Deliberate exceptions—patterns not to mechanically convert

**Objective:** Prevent decorative consistency from harming functionality, performance, or brand correctness.

**Rules:**
- **Inputs, textarea, select, checkboxes/radios and long form panels:** retain calm rectangular/low-radius usable controls and visible error/focus states. A 45° frame may group the form, never clip typing/caret/error content.
- **Native `details`/`summary` FAQ, menu buttons, close buttons, hamburger, social buttons, pagination and tiny chips:** retain conventional accessible hit areas. Do not turn every small icon into a chamfered tile.
- **Dense/interactive surfaces:** `app/quiz/QuizClient.tsx`, `app/area-do-aluno/*`, `app/treinamento/*`, and deterministic capture mode in `app/sorteio/page.tsx` should receive restrained surface tokens and a sparse framing module, not decorative stacks; preserve capture CSS in `app/globals.css` and the sorteo layout contract.
- **Email HTML and transactional API templates:** `lib/emailTemplates.ts` and `app/api/**/route.ts` are not part of this web-CSS rollout. Email-client CSS limitations require a separately scoped, tested email refresh; do not import web CSS, `clip-path`, or `next/font` into them.
- **Brand mark and official icons:** never CSS-draw, distort, rotate, gradient-fill, shadow, recolor outside permitted variants, outline, or overlap them. Brand graphics themselves are not `pb-module` decorations.
- **Glassmorphism, arbitrary radial glows, `rounded-3xl`, and generic orange pills:** replace only in editorial/brand surfaces where a module carries the visual job. Do not substitute chamfers for every radius without an interaction/content rationale.

### Task 6: Final visual QA, documentation, and rollback readiness

**Objective:** Verify technical health separately from identity fidelity and leave a reversible deployment.

**Files:**
- Modify: `README.md`, `design.json`
- Create: `docs/qa/2026-rebrand-visual-qa.md`

**Steps:**
1. Make the QA document a route-by-viewport matrix with screenshot links, device/browser, visual approver, asset/font version, contrast findings, and explicit pass/fail for logo, typography, geometry, iconography, photography, controls, and reduced motion.
2. Measure every normal-size text/control pairing using a contrast tool; target WCAG 2.1 AA (4.5:1 normal text, 3:1 large text and non-text controls), and follow any stricter relationship depicted in the brand manual. Never assume white on orange passes.
3. Run repository checks: `npm run lint:biome`, `npm run build`, and `git diff --check`. `npm run lint` is a secondary optional check because this Next 14 project’s script invokes deprecated `next lint`; report its actual output rather than treating it as an acceptance gate if the command fails due to framework tooling.
4. Start the production-like build and manually inspect all rollout routes. Capture before/after screenshots at 320/768/1280/1440 widths, including hover/focus/open FAQ/open menu/modal states. Confirm no production page still loads branded graphic assets from the Webflow CDN.
5. Release behind a single deployment/feature branch with a tagged pre-rebrand release and retained before screenshots. Roll back by reverting that branch/deployment—not by serving a mixed CSS file. If a primitive breaks a critical path, temporarily remove only its page-level `pb-*` class while keeping the old semantic markup and report the exception.

**Acceptance criteria:** all public pages use official tokens; only approved local marks/icons/fonts are used; at least one meaningful chamfered module appears where an editorial/brand surface needs signature; no generic-octagon treatment; no more than three repeated modules per composition; user flows, SEO/schema and analytics remain intact; build/format/diff checks pass; and a human visual approver signs the QA matrix.

---

## Current implementation findings used by this plan

- The app is a single Next.js 14/Tailwind project (`package.json`); it has no test command. `npm run build`, `npm run lint:biome`, and `npm run lint` are the available checks.
- `app/globals.css` already contains an early `pb-chamfer`, but it is a single top-right cut, uses incorrect off-white `#faede4`, keeps `glass-card`, and contains the `/sorteio` capture-mode CSS that must survive.
- `tailwind.config.js` has provisional 2026 aliases but maps light primary to `#FAEDE4` and retains generic rounded-radius scale. `design.json` and README still describe older `#ff5e29`/green/dark dual-theme assumptions and need correction.
- `components/Header.tsx`, `Footer.tsx`, `ContactCtaSection.tsx`, `QuizCtaCard.tsx`, `ModalidadePage.tsx`, and the modality components are the highest-leverage migration seam; shared modules are currently dominated by `rounded-*`, `glass-card`, orange pills, and Lucide icons.
- `app/page.tsx` and `app/planos/page.tsx` are the largest public conversion surfaces; the latter contains three pricing cards and preserves pricing/flag behaviour that must remain data/contract unchanged.
- `app/layout.tsx` loads four Google families, while the required Forma reference is not actually loaded. `public/fonts/` only has `SFCompact.ttf`.
- `components/Logo.tsx` uses the current black/white SVGs with a client-side theme selection. Recent commit `fb9debe` added official SVG logos, but the full official asset/variant set remains an external dependency.
