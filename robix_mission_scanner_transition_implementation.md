# ROBIX Mission Archive — Scanner Poster Transition Implementation

## Target
Antigravity / Gemini 3.8 Flash

## Stack
Vite + Vanilla JS + GSAP + ScrollTrigger

## Scope
Improve only the Mission Archive / Field Records poster and information transitions.

The current section already has the correct visual direction. The problem is that transitions between events/posters feel jittery and abrupt. Replace the current transition behavior with a controlled scanner-style archive transition.

Do not redesign the Mission Archive.
Do not change event order.
Do not change poster files.
Do not change desktop section structure.
Do not introduce a generic carousel.
Do not add Three.js.
Do not add large glitch effects.

---

## 1. Inspect before editing

Inspect:

```text
index.html
src/styles/missions.css
src/animations/missions.js
src/styles/mobile.css
```

Identify the current selectors used for:

```text
mission section
poster frame
poster image
mission title
mission description
mission label
metadata grid
counter
progress bar
scanner
```

If the real class names differ from this brief, adapt the implementation to the existing repository rather than duplicating the section.

---

## 2. Core transition principle

The Mission Archive should not continuously animate poster/text properties directly from every ScrollTrigger update.

Use this model:

```text
scroll progress
→ calculate active event index
→ if the index changed
→ run ONE transition timeline
→ transition finishes
```

Do not allow several competing timelines to run at once.

---

## 3. Keep the outer poster frame stationary

The outer right-side archive frame must not slide, jump, or fade away between events.

Only animate:

```text
poster image
scanner line
left-side event information
counter / small HUD labels
```

The visual idea should feel like a fixed archive terminal loading a new record.

---

## 4. Poster stage HTML

Inside the existing poster frame, use two images plus a scanner line.

Adapt the current markup to this structure:

```html
<div class="mission-visual-frame">

    <div class="mission-poster-stage">

        <img
            class="mission-poster mission-poster-current"
            src=""
            alt=""
        >

        <img
            class="mission-poster mission-poster-next"
            src=""
            alt=""
        >

        <div class="mission-scanner"></div>

    </div>

</div>
```

Do not create a second visual frame.

The two images are required so the next poster can be prepared before the current one disappears.

---

## 5. Poster stage CSS

Add/adapt:

```css
.mission-poster-stage {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    isolation: isolate;
}
```

---

## 6. Poster image CSS

Use:

```css
.mission-poster {
    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;

    object-fit: contain;
    object-position: center;

    will-change:
        clip-path,
        opacity,
        transform;
}
```

Do not use:

```css
object-fit: cover;
```

All posters must remain fully visible.

---

## 7. Current and next poster states

Use:

```css
.mission-poster-current {
    z-index: 2;
    opacity: 1;

    clip-path:
        inset(0 0 0 0);
}


.mission-poster-next {
    z-index: 1;
    opacity: 1;

    clip-path:
        inset(100% 0 0 0);
}
```

---

## 8. Scanner line

Add:

```css
.mission-scanner {
    position: absolute;

    left: 0;
    right: 0;
    top: 0;

    height: 2px;

    opacity: 0;

    z-index: 5;

    pointer-events: none;

    background:
        #ff3030;

    box-shadow:
        0 0 10px rgba(255, 48, 48, 0.8),
        0 0 24px rgba(255, 48, 48, 0.45);
}
```

Add the soft scan glow:

```css
.mission-scanner::before {
    content: "";

    position: absolute;

    inset:
        -12px
        0
        -12px
        0;

    background:
        linear-gradient(
            to bottom,
            rgba(255, 48, 48, 0),
            rgba(255, 48, 48, 0.10),
            rgba(255, 48, 48, 0)
        );
}
```

The scanner should run only when the active event changes.

Do not loop it continuously.

---

## 9. Text performance

Add/adapt:

```css
.mission-title,
.mission-description,
.mission-type,
.mission-label,
.mission-data {
    will-change:
        transform,
        opacity;
}
```

Do not apply `will-change` to the entire section.

---

## 10. Event order must stay unchanged

Keep the current order:

```text
01 — Automation Expo — 2025
02 — Roborift        — 2025
03 — Robothon        — 2025
04 — Ideaspark       — 2026
05 — Ideaspark 2.0   — 2026
```

All events remain hosted by ROBIX and located in Mumbai.

Use the current working poster paths already present in the project.

Do not rename or recreate poster files for this task.

---

## 11. Cache DOM elements once

Inside the existing Mission Archive initializer, cache the required elements once.

Adapt selectors to the actual repository.

Example:

```js
const section =
    document.querySelector(
        "#missions"
    );

if (!section) {
    return;
}


const posterCurrent =
    section.querySelector(
        ".mission-poster-current"
    );


const posterNext =
    section.querySelector(
        ".mission-poster-next"
    );


const scanner =
    section.querySelector(
        ".mission-scanner"
    );


const currentCounter =
    section.querySelector(
        "[data-mission-current], .mission-current"
    );


const totalCounter =
    section.querySelector(
        "[data-mission-total], .mission-total"
    );


const missionLabel =
    section.querySelector(
        ".mission-label"
    );


const missionType =
    section.querySelector(
        ".mission-type"
    );


const missionTitle =
    section.querySelector(
        ".mission-title"
    );


const missionDescription =
    section.querySelector(
        ".mission-description"
    );


const missionYear =
    section.querySelector(
        ".mission-year"
    );


const missionLocation =
    section.querySelector(
        ".mission-location"
    );


const missionHost =
    section.querySelector(
        ".mission-host"
    );


const missionStatus =
    section.querySelector(
        ".mission-status"
    );
```

Do not repeatedly query the whole document inside each scroll update.

---

## 12. Transition state

Add:

```js
let activeMissionIndex =
    0;


let missionTransition =
    null;


let isTransitioning =
    false;
```

---

## 13. Content update function

Create one function that updates event text and counter.

Example:

```js
function setMissionContent(
    index
) {

    const mission =
        missions[index];


    if (!mission) {
        return;
    }


    if (missionLabel) {

        missionLabel.textContent =
            `MISSION // ${String(index + 1).padStart(2, "0")}`;

    }


    if (missionType) {

        missionType.textContent =
            mission.type;

    }


    if (missionTitle) {

        missionTitle.textContent =
            mission.title;

    }


    if (missionDescription) {

        missionDescription.textContent =
            mission.description;

    }


    if (missionYear) {

        missionYear.textContent =
            mission.year;

    }


    if (missionLocation) {

        missionLocation.textContent =
            mission.location;

    }


    if (missionHost) {

        missionHost.textContent =
            mission.host || "ROBIX";

    }


    if (missionStatus) {

        missionStatus.textContent =
            mission.status || "ARCHIVED";

    }


    if (currentCounter) {

        currentCounter.textContent =
            String(
                index + 1
            ).padStart(
                2,
                "0"
            );

    }

}
```

---

## 14. Set total counter once

Use:

```js
if (totalCounter) {

    totalCounter.textContent =
        String(
            missions.length
        ).padStart(
            2,
            "0"
        );

}
```

Expected:

```text
01 / 05
02 / 05
03 / 05
04 / 05
05 / 05
```

---

## 15. Scanner transition function

Create/adapt the transition function:

```js
function showMission(
    nextIndex
) {

    if (
        nextIndex ===
            activeMissionIndex ||
        isTransitioning ||
        !missions[nextIndex]
    ) {
        return;
    }


    isTransitioning =
        true;


    const nextMission =
        missions[nextIndex];


    if (missionTransition) {

        missionTransition.kill();

    }


    posterNext.src =
        nextMission.poster;


    posterNext.alt =
        `${nextMission.title} ${nextMission.year} poster`;


    gsap.set(
        posterNext,
        {
            clipPath:
                "inset(100% 0 0 0)",

            zIndex:
                3,

            opacity:
                1
        }
    );


    gsap.set(
        scanner,
        {
            opacity:
                1,

            yPercent:
                -5
        }
    );


    missionTransition =
        gsap.timeline(
            {

                defaults: {
                    overwrite:
                        "auto"
                },


                onComplete:
                    () => {

                        posterCurrent.src =
                            nextMission.poster;


                        posterCurrent.alt =
                            `${nextMission.title} ${nextMission.year} poster`;


                        gsap.set(
                            posterCurrent,
                            {
                                clipPath:
                                    "inset(0 0 0 0)",

                                opacity:
                                    1,

                                zIndex:
                                    2
                            }
                        );


                        gsap.set(
                            posterNext,
                            {
                                clipPath:
                                    "inset(100% 0 0 0)",

                                opacity:
                                    1,

                                zIndex:
                                    1
                            }
                        );


                        gsap.set(
                            scanner,
                            {
                                opacity:
                                    0,

                                yPercent:
                                    -5
                            }
                        );


                        activeMissionIndex =
                            nextIndex;


                        isTransitioning =
                            false;

                    }

            }
        );


    missionTransition.to(
        [
            missionType,
            missionDescription,
            missionYear,
            missionLocation,
            missionHost,
            missionStatus
        ].filter(Boolean),
        {
            opacity:
                0.3,

            y:
                -4,

            duration:
                0.14,

            stagger:
                0.01,

            ease:
                "power1.out"
        },
        0
    );


    missionTransition.to(
        missionTitle,
        {
            opacity:
                0.15,

            y:
                -12,

            duration:
                0.16,

            ease:
                "power2.in"
        },
        0
    );


    missionTransition.to(
        scanner,
        {
            yPercent:
                5000,

            duration:
                0.48,

            ease:
                "none"
        },
        0.05
    );


    missionTransition.to(
        posterCurrent,
        {
            clipPath:
                "inset(0 0 100% 0)",

            duration:
                0.34,

            ease:
                "power2.inOut"
        },
        0.10
    );


    missionTransition.add(
        () => {

            setMissionContent(
                nextIndex
            );

        },
        0.26
    );


    missionTransition.to(
        posterNext,
        {
            clipPath:
                "inset(0 0 0 0)",

            duration:
                0.42,

            ease:
                "power2.out"
        },
        0.24
    );


    missionTransition.fromTo(
        missionTitle,
        {
            opacity:
                0,

            y:
                18
        },
        {
            opacity:
                1,

            y:
                0,

            duration:
                0.30,

            ease:
                "power3.out"
        },
        0.30
    );


    missionTransition.fromTo(
        [
            missionType,
            missionDescription,
            missionYear,
            missionLocation,
            missionHost,
            missionStatus
        ].filter(Boolean),
        {
            opacity:
                0,

            y:
                10
        },
        {
            opacity:
                1,

            y:
                0,

            duration:
                0.24,

            stagger:
                0.03,

            ease:
                "power2.out"
        },
        0.36
    );

}
```

If the scanner's travel distance does not correctly cross the poster frame, use a pixel-based or frame-height-based `y` calculation instead of blindly keeping `yPercent: 5000`.

The requirement is simply that it traverses the complete poster stage once.

---

## 16. Desired timing

The complete transition should feel approximately:

```text
0.6 – 0.8 seconds
```

Sequence:

```text
OLD EVENT
   ↓
supporting information dims
   ↓
title retracts slightly
   ↓
red scanner sweeps
   ↓
old poster closes
   ↓
counter/content updates
   ↓
new poster opens
   ↓
new title enters
   ↓
metadata follows
```

Do not extend the transition beyond about 1 second unless testing clearly requires it.

---

## 17. Initialize first event

After the relevant DOM and data exist:

```js
setMissionContent(
    0
);


posterCurrent.src =
    missions[0].poster;


posterCurrent.alt =
    `${missions[0].title} ${missions[0].year} poster`;


posterNext.src =
    missions[0].poster;


activeMissionIndex =
    0;
```

---

## 18. Preload posters

Use:

```js
missions.forEach(
    mission => {

        if (!mission.poster) {
            return;
        }


        const image =
            new Image();


        image.src =
            mission.poster;

    }
);
```

This prevents flashes while the scanner transition runs.

---

## 19. ScrollTrigger should detect index changes only

Do not animate the mission title/poster directly from every ScrollTrigger progress update.

Integrate logic equivalent to:

```js
onUpdate:
    self => {

        const nextIndex =
            Math.min(
                missions.length - 1,

                Math.round(
                    self.progress *
                    (
                        missions.length - 1
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
```

If an existing pinned Mission Archive ScrollTrigger already exists, modify it.

Do not create another competing pinned ScrollTrigger for the same section.

---

## 20. Prevent competing timelines

There must be only one active record-change timeline.

Use:

```js
if (missionTransition) {
    missionTransition.kill();
}
```

and:

```js
overwrite: "auto"
```

Do not let poster/text tweens stack during quick scrolling.

---

## 21. Rapid-scroll behavior

Test aggressive mouse-wheel and trackpad scrolling.

The UI must never be left in these states:

```text
two posters simultaneously visible
scanner frozen halfway
title opacity stuck below 1
wrong counter for current poster
wrong text for current poster
poster frame moving unexpectedly
```

If necessary, refine transition locking so the final state always resolves cleanly.

---

## 22. Do not over-animate

Do not add:

```text
poster spinning
3D card flips
huge zoom punches
random glitch distortion
continuous flicker
camera shake
full-screen flashes
```

The movement language should be:

```text
mechanical
controlled
precise
technical
```

---

## 23. Optional archive footer

If there is enough room beneath the poster, optionally show:

```text
AUTOMATION_EXPO_2025                FILE // 001
```

Then:

```text
ROBORIFT_2025                       FILE // 002
ROBOTHON_2025                       FILE // 003
IDEASPARK_2026                      FILE // 004
IDEASPARK_2.0_2026                  FILE // 005
```

Keep this subtle.

Do not add it if it creates crowding.

---

## 24. Counter timing

The counter should change around the midpoint of the scanner transition.

Visual intent:

```text
01 / 05

old record retracts

scanner crosses

02 / 05

new record appears
```

Do not change the counter immediately when the user moves the mouse wheel.

---

## 25. Mobile behavior

Preserve the previous mobile Mission Archive fixes.

Do not introduce the heavy desktop scanner/pinning interaction on mobile if mobile records already use natural vertical flow.

For screens <= 768px:

```text
simple crossfade is acceptable
normal vertical flow
poster fully visible
no clipping
no title overlap
no horizontal overflow
```

---

## 26. Reduced motion

Respect:

```js
window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches
```

For reduced motion:

```text
fade old poster
update text
fade new poster
```

Do not use scanner or clip-path sweeps.

---

## 27. Performance

Prefer animation of:

```text
opacity
transform
clip-path
```

Avoid repeatedly animating:

```text
width
height
large blur filters
layout-heavy properties
```

Use transform-based scanner motion when practical.

---

## 28. Acceptance checklist

The task is complete only if:

### Poster

- outer archive frame stays stationary
- entire poster remains visible
- old poster retracts smoothly
- new poster reveals smoothly
- no visible image-source flash

### Scanner

- scanner runs exactly once per event change
- scanner crosses the full poster stage
- scanner resets after transition
- scanner never remains frozen

### Text

- title movement is subtle
- description and metadata stagger smoothly
- no text jumps
- no opacity gets stuck

### Counter

Correct sequence:

```text
01 / 05
02 / 05
03 / 05
04 / 05
05 / 05
```

Counter update is synchronized with the poster transition.

### Scroll

- no jitter during normal scrolling
- quick scrolling does not create competing animations
- existing Mission Archive navigation/pinning remains functional

### Mobile

- previous mobile fixes remain intact
- no desktop scanner pin behavior is reintroduced

---

## 29. Build check

Run:

```bash
npm run build
```

Resolve:

```text
syntax errors
GSAP errors
ScrollTrigger warnings
missing poster paths
null selectors
duplicate event listeners
```

before finishing.

---

## 30. Final response from Antigravity

After implementation report:

1. files changed
2. previous transition behavior removed/replaced
3. scanner selector used
4. poster stack selectors used
5. confirmation outer frame stays stationary
6. confirmation poster reveal uses clip-path
7. confirmation left-side information uses staggered transitions
8. confirmation counter changes near transition midpoint
9. confirmation rapid scrolling no longer produces jitter
10. confirmation mobile behavior remains unchanged
11. result of `npm run build`

Do not return only a plan.

Actually implement and test the scanner transition.
