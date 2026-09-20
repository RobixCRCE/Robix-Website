# ROBIX Mission Archive — Zero-Gap Poster Scanner + Cybertronian Decrypt Upgrade

## Target
Antigravity / Gemini 3.8 Flash

## Goal
Upgrade the Mission Archive / Field Records section in two specific ways:

1. **Fix the poster transition** so there is **no blank gap** between the current poster and the next poster.
2. Add a **Cybertronian scramble / decrypt effect** to the event information section when the event changes.

This is not a redesign.
Keep the current visual style, layout, and event order intact.

---

## 1. What is wrong right now

### Poster issue
The current scanner goes from top to bottom, but during the transition the poster area briefly becomes blank before the next poster fully appears.

That feels wrong.

The desired behavior is:

```text
current poster visible
→ user scrolls
→ next poster is already pre-rendered underneath
→ scanner sweeps downward
→ current poster wipes away from top to bottom
→ next poster is revealed underneath in real time
→ no blank frame at any point
```

So the scanner should behave like a **mechanical wipe**, not a hide-then-replace animation.

### Information section issue
The event information on the left updates normally.

The desired behavior is:

- event text updates with a **scramble / decrypt** feeling
- the scramble should feel **technical / robotic / alien**
- during the scramble, use a **Cybertronian-looking font**
- do **not** let the whole section become unreadable permanently

### Important recommendation
Do **not** keep the final large event title and full description permanently in Cybertronian.
That will look cool for 5 seconds and then become a usability problem.

Best approach:

- **during transition** → Cybertronian scramble effect
- **after transition settles** → final readable English text

If you want more Cybertronian flavor, apply the Cybertronian font permanently only to:
- micro labels
- small HUD text
- archive tags
- counters
- decorative subtitles

Keep the main title and description readable.

---

## 2. Files to inspect and edit

Inspect and update:

```text
index.html
src/animations/missions.js
src/styles/missions.css
src/styles/mobile.css
```

If the class names differ from this brief, adapt the implementation to the existing project.

Do not duplicate the Mission Archive section.

---

## 3. Poster architecture required

The poster frame must contain:

```html
<div class="mission-visual-frame">
    <div class="mission-poster-stage">

        <img class="mission-poster mission-poster-next" src="" alt="">
        <img class="mission-poster mission-poster-current" src="" alt="">

        <div class="mission-scanner"></div>

    </div>
</div>
```

### Important
The **next poster must sit underneath the current poster**.

Layer order:

```text
scanner        → top
current poster → middle
next poster    → bottom
```

This is important because the current poster will be wiped away to reveal the next poster already waiting underneath.

---

## 4. Poster CSS behavior

Add / adapt this structure:

```css
.mission-poster-stage {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    isolation: isolate;
}

.mission-poster {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    will-change: clip-path, opacity, transform;
}

.mission-poster-next {
    z-index: 1;
    opacity: 1;
}

.mission-poster-current {
    z-index: 2;
    opacity: 1;
    clip-path: inset(0 0 0 0);
}

.mission-scanner {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2px;
    opacity: 0;
    z-index: 5;
    pointer-events: none;
    background: #ff3030;
    box-shadow:
        0 0 10px rgba(255, 48, 48, 0.8),
        0 0 24px rgba(255, 48, 48, 0.45);
}

.mission-scanner::before {
    content: "";
    position: absolute;
    inset: -12px 0 -12px 0;
    background: linear-gradient(
        to bottom,
        rgba(255, 48, 48, 0),
        rgba(255, 48, 48, 0.12),
        rgba(255, 48, 48, 0)
    );
}
```

---

## 5. The correct poster transition logic

### Wrong behavior
Do not do this:

```text
hide current poster
→ empty state
→ show next poster
```

That is exactly what creates the blank gap.

### Correct behavior
Do this instead:

```text
1. next poster src is assigned before transition begins
2. next poster is already rendered underneath current poster
3. scanner starts at the top
4. current poster clip-path crops from the TOP downward
5. as current poster is cropped, next poster becomes visible underneath
6. scanner moves with the wipe edge
7. once current poster is fully gone, swap references
```

---

## 6. Use a top-down wipe on the CURRENT poster only

This is the key fix.

Instead of revealing the next poster from hidden state, keep the next poster already visible underneath.

Animate only the **current** poster clip-path:

```js
clipPath: "inset(0% 0 0 0)"
→
clipPath: "inset(100% 0 0 0)"
```

That means:

- the top of the current poster is progressively cut away
- the next poster appears immediately underneath
- the scanner line marks the wipe boundary
- there is never a blank area

---

## 7. Mission transition state

Inside the mission archive JS, keep:

```js
let activeMissionIndex = 0;
let missionTransition = null;
let isTransitioning = false;
```

---

## 8. Prime the next poster before the transition begins

Before starting the scanner animation:

```js
posterNext.src = nextMission.poster;
posterNext.alt = `${nextMission.title} ${nextMission.year} poster`;
```

Do this **before** the timeline starts.

Also preload all poster assets on init:

```js
missions.forEach(mission => {
    if (!mission.poster) return;
    const img = new Image();
    img.src = mission.poster;
});
```

This reduces flicker and avoids loading blank states.

---

## 9. Replace the old showMission() behavior

Implement or adapt `showMission(nextIndex)` so the wipe works like this:

```js
function showMission(nextIndex) {

    if (
        nextIndex === activeMissionIndex ||
        isTransitioning ||
        !missions[nextIndex]
    ) {
        return;
    }

    isTransitioning = true;

    const nextMission = missions[nextIndex];

    if (missionTransition) {
        missionTransition.kill();
    }

    /*
     * Pre-render next poster underneath.
     */
    posterNext.src = nextMission.poster;
    posterNext.alt = `${nextMission.title} ${nextMission.year} poster`;

    gsap.set(posterNext, {
        opacity: 1,
        zIndex: 1
    });

    gsap.set(posterCurrent, {
        clipPath: "inset(0% 0 0 0)",
        opacity: 1,
        zIndex: 2
    });

    gsap.set(scanner, {
        opacity: 1,
        y: 0
    });

    missionTransition = gsap.timeline({
        defaults: {
            overwrite: "auto"
        },
        onComplete: () => {
            posterCurrent.src = nextMission.poster;
            posterCurrent.alt = `${nextMission.title} ${nextMission.year} poster`;

            gsap.set(posterCurrent, {
                clipPath: "inset(0% 0 0 0)",
                opacity: 1,
                zIndex: 2
            });

            gsap.set(posterNext, {
                opacity: 1,
                zIndex: 1
            });

            gsap.set(scanner, {
                opacity: 0,
                y: 0
            });

            activeMissionIndex = nextIndex;
            isTransitioning = false;
        }
    });

    /*
     * 1. Dim current info slightly.
     */
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
            opacity: 0.3,
            y: -4,
            duration: 0.12,
            stagger: 0.01,
            ease: "power1.out"
        },
        0
    );

    missionTransition.to(
        missionTitle,
        {
            opacity: 0.18,
            y: -10,
            duration: 0.14,
            ease: "power2.in"
        },
        0
    );

    /*
     * 2. Start scanner.
     */
    missionTransition.to(
        scanner,
        {
            y: posterStage.offsetHeight,
            duration: 0.5,
            ease: "none"
        },
        0.05
    );

    /*
     * 3. Wipe current poster away from top to bottom.
     * THIS is the core fix.
     */
    missionTransition.to(
        posterCurrent,
        {
            clipPath: "inset(100% 0 0 0)",
            duration: 0.5,
            ease: "none"
        },
        0.05
    );

    /*
     * 4. Midway through, update the text content.
     */
    missionTransition.add(() => {
        setMissionContent(nextIndex);
        triggerMissionDecrypt(nextMission);
    }, 0.22);

    /*
     * 5. Bring the new text back in.
     */
    missionTransition.fromTo(
        missionTitle,
        {
            opacity: 0,
            y: 16
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.28,
            ease: "power3.out"
        },
        0.26
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
            opacity: 0,
            y: 10
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.22,
            stagger: 0.025,
            ease: "power2.out"
        },
        0.3
    );
}
```

### Important note
`posterStage` in the above example should refer to:

```js
const posterStage = section.querySelector(".mission-poster-stage");
```

The scanner should move exactly across the poster stage height.

The important part is:
- scanner moves down
- current poster is clipped from top down
- next poster is already visible underneath

---

## 10. Counter behavior

The counter should update near the midpoint of the transition.

Example:

```text
03 / 05
current poster starts wiping
scanner crosses
04 / 05
new content enters
```

Do not update the counter at the exact instant the scroll begins.

---

## 11. Add Cybertronian-style decrypt effect

### Goal
When the mission content changes, the text should not simply pop from one event to another.

Instead:

```text
old text fades
→ new text appears as scrambled alien / technical glyphs
→ scrambled text resolves into final English copy
```

This should affect the highlighted information panel on the left:
- event label
- event type
- title
- description
- metadata values

Do not overdo it.
Keep it short and sharp.

---

## 12. Font handling

The user referenced this font:

```text
Modern Cybertronic
```

Use it if the user has downloaded it.

### Implementation approach
Place the font file inside the project, for example:

```text
public/fonts/ModernCybertronic.ttf
```

Then in CSS:

```css
@font-face {
    font-family: "ModernCybertronic";
    src: url("/fonts/ModernCybertronic.ttf") format("truetype");
    font-display: swap;
}
```

Add utility classes:

```css
.cybertronian-temp {
    font-family: "ModernCybertronic", sans-serif;
    letter-spacing: 0.08em;
}

.cybertronian-label {
    font-family: "ModernCybertronic", sans-serif;
    letter-spacing: 0.08em;
}
```

### Recommendation
Use `.cybertronian-temp` only during the scramble animation.

If you want permanent flavor, apply `.cybertronian-label` only to small HUD labels.

---

## 13. Character set for scrambling

Because the font maps Latin letters into a Cybertronian-looking style, use a normal Latin uppercase + numeric character set as the scramble source:

```js
const CYBER_CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
```

When rendered with the Cybertronian font during the scramble, it will look alien/robotic.

---

## 14. Create a reusable decrypt function

Add something like:

```js
const CYBER_CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


function runCybertronianDecrypt(
    element,
    finalText,
    {
        duration = 500,
        steps = 12,
        tempClass = "cybertronian-temp"
    } = {}
) {

    if (!element) return;

    const originalText = finalText || "";
    const maxLength = originalText.length;
    const intervalDuration = duration / steps;

    let iteration = 0;

    element.classList.add(tempClass);

    const interval = setInterval(() => {

        let output = "";

        for (let i = 0; i < maxLength; i++) {

            if (i < iteration) {
                output += originalText[i] || "";
            } else if (originalText[i] === " ") {
                output += " ";
            } else {
                output += CYBER_CHARS[
                    Math.floor(Math.random() * CYBER_CHARS.length)
                ];
            }
        }

        element.textContent = output;

        iteration += maxLength / steps;

        if (iteration >= maxLength) {
            clearInterval(interval);
            element.textContent = originalText;
            element.classList.remove(tempClass);
        }

    }, intervalDuration);
}
```

---

## 15. Trigger the decrypt on mission change

Create a helper:

```js
function triggerMissionDecrypt(mission, nextIndex) {

    if (!mission) return;

    runCybertronianDecrypt(
        missionLabel,
        `MISSION // ${String(nextIndex + 1).padStart(2, "0")}`,
        { duration: 260, steps: 8 }
    );

    runCybertronianDecrypt(
        missionType,
        mission.type,
        { duration: 280, steps: 8 }
    );

    runCybertronianDecrypt(
        missionTitle,
        mission.title,
        { duration: 420, steps: 12 }
    );

    runCybertronianDecrypt(
        missionDescription,
        mission.description,
        { duration: 460, steps: 12 }
    );

    runCybertronianDecrypt(
        missionYear,
        String(mission.year),
        { duration: 220, steps: 6 }
    );

    runCybertronianDecrypt(
        missionLocation,
        mission.location,
        { duration: 220, steps: 6 }
    );

    runCybertronianDecrypt(
        missionHost,
        mission.host || "ROBIX",
        { duration: 220, steps: 6 }
    );

    runCybertronianDecrypt(
        missionStatus,
        mission.status || "ARCHIVED",
        { duration: 240, steps: 6 }
    );
}
```

Then inside the transition call:

```js
missionTransition.add(() => {
    setMissionContent(nextIndex);
    triggerMissionDecrypt(nextMission, nextIndex);
}, 0.22);
```

### Important cleanup
Do not let `setMissionContent()` and `runCybertronianDecrypt()` fight over the same nodes repeatedly.

The correct sequence is:

```text
1. update mission data
2. immediately run decrypt effect using final target text
3. after a short period, the element resolves back to readable English
```

---

## 16. Better implementation order for the text

Use this order:

```text
scanner begins
→ current text dims
→ mission content variables switch
→ visible text nodes start Cybertronian scramble
→ large title resolves
→ description resolves
→ metadata resolves
```

That will feel much better than a basic fade.

---

## 17. ScrollTrigger logic

Keep the same overall structure:

```js
ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    scrub: false,
    onUpdate: self => {
        const nextIndex = Math.min(
            missions.length - 1,
            Math.round(self.progress * (missions.length - 1))
        );

        if (nextIndex !== activeMissionIndex && !isTransitioning) {
            showMission(nextIndex);
        }
    }
});
```

Do not create several competing ScrollTriggers for the same archive section.

---

## 18. Mobile behavior

For mobile, do **not** apply the full heavy desktop scanner + decrypt combo if it becomes too much.

For `max-width: 768px`, use a reduced version:

- poster transition can still use the **zero-gap wipe**
- text scramble should be **shorter**
- no long pinned behavior
- keep readability first

Recommended:

```text
desktop:
    full scanner wipe
    full decrypt effect

mobile:
    same zero-gap wipe
    shorter decrypt
    smaller text movement
```

Do not reintroduce overflow issues.

---

## 19. Reduced motion

Respect reduced motion:

```js
const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

If `true`:

- skip scanner sweep
- skip decrypt scramble
- simple fade/swap only

---

## 20. Acceptance criteria

The task is complete only if:

### Poster transition
- no blank gap appears between posters
- next poster is already rendered before transition starts
- scanner reveals next poster continuously
- poster frame remains fixed
- no flashing
- no image loading delay

### Information transition
- highlighted event information uses a Cybertronian-style scramble/decrypt effect
- final state resolves to readable English
- effect is short and sharp, not slow and annoying
- no stuck scrambled text
- no layout shift during scramble

### Scroll
- no jitter during regular scroll
- quick scrolling does not break the state
- counter remains correct
- no extra empty section after last event

### Mobile
- no overflow
- no title clipping
- no poster clipping
- effect remains readable and lighter

---

## 21. Final response required from Antigravity

After implementation, report:

1. files changed
2. how the zero-gap wipe was implemented
3. how the next poster is pre-rendered before transition
4. how the scanner is synchronized with the wipe edge
5. how the Cybertronian decrypt effect was implemented
6. where the font file was placed / how it was loaded
7. which elements use decrypt
8. whether final text resolves to readable English
9. confirmation there is no blank poster frame anymore
10. confirmation rapid scrolling still works
11. result of build/test

Do not only explain the plan.

Actually implement the changes.
