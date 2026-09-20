# ROBIX Mobile Mission Archive — Top-Aligned Info + Small Visible Poster Fix

## Goal
Adjust the **mobile Mission Archive** implementation so the active event content starts near the **top of the screen**, not vertically centered, and the **poster is always visible below the information** as a smaller framed visual.

This is a refinement of the previous mobile pinned archive viewer.

---

## 1. Problem to fix

The current mobile implementation is still wrong because:

- the event information block is sitting too far down, visually centered in the screen
- the poster is either missing, pushed too low, clipped, or not visible within the pinned stage
- the layout feels like a giant centered card instead of a top-driven mobile information panel

That is not the intended UX.

---

## 2. Correct mobile layout behavior

On mobile, the pinned Mission Archive viewer should behave like this:

```text
MISSION // 02
ROBIX HOSTED EVENT

ROBORIFT

description...

YEAR        LOCATION
2025        MUMBAI

HOST        STATUS
ROBIX       ARCHIVED

[ small poster frame visible here ]
```

Important:

- The **information must start near the top** of the pinned section.
- The **poster must be visible in the same screen area below the metadata**.
- The poster does **not** need to fill the entire screen.
- The poster should be **smaller, cleaner, and clearly framed**.

---

## 3. Layout rule change

The previous mobile stage used vertical centering logic such as:

```css
justify-content: center;
```

That is the reason the content is sitting in the middle.

For mobile Mission Archive, do **not** vertically center the viewer.

Instead:

- align content to the top
- use a compact vertical stack
- keep enough room below metadata so the poster appears inside the same pinned stage

---

## 4. Required CSS changes in `src/styles/mobile.css`

Find the mobile rules for the Mission Archive stage and replace the centering behavior.

Use this structure:

```css
@media (max-width: 768px) {

    .mission-mobile-stage {
        position: relative;
        width: 100%;
        min-height: 100svh;

        padding: 22px 20px 28px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;

        overflow: hidden;
    }

}
```

Key fix:

```css
justify-content: flex-start;
```

not:

```css
justify-content: center;
```

---

## 5. Constrain the content block so it sits at the top

Use:

```css
@media (max-width: 768px) {

    .mission-copy {
        width: 100%;
        max-width: 100%;
        min-width: 0;

        margin-top: 0;
        padding-top: 6px;
    }

    .mission-kicker,
    .mission-type,
    .mission-index-label {
        margin-bottom: 8px;
    }

    .mission-title {
        width: 100%;
        max-width: 100%;

        margin-top: 10px;
        margin-bottom: 14px;

        font-size: clamp(2.4rem, 10.5vw, 3.8rem);
        line-height: 0.92;
        letter-spacing: -0.06em;

        white-space: normal;
        overflow-wrap: break-word;
        word-break: normal;
    }

    .mission-description {
        margin-top: 0;
        margin-bottom: 18px;

        font-size: 0.98rem;
        line-height: 1.6;
    }

}
```

This keeps the event info compact and top-first.

---

## 6. Keep metadata compact so the poster has room

Use:

```css
@media (max-width: 768px) {

    .mission-data {
        width: 100%;
        margin-top: 0;
        margin-bottom: 16px;

        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .mission-data > * {
        min-width: 0;
    }

    .mission-stat,
    .mission-meta-cell {
        padding: 12px 10px;
    }

}
```

Do not let the metadata grow too tall.

---

## 7. Make the poster smaller and always visible

This is the important part.

The poster should not try to consume the full remaining screen height. That is causing failure on mobile.

Use a smaller controlled frame.

Replace current mobile poster sizing with:

```css
@media (max-width: 768px) {

    .mission-visual {
        width: 100%;
        margin-top: 8px;
        min-height: 0;

        display: flex;
        flex-direction: column;
    }

    .mission-visual-frame {
        position: relative;
        width: 100%;

        height: clamp(180px, 26vh, 260px);
        min-height: 180px;

        overflow: hidden;
    }

    .mission-poster-stage {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .mission-poster,
    .mission-poster-current,
    .mission-poster-next {
        position: absolute;
        inset: 0;

        width: 100%;
        height: 100%;

        object-fit: contain;
        object-position: center;
    }

}
```

This ensures:

- the poster is visibly present
- the poster is smaller
- the poster does not dominate the entire mobile screen
- the scanner transition can still happen inside the frame

---

## 8. If the poster label / footer text is stealing vertical space, tighten it

If there is archive footer text like:

```text
ARCHIVE // VISUAL RECORD
FILE // 002
```

keep it, but compress the spacing.

Use:

```css
@media (max-width: 768px) {

    .mission-visual-label,
    .mission-poster-caption,
    .mission-visual-footer {
        margin-bottom: 6px;
        font-size: 0.62rem;
        letter-spacing: 0.22em;
    }

}
```

Do not let labels push the poster out of view.

---

## 9. Make sure the mobile pinned stage has enough top anchoring

If the ScrollTrigger pin is keeping the stage visually too low, ensure the pinned content itself is top-stacked.

The mobile viewer must feel like a top-aligned data panel, not a centered hero block.

If needed, add:

```css
@media (max-width: 768px) {

    .mission-mobile-stage-inner {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        height: 100%;
    }

}
```

If your existing structure uses a different wrapper name, adapt this rule to the real wrapper.

---

## 10. Preserve the mobile transition behavior

Do **not** remove the mobile pinned transition system.

Keep:

- one event visible at a time
- scanner wipe transition
- zero-gap poster switching
- Cybertronian / decrypt text transition
- scroll-driven event changes

Only change the **layout and sizing** so that:

1. info is top-aligned
2. poster is visible below it
3. poster is smaller and controlled

---

## 11. Recommended mobile visual proportions

Use this rough vertical distribution:

```text
Top info area:      ~55% to 60%
Poster frame:       ~25% to 30%
Footer labels/misc: ~5% to 10%
```

That is much better than trying to give the poster half or more of the entire pinned screen on mobile.

---

## 12. What should NOT happen anymore

After the fix, mobile should NOT show:

- event content vertically centered in the middle of the screen
- large empty space above the event info
- poster missing entirely
- poster pushed below the viewport
- poster collapsing into a thin strip
- poster taking over the entire screen

---

## 13. Acceptance test

Test mobile widths:

```text
360px
375px
390px
412px
430px
```

Confirm:

### Layout
- event info starts near the top
- title is visible immediately
- description is visible
- metadata grid is visible
- poster is visible below metadata
- poster is smaller, not oversized
- no horizontal overflow

### Transition
- poster still changes with scanner wipe
- no blank frame
- text still decrypts/scrambles during transition
- only one event visible at a time

### Scroll
- Automation Expo → Roborift → Robothon → Ideaspark → Ideaspark 2.0
- final event still releases cleanly into the next section

### Desktop
- desktop Mission Archive remains unchanged

---

## 14. Build check

Run:

```bash
npm run build
```

Fix any issues before finalizing.

---

## 15. Final response required

After implementation, report:

1. files changed
2. top alignment applied on mobile
3. vertical centering removed
4. poster frame made smaller and visible
5. scanner transition still works
6. Cybertronian transition still works
7. final mobile widths tested
8. `npm run build` result

Actually implement the changes. Do not return only a plan.
