# ROBIX Mobile Mission Archive — Simplified Event + Full Poster Fix
## Target: Gemini 3.8 Medium Flash
## Scope: Mobile only

Fix the MOBILE Mission Archive layout only.

The current issue is that the poster is not showing properly and too much information is competing for vertical space.

Do not change desktop.

---

## Required mobile layout

On mobile, show ONLY:

```text
EVENT NAME

one short one-line description

[ FULL POSTER ]
```

Hide on mobile:

```text
MISSION // XX
ROBIX HOSTED EVENT
LOCATION
STATUS
YEAR
HOST
ARCHIVE // VISUAL RECORD
FILE // XXX
```

Keep all of those on desktop.

---

## Poster requirements

The poster must always be visible.

A smaller complete poster is better than a large cropped poster.

Use approximately:

```css
@media (max-width: 768px) {

    .mission-visual-frame {
        width: 100%;

        height:
            clamp(
                220px,
                30svh,
                280px
            );

        overflow: hidden;
    }

    .mission-poster-stage {
        position: relative;

        width: 100%;
        height: 100%;
    }

    .mission-poster,
    .mission-poster-current,
    .mission-poster-next {
        position: absolute;

        inset: 0;

        width: 100% !important;
        height: 100% !important;

        object-fit: contain !important;
        object-position: center;

        display: block !important;
    }

}
```

---

## Important debugging

The poster is currently invisible, so inspect the real computed styles and fix any conflicting mobile rule such as:

```text
height: 0
collapsed parent height
opacity: 0
visibility: hidden
display: none
wrong z-index
clip-path still hiding the poster
height: auto on an absolutely positioned image
```

The resting state of the ACTIVE poster must be:

```css
opacity: 1;
visibility: visible;
clip-path: inset(0 0 0 0);
```

---

## Mobile text layout

Keep only the event title and a short description.

Example:

```text
ROBORIFT

Hands-on robotics competition focused on engineering and problem-solving.
```

Use short mobile-only descriptions so the poster gets more space.

Recommended mobile descriptions:

```text
AUTOMATION EXPO
A ROBIX-hosted technical event focused on robotics and automation.

ROBORIFT
Hands-on robotics competition focused on engineering and problem-solving.

ROBOTHON
A robotics event focused on competition and engineering execution.

IDEASPARK
An innovation event focused on engineering ideas and creativity.

IDEASPARK 2.0
The next Ideaspark edition focused on practical innovation and engineering.
```

---

## Keep existing behavior

Do NOT remove:

```text
single pinned mobile event viewer
one event visible at a time
scanner wipe
zero-gap next-poster reveal
Cybertronian/decrypt transition
scroll-driven event switching
```

Only simplify the layout.

---

## Final mobile structure

Target:

```text
ROBORIFT

Hands-on robotics competition focused on engineering and problem-solving.

┌──────────────────────────┐
│                          │
│        FULL POSTER       │
│                          │
└──────────────────────────┘
```

The full poster must fit from top edge to bottom edge.

---

## Testing

Test at:

```text
360px
390px
430px
```

Confirm:

- title visible
- one-line description visible
- full poster visible
- no cropped poster
- no missing poster
- no horizontal overflow
- scanner transition still works
- Cybertronian decrypt still works
- desktop remains unchanged

Run:

```bash
npm run build
```

Actually implement and test the fix.
