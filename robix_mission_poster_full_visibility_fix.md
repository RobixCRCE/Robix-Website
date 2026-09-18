# ROBIX Mission Archive — Full Poster Visibility Fix
## Antigravity / Gemini 3.8 Flash Implementation Brief
## Scope: Fix only the Mission Archive poster cropping/visibility issue
## Stack: Vite + Vanilla JS + GSAP + ScrollTrigger

Your task is to fix the existing ROBIX Mission Archive section so that the **entire event poster is visible inside the right-side archive frame**.

Do not redesign the section.

Do not change event order, text, dates, location, archive navigation, colors, typography, or layout structure unless absolutely necessary for this poster-fit issue.

---

# 1. CURRENT BUG

The event poster is loading correctly, but only part of it is visible.

Current behavior:

```text
portrait poster
      ↓
large right-side archive frame
      ↓
poster fills too much width / frame is too tall
      ↓
bottom of poster extends below viewport
      ↓
only top portion is visible
```

The Mission Archive is pinned on desktop, so the user cannot scroll inside the current event to see the missing lower part.

This is incorrect.

Required result:

> The complete poster must be visible from top edge to bottom edge at the same time while the Mission Archive is pinned.

---

# 2. DO NOT CHANGE POSTER FILES

The event posters inside:

```text
public/poster_for_events/
```

are already correct.

Do NOT:

- crop them
- regenerate them
- change their aspect ratio
- create duplicate versions
- stretch them
- edit the source image

Fix this entirely through CSS/layout and, only if required, existing GSAP poster animation.

---

# 3. INSPECT EXISTING FILES FIRST

Before editing, inspect:

```text
src/styles/missions.css
src/animations/missions.js
index.html
```

Find the current classes used for:

```text
.mission-record
.mission-visual
.mission-image-frame
.mission-poster
.mission-image
```

If the actual class names differ, adapt to the real project.

Do not create duplicate wrappers unnecessarily.

---

# 4. FIX POSTER FITTING

The key rule is:

```css
object-fit: contain;
```

The poster must never use:

```css
object-fit: cover;
```

inside the Mission Archive.

Use a dedicated poster rule:

```css
.mission-poster {
    width: 100%;
    height: 100%;

    max-width: 100%;
    max-height: 100%;

    object-fit: contain !important;
    object-position: center center;

    display: block;
}
```

If the project still uses `.mission-image` for the poster, apply the same rule there, but scope it only to the Mission Archive poster.

For example:

```css
.mission-image-frame .mission-image {
    width: 100%;
    height: 100%;

    max-width: 100%;
    max-height: 100%;

    object-fit: contain !important;
    object-position: center center;
}
```

Do not globally modify unrelated images elsewhere.

---

# 5. LIMIT THE VISUAL AREA BY VIEWPORT HEIGHT

The right-side visual area must fit entirely inside the available pinned viewport.

On desktop, update the Mission Archive visual area to approximately:

```css
@media (min-width: 769px) {

    .mission-visual {
        position: relative;

        width: 100%;

        height: min(56vh, 590px);

        min-height: 0;

        display: flex;
        align-items: center;
        justify-content: center;

        margin: 0;

        align-self: center;
    }

}
```

If `56vh` is too small after testing, it may be increased slightly to:

```css
60vh
```

but only if the full poster still remains visible at:

```text
1280 × 720
1366 × 768
1440 × 900
1600 × 900
1920 × 1080
```

Do not go back to a tall value such as:

```css
68vh
```

unless testing confirms it still fits.

---

# 6. FIX THE ARCHIVE FRAME SIZE

The existing right-side archive frame should remain in the same general location and retain its current styling.

Update it so it cannot exceed the available visual height.

Recommended:

```css
@media (min-width: 769px) {

    .mission-image-frame {
        position: relative;

        width: min(88%, 680px);
        height: 100%;

        max-height: min(56vh, 590px);

        display: flex;
        align-items: center;
        justify-content: center;

        margin: 0 auto;

        overflow: hidden;

        background:
            radial-gradient(
                circle at 50% 50%,
                rgba(255, 40, 40, 0.025),
                transparent 60%
            ),
            #060607;
    }

}
```

Preserve existing:

- borders
- angular cuts
- `clip-path`
- technical labels
- ROBIX red accents

The frame may become slightly smaller than before.

That is acceptable.

Seeing the entire poster is more important than filling the entire right column.

---

# 7. PORTRAIT POSTERS MUST BE ALLOWED TO HAVE SIDE SPACE

Most event posters are portrait-oriented.

The archive frame is relatively wide.

Therefore the correct result may look like:

```text
┌───────────────────────────────┐
│                               │
│       ┌───────────────┐       │
│       │               │       │
│       │               │       │
│       │ FULL POSTER   │       │
│       │               │       │
│       │               │       │
│       └───────────────┘       │
│                               │
└───────────────────────────────┘
```

The dark empty space on the sides is intentional.

Do not zoom the poster to fill the width.

Do not crop the top or bottom.

Do not stretch the poster.

---

# 8. CHECK MISSION RECORD TOP PADDING

Inspect `.mission-record`.

If it currently uses large top padding such as:

```css
padding:
    20vh
    7vw
    8vh;
```

this may push the right-side poster too far downward.

Reduce it if necessary.

Recommended starting point:

```css
.mission-record {
    padding:
        14vh
        7vw
        5vh;
}
```

However:

- preserve the current left-side content hierarchy
- do not reintroduce overlap between `FIELD RECORDS.` and the event content
- use the smallest change necessary

If possible, align the left text and right visual independently instead of pushing the whole record downward.

---

# 9. CHECK FOR HEIGHT PERCENTAGE PROBLEMS

Search for rules such as:

```css
height: 78%;
height: 80%;
height: 100%;
min-height: 680px;
```

on:

```text
.mission-visual
.mission-image-frame
.mission-poster
```

If those values make the poster exceed the viewport, replace them with viewport-aware limits.

The poster should fit inside:

```text
available pinned viewport height
```

not inside an arbitrarily tall internal container.

---

# 10. KEEP THE ARCHIVE LABELS OUTSIDE THE POSTER AREA

Keep labels such as:

```text
ARCHIVE // VISUAL RECORD
FILE // 001
```

but do not allow them to reduce the usable poster area significantly.

If required, position the top label just above the frame:

```css
.mission-image-label.label-a {
    top: -28px;
}
```

Use the project's existing class names if different.

Do not place labels over important poster content.

---

# 11. CHECK GSAP POSTER SCALE

Inspect `missions.js`.

If the poster animation ends with any scale above `1`, fix it.

Incorrect:

```js
scale: 1.08
```

Correct:

```js
scale: 1
```

Use:

```js
gsap.fromTo(
    poster,
    {
        opacity: 0,
        scale: 0.97
    },
    {
        opacity: 1,
        scale: 1,

        duration: 0.4,

        ease: "power3.out"
    }
);
```

The final poster must never remain zoomed.

---

# 12. PRESERVE CURRENT ARCHIVE TRANSITIONS

Do not remove the current Mission Archive:

- shutter behavior
- event counter
- event data transitions
- desktop ScrollTrigger sequence
- event order
- poster switching

Only ensure that after every transition the new poster ends at:

```text
opacity: 1
scale: 1
full poster visible
```

---

# 13. MOBILE BEHAVIOR

On mobile, do not force the poster into the desktop pinned height.

For screens <= 768px, use natural poster height.

Recommended:

```css
@media (max-width: 768px) {

    .mission-visual {
        width: 100%;
        height: auto;

        min-height: 0;

        margin-top: 40px;
    }


    .mission-image-frame {
        width: 100%;
        height: auto;

        min-height: 0;

        padding: 12px;

        display: flex;
        align-items: center;
        justify-content: center;
    }


    .mission-poster,
    .mission-image-frame .mission-image {
        width: 100%;
        height: auto;

        max-width: 100%;
        max-height: none;

        object-fit: contain !important;
        object-position: center;

        display: block;
    }

}
```

The user can scroll vertically on mobile, so let the portrait poster keep its natural aspect ratio.

Do not crop mobile posters either.

---

# 14. DO NOT BREAK THE PREVIOUS MOBILE FIXES

Do not reintroduce:

- desktop Mission Archive pinning on mobile
- absolute stacked records on mobile
- title overlap
- event/header overlap
- horizontal overflow
- fixed 100vh record heights
- poster clipping

---

# 15. TEST ALL FIVE EVENTS

Verify the complete poster for:

```text
01 — Automation Expo
02 — Roborift
03 — Robothon
04 — Ideaspark
05 — Ideaspark 2.0
```

For every poster confirm:

```text
top visible
bottom visible
left edge visible
right edge visible
no stretching
no cropping
no broken image
```

---

# 16. TEST SHORT DESKTOP HEIGHTS

This issue is especially important on laptops.

Test:

```text
1280 × 720
1366 × 768
1440 × 900
1600 × 900
1920 × 1080
```

Do not test only on a tall monitor.

The poster must remain fully visible even at:

```text
1280 × 720
```

while the archive is pinned.

---

# 17. ACCEPTANCE CONDITION

The issue is fixed only if:

> While a Mission Archive record is active and pinned, the complete event poster is visible from its top edge to its bottom edge without any internal scrolling and without leaving the event state.

If even a small part of the bottom is cut off, the issue is not fixed.

---

# 18. DO NOT MODIFY UNRELATED SECTIONS

Do not edit:

```text
Hero
About
Operations
Machines
Team
Contact
Preloader
```

unless required to fix a build error introduced by this specific change.

---

# 19. BUILD CHECK

After the fix run:

```bash
npm run build
```

Also check the browser console for:

```text
poster 404s
GSAP errors
ScrollTrigger warnings
duplicate IDs
null selectors
```

Fix any issue introduced by this task.

---

# 20. FINAL RESPONSE

After implementation, report:

1. files changed
2. exact CSS rule that caused the poster cropping
3. final `.mission-visual` height
4. final `.mission-image-frame` size
5. confirmation `object-fit: contain` is applied
6. confirmation all five posters are fully visible
7. confirmation desktop Mission Archive transitions still work
8. confirmation mobile poster display still works
9. result of `npm run build`

Do not return only a plan.

Actually implement and test the fix.
