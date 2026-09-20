# ROBIX Mobile Mission Archive — Pinned Single-Record Scanner Experience

## Target
Antigravity / Gemini 3.8 Flash

## Stack
Vite + Vanilla JS + GSAP + ScrollTrigger

## Scope
Mobile Mission Archive UX only.

Your task is to change the mobile behavior of the existing ROBIX Mission Archive / Field Records section so it behaves like the desktop archive viewer instead of stacking all five events one after another.

The desktop version is already working with scanner poster transitions and Cybertronian/decrypt text transitions. Preserve desktop exactly.

---

## 1. Current mobile problem

The mobile Mission Archive currently renders all event records one after another:

```text
Automation Expo
poster

Roborift
poster

Robothon
poster

Ideaspark
poster

Ideaspark 2.0
poster
```

This creates:
- excessive vertical length
- collapsed poster frames
- thin poster strips
- duplicated visual structure
- poor continuity
- weak mobile UX

This must be replaced.

---

## 2. Desired mobile behavior

The mobile section should behave like a **single pinned archive terminal**.

Initial section intro:

```text
FIELD
RECORDS.

Events designed and hosted by ROBIX,
bringing robotics, engineering and innovation
experiences to participants across Mumbai.

01 ───────────── 05
```

Then the active archive viewer enters:

```text
MISSION // 01
ROBIX HOSTED EVENT

AUTOMATION
EXPO

description

YEAR        LOCATION
2025        MUMBAI

HOST        STATUS
ROBIX       ARCHIVED

[ FULL POSTER ]
```

Then as the user scrolls:

```text
Automation Expo
        ↓
scanner wipe + Cybertronian decrypt
        ↓
Roborift
        ↓
scanner wipe + Cybertronian decrypt
        ↓
Robothon
        ↓
Ideaspark
        ↓
Ideaspark 2.0
        ↓
pin releases
        ↓
next website section
```

At any time, only ONE active event record should be visible.

---

## 3. Event order

Keep exactly:

```text
01 — Automation Expo — 2025
02 — Roborift        — 2025
03 — Robothon        — 2025
04 — Ideaspark       — 2026
05 — Ideaspark 2.0   — 2026
```

All events:
- Location: Mumbai
- Host: ROBIX
- Status: Archived

Use the existing poster paths already working in the project.

---

## 4. Files to inspect and edit

Inspect:

```text
index.html
src/animations/missions.js
src/styles/missions.css
src/styles/mobile.css
```

Adapt selectors to the existing repository.

Do not create a duplicate Mission Archive section.

---

## 5. Remove stacked mobile records

The current mobile CSS likely contains something similar to:

```css
.mission-record {
    position: relative;
    opacity: 1;
    visibility: visible;
}
```

for every mission record.

Remove or override that behavior.

Do NOT render all five `.mission-record` elements visibly in normal document flow.

Use one active archive viewer and update its content dynamically.

---

## 6. Mobile stage structure

The mobile architecture should be:

```text
FIELD RECORDS INTRO
+
ONE ACTIVE ARCHIVE VIEWER
```

Recommended conceptual structure:

```html
<section id="missions">

    <div class="missions-header">
        ...
    </div>

    <div class="mission-progress">
        ...
    </div>

    <div class="mission-mobile-stage">

        <div class="mission-copy">
            ...
        </div>

        <div class="mission-data">
            ...
        </div>

        <div class="mission-visual">
            ...
        </div>

    </div>

</section>
```

---

## 7. Mobile stage CSS

Add/adapt in `src/styles/mobile.css`:

```css
@media (max-width: 768px) {

    #missions {
        position: relative;
        width: 100%;
        overflow: visible;
    }

    .mission-mobile-stage {
        position: relative;

        width: 100%;

        min-height: 100svh;

        padding:
            30px
            24px
            40px;

        display: flex;
        flex-direction: column;

        justify-content: center;

        overflow: hidden;
    }

}
```

Use `100svh`, not `100vh`.

---

## 8. Mobile copy layout

Use:

```css
@media (max-width: 768px) {

    .mission-copy {
        width: 100%;
        max-width: 100%;
        min-width: 0;
    }

    .mission-title {
        width: 100%;
        max-width: 100%;

        margin-top: 24px;

        font-size:
            clamp(
                2.7rem,
                12vw,
                4rem
            );

        line-height: 0.9;

        letter-spacing: -0.06em;

        white-space: normal;

        overflow-wrap: normal;
        word-break: normal;
    }

    .mission-description {
        margin-top: 24px;

        font-size: 1rem;
        line-height: 1.65;
    }

}
```

Long titles such as `AUTOMATION EXPO` must fit without horizontal overflow.

---

## 9. Mobile metadata grid

Use:

```css
@media (max-width: 768px) {

    .mission-data {
        width: 100%;

        margin-top: 28px;

        display: grid;

        grid-template-columns:
            repeat(2, minmax(0, 1fr));
    }

    .mission-data > * {
        min-width: 0;
    }

}
```

Keep:

```text
YEAR
LOCATION
HOST
STATUS
```

---

## 10. Fix mobile poster height

The current poster frame is collapsing into a thin strip.

Use:

```css
@media (max-width: 768px) {

    .mission-visual {
        width: 100%;

        margin-top: 30px;

        min-height: 0;
    }

    .mission-visual-frame {
        position: relative;

        width: 100%;

        height:
            min(
                52svh,
                520px
            );

        min-height: 340px;

        overflow: hidden;
    }

    .mission-poster-stage {
        position: relative;

        width: 100%;
        height: 100%;

        overflow: hidden;
    }

    .mission-poster {
        position: absolute;

        inset: 0;

        width: 100%;
        height: 100%;

        object-fit: contain;
        object-position: center;
    }

}
```

Do not use `object-fit: cover`.

The entire poster must be visible.

---

## 11. Reuse zero-gap scanner transition

Reuse the existing desktop poster transition concept on mobile.

Behavior:

```text
current poster visible
next poster already rendered underneath
scanner starts at top
current poster wipes away top → bottom
next poster appears underneath
scanner exits bottom
```

Layering:

```text
scanner        → top
current poster → middle
next poster    → bottom
```

There must never be a blank poster frame.

---

## 12. Reuse Cybertronian decrypt transition

When changing events:

```text
AUTOMATION EXPO
        ↓
Cybertronian scramble
        ↓
ROBORIFT
```

Apply decrypt to:
- mission number
- event type
- title
- description
- year
- location
- host
- status

Final content must always resolve to readable English.

Do not leave the main event title or description permanently in Cybertronian.

---

## 13. Shorter mobile decrypt timings

Use mobile-specific durations:

```js
const isMobile =
    window.matchMedia(
        "(max-width: 768px)"
    ).matches;
```

Recommended:

```text
title decrypt:       600–700ms
description decrypt: 700–800ms
metadata decrypt:    450–550ms
```

This should remain visible enough to appreciate without feeling slow.

---

## 14. GSAP MatchMedia

Use `gsap.matchMedia()`.

Desktop:

```js
mm.add(
    "(min-width: 769px)",
    () => {

        // KEEP CURRENT DESKTOP MISSION ARCHIVE LOGIC

    }
);
```

Do not modify the desktop interaction unless required for shared code cleanup.

---

## 15. Mobile pinned viewer

Add a mobile-specific pinned ScrollTrigger:

```js
mm.add(
    "(max-width: 768px)",
    () => {

        const total =
            missions.length;


        const mobileTrigger =
            ScrollTrigger.create({

                trigger:
                    ".mission-mobile-stage",

                start:
                    "top top",

                end: () =>
                    "+=" +
                    (
                        window.innerHeight *
                        (total - 1) *
                        0.9
                    ),

                pin:
                    true,

                scrub:
                    0.5,

                anticipatePin:
                    1,

                invalidateOnRefresh:
                    true,

                onUpdate:
                    self => {

                        const nextIndex =
                            Math.min(
                                total - 1,

                                Math.round(
                                    self.progress *
                                    (
                                        total - 1
                                    )
                                )
                            );


                        if (
                            nextIndex !==
                                activeMissionIndex &&
                            !isTransitioning
                        ) {

                            showMission(
                                nextIndex
                            );

                        }

                    }

            });


        return () => {

            mobileTrigger.kill();

        };

    }
);
```

Adapt the selector if `.mission-mobile-stage` is named differently.

Do not create a second competing pinned trigger for the same mobile stage.

---

## 16. Do not pin FIELD RECORDS heading with event viewer

Keep:

```text
FIELD RECORDS
intro text
progress
```

as the introductory portion.

Then the active archive viewer begins below it.

Do not force the giant `FIELD RECORDS.` heading, full event information, metadata, and poster all into one phone-height pinned area.

Pin only the active event viewer.

---

## 17. Counter behavior

Use one shared counter:

```text
01 / 05
02 / 05
03 / 05
04 / 05
05 / 05
```

Update it at the transition midpoint.

Do not render a separate counter for every event.

---

## 18. Only one visible record

At any scroll position:

```text
ONE mission number
ONE title
ONE description
ONE metadata grid
ONE poster
```

Never show portions of the previous and next event records stacked vertically.

The only poster overlap allowed is the intentional scanner transition layering inside the same poster frame.

---

## 19. Release after Ideaspark 2.0

After:

```text
MISSION // 05
IDEASPARK 2.0
05 / 05
```

the mobile ScrollTrigger must end and unpin immediately.

There must be:
- no blank pinned screen
- no extra mission state
- no duplicate Ideaspark 2.0
- no dead scroll space

The next website section should enter naturally.

---

## 20. Keep scanner/decrypt timeline locked

Only one transition timeline may be active.

Keep logic equivalent to:

```js
if (
    nextIndex !== activeMissionIndex &&
    !isTransitioning
) {
    showMission(nextIndex);
}
```

Do not allow rapid scrolling to start multiple competing scanner/decrypt timelines.

---

## 21. ScrollTrigger refresh

After assets/fonts/posters load, ensure ScrollTrigger refreshes.

If the project already has:

```js
window.addEventListener(
    "load",
    () => {
        ScrollTrigger.refresh();
    }
);
```

keep it.

Do not duplicate it unnecessarily.

---

## 22. Reduced motion

Respect:

```js
window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches
```

For reduced motion:
- no scanner sweep
- no Cybertronian scramble
- simple poster/text crossfade

---

## 23. Performance

Prefer:
- opacity
- transform
- clip-path

Avoid:
- large blur animation
- continuous flickering
- multiple loop animations
- several simultaneous ScrollTriggers controlling the same elements

---

## 24. Mobile acceptance test

Test:

```text
360px
375px
390px
412px
430px
768px
```

Verify:

### Layout
- FIELD RECORDS intro readable
- only one event visible
- event title fits
- description readable
- metadata grid fits
- poster is full size and not collapsed
- no horizontal overflow

### Transition
- next poster is pre-rendered
- scanner wipe has zero blank gap
- Cybertronian decrypt runs
- final readable English resolves correctly
- counter updates correctly

### Scroll
- Automation Expo → Roborift → Robothon → Ideaspark → Ideaspark 2.0
- no stacked event records
- no thin poster strips between events
- no jitter
- no duplicate transition timelines
- last event releases directly into next website section

### Desktop
- desktop Mission Archive remains unchanged

---

## 25. Build check

Run:

```bash
npm run build
```

Fix:
- GSAP errors
- ScrollTrigger warnings
- null selectors
- poster 404s
- duplicate event listeners
- mobile overflow

before completing the task.

---

## 26. Final response from Antigravity

After implementation report:

1. files changed
2. mobile stacked-record behavior removed
3. single pinned mobile archive viewer implemented
4. zero-gap scanner wipe reused
5. Cybertronian decrypt reused
6. poster frame no longer collapses
7. only one event is visible at a time
8. Ideaspark 2.0 releases cleanly into the next section
9. desktop behavior remains unchanged
10. mobile widths tested
11. result of `npm run build`

Do not return only a plan.

Actually implement and test the changes.
