# ROBIX Mobile Responsiveness Repair — Antigravity Implementation Brief
## Target: Gemini 3.8 Flash / Antigravity
## Project: ROBIX CRCE Website
## Stack: Vite + Vanilla JS + GSAP + ScrollTrigger

Your task is to repair the ROBIX website for mobile devices **without redesigning the desktop version**.

The website will likely be opened primarily from phones through QR codes, so mobile usability is a priority.

The current mobile issues visible from testing are:

1. **Machines section**
   - Large headings overlap.
   - The section header overlaps the bot title.
   - Desktop horizontal/pinned behavior is being forced onto mobile.
   - Bot image frame is pushed too far down or partially off-screen.
   - Current machine content does not flow naturally on small screens.

2. **Mission Archive section**
   - The `FIELD RECORDS` header overlaps the active mission title.
   - Counter and mission title collide.
   - Desktop pinned/archive shutter behavior interferes with the mobile layout.
   - Content is too tightly positioned with absolute/fixed positioning.

3. **Contact section**
   - Desktop three-column layout is wider than the phone viewport.
   - The right-side columns are pushed off-screen horizontally.
   - Location and form content become inaccessible.
   - The page can horizontally scroll or clip.
   - The contact form must become a vertical mobile layout.

The current ROBIX design language must remain intact:

- black background
- white typography
- ROBIX red accents
- thin technical lines
- engineering-grid styling
- monospace HUD labels
- Transformers-inspired mechanical/system language
- current desktop layouts and transitions

Do **not** redesign the site into generic mobile cards.

---

# 1. INSPECT BEFORE EDITING

Before making changes, inspect:

```text
index.html

src/
├── main.js
├── styles/
│   ├── global.css
│   ├── hero.css
│   ├── about.css
│   ├── operations.css
│   ├── machines.css
│   ├── missions.css
│   ├── team.css
│   ├── contact.css
│   └── any other existing styles
│
└── animations/
    ├── hero.js
    ├── about.js
    ├── operations.js
    ├── machines.js
    ├── missions.js
    ├── team.js
    ├── contact.js
    └── preloader.js
```

Do not assume the repository exactly matches these names.

If filenames differ, adapt to the actual project.

Do not create duplicate sections, duplicate IDs, duplicate ScrollTriggers, or duplicate event listeners.

---

# 2. CREATE ONE MOBILE OVERRIDE STYLESHEET

Create:

```text
src/styles/mobile.css
```

Import it **after all other CSS files** in `src/main.js`.

Example:

```js
import "./styles/global.css";
import "./styles/preloader.css";
import "./styles/hero.css";
import "./styles/about.css";
import "./styles/operations.css";
import "./styles/machines.css";
import "./styles/missions.css";
import "./styles/team.css";
import "./styles/contact.css";

/* MUST REMAIN LAST */
import "./styles/mobile.css";
```

Do not scatter the same mobile overrides across many files unless there is a strong project-specific reason.

---

# 3. GLOBAL MOBILE SAFETY

Inside `mobile.css`, begin with:

```css
@media (max-width: 768px) {

  html,
  body {
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  body {
    position: relative;
  }

  #app,
  section {
    width: 100%;
    max-width: 100%;
    overflow-x: clip;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  img,
  video,
  canvas,
  iframe {
    max-width: 100%;
  }

}
```

This is a safety layer only.

Do not use it to hide legitimate layout problems.

---

# 4. MOBILE DESIGN PRINCIPLE

Desktop may use:

```text
pinning
horizontal scrolling
multi-column layouts
large viewport-fixed compositions
archive shutters
complex transforms
```

Mobile should instead use:

```text
normal vertical page flow
single-column stacking
smaller entrance animations
no horizontal scroll hijacking
minimal pinning
no inaccessible off-screen columns
```

The mobile version must preserve the visual identity, not the exact desktop mechanics.

---

# 5. MACHINES — MOBILE FIX

## Problem

Current mobile behavior shows:

- `OUR MACHINES` colliding with the active bot title
- counters and labels overlapping
- the image frame too low
- desktop horizontal ScrollTrigger interfering with mobile flow

## CSS requirement

Add:

```css
@media (max-width: 768px) {

  #machines {
    min-height: auto;
    overflow: visible;
    padding-bottom: 80px;
  }

  .machines-header {
    position: relative;

    left: auto;
    top: auto;

    width: 100%;

    padding:
      72px
      24px
      28px;

    z-index: 5;
  }

  .machines-header h2 {
    font-size:
      clamp(
        3.4rem,
        15vw,
        5rem
      );

    line-height: 0.82;

    max-width: 100%;
  }

  .machines-counter {
    position: relative;

    left: auto;
    top: auto;

    margin-top: 18px;
  }

  .machines-viewport {
    width: 100%;
    height: auto;

    overflow: visible;
  }

  .machines-track {
    width: 100% !important;
    height: auto !important;

    display: flex;
    flex-direction: column;

    transform: none !important;
  }

  .machine-card {
    flex: none;

    width: 100%;
    height: auto;
    min-height: auto;

    display: block;

    padding:
      24px
      24px
      70px;

    margin: 0;
  }

  .machine-info {
    width: 100%;
    max-width: none;

    padding-top: 0;
  }

  .machine-id {
    margin-top: 0;
  }

  .machine-info h3 {
    font-size:
      clamp(
        3.5rem,
        17vw,
        5.4rem
      );

    line-height: 0.84;

    word-break: normal;
    overflow-wrap: break-word;
  }

  .machine-type {
    margin-top: 14px;
  }

  .machine-description {
    max-width: 100%;

    margin-top: 28px;

    font-size: 1rem;
    line-height: 1.65;
  }

  .machine-specs {
    width: 100%;
    max-width: none;

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    margin-top: 32px;
  }

  .spec {
    min-width: 0;

    padding:
      18px
      14px;
  }

  .machine-visual {
    width: 100%;

    height: auto;
    min-height: 430px;

    margin-top: 56px;
  }

  .machine-image-frame {
    width: 100%;
    height: 430px;

    max-width: none;

    margin: 0 auto;
  }

  .machine-view-image,
  .machine-image {
    width: 100%;
    height: 100%;

    object-fit: contain;
    object-position: center;
  }

  .machine-view-controls {
    left: 12px;
    right: 12px;
    bottom: 12px;

    justify-content: flex-end;

    flex-wrap: nowrap;
  }

  .view-mode {
    padding:
      9px
      8px;

    font-size: 8px;
  }

  .visual-label-top {
    top: -28px;
    left: 0;
  }

  .visual-label-bottom {
    bottom: -28px;
    right: 0;
  }

}
```

If the actual project class names differ, adapt them.

Do not create new duplicate wrappers.

---

# 6. MACHINES — DESKTOP-ONLY HORIZONTAL SCROLL

Inspect `machines.js`.

If the Machines section uses a pinned horizontal GSAP animation, it must run only above 768px.

Use `gsap.matchMedia()`.

Example:

```js
const mm = gsap.matchMedia();


mm.add(
  "(min-width: 769px)",
  () => {

    const horizontal =
      gsap.to(
        track,
        {
          xPercent:
            -100 *
            (total - 1),

          ease:
            "none",

          scrollTrigger: {
            trigger:
              section,

            start:
              "top top",

            end: () =>
              "+=" +
              window.innerWidth *
              (total - 1),

            pin:
              true,

            scrub:
              1,

            anticipatePin:
              1,

            invalidateOnRefresh:
              true
          }
        }
      );


    return () => {

      horizontal.kill();

    };

  }
);
```

Then add a mobile branch:

```js
mm.add(
  "(max-width: 768px)",
  () => {

    gsap.set(
      track,
      {
        clearProps:
          "transform,width"
      }
    );


    gsap.set(
      cards,
      {
        clearProps:
          "transform,opacity,visibility"
      }
    );


    ScrollTrigger.refresh();

  }
);
```

Do not leave the desktop horizontal pin active on phones.

---

# 7. MACHINES — PRESERVE ACTUAL / CAD / BLUEPRINT

The new bot image switcher must still work on mobile.

Do not remove:

```text
ACTUAL
CAD
BLUEPRINT
```

Requirements:

- all three controls remain visible
- all three views stay inside the same image frame
- `object-fit: contain`
- no horizontal overflow
- mode buttons must not collide with system labels
- image switching remains independent per bot

If reduced motion is enabled, use simple crossfades.

---

# 8. MISSION ARCHIVE — MOBILE FIX

## Problem

Current mobile behavior shows:

- `FIELD RECORDS` overlapping active mission title
- counter colliding with text
- pinned archive transitions fighting normal mobile layout
- large absolute positioning

## CSS requirement

Add:

```css
@media (max-width: 768px) {

  #missions {
    min-height: auto;
    overflow: visible;

    padding-bottom: 80px;
  }

  .missions-header {
    position: relative;

    left: auto;
    top: auto;

    width: 100%;

    padding:
      72px
      24px
      18px;

    z-index: 5;
  }

  .missions-header h2 {
    font-size:
      clamp(
        3.3rem,
        15vw,
        5rem
      );

    line-height: 0.82;
  }

  .missions-header p {
    display: block;

    width: 100%;
    max-width: 420px;

    margin-top: 20px;
  }

  .mission-counter {
    position: relative;

    top: auto;
    right: auto;

    width:
      calc(100% - 48px);

    margin:
      0
      24px
      30px;

    grid-template-columns:
      auto
      1fr
      auto;
  }

  .missions-stage {
    position: relative;

    width: 100%;
    height: auto;
  }

  .mission-record {
    position: relative;

    inset: auto;

    display: block;

    width: 100%;
    height: auto;

    padding:
      24px
      24px
      70px;

    opacity: 1;
    visibility: visible;

    transform: none !important;
  }

  .mission-copy {
    width: 100%;
    max-width: none;
  }

  .mission-copy h3 {
    margin-top: 18px;

    font-size:
      clamp(
        3.6rem,
        16vw,
        5.2rem
      );

    line-height: 0.82;
  }

  .mission-copy > p {
    max-width: 100%;

    font-size: 1rem;
    line-height: 1.7;
  }

  .mission-data {
    width: 100%;

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    margin-top: 30px;
  }

  .mission-visual {
    width: 100%;

    height: auto;
    min-height: 420px;

    margin-top: 60px;
  }

  .mission-image-frame {
    width: 100%;
    height: 420px;
  }

  .mission-image {
    width: 100%;
    height: 100%;

    object-fit: cover;
  }

  .mission-image-label {
    font-size: 7px;
  }

  .archive-shutter {
    display: none;
  }

}
```

Do not hide mission content.

Do not create horizontal scrolling.

---

# 9. MISSION ARCHIVE — DESKTOP-ONLY PINNING

Inspect `missions.js`.

The current pinned mission timeline must run only on desktop/tablet above 768px.

Use:

```js
const mm =
  gsap.matchMedia();


mm.add(
  "(min-width: 769px)",
  () => {

    /*
     * KEEP THE EXISTING DESKTOP
     * PINNED MISSION TIMELINE HERE
     */

  }
);
```

Mobile branch:

```js
mm.add(
  "(max-width: 768px)",
  () => {

    gsap.set(
      ".mission-record",
      {
        clearProps:
          "all"
      }
    );


    gsap.set(
      ".archive-shutter",
      {
        display:
          "none"
      }
    );


    ScrollTrigger.refresh();

  }
);
```

Important:

If multiple mission records become simultaneously visible on mobile, ensure they flow vertically and are separated clearly.

Do not keep them stacked absolutely on top of each other.

---

# 10. CONTACT — PRIORITY MOBILE FIX

This section is the highest priority because parts of it are currently inaccessible.

## Desktop

The current desktop three-column structure should remain unchanged.

Expected desktop concept:

```text
ROBIX BRAND
    |
GROUND STATION
    |
COMMS UPLINK
```

## Mobile

Stack these vertically:

```text
ROBIX BRAND

GROUND STATION

COMMS UPLINK
```

No horizontal movement.

No clipped right-side columns.

---

# 11. CONTACT — MOBILE CSS

Add:

```css
@media (max-width: 768px) {

  #contact {
    width: 100%;

    min-height: auto;

    padding:
      70px
      22px
      80px;

    overflow: hidden;
  }


  /* -----------------------------------------
     HEADER
     ----------------------------------------- */

  .contact-header {
    display: block;

    width: 100%;

    margin-bottom: 52px;

    text-align: left;
  }

  .contact-header h2 {
    font-size:
      clamp(
        3.3rem,
        15vw,
        5rem
      );

    line-height: 0.9;
  }

  .contact-system-id {
    position: relative;

    left: auto;
    top: auto;

    margin-bottom: 12px;
  }

  .contact-header-status {
    position: relative;

    right: auto;
    top: auto;

    margin-top: 14px;
  }

  .contact-header-line {
    margin:
      18px
      0
      0;
  }


  /* -----------------------------------------
     3 COLUMNS → VERTICAL
     ----------------------------------------- */

  .contact-layout {
    width: 100%;
    max-width: 100%;

    display: flex;
    flex-direction: column;

    gap: 0;

    margin: 0;

    padding: 0;
  }

  .contact-brand,
  .contact-location,
  .contact-form-panel {
    width: 100%;
    max-width: 100%;

    min-width: 0;

    padding:
      0
      0
      52px;
  }

  .contact-divider {
    display: none;
  }


  /* -----------------------------------------
     BRAND
     ----------------------------------------- */

  .contact-brand {
    order: 1;
  }

  .contact-logo-core {
    width: 100%;
    max-width: 330px;

    height: auto;
    aspect-ratio: 1.65;

    margin:
      0
      auto
      28px;
  }

  .contact-logo {
    width: 82%;
    max-width: 280px;
  }

  .contact-brand-copy {
    width: 100%;
    max-width: none;

    margin: 0;

    font-size: 0.95rem;
    line-height: 1.8;
  }

  .contact-socials {
    margin-top: 28px;

    gap: 12px;
  }

  .contact-socials a {
    width: 46px;
    height: 46px;
  }


  /* -----------------------------------------
     LOCATION
     ----------------------------------------- */

  .contact-location {
    order: 2;

    margin-top: 18px;

    padding-top: 42px;

    border-top:
      1px solid
      rgba(255,255,255,0.07);
  }

  .contact-location address {
    width: 100%;

    word-break: normal;
    overflow-wrap: anywhere;

    font-size: 0.9rem;
    line-height: 1.7;
  }

  .contact-radar {
    width: 100%;
    height: 260px;

    margin-top: 28px;
  }

  .contact-map-link {
    width: 100%;
  }


  /* -----------------------------------------
     FORM
     ----------------------------------------- */

  .contact-form-panel {
    order: 3;

    margin-top: 18px;

    padding-top: 42px;

    border-top:
      1px solid
      rgba(255,255,255,0.07);
  }

  .form-panel-header {
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 8px;

    margin-bottom: 24px;
  }

  .uplink-status {
    margin-left: 32px;
  }

  #robix-contact-form {
    width: 100%;

    display: flex;
    flex-direction: column;

    gap: 17px;
  }

  .contact-field-row {
    width: 100%;

    display: grid;

    grid-template-columns: 1fr;

    gap: 17px;
  }

  .contact-field {
    width: 100%;

    min-width: 0;
  }

  .contact-field input,
  .contact-field textarea,
  .contact-field select {
    display: block;

    width: 100%;
    max-width: 100%;

    min-width: 0;

    padding:
      15px
      14px;

    font-size: 16px;
  }

  .contact-field textarea {
    min-height: 150px;

    resize: vertical;
  }

  .contact-transmit {
    width: 100%;

    min-width: 0;

    grid-template-columns:
      auto
      1fr
      auto;

    margin-top: 6px;
  }

  .transmit-label {
    font-size: 10px;
  }

}
```

The `font-size: 16px` on form controls is intentional because iOS can zoom automatically when focusing fields smaller than 16px.

---

# 12. CONTACT — FORM FUNCTIONALITY MUST REMAIN WORKING

Do not remove or break Formspree.

The current form uses Formspree / `@formspree/ajax`.

Preserve:

```text
#robix-contact-form
data-fs-field
data-fs-error
data-fs-success
data-fs-submit-btn
```

and preserve the current Formspree initialization.

Do not replace it with `mailto:`.

After mobile fixes, test a real form submission.

Verify:

```text
website success state
Formspree dashboard submission
ROBIX email notification
```

All must still work.

---

# 13. CONTACT — PREVENT HORIZONTAL OVERFLOW

Inspect all contact children for:

```css
width: 100vw;
min-width: 300px;
min-width: 350px;
position: absolute;
left: ...
right: ...
transform: translateX(...)
```

that may exceed the viewport on mobile.

On mobile, ensure the three main blocks have:

```css
width: 100%;
max-width: 100%;
min-width: 0;
```

Do not fix overflow by merely applying:

```css
overflow-x: hidden;
```

while keeping inaccessible content outside the viewport.

The content itself must fit.

---

# 14. CONTACT — SOCIAL ICONS

If the current contact page still uses:

```text
GH
IG
IN
```

and the real icon implementation already exists elsewhere in the project, replace these with the existing GitHub / Instagram / LinkedIn SVG icons.

Do not introduce a new icon library just for this.

Ensure:

```css
.contact-socials a {
  min-width: 44px;
  min-height: 44px;
}
```

for comfortable touch targets.

---

# 15. TEAM MOBILE CHECK

Do not redesign Team.

Inspect the current mobile Team section.

Verify:

- Founder/Advisor cards are not overflowing.
- Department selector wraps into 2 columns or a compact vertical structure.
- Technical still only has Lead.
- Mechanical has Lead + Co-Lead + members.
- Electronics has Lead + Co-Lead + members.
- Events/Media/Documentation has Lead + Co-Lead + members.
- Member cards do not exceed viewport width.
- social links are touch-friendly.

Use existing mobile rules where possible.

Only add fixes if actual overflow or collisions exist.

---

# 16. ABOUT MOBILE CHECK

The About section currently uses:

```text
ONE TEAM.
FOUR SYSTEMS.
```

and four departments.

On mobile:

- heading must not overlap department cards
- central logo/core may reduce in scale
- cards should stack or use a 2x2 layout
- no pinned transformation should trap the user
- no horizontal overflow

If the About section is pinned on desktop, consider limiting that pinning to desktop only using `gsap.matchMedia()`.

Do not change its desktop behavior.

---

# 17. OPERATIONS MOBILE CHECK

The `WHAT WE DO` section may use a pinned mode-switching timeline.

On mobile, verify:

- `WHAT WE DO` heading does not overlap active operation
- Build / Compete / Teach / Experiment content fits the viewport
- mechanical visual does not cover text
- user can scroll naturally

If the desktop pinned interaction causes collisions on mobile, limit it to:

```js
"(min-width: 769px)"
```

and use a vertical mobile layout.

Do not redesign its desktop experience.

---

# 18. HERO MOBILE CHECK

The Hero should remain visually strong.

Verify:

- `WE TRANSFORM IDEAS INTO MACHINES.` does not overflow horizontally
- right-side machine/core visual does not obscure text
- description is readable
- `SCROLL TO ENGAGE` remains accessible
- preloader exits correctly

Do not make major Hero changes unless mobile overflow is present.

---

# 19. GSAP / SCROLLTRIGGER REFRESH

The site uses several pinned sections.

After the preloader ends, refresh ScrollTrigger.

In an appropriate initialization location:

```js
window.addEventListener(
  "robix:introComplete",
  () => {

    requestAnimationFrame(
      () => {

        ScrollTrigger.refresh();

      }
    );

  },
  {
    once: true
  }
);
```

Also refresh after all page assets load:

```js
window.addEventListener(
  "load",
  () => {

    ScrollTrigger.refresh();

  }
);
```

Do not duplicate these listeners if equivalent logic already exists.

---

# 20. DO NOT RUN DESKTOP-ONLY PINNING ON MOBILE

Review all `ScrollTrigger` instances.

For heavy pinned sections:

```text
About
Operations
Machines
Missions
```

use `gsap.matchMedia()` where necessary.

General pattern:

```js
const mm =
  gsap.matchMedia();


mm.add(
  "(min-width: 769px)",
  () => {

    // existing pinned desktop animation

  }
);


mm.add(
  "(max-width: 768px)",
  () => {

    // clear desktop transforms
    // use natural document flow

  }
);
```

Do not blindly disable every animation.

Small entrance animations may remain on mobile.

The target is to disable layout-breaking pinning/horizontal hijacking, not motion entirely.

---

# 21. MOBILE TOUCH TARGETS

Interactive controls must be usable by touch.

Minimum practical touch area:

```css
min-width: 44px;
min-height: 44px;
```

Apply where appropriate to:

- bot mode buttons
- bot navigation arrows
- team department controls
- social icons
- contact map button
- form submit
- any menu buttons

Do not visually enlarge every label if unnecessary; padding can provide touch area.

---

# 22. TYPOGRAPHY RULES

Keep the existing large typography style.

Use responsive `clamp()` values instead of completely replacing the desktop typography.

Avoid:

```css
white-space: nowrap;
```

on large mobile headings unless absolutely necessary.

For headings that currently collide, prefer:

```css
font-size: clamp(...);
line-height: ...;
overflow-wrap: break-word;
```

Do not shrink key headings to tiny text.

---

# 23. SAFE MOBILE BREAKPOINTS TO TEST

Test at least:

```text
360px
375px
390px
412px
430px
768px
```

These are important because users will likely arrive through QR scans on phones.

Also test one landscape phone size.

---

# 24. DEVICE TESTING CHECKLIST

At every test size confirm:

## Global

- no horizontal page scroll
- no content clipped outside screen
- no overlapping section headings
- no duplicated pinned content
- no giant blank pin spacer areas

## Machines

- title readable
- bot name readable
- specs readable
- bot image visible
- ACTUAL/CAD/BLUEPRINT usable
- images stay aligned
- normal vertical flow on mobile

## Missions

- `FIELD RECORDS` readable
- mission title readable
- no collisions
- data grid readable
- image visible
- normal vertical flow

## Contact

- logo visible
- description visible
- socials visible
- complete address visible
- radar/map visible
- entire form visible
- all fields usable
- submit button visible
- no horizontal clipping
- Formspree still submits

---

# 25. REDUCED MOTION

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Disable:

- long scanner sweeps
- major horizontal transitions
- excessive scale movement

Keep content visible.

---

# 26. PERFORMANCE

Do not add:

- React
- Three.js
- another animation framework
- another CSS framework
- a new icon framework

Use the existing project stack.

Avoid expensive mobile animation of:

```text
filter
box-shadow
large blurred elements
many simultaneously animating DOM nodes
```

when possible.

---

# 27. DO NOT CHANGE DESKTOP DESIGN

This task is NOT a redesign.

The existing desktop website should remain visually the same unless a bug requires a minimal correction.

Do not alter:

- desktop section widths
- main typography sizes
- desktop horizontal Machines behavior
- desktop Mission Archive interaction
- desktop contact composition
- branding
- overall Transformers-inspired visual direction

Mobile is the target.

---

# 28. BUILD AND TEST

Run:

```bash
npm run build
```

Fix all build errors.

Then inspect browser console and resolve:

```text
404 errors
duplicate IDs
null selectors
GSAP warnings
ScrollTrigger warnings
module errors
Formspree errors
```

Do not finish while obvious console errors remain.

---

# 29. FINAL ANTIGRAVITY RESPONSE

After implementing the fixes, provide a concise report containing:

1. files changed
2. whether `mobile.css` was created
3. which sections received mobile-specific fixes
4. confirmation that Machines desktop horizontal behavior remains unchanged
5. confirmation that Missions desktop pinning remains unchanged
6. confirmation that Machines and Missions use normal vertical flow on mobile
7. confirmation that Contact stacks vertically on mobile
8. confirmation that Contact form still submits through Formspree
9. tested viewport widths
10. result of `npm run build`
11. any remaining issue that requires manual content/assets

Do not return only a plan.

Actually modify and test the project.
