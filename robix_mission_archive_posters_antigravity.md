# ROBIX Mission Archive — Hosted Events + Poster Integration
## Antigravity / Gemini 3.8 Flash Implementation Brief
## Project: ROBIX CRCE Website
## Stack: Vite + Vanilla JS + GSAP + ScrollTrigger

Your task is to update the EXISTING **Mission Archive / Field Records** section.

IMPORTANT:

- Preserve the current ROBIX visual style.
- Do not redesign this section into a different layout.
- Do not change unrelated sections.
- This section must represent **events hosted/organized by ROBIX**, not events in which ROBIX merely participated.
- Use the event posters already saved in:

```text
public/poster_for_events/
```

- Detect the actual poster filenames/extensions from that folder.
- Do not invent poster files or rename them unless absolutely necessary.

---

# 1. EXISTING VISUAL STYLE MUST REMAIN

Keep the current design language visible in the supplied screenshot:

- `ROBIX // MISSION ARCHIVE`
- large `FIELD RECORDS.`
- black background
- white typography
- small ROBIX red accents
- technical monospace labels
- archive counter in the upper-right
- event information on the left
- poster / visual archive frame on the right
- thin borders
- engineering-grid background
- current GSAP transition language
- current desktop composition

Do NOT convert the section into generic event cards.

The right side must remain the visual archive/poster display.

---

# 2. FIX THE CURRENT HEADER OVERLAP ISSUE

There is currently an overlap near the top-left where:

```text
MISSION // 04
```

and the section intro copy:

```text
Competitions, workshops and technical deployments
from the ROBIX archive.
```

are colliding with each other and with the large `FIELD RECORDS.` heading.

This must be fixed.

The section intro and the active event record must occupy clearly separate vertical zones.

Target structure:

```text
ROBIX // MISSION ARCHIVE

FIELD
RECORDS.

Events designed and hosted by ROBIX,
bringing robotics, engineering and innovation
experiences to participants across Mumbai.


                     01 ───────── 05


MISSION // 01

AUTOMATION
EXPO

...
```

The event content must start BELOW the section heading/intro.

Do not allow:

- `MISSION // XX` to sit on top of the section description
- event title to overlap `FIELD RECORDS.`
- counter to collide with the event title
- intro copy to overlap any animated record

---

# 3. DESKTOP SPACING FIX

Inspect the existing:

```text
.missions-header
.mission-counter
.missions-stage
.mission-record
.mission-copy
```

Do not blindly replace existing CSS, but ensure the final desktop layout has enough separation.

Preferred behavior:

```css
.missions-header {
  position: absolute;
  left: 5vw;
  top: 6vh;
  z-index: 20;
  max-width: 520px;
}

.missions-header p {
  max-width: 420px;
  margin-top: 20px;
  line-height: 1.6;
}

.mission-record {
  padding-top: clamp(250px, 30vh, 330px);
}
```

If the existing architecture uses different positioning, achieve the same result with the smallest necessary change.

The critical rule is:

```text
HEADER AREA
────────────
clear vertical gap
────────────
ACTIVE EVENT CONTENT
```

Do not solve this by hiding the section description.

---

# 4. UPDATE THE SECTION INTRO COPY

Replace participation/deployment-oriented wording.

Use:

```text
Events designed and hosted by ROBIX,
bringing robotics, engineering and innovation
experiences to participants across Mumbai.
```

or a visually equivalent line-break arrangement.

Do not use:

```text
Competitions, workshops and technical deployments
from the ROBIX archive.
```

This archive should communicate that ROBIX **hosts/organizes** these events.

---

# 5. EVENT ORDER — MUST BE EXACT

The Mission Archive must contain exactly these five events in this order:

```text
01 — AUTOMATION EXPO — 2025
02 — ROBORIFT        — 2025
03 — ROBOTHON        — 2025
04 — IDEASPARK       — 2026
05 — IDEASPARK 2.0   — 2026
```

Do not reorder by year automatically.

Do not sort alphabetically.

The current counter must become:

```text
01 / 05
02 / 05
03 / 05
04 / 05
05 / 05
```

The progress indicator must also use five states.

---

# 6. EVENT DATA

Use one source of truth in JavaScript if the current implementation supports it.

Recommended data:

```js
const missionData = [
  {
    id: "automation-expo",
    number: "01",
    name: "AUTOMATION EXPO",
    year: "2025",
    location: "MUMBAI",
    type: "ROBIX HOSTED EVENT",
    description:
      "A ROBIX-hosted technical event in Mumbai, created to bring participants together around robotics, engineering and automation.",
    poster: ""
  },

  {
    id: "roborift",
    number: "02",
    name: "ROBORIFT",
    year: "2025",
    location: "MUMBAI",
    type: "ROBIX HOSTED EVENT",
    description:
      "A ROBIX-hosted robotics event in Mumbai, built around hands-on competition, engineering and problem-solving.",
    poster: ""
  },

  {
    id: "robothon",
    number: "03",
    name: "ROBOTHON",
    year: "2025",
    location: "MUMBAI",
    type: "ROBIX HOSTED EVENT",
    description:
      "A ROBIX-hosted robotics event in Mumbai, bringing participants together for a focused technical and competitive experience.",
    poster: ""
  },

  {
    id: "ideaspark",
    number: "04",
    name: "IDEASPARK",
    year: "2026",
    location: "MUMBAI",
    type: "ROBIX HOSTED EVENT",
    description:
      "A ROBIX-hosted event in Mumbai designed to encourage technical ideas, experimentation and engineering creativity.",
    poster: ""
  },

  {
    id: "ideaspark-2",
    number: "05",
    name: "IDEASPARK 2.0",
    year: "2026",
    location: "MUMBAI",
    type: "ROBIX HOSTED EVENT",
    description:
      "The second Ideaspark edition hosted by ROBIX in Mumbai, continuing the team's focus on engineering ideas, creativity and hands-on innovation.",
    poster: ""
  }
];
```

These descriptions are intentionally broad.

Do not invent:

- participant counts
- winners
- venue names beyond Mumbai
- event duration
- number of teams
- sponsors
- prizes
- exact competition formats
- exact dates

unless such information already exists elsewhere in the project and is clearly verified.

---

# 7. DETECT ALL POSTERS

Inspect:

```text
public/poster_for_events/
```

The posters are labelled using the event names.

Detect and assign the correct actual paths.

Expected matching logic:

```text
Automation Expo  → file containing "automation" / "automation expo"
Roborift         → file containing "roborift"
Robothon         → file containing "robothon"
Ideaspark        → original Ideaspark file
Ideaspark 2.0    → file clearly labelled 2.0 / ideaspark 2
```

Extensions may be:

```text
.png
.jpg
.jpeg
.webp
```

Do not assume `.png`.

At completion, report the exact paths used.

If both `Ideaspark` and `Ideaspark 2.0` filenames are similar, verify carefully so they are not swapped.

---

# 8. POSTER DISPLAY — RIGHT-SIDE ARCHIVE FRAME

The user has specifically marked the existing right-side visual frame as the area where the event poster should appear.

Use the existing visual frame.

Do not create a second poster panel.

Replace:

```text
EVENT IMAGE // 04
```

or equivalent placeholder with the corresponding event poster.

Example structure:

```html
<div class="mission-image-frame">

  <img
    class="mission-poster"
    src="/poster_for_events/..."
    alt="Automation Expo 2025 event poster"
  >

</div>
```

Use:

```css
.mission-poster {
  width: 100%;
  height: 100%;

  object-fit: contain;
  object-position: center;

  display: block;
}
```

IMPORTANT:

Posters should **not be cropped**.

Do not use:

```css
object-fit: cover;
```

for posters unless the poster dimensions happen to exactly match the frame.

The entire poster should remain readable.

---

# 9. POSTER FRAME BACKGROUND

Since posters may use different aspect ratios, preserve the archive frame and give it a subtle neutral background.

Recommended:

```css
.mission-image-frame {
  background:
    radial-gradient(
      circle at 50% 50%,
      rgba(255, 40, 40, 0.025),
      transparent 60%
    ),
    #060607;
}
```

Do not add a white background behind posters unless the poster itself contains white.

---

# 10. POSTER ENTRANCE ANIMATION

When an event changes:

1. shutters close using the current archive transition
2. event data switches
3. poster source switches
4. shutters reopen
5. poster fades/scales gently into place

Suggested poster animation:

```js
gsap.fromTo(
  activePoster,
  {
    opacity: 0,
    scale: 0.975
  },
  {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    ease: "power3.out"
  }
);
```

Do not add:

- dramatic rotations
- 3D card flips
- huge zooms
- random glitch effects

Preserve the current mechanical archive behavior.

---

# 11. POSTER PRELOADING

Preload all five poster assets once the section initializes.

Example:

```js
missionData.forEach(event => {
  if (!event.poster) return;

  const image = new Image();
  image.src = event.poster;
});
```

This prevents a blank frame when the shutters reopen.

---

# 12. POSTER LOAD FAILURE

If a poster path is missing or fails:

Do not show a browser broken-image icon.

Show:

```text
ARCHIVE VISUAL // UNAVAILABLE
```

inside the existing visual frame.

Also log:

```js
console.error(
  "ROBIX mission poster failed:",
  posterPath
);
```

---

# 13. LEFT-SIDE EVENT INFORMATION

Each record should use:

```text
MISSION // 01

ROBIX HOSTED EVENT

AUTOMATION
EXPO

description

┌──────────────────┬──────────────────┐
│ YEAR             │ LOCATION         │
│ 2025             │ MUMBAI           │
├──────────────────┼──────────────────┤
│ HOST             │ STATUS           │
│ ROBIX            │ ARCHIVED         │
└──────────────────┴──────────────────┘
```

Use the same current 2x2 technical data grid.

Use these fields:

```text
YEAR
LOCATION
HOST
STATUS
```

Values:

```text
YEAR      event year
LOCATION  MUMBAI
HOST      ROBIX
STATUS    ARCHIVED
```

Do not use:

```text
PARTICIPANTS
RESULT
UNIT
DURATION
```

unless those are genuinely known.

The archive is now about **events hosted by ROBIX**, not machine deployments.

---

# 14. EVENT TITLES

Allow event names to wrap cleanly.

Examples:

```text
AUTOMATION
EXPO
```

```text
ROBORIFT
```

```text
ROBOTHON
```

```text
IDEASPARK
```

```text
IDEASPARK
2.0
```

Do not force every title into two lines.

Do not allow title text to overlap the section heading.

---

# 15. CURRENT DESKTOP ARCHIVE NAVIGATION

Preserve the current archive navigation behavior.

If the existing section transitions event records through scroll:

```text
01
↓
02
↓
03
↓
04
↓
05
```

keep it.

Update the existing loop/timeline from 4 records to 5.

Do not leave hardcoded logic such as:

```js
records.length === 4
```

or:

```text
04
```

as the total.

Everything should use:

```js
records.length
```

or:

```js
missionData.length
```

where possible.

---

# 16. COUNTER AND PROGRESS BAR

Update the top-right archive counter.

Current total:

```text
04
```

New total:

```text
05
```

Progress percentages for five events:

```text
01 → 20%
02 → 40%
03 → 60%
04 → 80%
05 → 100%
```

Use dynamic calculation:

```js
const progress =
  ((currentIndex + 1) / missionData.length) * 100;
```

Do not hardcode 25% increments.

---

# 17. MOBILE BEHAVIOR

The previous mobile responsiveness task should remain intact.

On screens <= 768px:

- disable heavy Mission Archive pinning if already implemented that way
- records must flow vertically
- section title must not overlap mission titles
- poster must appear below event information
- poster width must be 100%
- poster height should be auto or an appropriate contained frame
- no horizontal overflow
- no archive shutter animation if it breaks mobile flow

Recommended poster mobile treatment:

```css
@media (max-width: 768px) {

  .mission-image-frame {
    width: 100%;
    height: auto;

    min-height: 0;

    aspect-ratio: auto;

    padding: 14px;
  }

  .mission-poster {
    width: 100%;
    height: auto;

    max-height: none;

    object-fit: contain;
  }

}
```

If maintaining a fixed technical frame is visually important, use a generous portrait-friendly height but do not crop the poster.

---

# 18. DO NOT BREAK CURRENT MOBILE FIXES

Do not reintroduce:

- absolute stacked mission records on mobile
- `100vh` mission record heights
- desktop archive pinning on mobile
- title collision
- counter collision
- poster clipping
- horizontal page overflow

---

# 19. ACCESSIBILITY

Every poster must have meaningful `alt` text.

Use:

```text
Automation Expo 2025 poster
Roborift 2025 poster
Robothon 2025 poster
Ideaspark 2026 poster
Ideaspark 2.0 2026 poster
```

Do not use empty alt text for event posters.

---

# 20. TRANSFORMERS / ROBIX THEME

Preserve the current ROBIX mechanical archive visual language.

You may enhance the poster frame very subtly with:

- scanner line
- archive index labels
- thin red energy edge
- tiny system labels
- angular frame cuts

Do not add characters, Autobot logos, Decepticon logos, or external franchise branding.

The theme should continue to come from:

```text
archive terminal
mechanical shutters
scan system
technical labels
ROBIX red energy
```

---

# 21. ACCEPTANCE TESTS

## Event order

Verify exactly:

```text
01 Automation Expo — 2025
02 Roborift — 2025
03 Robothon — 2025
04 Ideaspark — 2026
05 Ideaspark 2.0 — 2026
```

## Location

Every event displays:

```text
MUMBAI
```

## Host

Every event displays:

```text
ROBIX
```

## Posters

Each event displays the correct poster from:

```text
public/poster_for_events/
```

No poster is swapped.

No poster is cropped.

No broken-image icon appears.

## Header overlap

Verify the issue visible in the supplied screenshot is gone:

- section description does not overlap `MISSION // XX`
- event title does not overlap `FIELD RECORDS.`
- event description does not sit inside the large heading
- counter remains separated

## Counter

Verify:

```text
01 / 05
02 / 05
03 / 05
04 / 05
05 / 05
```

## Mobile

At:

```text
360px
390px
412px
430px
768px
```

verify:

- no title overlap
- no horizontal overflow
- full poster visible
- text readable
- normal vertical flow

---

# 22. BUILD + CONSOLE

Run:

```bash
npm run build
```

Fix all build errors.

Also resolve:

- poster 404 errors
- GSAP errors
- ScrollTrigger warnings
- duplicate IDs
- null selectors
- mobile overflow

---

# 23. FINAL ANTIGRAVITY RESPONSE

After implementation, report only:

1. files changed
2. exact poster paths detected in `public/poster_for_events/`
3. mapping of each poster to its event
4. confirmation of the exact five-event order
5. confirmation all events display `MUMBAI`
6. confirmation all descriptions now frame ROBIX as the host/organizer
7. confirmation the header/event overlap issue was fixed
8. confirmation posters are fully contained and not cropped
9. confirmation desktop archive transitions still work
10. confirmation mobile layout still works
11. result of `npm run build`
12. any missing poster or content requiring manual input

Do not return only a plan.

Actually modify and test the project.
