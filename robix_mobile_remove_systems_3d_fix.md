# ROBIX Mobile Systems Section — Remove 3D Model
## Antigravity / Gemini 3.8 Flash Implementation Brief
## Scope: Mobile-only fix
## Stack: Vite + Vanilla JS + GSAP + Three.js (desktop only)

Your task is to remove the Systems-section 3D render entirely on mobile devices while preserving it on desktop.

Do not redesign the section.

Do not change the desktop Systems layout, cards, typography, spacing, animation, or 3D presentation.

The mobile issue is that the 3D render overlaps the department cards and reduces readability.

---

# 1. CURRENT BUG

On mobile, the 3D render appears behind/over the department cards, especially around:

```text
MECHANICAL
```

and nearby system cards.

This causes visual clutter and overlap.

Required result:

> On mobile, the 3D render must not appear at all.

The four department cards should remain visible and unobstructed.

---

# 2. INSPECT BEFORE EDITING

Inspect:

```text
index.html
src/styles/about.css
src/styles/mobile.css
src/animations/about.js
src/main.js
```

Also inspect the code that initializes the Systems 3D model.

Look for classes or functions such as:

```text
.system-core-3d
.systems-core
.system-model
.systems-model
.system-canvas
initSystemsModel()
```

Use the actual project class/function names.

Do not create duplicate 3D wrappers.

---

# 3. HIDE THE 3D WRAPPER ON MOBILE

Inside:

```text
src/styles/mobile.css
```

add a mobile override using the real wrapper class.

If the wrapper is:

```html
<div class="system-core-3d">
```

use:

```css
@media (max-width: 768px) {

    .system-core-3d {
        display: none !important;
    }

}
```

If the real class differs, adapt the selector accordingly.

Do not hide the department cards.

Do not hide the Systems section itself.

---

# 4. IMPORTANT — STOP THREE.JS FROM INITIALIZING ON MOBILE

CSS hiding alone is not enough.

If Three.js is initialized on mobile, it may continue rendering in the background even though the canvas is hidden.

Find code similar to:

```js
initSystemsModel();
```

Change it so the 3D model initializes only on desktop:

```js
const desktop3D =
    window.matchMedia(
        "(min-width: 769px)"
    );


if (desktop3D.matches) {
    initSystemsModel();
}
```

If initialization currently happens inside another function, preserve the architecture and add the same desktop guard.

Do not initialize the renderer on mobile.

---

# 5. DO NOT BREAK DESKTOP

On screens >= 769px:

- the 3D model must still appear
- existing animation must still work
- existing position must remain unchanged
- cards must remain unchanged
- no redesign

Desktop behavior should be identical to before this fix.

---

# 6. MOBILE CARD LAYOUT MUST REMAIN CLEAN

After removing the 3D model, verify that the four system cards still display correctly.

Target:

```text
TECHNICAL     MECHANICAL

ELECTRONICS   MEDIA +
+ HARDWARE    DOCUMENTATION
```

Do not allow leftover absolute positioning from the 3D model to reserve a large empty space.

If necessary, ensure the card wrapper on mobile uses:

```css
@media (max-width: 768px) {

    .systems-grid,
    .system-cards {
        position: relative;

        width: 100%;
        max-width: 100%;

        z-index: 2;
    }

}
```

Only apply this if the current repository uses these selectors.

Do not invent new layout classes unnecessarily.

---

# 7. REMOVE MOBILE-ONLY MODEL LABELS IF THEY BELONG TO THE 3D OBJECT

If labels such as:

```text
CORE
STATUS
CENTRAL CORE
```

are visually attached to the 3D render and remain floating after the model is hidden, hide those on mobile too.

Example:

```css
@media (max-width: 768px) {

    .system-core-label,
    .system-core-status {
        display: none !important;
    }

}
```

Use the real selectors from the project.

Do not hide unrelated section labels.

---

# 8. DO NOT REMOVE THE CENTRAL LOGO UNLESS IT IS PART OF THE 3D CANVAS

If there is a separate static ROBIX logo that belongs to the section design, keep it unless it also overlaps cards.

Only remove the actual 3D render and model-specific overlays.

---

# 9. PERFORMANCE REQUIREMENT

On mobile, there should be:

```text
no WebGL renderer
no Three.js animation loop
no model loading
no GLTF loading
no model texture loading
```

This is not only a visual fix.

It should also reduce:

- GPU usage
- battery usage
- mobile load time
- unnecessary memory use

---

# 10. TEST WIDTHS

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

- no 3D render visible
- no model labels floating
- no card overlap
- Technical card readable
- Mechanical card readable
- Electronics + Hardware readable
- Media + Documentation readable
- no horizontal overflow
- no large empty block where the model used to be

---

# 11. DESKTOP TEST

Test at:

```text
1366 × 768
1440 × 900
1920 × 1080
```

Verify:

- 3D render still appears
- 3D animation still works
- desktop layout unchanged

---

# 12. DO NOT MODIFY UNRELATED SECTIONS

Do not edit:

```text
Hero
Machines
Missions
Team
Contact
Preloader
```

unless necessary to fix a build error introduced by this specific change.

---

# 13. BUILD CHECK

Run:

```bash
npm run build
```

Fix any build error.

Also check the browser console for:

```text
Three.js errors
GLTFLoader errors
null selectors
duplicate initialization
WebGL warnings
```

---

# 14. FINAL RESPONSE

After implementation report:

1. files changed
2. exact 3D wrapper selector hidden on mobile
3. exact Three.js initialization guard added
4. confirmation model does not initialize on mobile
5. confirmation department cards no longer overlap
6. confirmation desktop 3D remains unchanged
7. tested mobile widths
8. result of `npm run build`

Do not return only a plan.

Actually implement and test the fix.
