# ROBIX Crew Section Refactor
## Target: Nemo 3 Ultra via OpenCode
## Scope: Team/Crew section only

Refactor the existing ROBIX Crew/Team section.

Inspect the existing implementation first and reuse the current HTML/data/CSS/JS architecture. Do not redesign the visual language from scratch.

Likely relevant files:
- index.html
- src/styles/team.css
- src/styles/mobile.css
- src/animations/team.js
- any existing team data file

---

## Goal

The current Crew section is divided by department tabs:
- Technical
- Mechanical
- Electronics
- Media + Documentation

Replace that department-based navigation with only:

```text
01 — LEADS + CO-LEADS
02 — MEMBERS
```

Keep Founder & Advisors as a separate introductory section above those tabs.

---

## Final hierarchy

```text
THE CREW.

Different systems. One machine.

FOUNDER & ADVISORS
[Founder]
[Advisors]

--------------------------------

[ 01 LEADS + CO-LEADS ]   [ 02 MEMBERS ]
```

---

## Founder & Advisors

Keep Founder and Advisors separate from both Leads and Members.

Founder:
- Aman Dsouza

Advisors:
- Caleb Lewis
- Naimish Purohit

Preserve their existing:
- image
- LinkedIn
- GitHub
- email
- role information

Do not classify them as members.

---

## Leads + Co-Leads

This tab should contain everyone whose role is:

```text
lead
co-lead
```

Important structure:

Technical:
- Lead only
- NO Technical Co-Lead

Mechanical:
- Lead
- Co-Lead

Electronics:
- Lead
- Co-Lead

Events / Media / Documentation:
- Lead
- Co-Lead

Do not hardcode people separately if the existing team dataset already contains:

```text
role
roleTitle
department
```

Filter the existing data.

Example:

```js
const leadership = teamMembers.filter(
  person =>
    person.role === "lead" ||
    person.role === "co-lead"
);
```

---

## Members

This tab should contain everyone whose role is:

```text
member
```

Example:

```js
const members = teamMembers.filter(
  person => person.role === "member"
);
```

Do not include:
- Founder
- Advisors
- Leads
- Co-Leads

inside Members.

---

## Keep departments as metadata

Departments should NOT disappear.

They should appear as a small label inside each person's card.

Examples:

```text
DEPT // TECHNICAL
DEPT // MECHANICAL
DEPT // ELECTRONICS
DEPT // EVENTS + MEDIA
```

or preserve the current ROBIX technical naming style if equivalent styling already exists.

Each leadership card should conceptually show:

```text
DEPT // TECHNICAL
TECHNICAL LEAD

YASH KIRAN DHASAL

[LinkedIn] [GitHub] [Email]
```

Do not use department tabs anymore.

---

## Card hierarchy

Leads + Co-Leads should have larger, more prominent cards.

Members should use a denser grid.

Desktop target:

```text
LEADS + CO-LEADS

[ LARGE CARD ] [ LARGE CARD ]
[ LARGE CARD ] [ LARGE CARD ]


MEMBERS

[ MEMBER ] [ MEMBER ] [ MEMBER ]
[ MEMBER ] [ MEMBER ] [ MEMBER ]
```

Keep the current ROBIX black/red/white technical styling.

Reuse:
- borders
- red accents
- technical labels
- grid background
- current typography
- existing hover animations where useful

Do not turn this into generic cards.

---

## Tab design

Replace the current four department tabs with:

```text
┌────────────────────────────┬────────────────────────────┐
│ 01                         │ 02                         │
│ LEADS + CO-LEADS           │ MEMBERS                    │
└────────────────────────────┴────────────────────────────┘
```

Each should take roughly 50% width.

Keep the existing red active underline / active-state language.

When switching tabs:
- move the red indicator smoothly
- subtly fade/slide outgoing cards
- reveal incoming cards using the existing mechanical ROBIX motion language
- avoid large movements

---

## Subtitle

Replace:

```text
Four departments. One machine.
```

with:

```text
Different systems. One machine.
```

---

## Mobile

Make the new structure responsive.

On mobile:

Leadership:
- 1 large card per row

Members:
- preferably 2 compact cards per row
- fall back to 1 column on very narrow screens if needed

Tabs:
- side-by-side if they fit cleanly
- otherwise stack vertically

Do not allow:
- horizontal overflow
- overlapping names
- clipped photos
- department labels outside cards

---

## Data

Do NOT rewrite or delete the existing team-member dataset.

Use the existing data as the source of truth.

Preserve:
- names
- roles
- role titles
- department
- images
- LinkedIn
- GitHub
- email

Only change how people are grouped and rendered.

---

## Do not modify

Do not change:
- Hero
- About
- Operations
- Machines
- Mission Archive
- Contact
- Preloader

Only modify the Crew/Team implementation and necessary mobile team styles.

---

## Final check

After implementation verify:

1. Founder & Advisors appear separately
2. Only two team tabs remain:
   - Leads + Co-Leads
   - Members
3. Technical has only its Lead
4. Other leadership roles render from existing data
5. Members appear only under Members
6. Departments still appear as card metadata
7. Social links still work
8. Desktop layout remains consistent with current ROBIX design
9. Mobile layout has no overflow
10. `npm run build` succeeds

Implement the changes directly. Do not just explain what should be changed.
