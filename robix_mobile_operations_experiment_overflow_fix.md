# ROBIX Mobile Operations Title Overflow Fix
## Antigravity / Gemini 3.8 Flash Implementation Brief
## Scope: Fix mobile overflow/alignment of long operation titles only
## Stack: Vite + Vanilla JS + GSAP

Your task is to fix the mobile layout problem in the existing **WHAT WE DO / Operations** section where the title:

```text
EXPERIMENT
```

extends beyond the right edge of the phone viewport.

The desktop layout must remain unchanged.

Do not redesign the Operations section.
Do not change the operation order.
Do not change the desktop animation.
Do not modify unrelated sections.

---

# 1. CURRENT BUG

On mobile, the active Operation 04 card shows:

```text
OPERATION // 04

EXPERIMENT
```

but the word `EXPERIMENT` is too large for the available content width and extends beyond the right edge of the viewport.

The issue is visible even though the outer technical frame itself fits on-screen.

Required result:

```text
OPERATION // 04

EXPERIMENT
```

must remain fully visible inside the existing frame.

The title should remain large and visually dominant, but must not overflow.

---

# 2. INSPECT EXISTING FILES

Inspect:

```text
src/styles/operations.css
src/styles/mobile.css
src/animations/operations.js
index.html
```

Locate the actual selectors used for:

```text
operation card
operation content
operation title
operation visual
```

Likely selectors may resemble:

```css
.operation-card
.operation-copy
.operation-title
.operation-content
.operation-panel
```

Use the actual project selectors.

Do not create duplicate operation sections.

---

# 3. FIX THE MOBILE CONTENT WIDTH

On screens <= 768px, ensure the text container is allowed to shrink properly.

Use the real content wrapper selector and apply the equivalent of:

```css
@media (max-width: 768px) {

    .operation-copy,
    .operation-content {
        width: 100%;
        max-width: 100%;
        min-width: 0;
    }

}
```

`min-width: 0` is important when the parent is a grid/flex layout.

Do not let an inherited desktop `min-width` force the content wider than the viewport.

---

# 4. FIX THE OPERATION TITLE SIZE

Find the current mobile title rule.

If it is using a very large value such as:

```css
font-size: 16vw;
font-size: 18vw;
font-size: clamp(4rem, 16vw, 8rem);
```

replace the mobile rule with approximately:

```css
@media (max-width: 768px) {

    .operation-title,
    .operation-copy h3 {
        width: 100%;
        max-width: 100%;

        margin: 0;

        font-size:
            clamp(
                2.8rem,
                12.5vw,
                4.1rem
            );

        line-height: 0.86;

        letter-spacing: -0.065em;

        white-space: normal;

        word-break: normal;
        overflow-wrap: normal;
    }

}
```

Adapt the selector to the real project.

Do NOT use:

```css
word-break: break-all;
```

The word must not become:

```text
EXPERI
MENT
```

The fix must come from responsive sizing.

---

# 5. NARROW-PHONE OVERRIDE

For smaller phones, add:

```css
@media (max-width: 390px) {

    .operation-title,
    .operation-copy h3 {
        font-size:
            clamp(
                2.65rem,
                11.8vw,
                3.5rem
            );
    }

}
```

Only apply this to the Operations title.

Do not reduce large typography globally.

---

# 6. CHECK FOR `WHITE-SPACE: NOWRAP`

Search the operation title styles for:

```css
white-space: nowrap;
```

If present on the mobile title, remove/override it:

```css
@media (max-width: 768px) {

    .operation-title,
    .operation-copy h3 {
        white-space: normal;
    }

}
```

For the current title `EXPERIMENT`, it should still remain one line because the font size now fits.

---

# 7. CHECK THE MOBILE GRID/FLEX LAYOUT

The desktop Operations section may have text and a mechanical visual sharing the same row.

On mobile, the decorative visual must not steal width from the title.

If the current mobile layout still uses something like:

```css
grid-template-columns: 1fr 1fr;
```

change the mobile operation content to one column:

```css
@media (max-width: 768px) {

    .operation-layout,
    .operation-panel {
        grid-template-columns: 1fr;
    }

}
```

Use the actual project selector.

If the mechanical graphic is absolutely positioned, it may remain as background decoration, but it must not reduce the text container width.

---

# 8. KEEP THE DECORATIVE MECHANICAL GRAPHIC BEHIND CONTENT

The red/black mechanical shape visible on the right may remain on mobile.

However:

- it must not control the width of the text
- it must not push `EXPERIMENT` off-screen
- it must remain behind the content
- it should have lower opacity if it hurts readability

If required:

```css
@media (max-width: 768px) {

    .operation-visual {
        position: absolute;
        right: -20%;
        top: 50%;

        max-width: 55%;

        opacity: 0.35;

        pointer-events: none;

        z-index: 0;
    }

    .operation-copy {
        position: relative;

        z-index: 2;
    }

}
```

Use the actual selectors and preserve the current design.

Do not remove the visual unless it is impossible to keep it without breaking layout.

---

# 9. KEEP THE OUTER TECHNICAL FRAME

Do not modify/remove the current white corner frame.

The title should fit naturally inside it.

The final mobile composition should remain approximately:

```text
┌─────────────────────────────┐
│                             │
│ OPERATION // 04             │
│                             │
│ EXPERIMENT                  │
│                             │
│ We prototype, test and      │
│ explore new technologies... │
│                             │
│ [PROTOTYPING] [R&D]         │
│ [SENSORS]                   │
│ [EXPERIMENTATION]           │
│                             │
└─────────────────────────────┘
```

---

# 10. VERIFY ALL OPERATION TITLES

Do not only test Experiment.

Check every operation title in the section.

Ensure:

- BUILD fits
- COMPETE fits
- TEACH fits
- EXPERIMENT fits

or whichever operation names exist in the current project.

Shorter titles must not become unnecessarily tiny.

---

# 11. KEEP DESCRIPTION AND TAGS INSIDE VIEWPORT

Verify the description and tags such as:

```text
PROTOTYPING
R&D
SENSORS
EXPERIMENTATION
```

remain inside the frame.

Allow tags to wrap naturally:

```css
@media (max-width: 768px) {

    .operation-tags {
        display: flex;
        flex-wrap: wrap;

        gap: 8px;
    }

}
```

Do not force one-line tag rows wider than the viewport.

---

# 12. DO NOT MODIFY DESKTOP

All fixes must be inside mobile breakpoints.

Desktop should retain:

- current title scale
- current pinned/animated behavior
- current visual positioning
- current frame
- current transitions

Do not change desktop unless a rule is accidentally shared and must be scoped correctly.

---

# 13. MOBILE TEST SIZES

Test:

```text
360px
375px
390px
412px
430px
768px
```

At each width confirm:

- `EXPERIMENT` fully visible
- no horizontal page overflow
- operation title does not touch/cross right viewport edge
- description remains readable
- tags remain inside frame
- decorative visual does not cover title
- outer technical frame remains intact

---

# 14. BUILD CHECK

Run:

```bash
npm run build
```

Fix any build issue introduced by this task.

---

# 15. FINAL RESPONSE

After implementation report:

1. files changed
2. actual selector used for the operation title
3. final mobile font-size rule
4. whether any desktop `min-width` / grid rule caused the issue
5. confirmation `EXPERIMENT` fits at all tested mobile widths
6. confirmation other operation titles were checked
7. result of `npm run build`

Do not return only a plan.

Actually implement and test the fix.
