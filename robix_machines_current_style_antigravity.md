# ROBIX Machines Section — Current Style Upgrade
## Antigravity / Gemini 3.8 Flash Implementation Brief
## Stack: Vite + Vanilla JS + GSAP

Your task is to upgrade the EXISTING `OUR MACHINES` section of the ROBIX website.

IMPORTANT: **DO NOT REDESIGN THIS SECTION.**
The current visual style, layout, typography, spacing, framing, proportions, animation language, and dark ROBIX aesthetic must remain intact.

The current section already has the desired structure:

```text
ROBIX // MACHINE DATABASE

OUR
MACHINES.

01 / 03

MACHINE // 01

BOT NAME

ROBOT CLASS / TYPE

description text

┌──────────────┬──────────────┐
│ STATUS       │ MASS         │
├──────────────┼──────────────┤
│ DRIVE        │ CONTROL      │
└──────────────┴──────────────┘


                         UNIT // RBX-01

                  ┌─────────────────────┐
                  │                     │
                  │     BOT VISUAL      │
                  │                     │
                  │                     │
                  └─────────────────────┘

                         SCAN // COMPLETE
```

Keep this EXACT overall composition.

The only major change is:

1. Replace placeholders with the real ROBIX bots.
2. Add ACTUAL / CAD / BLUEPRINT viewing modes inside the existing right-side visual frame.
3. Replace unknown specs with verified competition information.
4. Keep all existing Machines section scroll behavior unless it conflicts with the new image switcher.
5. Do not change any other website section.

---

# 1. INSPECT BEFORE EDITING

Before making changes:

- Inspect the existing `index.html`.
- Inspect `src/styles/machines.css`.
- Inspect `src/animations/machines.js`.
- Inspect `src/main.js`.
- Inspect `public/bots/` and detect the actual image filenames.
- Reuse the existing Machines section HTML where possible.
- Reuse all current classes unless a new class is genuinely required.
- Do not create a second `#machines` section.
- Do not duplicate GSAP ScrollTriggers.
- Do not rewrite the page architecture.

The screenshot supplied by the user is the style reference for the final result.

---

# 2. BOT ORDER AND VERIFIED INFORMATION

Use exactly three bots in this order:

```js
const machineData = [
  {
    id: "azreal",
    name: "AZREAL",
    number: "01",
    unit: "RBX-01",
    classLabel: "ROBOSUMO / 5 KG",
    description:
      "ROBIX competition machine that secured 2nd place in RoboSumo at SPCE in the 5 kg weight class.",
    competition: "ROBOSUMO",
    venue: "SPCE",
    weightClass: "5 KG",
    result: "2ND PLACE",
    views: {
      actual: "",
      cad: "",
      blueprint: ""
    }
  },

  {
    id: "pallas",
    name: "PALLAS",
    number: "02",
    unit: "RBX-02",
    classLabel: "ROBOSUMO / 5 KG",
    description:
      "ROBIX competition machine that secured 3rd place in RoboSumo at SPCE in the 5 kg weight class.",
    competition: "ROBOSUMO",
    venue: "SPCE",
    weightClass: "5 KG",
    result: "3RD PLACE",
    views: {
      actual: "",
      cad: "",
      blueprint: ""
    }
  },

  {
    id: "shildear",
    name: "SHILDEAR",
    number: "03",
    unit: "RBX-03",
    classLabel: "ROBOSUMO / 5 KG",
    description:
      "ROBIX competition machine that secured 1st place in RoboSumo at SPCE in the 5 kg weight class.",
    competition: "ROBOSUMO",
    venue: "SPCE",
    weightClass: "5 KG",
    result: "1ST PLACE",
    views: {
      actual: "",
      cad: "",
      blueprint: ""
    }
  }
];
```

Do not invent:

- dimensions
- motors
- chassis material
- weapon type
- drive system
- electronics
- battery
- control system
- fabrication details
- competition year
- scores

unless those details already exist elsewhere in the repository and are clearly verified.

---

# 3. DETECT THE IMAGE FILES

The user has prepared three images for every bot:

```text
ACTUAL
CAD
BLUEPRINT
```

Search `public/bots/` and detect the real paths.

Preferred structure:

```text
public/
└── bots/
    ├── azreal/
    │   ├── actual.png
    │   ├── cad.png
    │   └── blueprint.png
    ├── pallas/
    │   ├── actual.png
    │   ├── cad.png
    │   └── blueprint.png
    └── shildear/
        ├── actual.png
        ├── cad.png
        └── blueprint.png
```

But do NOT rename or create files unnecessarily.

If the actual files are named differently, use those paths.

For example:

```js
views: {
  actual: "/bots/azreal-real.webp",
  cad: "/bots/azreal-cad.png",
  blueprint: "/bots/azreal-blueprint.png"
}
```

At completion, report the paths you detected and used.

---

# 4. KEEP THE CURRENT LEFT-SIDE LAYOUT

The left side must retain the current visual hierarchy.

Example for AZREAL:

```text
ROBIX // MACHINE DATABASE

OUR
MACHINES.

01 / 03

MACHINE // 01

AZREAL

ROBOSUMO / 5 KG

ROBIX competition machine that secured 2nd place
in RoboSumo at SPCE in the 5 kg weight class.
```

Do not make the title smaller just to fit new content.

Do not move the title to the right.

Do not convert this into a new card layout.

---

# 5. REPLACE THE CURRENT FOUR SPEC CELLS

The current section has:

```text
STATUS
MASS
DRIVE
CONTROL
```

These values are currently placeholders or unverified.

Keep the EXISTING four-cell visual design, but change the labels and values to:

```text
COMPETITION     VENUE
ROBOSUMO        SPCE

WEIGHT CLASS    RESULT
5 KG            2ND PLACE
```

For PALLAS:

```text
COMPETITION     VENUE
ROBOSUMO        SPCE

WEIGHT CLASS    RESULT
5 KG            3RD PLACE
```

For SHILDEAR:

```text
COMPETITION     VENUE
ROBOSUMO        SPCE

WEIGHT CLASS    RESULT
5 KG            1ST PLACE
```

Keep the exact existing border style, font style, spacing, size, and layout of the spec grid.

The result value may use the existing ROBIX red accent.

Do not introduce gold for 1st place.

---

# 6. KEEP THE CURRENT RIGHT-SIDE MACHINE FRAME

The large framed area currently displaying:

```text
ADD BOT IMAGE
```

must remain in exactly the same location and approximately the same dimensions.

Do NOT replace it with a new full-screen split design.

Do NOT move the machine information into a separate panel.

Inside the existing `.machine-image-frame`, create a three-layer visual stack.

Example:

```html
<div class="machine-image-frame" data-machine-viewer data-mode="actual">

  <div class="machine-view-stack">

    <img
      class="machine-view-image active"
      data-view="actual"
      alt=""
    >

    <img
      class="machine-view-image"
      data-view="cad"
      alt=""
    >

    <img
      class="machine-view-image"
      data-view="blueprint"
      alt=""
    >

  </div>

  <div class="machine-mode-scan"></div>

  <div class="machine-view-controls">

    <button type="button" data-set-view="actual" class="active">
      ACTUAL
    </button>

    <button type="button" data-set-view="cad">
      CAD
    </button>

    <button type="button" data-set-view="blueprint">
      BLUEPRINT
    </button>

  </div>

</div>
```

Adapt this to the existing DOM instead of blindly replacing working markup.

---

# 7. IMAGE LAYERING IS CRITICAL

All ACTUAL / CAD / BLUEPRINT images must occupy the exact same space.

Use:

```css
.machine-view-stack {
  position: absolute;
  inset: 0;
}

.machine-view-image {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: contain;
  object-position: center;

  opacity: 0;
  visibility: hidden;

  transform-origin: 50% 50%;
}

.machine-view-image.active {
  opacity: 1;
  visibility: visible;
}
```

Do not put each image in a different layout container.

Do not allow switching modes to change the height or width of the machine frame.

The visual goal is:

```text
ACTUAL
   ↓
CAD
   ↓
BLUEPRINT
```

while the robot remains in approximately the same physical position.

---

# 8. SUPPORT SMALL ALIGNMENT CORRECTIONS

The generated images were designed to be similar, but they may not be pixel-perfect.

Add optional transform information:

```js
alignment: {
  actual: {
    x: 0,
    y: 0,
    scale: 1
  },

  cad: {
    x: 0,
    y: 0,
    scale: 1
  },

  blueprint: {
    x: 0,
    y: 0,
    scale: 1
  }
}
```

Use these only if required.

Apply with CSS variables:

```css
.machine-view-image {
  transform:
    translate(
      var(--view-x, 0px),
      var(--view-y, 0px)
    )
    scale(var(--view-scale, 1));
}
```

Start all images with no correction.

Only make minor corrections after visually checking them.

---

# 9. MODE BUTTON PLACEMENT

The ACTUAL / CAD / BLUEPRINT controls should be subtle and must match the current interface.

Place them near the bottom edge of the existing image frame.

Preferred position:

```text
                           [ ACTUAL ][ CAD ][ BLUEPRINT ]
```

They must not cover the robot.

Style rules:

- use the current monospace/interface font
- small type
- uppercase
- no rounded pill buttons
- transparent by default
- inactive = dim gray
- active = ROBIX red or the current section accent
- thin border or bottom-line treatment only
- preserve the current mechanical/engineering design language

Do not use the purple button style from the external reference.

This website already has its own ROBIX red/white/black aesthetic.

---

# 10. MODE INDICATOR

The existing visual currently has labels similar to:

```text
UNIT // RBX-01
SCAN // COMPLETE
```

Keep them.

Update dynamically:

For AZREAL ACTUAL:

```text
UNIT // RBX-01
VIEW // ACTUAL
```

For CAD:

```text
UNIT // RBX-01
VIEW // CAD
```

For BLUEPRINT:

```text
UNIT // RBX-01
VIEW // BLUEPRINT
```

If `SCAN // COMPLETE` is visually important to the existing section, keep it and add the view mode beside it instead of removing it.

Do not overcrowd the frame.

---

# 11. MODE SWITCH ANIMATION

Use GSAP.

The mode change should be quick and mechanical, not a generic fade.

Sequence:

```text
button pressed
    ↓
thin scan line flashes across frame
    ↓
current image opacity drops
    ↓
new image appears
    ↓
new image settles
```

Suggested timing:

```js
outgoing: 0.18 - 0.22 seconds
incoming: 0.28 - 0.38 seconds
```

Use only:

- opacity
- tiny scale changes
- scan line
- subtle brightness flash

Do NOT:

- spin the image
- flip the entire frame
- move the image hundreds of pixels
- create 3D rotations
- use excessive glitch effects

Example:

```js
gsap.to(currentImage, {
  opacity: 0,
  scale: 1.015,
  duration: 0.2,
  ease: "power2.in",
  overwrite: "auto"
});

gsap.fromTo(
  nextImage,
  {
    opacity: 0,
    scale: 0.99,
    filter: "brightness(1.35)"
  },
  {
    opacity: 1,
    scale: 1,
    filter: "brightness(1)",
    duration: 0.34,
    ease: "power3.out",
    overwrite: "auto"
  }
);
```

---

# 12. SCAN LINE

Reuse the current Machines section scanner if one already exists.

Do not create a second redundant scanner.

When ACTUAL/CAD/BLUEPRINT changes:

- reset scan to top
- animate it downward once
- fade it away
- reset position after completion

The scan must remain inside the existing visual frame.

Use the current red accent.

---

# 13. BOT NAVIGATION

The existing section already has three Machines slides/cards and a counter.

Preserve the current overall Machines navigation behavior.

Use bot order:

```text
01 AZREAL
02 PALLAS
03 SHILDEAR
```

If the existing section horizontally moves between `.machine-card` elements using ScrollTrigger, keep that behavior.

Do not replace the whole section with arrow navigation unless arrow navigation already exists.

The mode switcher is independent:

```text
machine changes through existing section navigation

within each machine:
ACTUAL ↔ CAD ↔ BLUEPRINT
```

Every machine should default to:

```text
ACTUAL
```

when first shown.

---

# 14. IF THE EXISTING MACHINES SECTION USES THREE `.machine-card` ELEMENTS

This is acceptable.

Do not force a data-rendered single-card architecture if doing so would break the existing horizontal scroll section.

Instead, populate each existing `.machine-card`:

```text
machine-card 01 → AZREAL
machine-card 02 → PALLAS
machine-card 03 → SHILDEAR
```

Each card gets its own:

- Actual image
- CAD image
- Blueprint image
- three mode buttons

Event listeners must be scoped to each card.

Do NOT let clicking CAD on Azreal change Pallas or Shildear.

Use:

```js
cards.forEach(card => {
  const viewer = card.querySelector("[data-machine-viewer]");
  const buttons = card.querySelectorAll("[data-set-view]");
  const images = card.querySelectorAll("[data-view]");
});
```

---

# 15. DO NOT BREAK THE EXISTING HORIZONTAL SCROLL

If `machines.js` already contains something like:

```js
gsap.to(track, {
  xPercent: -100 * (total - 1),
  scrollTrigger: {
    trigger: section,
    pin: true,
    scrub: 1
  }
});
```

keep it.

Integrate the view-mode buttons around it.

The ACTUAL/CAD/BLUEPRINT buttons must not trigger unwanted page scrolling.

Use:

```js
button.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
});
```

only where appropriate.

---

# 16. CURRENT STYLE MUST REMAIN

The final section should still visually look like the current screenshot:

- black background
- huge white `OUR MACHINES.`
- small red technical kicker
- sparse monochrome interface
- red accent
- thin gray borders
- technical monospace labels
- large left-side machine name
- description below
- 2x2 spec table
- large angular machine image frame on right
- tiny UNIT / SCAN labels
- generous negative space

DO NOT introduce:

- bright purple backgrounds
- white CAD-page backgrounds around the entire section
- large new navigation sidebars
- glowing cyberpunk cards
- rounded glass panels
- generic Bootstrap components
- a completely different typography system
- another design language

The CAD image itself may naturally have a white/light background.
The Blueprint image itself may naturally have a dark-blue blueprint background.
That is fine because those are machine view assets inside the existing frame.

---

# 17. OPTIONAL VIEW-SPECIFIC FRAME TREATMENT

Keep this very subtle.

For ACTUAL:

```css
[data-mode="actual"] {
  --mode-accent: #ff3030;
}
```

For CAD:

```css
[data-mode="cad"] {
  --mode-accent: rgba(255,255,255,0.65);
}
```

For BLUEPRINT:

```css
[data-mode="blueprint"] {
  --mode-accent: #6677ff;
}
```

Use the variable only for tiny things like:

- active mode button
- scanner
- small view label
- one thin frame accent

Do not recolor the entire section.

---

# 18. IMAGE FALLBACK

If an image fails to load:

```text
VISUAL DATA // UNAVAILABLE
```

must appear inside the existing machine frame.

Do not show the browser broken-image icon.

Log:

```js
console.error("ROBIX machine asset failed:", failedPath);
```

---

# 19. PRELOAD MACHINE MODES

For each machine, preload its CAD and Blueprint images after the Actual image begins loading.

Example:

```js
function preload(src) {
  if (!src) return;

  const img = new Image();
  img.src = src;
}
```

This should make mode switching immediate.

---

# 20. ALT TEXT

Examples:

```text
Azreal ROBIX competition robot — actual build
Azreal ROBIX competition robot — CAD view
Azreal ROBIX competition robot — blueprint view

Pallas ROBIX competition robot — actual build
...

Shildear ROBIX competition robot — blueprint view
```

---

# 21. MOBILE

Preserve the current responsive behavior.

On smaller screens:

- keep the title and bot information above
- visual frame moves below
- mode buttons stay visible
- bot images use `object-fit: contain`
- no horizontal overflow from the mode selector
- do not make ACTUAL/CAD/BLUEPRINT tiny or unreadable
- spec table remains a 2x2 grid where space allows
- on very narrow screens, spec cells may stack into 2 columns or 1 column based on the existing design

---

# 22. REDUCED MOTION

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Disable scan animation and scale changes.

Use a simple image crossfade.

---

# 23. ACCEPTANCE CHECKLIST

After implementation verify:

## Section appearance

- `OUR MACHINES.` still appears exactly in the current visual style.
- Existing section positioning has not been redesigned.
- Existing horizontal/pinned scroll behavior still works.
- No unrelated section has changed.

## AZREAL

- Machine counter is `01 / 03`.
- Name is `AZREAL`.
- Class is `ROBOSUMO / 5 KG`.
- Result is `2ND PLACE`.
- ACTUAL works.
- CAD works.
- BLUEPRINT works.

## PALLAS

- Machine counter is `02 / 03`.
- Name is `PALLAS`.
- Result is `3RD PLACE`.
- All three views work.

## SHILDEAR

- Machine counter is `03 / 03`.
- Name is `SHILDEAR`.
- Result is `1ST PLACE`.
- All three views work.

## Image alignment

For each bot:

- ACTUAL, CAD, and BLUEPRINT occupy the same visual container.
- Switching modes does not resize the machine frame.
- The robot does not visibly jump to a different unrelated location.
- If necessary, use only small x/y/scale alignment corrections.

## Console

No:

- 404 image paths
- duplicate IDs
- null selector errors
- GSAP errors
- module errors

## Build

Run:

```bash
npm run build
```

Fix all build errors before finishing.

---

# 24. FINAL RESPONSE FROM ANTIGRAVITY

After modifying the project, report only:

1. files changed
2. bot image paths detected and used
3. confirmation that the current visual design was preserved
4. confirmation that ACTUAL / CAD / BLUEPRINT works independently for all 3 bots
5. confirmation that the existing Machines scroll behavior still works
6. result of `npm run build`
7. any missing image or information that still needs manual input

Do not return a redesign proposal.

Actually implement the changes.
