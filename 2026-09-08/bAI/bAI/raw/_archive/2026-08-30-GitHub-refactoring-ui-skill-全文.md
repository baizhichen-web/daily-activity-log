---
title: "refactoring-ui-skill（Refactoring UI 设计工艺规则全文）"
type: source
source_type: article
date: 2026-08-30
author: s0xDk（整理自 Wathan & Schoger《Refactoring UI》）
tags: [AIDesigning, 设计工艺, UI规则, 参考]
source_url: https://github.com/s0xDk/refactoring-ui-skill
入库方式: B 知识库参考（白纸 2026-08-30 拍板 B+C；C 路线=Craft.md 过审时消化有效规则，消化后此参考功成身退）
从属条款: 已定调决策（座右铭排版/G-20/G-21/未来 Design.md 过审值）优先于本参考；流程类内容（其工作流程七条）不采纳，流程归 VIBE-DESIGNING 1.3
---

# refactoring-ui-skill 全文存档

> 五个原文件完整照录（SKILL.md + references/3 件 + assets/tokens.css），未做删改。供 Craft.md 消化与实现段查阅。


---

## 原文件：SKILL.md（主文件：尺度系统/流程/层级技术/硬规则）

```markdown
---
name: refactoring-ui
description: Design and improve user interfaces using the concrete rules from Refactoring UI (Wathan & Schoger) — constrained spacing/type/color/shadow scales, visual hierarchy through weight and color rather than size, and depth through emulated light. Use when building or styling any UI (web, app, dashboard, landing page, component), when picking font sizes, spacing, colors, shadows or border radius, when designing a color palette or design tokens, and whenever someone says a UI "looks off", "looks amateur", "feels cluttered/plain/unfinished", or asks to "make this look better".
---

# Refactoring UI

Visual design is not talent. It is a small set of systems decisions made **once**, plus a
handful of techniques for creating hierarchy. This skill is those systems and those
techniques.

The single biggest cause of amateur-looking UI is picking values ad hoc — 17px here,
`#3B82F6` there, `lighten(5%)` for a hover state. Design *from a scale*, always.

---

## The systems — use these, do not re-derive them

Pick from these lists. Never invent a value that isn't on one.

### Spacing and sizing

Base 16px, built from factors and multiples of it:

```
4  8  12  16  24  32  48  64  96  128  192  256  384  512  640  768
```

Tight at the small end, spreading out at the large end. **No two adjacent values may be
closer than ~25%** — that is what makes the choice obvious. A linear "multiples of 4"
scale fails: it does not help you decide between 120px and 124px.

Use it for margin, padding, width, height, icon sizes, border width — everything spatial.
Fix a small set of opacity values too (e.g. `.05  .1  .2  .4  .6  .8`) for disabled states,
overlays and hover tints, rather than eyeballing a slider each time. Same logic as the other
scales: decide once, reuse everywhere.

### Type scale

```
12  14  16  18  20  24  30  36  48  60  72
```

Not a modular scale built from a ratio (4:5, 2:3, golden ratio). Those produce fractional
pixel values that round inconsistently across browsers and are too sparse for interface
density — hand-picked values, chosen for how they feel, win instead.

**Units: `px` or `rem` only. Never `em`.** `em` is relative to the current font size, so a
`.875em` inside a `1.25em` parent computes to 17.5px — a value not in your scale. The
scale silently stops existing.

### Font weight

Two weights is enough:

- **400 or 500** — body and most UI text
- **600 or 700** — anything emphasized

Nothing below 400 in UI. To de-emphasize, use a lighter *color* or smaller *size* — never a
lighter weight.

### Color

You need far more colors than a five-swatch palette generator gives you.

- **Greys: 8–10 shades.** Almost all of a UI is grey — text, backgrounds, panels, borders,
  form controls. Three or four shades always runs out. Start at a very dark grey, not true
  black (true black looks unnatural).
- **Primary: 5–10 shades**, one or maybe two primaries.
- **Accents: 5–10 shades each** — destructive red, warning yellow, positive green, plus
  whatever else the product needs to distinguish (chart series, calendar events, tags). Ten
  colors × 5–10 shades is normal for a complex UI.

Name them `100` (lightest) → `900` (darkest), base `500`.

**Build the scale in this order:** pick `500` first (for a primary/accent, it should be a
shade that works as a button background). Then find the edges — `900` is usually your text
color, `100` a background tint; an alert component uses both, so design one and read the
two values off it. Then fill `700` and `300` as the perfect compromise between their
neighbours, then `800 600 400 200` the same way.

**Write colors as HSL, not hex.** `hsl(220, 95%, 34%)` and `hsl(220, 65%, 61%)` are
visibly related; `#03369E` and `#507DD7` are not.

**Never generate shades at runtime** with `lighten()` / `darken()`. That is how you end up
with 35 slightly different blues.

### Shadows — five elevations

```css
0 1px 3px  hsla(0,0%,0%,.2)   /* barely raised — buttons */
0 4px 6px  hsla(0,0%,0%,.2)   /* dropdowns */
0 5px 15px hsla(0,0%,0%,.2)
0 10px 24px hsla(0,0%,0%,.2)
0 15px 35px hsla(0,0%,0%,.2)  /* modals */
```

Choose by asking *where on the z-axis does this sit?*, not *what shadow looks nice?*.
Closer to the user = more attention. Shrinking a button's shadow on `:active` makes it feel
pressed; growing a list item's shadow when it's picked up for drag-to-reorder does the
reverse — it reads as "now above its siblings" and doubles as the drag affordance itself.

These five are the default and are fine everywhere. `references/techniques.md` gives a
refined **two-part** version of the same scale — parallel, but not identical values (its top
step is heavier). Use it when shadows are prominent in the design; use these when they
aren't. Don't mix the two in one project.

### Line-height and line length

Line-height is **inversely** proportional to font size, and proportional to line width:

- small text / wide columns → `1.5` to `2`
- large headlines → `1` is fine

Line length: **45–75 characters**, i.e. `max-width: 20em–35em`. This applies to the
paragraph even when the container around it is wider — mixed widths in one content area
look more polished, not less.

(`em` is correct *here* — measure should scale with the text it wraps. The "never `em`" rule
is scoped to the *type scale*, where `em` compounds through nesting. Don't "fix" this.)

### Border radius

Pick one and stay consistent. Small radius = neutral. Large radius = playful. None =
serious/formal. Mixing square and rounded corners in one interface always looks worse.

---

## The procedure

**1. Start with a feature, not a layout.** Don't design "the app" — you cannot decide
between top nav and sidebar before you know what's in the product. Design one real piece of
functionality (the search form, the message composer), and let the shell emerge.

**2. Detail comes later.** Ignore typefaces, shadows and icons early. Work in **grayscale
first** — it forces hierarchy to come from spacing, contrast and size rather than color.
Add color once the layout works.

**3. Don't over-invest in low fidelity.** Sketches, wireframes and mockups are disposable —
nobody can use a static picture of an app. They exist to explore ideas; abandon them once the
decision is made and go build the real thing.

**4. Design the smallest useful version, then build it.** Work in short design→code cycles.
Don't imply functionality you aren't ready to build — a comment box with an attachments
zone you can't ship yet blocks the whole feature. Nice-to-haves get designed later.

**5. Choose by elimination.** When picking a value from a scale: guess the one you think is
right, then compare it against the neighbour on each side. Two will be obviously wrong. If
an outer option wins, re-run the comparison with that as the new middle.

**6. Start with too much white space and remove it.** Adding space until something stops
looking bad gives you the minimum. Starting generous and trimming gives you the right
amount. Dense UIs (dashboards) are legitimate — but as a deliberate decision, not a default.

**7. Shrink the canvas.** A small component designed on a 1400px artboard tends to sprawl,
because the space is there to fill. Start at ~400px and design the mobile layout first, where
the constraints are real — then bring it to a large screen and relax only what genuinely felt
cramped. You will change less than you expect.

---

## Hierarchy — the technique that does the most work

Everything on screen sits in a pyramid: primary, secondary, tertiary. When everything
competes, the UI reads as noise. This is what makes a design look "designed" — not styling.

**Size isn't everything.** Leaning on font size alone gives you primary content that's too
big and secondary content that's too small. Use **weight** and **color** to carry emphasis
instead, and keep sizes reasonable.

**Three text colors, maximum:**
- dark — primary content
- grey — secondary content
- lighter grey — tertiary (footnotes, copyright)

All three carry real body-size text, so all three need 4.5:1. "Lighter grey" means the
lightest shade that still clears it — roughly the middle of a 9-step ramp, not the pale end.
The pale shades are for disabled states and large text only.

**Emphasize by de-emphasizing.** When the important element won't stand out and there's
nothing left to add to it, soften what competes with it instead. Fade the inactive nav
items; drop the sidebar's background color so the main content sits forward.

**Actions:** style by hierarchy, not by semantics.
- Primary → solid, high contrast. Usually exactly one per page.
- Secondary → outline, or a low-contrast background.
- Tertiary → styled like a link.

Destructive ≠ big red button. If "Delete" isn't the primary action on the page, give it
tertiary treatment — then make it a big red primary button *inside the confirmation dialog*,
where it genuinely is the primary action.

**Labels are a last resort.** `label: value` gives every piece of data equal weight. Most
data identifies itself by format (`$19.99`, an email address) or by context. Where a label
is genuinely needed, fold it into the value ("12 left in stock", not "In stock: 12"), or
add it as visibly *secondary* content. Exception: on spec-sheet-style pages where users scan
*for the label*, emphasize the label instead.

**Balance weight against contrast.** Solid icons are visually heavy and will out-shout the
text beside them — soften their color to compensate. It works in reverse too: when a 1px
border is too subtle in a soft color but too harsh once you darken it, keep the soft color
and go to 2px. Add weight to fix low contrast; reduce contrast to fix excess weight.

**Visual hierarchy ≠ document hierarchy.** Semantic markup and visual weight are separate
decisions. Section titles are usually *labels*, not headlines — an `h1` at 16px is fine, and
sometimes the title should be visually hidden entirely because the content speaks for itself.

---

## Hard rules

Deviating from these produces a specific, recognizable failure.

1. **Never grey text on a colored background.** Grey-on-white works because it *reduces
   contrast*; grey on color just looks dirty. White-at-reduced-opacity looks washed out and
   disabled, and lets patterns show through the glyphs. Hand-pick a color with the
   background's hue, adjusting saturation and lightness.
2. **Never `em` for the type scale.** `px` or `rem`.
3. **Never generate shades at runtime.** Define them up front.
4. **Never use a percentage width for something that shouldn't scale.** Sidebars get fixed
   widths; the main area flexes. Elements get a `max-width` and only shrink when the screen
   is actually smaller — a login card shouldn't be *wider* at medium screens than at large.
5. **Never scale things proportionally across breakpoints.** Large elements must shrink
   *faster* than small ones. A 2.5em headline sitting on 14px mobile body copy computes to
   35px — far too big; it wants to be 20–24px there. Likewise a button's padding should get
   proportionally tighter as the button shrinks, not scale with its font size.
6. **Always more space around a group than within it.** This is the fix for "which label
   belongs to which field", cramped bullet lists, and headings that look attached to the
   wrong paragraph. Ambiguous spacing is a functional bug, not just an ugly one.
7. **Never use color as the only signal.** Add an icon, a shape, or a text cue. For charts,
   distinguish series by *contrast* (light→dark shades of one color) rather than by hue —
   colorblind users read lightness reliably, hue not so much.
8. **Contrast minimums:** 4.5:1 for normal text. The 3:1 allowance applies only to *large*
   text, which WCAG defines as **24px regular or 18.66px bold** — not 18px. Assume 4.5:1
   unless the text is genuinely that large. When white-on-color fails, flip it: dark colored
   text on a light colored tint (see `references/systems.md`). Separately, **3:1 applies to
   non-text too** (WCAG 1.4.11): if a border is the only thing identifying a control — an
   input outline, a checkbox edge — it needs 3:1 against its background. A hairline that
   merely divides content does not. Those are two different tokens, not one.
9. **Never scale an icon far from its intended size.** A 16–24px icon at 48px looks chunky
   and detail-starved. Put it inside a colored circle instead.

---

## References

**`assets/tokens.css`** — a complete, contrast-verified starting set of all the above as CSS
custom properties: spacing, type, weights, border width, a fixed opacity scale, a 9-shade
cool grey ramp, a 9-shade primary, three accent trios, five elevations, a **semantic role
layer** (`--surface`, `--text-primary`, `--action`…) and a **dark-mode block** that overrides
only those roles. Copy it in and retune
the hues rather than re-deriving the scales from this prose. Reference the roles in
components, not the raw ramps — that is what makes the dark mode work. Every text/surface
pair is verified ≥4.5:1 in both modes and every functional border ≥3:1; the deliberate
sub-threshold shades (disabled, decorative dividers, the large-text-only step) are exempt by
criterion and commented inline.

Load these when the work calls for them:

- **`references/systems.md`** — building a palette from scratch: choosing the base color,
  keeping saturation alive at the light and dark ends, hue rotation, warm/cool greys, and
  the two escape hatches for hitting contrast ratios without ugly color.
- **`references/diagnose.md`** — symptom → fix table. Load first whenever the task is
  *improving existing UI* rather than building new.
- **`references/techniques.md`** — depth and light simulation, two-part shadows, baseline
  alignment, letter-spacing, breaking out of default component shapes, and handling
  user-uploaded images.

```

---

## 原文件：references/systems.md（从零建色板）

```markdown
# Building the color system

The scales in SKILL.md tell you *what* to define. This tells you *how to pick the values*,
and how to keep them from looking washed out or failing contrast.

## Why HSL

Hex and RGB describe colors in terms a machine cares about. HSL describes them in the terms
your eye already uses:

- **Hue** — position on the wheel, in degrees. 0° red, 120° green, 240° blue. This is what
  makes two different colors both read as "blue".
- **Saturation** — how vivid. 0% is grey (at which point hue is meaningless), 100% is intense.
- **Lightness** — 0% black, 100% white, 50% the pure hue.

Two shades of the same color share a hue in HSL and look nothing alike in hex. Design tools
mostly show HSB, browsers only understand HSL — don't confuse them. In HSB, 100% brightness
is only white when saturation is 0; HSB at S100/B100 equals HSL at S100/L50.

## Picking the base (500)

There is no formula. For a primary or accent color, pick the shade that **works as a button
background** — dark enough that white text sits on it comfortably, light enough that the
button doesn't read as black. Rules like "start at 50% lightness" don't hold; every hue
behaves differently. Use your eyes.

For greys, the base matters less. Work from the edges instead: the darkest grey is whatever
you want your darkest text to be, and the lightest is a subtle off-white background.

## Finding the edges (900 and 100)

Choose them by imagining where they'll be used. `900` is almost always a text color; `100` is
almost always a background tint. A simple alert component uses both at once — dark text on a
pale tinted panel — so design one and read both values off it.

## Filling the gaps

With `900`, `500` and `100` fixed, add `700` and `300` as the perfect compromise between the
shades on either side. That leaves four holes — `800`, `600`, `400`, `200` — filled the same
way. Nine shades is convenient because it divides cleanly.

Then adjust by eye. A systematic build gets you 90% there; expect to nudge a saturation or
push a shade lighter once you see it in use. What you must *not* do is keep adding new shades
outside the system — at that point you don't have a system.

## Keeping saturation alive

In HSL, saturation's effect weakens as lightness approaches 0% or 100%. The same S value that
looks vivid at L50 looks washed out at L90.

**So: increase saturation as lightness moves away from 50%, in both directions.** Your
lightest and darkest shades should carry *more* saturation than your base, not the same
amount. This is subtle per-swatch and very visible when the color covers a large area.

Applies to greys too — if you're using tinted greys and don't raise saturation at the ends,
your palest and darkest greys will drift back toward neutral.

## Perceived brightness and hue rotation

Every hue has an inherent perceived brightness. Yellow and blue at identical HSL lightness
look nothing alike in brightness, because the eye weights the channels unevenly:

```
perceived brightness = sqrt(0.299·r² + 0.587·g² + 0.114·b²) / 255
```

Across the wheel this gives three local maxima — **60° (yellow), 180° (cyan), 300° (magenta)**
— and three minima — **0° (red), 120° (green), 240° (blue)**.

That gives you a second way to change how light a color looks, without touching lightness and
without draining its intensity:

- **To lighten:** rotate the hue toward the nearest of 60° / 180° / 300°.
- **To darken:** rotate the hue toward the nearest of 0° / 120° / 240°.

**Cap the rotation at 20–30° total.** Beyond that it reads as a different color rather than a
lighter or darker one.

This is the fix for scales built on light hues. A yellow darkened by lightness alone goes
muddy olive-brown; a yellow darkened by rotating gradually toward orange gives you warm, rich
dark shades. Combine both approaches freely — take some brightness from hue, some from
lightness.

## Warm and cool greys

True grey is S0% — no color at all. Most greys in good UIs are saturated noticeably.

- **Cool** (blue-ish): hue ~207–210, saturation ~12–21%
- **Warm** (yellow/orange-ish): hue ~39–41, saturation ~12–21%

How far you push it is a personality decision. And remember the saturation rule above: raise S
at the light and dark ends or the extremes will look flat next to the mid-tones.

## Dark mode

Beyond the book — it predates dark mode — but the ramp rules extend to it cleanly.

**Don't invert the ramp mechanically.** Swapping `100` for `900` produces harsh, glaring UI,
because the two modes aren't symmetric:

- **Never pure black as the surface.** Use `grey-900`-ish, and build *elevation by getting
  lighter*, not darker. "Raised is lighter than the page" holds in both modes — what changes
  is that shadows barely register against a dark surface, so lightness has to carry the depth
  cue on its own. Surfaces stack upward in lightness; shadows do progressively less work.
  But adjacent steps on a grey ramp are a *thin* cue — typically under 1.3:1 — so a raised
  dark surface usually also needs a hairline border to read as raised at all. Don't just
  reach for a lighter surface: pushing it further up the ramp squeezes the text sitting on
  it, and tertiary text is the first thing to fail.
- **Desaturate your accents.** A `500` tuned to carry white text on a light page will vibrate
  against a dark one. Shift toward the `300`/`400` end and drop saturation.
- **Re-check contrast; don't assume it mirrors.** Light-on-dark at the same nominal ratio
  reads heavier, so text often wants to be a shade *dimmer* than the equivalent light-mode
  pairing, not brighter. `grey-100` on `grey-900` is usually too much; `grey-200`/`grey-300`
  is the comfortable body color.
- The two escape hatches below work in reverse too: on a dark colored panel, rotating hue
  toward cyan/magenta/yellow buys contrast without washing to white.

## Hitting contrast ratios without ugly color

WCAG wants 4.5:1 for normal text. The relaxed 3:1 threshold applies only to *large* text —
defined as **18pt (24px) regular, or 14pt (≈18.66px) bold**. 18px regular text is normal text
and needs the full 4.5:1; the book's "~18px" phrasing is looser than the spec.

Dark-on-light is easy. Color is where it gets hard, and there are two moves that solve almost
every case.

### 1. Flip the contrast

White text on a colored background needs the background to be *very* dark to reach 4.5:1 — and
a page full of dark saturated badges grabs attention that those elements don't deserve.

Instead, invert: **dark colored text on a light colored tint.** A green `800` on a green `100`
easily clears AAA, keeps the semantic color, and sits quietly in the hierarchy. This is the
default treatment for status pills, tags and badges.

### 2. Rotate the hue toward a brighter one

For colored text on a colored background — secondary text inside a dark colored panel — raising
lightness alone drives you to near-white before you hit the ratio, and then the primary and
secondary text look identical.

Use perceived brightness instead: **rotate the text's hue toward cyan, magenta or yellow.** You
gain contrast while keeping the text visibly colored and visibly secondary. A blue-violet panel
with cyan-shifted body text can clear AAA and still look like part of the panel.

```

---

## 原文件：references/techniques.md（手艺集十节）

```markdown
# Techniques

## Emulating a light source

Raised and inset are the same trick: decide the element's **profile**, then mimic how light
would hit that shape. Light comes from above, and people look slightly *down* at their
screens — so you see the top edge of a raised element and the bottom edge of an inset one.

Each element needs **both** effects — the lit edge and the blocked light. They go in a
single comma-separated `box-shadow`. Two `box-shadow` declarations on one selector do not
combine; the second silently discards the first.

**Raised** (button, card) — lit top edge, shadow cast below:

```css
box-shadow:
  inset 0 1px 0 hsl(224, 84%, 74%),   /* top edge, angled toward the light */
  0 1px 3px hsla(0, 0%, 0%, .2);      /* light blocked beneath the element */
```

**Inset** (well, text input, checkbox) — lit bottom lip, shadow blocked at the top. The lip
must be **lighter than the element's own face**, so the values depend entirely on how dark
that face is:

```css
/* Dark surface — the face is dark, so the lip has room to read as clearly lit. */
box-shadow:
  inset 0 -2px 0 hsl(211, 30%, 34%),    /* bottom lip, on a --grey-800 face */
  inset 0 2px 2px hsla(0, 0%, 0%, .25); /* light blocked by the lip above */

/* Light surface — the face is already near-white, so there is almost no room to go
   lighter. Let the top shadow do the work and keep the lip to a hairline, or skip it. */
box-shadow:
  inset 0 -1px 0 hsl(0, 0%, 100%),      /* on a --grey-100 face */
  inset 0 2px 2px hsla(0, 0%, 0%, .06);
```

Copying dark-surface values onto a white input paints a dark line along the bottom, which
reads as a stray border — the opposite of the intended cue. Always check the lip against the
face.

Note both lit edges are `inset` — a non-inset shadow with a negative Y offset draws *above*
the element, not on its bottom lip.

Two rules: **hand-pick the lighter color** rather than overlaying semi-transparent white —
white overlays drain the saturation out of the underlying color, which is why both examples
above use a solid `hsl()` sampled from the element's own hue. (On a neutral grey or near-
black surface there is no saturation to lose, so `hsla(0,0%,100%,.15)` is fine there.) And
**keep blur radii tiny** — these edges are sharp in the real world, like the shadow under a
wall outlet.

Don't chase photorealism. Borrow the cue and stop.

## Two-part shadows

Good shadows are usually two shadows doing two different jobs:

- **Cast shadow** — larger, softer, bigger Y offset and blur. The shadow thrown behind the
  object by direct light.
- **Contact shadow** — tighter, small offset and blur. The area *underneath* the object that
  even ambient light can't reach. This is what keeps the element's edges defined.

```css
box-shadow:
  0 10px 20px hsla(0, 0%, 0%, .15),  /* cast    — larger, softer */
  0 3px 6px   hsla(0, 0%, 0%, .10);  /* contact — tighter, sharper */
```

The two parts must differ *substantially* in offset and blur or the effect is invisible —
that's a ~3x difference in both here.

**Which one is darker depends on elevation, and this is the whole point.** At rest on the
surface the contact shadow is the darker of the two (`.24` against the cast shadow's `.12`);
as the object lifts, it fades out and ends up lighter, until at the top of the scale it's
gone entirely. Don't fix the alphas — let them cross over. Keep both inside `.05–.25`;
anything heavier reads as a smudge rather than a shadow.

The tradeoff: at the lowest elevations the two shadows converge in geometry (`0 1px 3px` +
`0 1px 2px`) and the technique buys you little beyond a slightly crisper edge.

**As elevation increases, the tight dark shadow fades.** Lift an object off your desk and the
dark contact shadow disappears first. So an elevation scale looks like:

```css
/* lowest  */ 0 1px 3px hsla(0,0%,0%,.12), 0 1px 2px hsla(0,0%,0%,.24);
/*         */ 0 3px 6px hsla(0,0%,0%,.15), 0 2px 4px hsla(0,0%,0%,.12);
/*         */ 0 10px 20px hsla(0,0%,0%,.15), 0 3px 6px hsla(0,0%,0%,.10);
/*         */ 0 15px 25px hsla(0,0%,0%,.15), 0 5px 10px hsla(0,0%,0%,.05);
/* highest */ 0 20px 40px hsla(0,0%,0%,.2);
```

Distinct at the lowest elevation, gone entirely at the highest.

## Depth without shadows

Flat design still conveys depth — it just uses different cues.

- **Color.** Lighter feels closer, darker feels further away. A white card on a grey page pops
  forward; a grey well on a white page recedes.
- **Solid shadows.** A short vertical offset with **zero blur** — `0 3px 0 hsl(220,7%,83%)` —
  lifts a card off the page without breaking the flat aesthetic.
- **Overlap.** The strongest cue of all. Offset a card so it straddles the boundary between
  two background sections (`margin-bottom: -60px`), or make an element taller than its parent
  so it breaks out on both sides (`margin: -60px 0`). Works at component scale too: pull
  carousel arrows outside the slide with negative margins.

When overlapping images, give them a border in the **page background color** — an invisible
border that guarantees a visual gap so the images never clash.

## Baseline, not center

When two different font sizes sit on the same line — a card title and its "See all" action —
vertical centering offsets their baselines and looks subtly wrong, especially when the sizes
are close. Align to the baseline your eye is already reading from:

```css
align-items: baseline;
```

## Letter-spacing

Default to trusting the type designer. Two exceptions:

- **Headline use of a body typeface.** Faces built for legibility at small sizes (Open Sans)
  have wider tracking than faces built for headlines (Oswald). Tighten by about `-0.05em` to
  get that condensed headline feel. Don't try the reverse — a headline face doesn't become
  legible at small sizes just because you loosened it.
- **All-caps.** Lowercase letters vary in shape (ascenders, descenders, x-height) which is
  what makes them scannable. Caps are uniform blocks, so default tracking crowds them. Add
  about `+0.05em`.

## Choosing typefaces without taste

- Neutral sans-serif is the safe default. The system font stack is a legitimate choice:
  `-apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue`.
- **Ignore families with fewer than five weights.** Filtering Google Fonts to 10+ styles cuts
  ~85% of the options and what remains skews toward carefully-made families.
- Optimize for legibility: taller x-height, wider default tracking. Avoid condensed faces
  with short x-heights for UI text.
- Sort by popularity — a widely used font is usually a good font. And inspect sites you admire.

## Personality is four decisions

Not a vibe — four concrete levers:

1. **Typeface.** Serif → elegant/classic. Rounded sans → playful. Neutral sans → plain, lets
   other elements carry the personality.
2. **Color.** Blue is safe and nobody objects. Gold reads expensive. Pink reads fun.
3. **Border radius.** Small = neutral, large = playful, none = formal. Be consistent.
4. **Language.** "Thank you Mr. Benson" vs "Sweet, thanks Steve!" changes the product's
   character more than any color choice.

If you can't decide, look at the other sites your users spend time in. Don't imitate direct
competitors — you'll look like a lesser version of them.

## Grids are overrated

A grid is just fluid percentage widths chosen from a constrained set. That's the wrong tool
whenever an element has an optimal *fixed* size:

- **Sidebars** should be a fixed width sized to their contents; the main area flexes and runs
  its own internal grid.
- **Cards and forms** get a `max-width` and only shrink when the viewport is actually smaller.
  Sizing a login card as "6 columns, then 8 columns at medium" produces the absurd result of
  the card being *wider* on medium screens than on large ones.
- Inside components, don't use a percentage unless you genuinely want the thing to scale.

Don't compromise a component's size until the screen actually forces you to.

**Think in columns, not width.** When a component wants to stay narrow (a form field) but
sits in a wide layout, don't stretch it to fill the space — split the supporting content
into its own column instead (a hint or error message beside the input, not wrapped under
it). Solves the "feels unbalanced" complaint without breaking the component's own sizing.

## Break the default component shape

Most components look generic because of an inherited mental picture, not a constraint.

- **Dropdown** — it's just a floating box. Give it sections, multiple columns, icons,
  descriptions under each item, a "NEW" badge.
- **Table** — columns don't have to hold one field each. Merge a non-sortable column into a
  related one (name over role, amount over policy type) to create hierarchy. Add avatars,
  colored status pills.
- **Radio group** — if the choice is central to the page, make them selectable cards showing
  the actual differences, not a stack of circles.

Constraints are powerful, but a design occasionally needs freedom from an assumption nobody
checked.

## Working with images

**Text over photos.** The problem is the image, not the text — photos have bright and dark
regions, so no single text color works everywhere. Reduce the image's dynamics:
- semi-transparent overlay (`hsla(0,0%,0%,.55)` — black for light text, white for dark text)
- lower the image's contrast, raising brightness to compensate — `brightness +40%,
  contrast -70%` is a reasonable starting point, then adjust by eye
- colorize: lower contrast → desaturate → solid fill in `multiply` blend mode
- text-shadow used as a glow: large blur, no offset — `text-shadow: 0 0 50px hsla(0,0%,0%,.4)`

The last one preserves the most of the original photo.

**Everything has an intended size.** Icons drawn for 16–24px look chunky and detail-starved at
48px; icons drawn large look choppy when shrunk. If small icons are all you have, put them at
their real size inside a larger colored shape. Screenshots: capture a smaller viewport, or crop
to one region, or draw a simplified illustration — never shrink a full desktop screenshot by
70%. Favicons: redraw a simplified mark at target size rather than letting the browser
downscale the logo.

**User-uploaded content.** You can't control it, so contain it:
- Fixed-size containers with `background-size: cover`, cropping the overflow.
- Prevent background bleed (a user photo whose edges match your UI background) with a subtle
  inset shadow — `box-shadow: inset 0 0 0 1px hsla(0,0%,0%,.1)` — rather than a border. Borders
  clash with the image's own colors; nobody notices the shadow.

**Photos themselves.** Bad photography ruins an otherwise good design. Hire a photographer or
use good stock. Never design against placeholders planning to shoot something on a phone later.

```

---

## 原文件：references/diagnose.md（症状→修法对照表）

```markdown
# Diagnosing existing UI

Use this when the task is *improve this*, not *build this*. Complaints about UI are almost
always vague ("looks off", "feels cheap"). Each vague symptom maps to a small number of
specific, mechanical fixes.

Work down the table in order — the top entries account for most of the damage.

| Symptom | What's actually wrong | Fix |
|---|---|---|
| Noisy, chaotic, "wall of content", nothing draws the eye | No hierarchy — everything has equal weight | Deliberately de-emphasize secondary and tertiary content. Don't amplify the primary |
| One element won't stand out no matter what you do to it | Its neighbours are competing | Soften the competitors: fade inactive nav items, remove the sidebar's background so content sits forward |
| Cramped, claustrophobic | Space was *added* until it stopped looking bad | Start over with far too much space, then remove until happy |
| Ambiguous grouping — which label goes with which field? which heading owns this paragraph? | Equal spacing inside and between groups | More space *around* a group than *within* it. Same bug in bullet lists (gap must exceed line-height) and horizontal rows |
| Busy, boxed-in, over-compartmentalized | Too many borders | Replace with a box shadow, two slightly different background colors, or just more spacing. If you have both a border and a background change, drop the border. Borders that *identify a control* (input outlines, checkbox edges) stay — and those need 3:1 |
| Text on a colored panel looks faded, dull, or disabled | Grey text, or white at reduced opacity, on color | Hand-pick a color at the background's hue with adjusted saturation/lightness |
| Headline over a photo is unreadable at some sizes | The image is too dynamic, not the text | Semi-transparent overlay; or lower image contrast (+brightness to compensate); or desaturate + multiply a brand color; or a large-blur, zero-offset text-shadow used as a glow |
| Primary content too big *and* secondary content too small | Font size doing all the hierarchy work | Move the emphasis to weight (600/700) and color; pull sizes back toward the middle of the scale |
| Big red button for something that isn't the main action | Styled by semantics instead of hierarchy | Give destructive actions secondary or tertiary treatment; save the red primary button for the confirmation dialog |
| Page title feels oversized and dominates | `h1` styled as an `h1` | Section titles are usually labels. 16px is fine. Consider hiding it visually |
| Data reads like a database dump (`Name:`, `Email:`, `Phone:`) | Naive label/value pairs | Drop labels the format or context already implies; merge label into value ("3 bedrooms"); otherwise make the label visibly secondary |
| Icon next to text overpowers it | Solid icons cover more surface area | Lower the icon's contrast (softer color) |
| 1px border either invisible or harsh | Trying to solve weight with color | Keep the soft color, go to 2px |
| Large icons look chunky and crude | Icons drawn at 16–24px, scaled up | Don't scale. Put the icon at its intended size inside a colored circle/square |
| Screenshot is an unreadable mush of tiny detail | Full-size screenshot scaled down | Screenshot a smaller (tablet) viewport, or crop to one region, or draw a simplified illustration of the UI |
| Logo turns to mush as a favicon | Detailed artwork scaled down | Redraw a simplified version at the target size |
| Layout spread thin across a huge viewport | Filling the screen because it's there | Use only the width the content needs. Or split into columns rather than stretching |
| Sidebar too wide on big screens, truncating on small | Percentage width from a grid | Fixed width for the sidebar; main content flexes |
| Mobile headline enormous | `em`-based sizing carried over from desktop | Size independently per breakpoint. Large things shrink faster than small things |
| Mixed font sizes on one line look misaligned | Vertically centered | `align-items: baseline` |
| All-caps label hard to read | Default letter-spacing is tuned for sentence case | Add ~0.05em letter-spacing |
| Every link is colored and it's overwhelming | Link styling meant for prose, used in a link-dense UI | Emphasize with weight or a darker color instead; for truly ancillary links, style on hover only |
| Long centered paragraphs are hard to read | Center alignment past 2–3 lines | Left-align. Or rewrite the copy shorter so centering works |
| Numeric table columns hard to compare | Left-aligned numbers | Right-align them |
| Justified text has rivers of whitespace | No hyphenation | `hyphens: auto`, or don't justify |
| Flat, plain, "nothing wrong but nothing right" | No visual accents anywhere | Colored accent border (top of a card, under a heading, side of an alert, active nav item); change a section's background color; a ≤30° two-hue gradient; a subtle low-contrast pattern or geometric shape — it doesn't need to cover the whole background, running it along just one edge works too |
| Feels unfinished / prototype-y | Browser defaults everywhere | Replace bullets with icons; custom checkboxes and radios in a brand color; promote testimonial quotes into visual elements; style links distinctively |
| Screen is blank for new users | Empty state was an afterthought | Illustration + a clear headline + an emphasized call to action. Hide tabs/filters/search that do nothing until content exists |
| A component looks generic | Default mental model of the component | Break the box — multi-column dropdowns with icons and descriptions, tables with combined columns and inline images, radio groups as selectable cards |
| Elements look pasted onto the page | Everything is in its own rectangle | Overlap layers: negative margins so a card straddles two backgrounds, or extends past its parent's edges |
| Overlapping images clash | No separation between them | Give them a border matching the page background — an "invisible border" that guarantees a gap |
| User avatars/thumbnails lose their shape | Image background matches the UI background | Subtle inset box shadow (`inset 0 0 0 1px hsla(0,0%,0%,.1)`), not a border — borders clash with the image colors |
| User-uploaded images wreck the grid | Displayed at intrinsic aspect ratio | Fixed containers, `background-size: cover`, crop the overflow |
| Chart unreadable for colorblind users | Series distinguished by hue | Distinguish by lightness — shades of one color. Add icons/arrows to any color-coded metric |

```

---

## 原文件：assets/tokens.css（对比度验证过的起步令牌）

```css
/* Refactoring UI — starter tokens.
   Copy into a project and rename/retune. The point is to decide once, up front.
   Ramps follow the book's rules: HSL, saturation rises as lightness leaves 50%,
   greys are tinted (cool here — swap hue to ~39 for warm). */

:root {
  /* ---- Spacing & sizing: base 16, no two neighbours closer than ~25% ---- */
  --space-1:   4px;   --space-2:   8px;   --space-3:  12px;   --space-4:  16px;
  --space-5:  24px;   --space-6:  32px;   --space-7:  48px;   --space-8:  64px;
  --space-9:  96px;   --space-10:128px;   --space-11:192px;   --space-12:256px;
  --space-13:384px;   --space-14:512px;   --space-15:640px;   --space-16:768px;

  /* ---- Type scale: px/rem only, never em ---- */
  --text-xs:  12px;   --text-sm:  14px;   --text-base:16px;   --text-lg:  18px;
  --text-xl:  20px;   --text-2xl: 24px;   --text-3xl: 30px;   --text-4xl: 36px;
  --text-5xl: 48px;   --text-6xl: 60px;   --text-7xl: 72px;

  /* ---- Weight: two, and nothing under 400 ---- */
  --weight-normal: 400;
  --weight-bold:   600;

  /* ---- Line-height: inversely proportional to size ---- */
  --leading-tight:   1;      /* 36px+ headlines */
  --leading-snug:    1.25;   /* 20-30px */
  --leading-normal:  1.5;    /* body, narrow measure */
  --leading-loose:   1.75;   /* small text, or wide measure */
  --measure: 34em;           /* 45-75 chars */

  /* ---- Greys (cool). Almost all of a UI is grey.
         Ratios below are vs --grey-100; on pure white each is ~10% higher. ---- */
  --grey-100: hsl(210, 36%, 96%);   /* page background */
  --grey-200: hsl(212, 33%, 89%);   /* borders, dividers */
  --grey-300: hsl(211, 27%, 84%);
  --grey-400: hsl(209, 23%, 60%);   /* DISABLED text only (2.7:1). WCAG exempts inactive
                                       components — it does NOT exempt placeholders, which
                                       are active content: use --grey-600 for those. */
  --grey-500: hsl(210, 22%, 49%);   /*  3.9:1 — large text only (>=24px, or >=18.66px bold).
                                       Not safe for 12px eyebrow labels. */
  --grey-600: hsl(209, 28%, 39%);   /*  5.6:1 — tertiary text (footnotes, copyright) */
  --grey-700: hsl(209, 34%, 30%);   /*  8.0:1 — secondary text */
  --grey-800: hsl(211, 39%, 23%);   /* 10.7:1 */
  --grey-900: hsl(209, 61%, 16%);   /* 13.4:1 — primary text */

  /* ---- Primary. 500 is the shade that works as a button background. ---- */
  --primary-100: hsl(205, 92%, 92%);  /* tinted background */
  --primary-200: hsl(205, 97%, 85%);
  --primary-300: hsl(205, 90%, 76%);
  --primary-400: hsl(206, 82%, 58%);
  --primary-500: hsl(208, 88%, 38%);  /* base — white text passes AA */
  --primary-600: hsl(209, 88%, 33%);
  --primary-700: hsl(211, 88%, 28%);
  --primary-800: hsl(213, 88%, 23%);
  --primary-900: hsl(215, 88%, 18%);  /* text on --primary-100 */

  /* ---- Accents. 100 = tint, 500 = solid fill, 800 = text on the tint.
         That trio is what "flip the contrast" needs. Expand to 9 if used heavily. ---- */
  --red-100:   hsl(360, 100%, 95%);
  --red-500:   hsl(360,  67%, 44%);
  --red-800:   hsl(360,  85%, 25%);

  --yellow-100:hsl( 49, 100%, 92%);
  --yellow-500:hsl( 42, 100%, 29%);
  --yellow-800:hsl( 38, 100%, 19%);

  --green-100: hsl(152,  68%, 92%);
  --green-500: hsl(154,  85%, 24%);
  --green-800: hsl(156, 100%, 13%);

  /* ---- Elevation. Pick by z-position, not by looks. ---- */
  --shadow-1: 0 1px 3px   hsla(0, 0%, 0%, .2);   /* buttons */
  --shadow-2: 0 4px 6px   hsla(0, 0%, 0%, .2);   /* dropdowns */
  --shadow-3: 0 5px 15px  hsla(0, 0%, 0%, .2);
  --shadow-4: 0 10px 24px hsla(0, 0%, 0%, .2);
  --shadow-5: 0 15px 35px hsla(0, 0%, 0%, .2);   /* modals */

  /* ---- Radius: pick one personality and hold it ---- */
  --radius:      4px;   /* neutral. 0 = formal, 12px+ = playful */
  --radius-full: 9999px;

  /* ---- Border width: fixed, like everything else ---- */
  --border-width:       1px;
  --border-width-thick: 2px;  /* when a soft-colored 1px border reads too subtle */

  /* ---- Opacity: fixed set, not a slider you eyeball each time ---- */
  --opacity-1: .05;   /* hairline overlays */
  --opacity-2: .1;    /* subtle tints, inset shadows on images */
  --opacity-3: .2;    /* disabled controls */
  --opacity-4: .4;    /* scrims under light text */
  --opacity-5: .6;    /* dark overlay on photos */
  --opacity-6: .8;    /* near-opaque overlay */

  /* ---- Semantic roles. Reference these in components, not the raw ramps —
         it's the only way the dark-mode block below can work. ---- */
  --surface:         var(--grey-100);  /* page */
  --surface-raised:  #fff;             /* cards — lighter than the page */
  --surface-sunken:  var(--grey-200);  /* wells, inset areas */
  --border:          var(--grey-300);  /* DECORATIVE dividers only (1.3:1). Distinct from
                                          --surface-sunken on purpose: a bordered input
                                          inside a well needs a visible edge. */
  --border-strong:   var(--grey-500);  /* FUNCTIONAL borders — input outlines, checkbox
                                          edges, focus rings. Anything that is the only
                                          thing identifying a control needs 3:1 per WCAG
                                          1.4.11. 3.9 on surface / 4.3 on raised / 3.3 in
                                          a sunken well. */
  --text-primary:    var(--grey-900);
  --text-secondary:  var(--grey-700);
  --text-tertiary:   var(--grey-600);
  --text-disabled:   var(--grey-400);
  --action:          var(--primary-500);
  --action-text:     #fff;
}

/* Dark mode. Not a mechanical inversion — surfaces stack *upward* in lightness,
   accents move to the light end of the ramp, and text sits a shade dimmer than
   the light-mode equivalent. All *text* pairs verified >= 4.5:1; functional borders
   are held to the 3:1 non-text bar instead (WCAG 1.4.11); decorative dividers and
   disabled text are exempt from both. */
@media (prefers-color-scheme: dark) {
  :root {
    --surface:        var(--grey-900);   /* never pure black */
    --surface-raised: var(--grey-800);   /* raised = lighter, same as light mode. Only a
                                            1.26:1 step, and shadows barely register here —
                                            so give raised surfaces a --border-strong
                                            hairline. Going lighter instead (grey-700) would
                                            break --text-tertiary, which drops to 3.6:1. */
    --surface-sunken: hsl(209, 61%, 12%);
    --border:         var(--grey-700);   /* decorative only (1.7:1) */
    --border-strong:  var(--grey-400);   /* functional, 3:1+. Note this goes *lighter* while
                                            light mode goes darker — the mirror image
                                            (grey-500) fails at 2.7:1 on a raised surface. */
    --text-primary:   var(--grey-200);   /* 11.3:1 — grey-100 is too harsh here */
    --text-secondary: var(--grey-300);   /*  10.0:1 */
    --text-tertiary:  hsl(209, 23%, 66%);/*  6.1:1 base / 4.8:1 raised — sits between
                                            grey-400 and grey-300, because grey-400 fails
                                            (4.0:1) against a raised surface */
    --text-disabled:  var(--grey-600);   /* 2.4:1 — near light mode's 2.7:1. grey-500
                                            (3.4:1) reads *more* legible than light mode,
                                            which is backwards for a disabled affordance. */
    --action:         var(--primary-400);/* light fill + dark text, 5.2:1 */
    --action-text:    var(--grey-900);

    /* Shadows do little work on dark surfaces — lightness carries depth instead. */
    --shadow-1: 0 1px 3px   hsla(0, 0%, 0%, .4);
    --shadow-2: 0 4px 6px   hsla(0, 0%, 0%, .4);
    --shadow-3: 0 5px 15px  hsla(0, 0%, 0%, .45);
    --shadow-4: 0 10px 24px hsla(0, 0%, 0%, .5);
    --shadow-5: 0 15px 35px hsla(0, 0%, 0%, .55);
  }
}

```
