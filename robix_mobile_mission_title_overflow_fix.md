# ROBIX Mobile Mission Title Overflow Fix
## Antigravity / Gemini 3.8 Flash Implementation Brief
## Scope: Fix mobile event-title overflow in Mission Archive only
## Stack: Vite + Vanilla JS + GSAP

Your task is to fix the Mission Archive mobile heading issue where long event names such as:

```text
AUTOMATION
EXPO
```

overflow beyond the right edge of the phone screen.

Do not redesign the Mission Archive.

Do not change desktop styling.

Do not change event order, posters, descriptions, counters, archive transitions, or any unrelated section.

---

# 1. CURRENT BUG

On mobile, the event title is too large for narrow screens.

Example:

```text
AUTOMATION → extends outside viewport
EXPO
```

This happens because the mobile `.mission-copy h3` font size is currently too aggressive for long words such as `AUTOMATION`.

The title must remain large and visually strong, but it must fit inside the viewport.

---

# 2. INSPECT EXISTING CSS

Open:

```text
src/styles/missions.css
src/styles/mobile.css
```

Search for:

```css
.mission-copy h3
```

There may already be a mobile rule such as:

```css
@media (max-width: 768px) {

  .mission-copy h3 {
    font-size:
      clamp(
        3.6rem,
        16vw,
        5.2rem
      );

    line-height: 0.82;
  }

}
```

The current mobile size is too large.

Do not modify the desktop rule.

---

# 3. ADD / UPDATE THE MOBILE RULE

Use:

```css
@media (max-width: 768px) {

  .mission-copy {
    width: 100%;
    max-width: 100%;
    min-width: 0;

    overflow: hidden;
  }


  .mission-copy h3 {
    width: 100%;
    max-width: 100%;

    margin-top: 18px;

    font-size:
      clamp(
        2.8rem,
        13vw,
        4.2rem
      );

    line-height: 0.86;

    letter-spacing: -0.065em;

    word-break: normal;
    overflow-wrap: normal;
  }

}
```

This should preserve the current visual style while preventing the title from exceeding the mobile viewport.

---

# 4. ADD A NARROW-PHONE OVERRIDE

For smaller phones, add:

```css
@media (max-width: 390px) {

  .mission-copy h3 {
    font-size:
      clamp(
        2.65rem,
        12.5vw,
        3.5rem
      );
  }

}
```

This is specifically for narrower devices around:

```text
360px
375px
390px
```

---

# 5. DO NOT BREAK WORDS

Do not use:

```css
word-break: break-all;
```

Do not allow:

```text
AUTOMA
TION
```

or similar word splitting.

The intended composition should remain:

```text
AUTOMATION
EXPO
```

not:

```text
AUTO
MATION
EXPO
```

The fix should come from responsive sizing, not forced word breaking.

---

# 6. VERIFY THE HTML LINE BREAK

Inspect the event title HTML.

For Automation Expo, prefer:

```html
<h3>
  AUTOMATION
  <br>
  EXPO
</h3>
```

or the equivalent dynamically generated markup.

If the title is dynamically rendered from JavaScript, preserve the intentional two-line title for `AUTOMATION EXPO`.

Do not remove the line break if it is already present.

---

# 7. TEST OTHER EVENT TITLES

Verify the fix does not negatively affect:

```text
AUTOMATION EXPO
ROBORIFT
ROBOTHON
IDEASPARK
IDEASPARK 2.0
```

Long titles should fit.

Short titles should remain visually strong and should not become unnecessarily small.

---

# 8. TEST THESE MOBILE WIDTHS

Test:

```text
360px
375px
390px
412px
430px
```

For each width confirm:

- no horizontal overflow
- no clipping
- `AUTOMATION` remains on one line
- `EXPO` remains below it
- title does not overlap mission labels
- title does not overlap the description
- poster section remains unaffected
- counter remains unaffected

---

# 9. DO NOT CHANGE THESE

Do not modify:

```text
desktop Mission Archive layout
poster sizing
poster paths
Mission Archive event order
Mission Archive descriptions
Mission Archive counter
Mission Archive GSAP sequence
Machines
Team
Contact
About
Hero
Preloader
```

This task is only for the mobile Mission Archive event-title overflow.

---

# 10. BUILD CHECK

Run:

```bash
npm run build
```

Fix any build issue introduced by this change.

---

# 11. FINAL RESPONSE

After implementation report:

1. file(s) changed
2. exact mobile font-size rule used
3. confirmation Automation Expo no longer overflows
4. confirmation all five event titles were checked
5. tested viewport widths
6. result of `npm run build`

Do not return only a plan.

Actually implement the fix.
