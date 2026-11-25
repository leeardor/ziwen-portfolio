# Interface guidelines

Source: Rauno Freiberg, "Web Interface Guidelines", https://interfaces.rauno.me
Every page and component on this site must follow these. Summarised in our own words; read the source for detail.
Where a guideline conflicts with docs/design-rules.md, the design rules win (noted below).

## Interactivity
- Clicking a label focuses its input.
- Inputs sit inside a `<form>` so Enter submits.
- Inputs use the right `type` (email, password…); turn off spellcheck/autocomplete unless useful; use `required` for native validation.
- Input icons (prefix/suffix) are positioned on top of the input with padding, and clicking them focuses the input.
- Toggles apply immediately, no confirm step.
- Disable a submit button after submitting, to avoid duplicate requests.
- Interactive elements: `user-select: none` on their inner content.
- Decorative layers (glows, gradients, overlays): `pointer-events: none`.
- Items in a list have no dead gaps between them: use padding, not margins, so the whole row is clickable.

## Typography
- `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility`.
- Subset fonts to the languages actually used.
- Font weight never changes on hover or selected (no layout shift). Matches our rule: Regular 400 everywhere.
- No weights below 400.
- ~~Medium headings look best at 500–600~~ → **overridden**: our rule is Regular 400 only.
- Fluid sizes with `clamp()` are fine, but only between sizes in our locked scale.
- Tabular figures (`font-variant-numeric: tabular-nums`) for numbers in tables and lists: project numbers and years in the index.
- `-webkit-text-size-adjust: 100%` to stop iOS resizing text in landscape.

## Motion
- Switching theme must not trigger transitions.
- **Interaction animations ≤ 200ms** so they feel immediate. (The first-visit splash is not an interaction and is exempt.)
- Animate proportionally: dialogs fade in from ~0.8 scale, never from 0; buttons press to ~0.96, never 0.8.
- Frequent, low-novelty actions get no extra animation (menus, adding/removing list items, hovering trivial buttons). Same idea as our "the more frequent, the plainer" rule.
- Pause looping animations when off-screen.
- `scroll-behavior: smooth` for in-page anchors, with an offset for any fixed header.

## Touch
- Hover styles only under `@media (hover: hover)`, so touch doesn't flash them.
- Inputs at least 16px font size (prevents iOS zoom). Our Body size is 16.
- Never autofocus inputs on touch devices.
- Videos that autoplay need `muted` and `playsinline`.
- Custom pan/zoom components set `touch-action` to avoid fighting native gestures.
- If you remove the iOS tap highlight, replace it with a visible alternative.

## Performance
- Avoid large `blur()` / `backdrop-filter` values.
- Scaling/blurring flat rectangles causes banding; use radial gradients.
- `translateZ(0)` / `will-change` only as a last resort, and only during the animation.
- Don't autoplay many videos on iOS; pause or unmount off-screen ones. (Relevant for hover previews and photo/video work.)
- For real-time values (pointer position for the hover preview), update the DOM via refs instead of re-rendering React each frame.
- Adapt to the visitor's device and network.

## Accessibility
- No tooltips on disabled buttons.
- Focus rings with `box-shadow`, not `outline`, so they follow border radius.
- Lists of focusable items: navigable with ↑ ↓.
- Dropdowns open on `mousedown`, not `click`.
- SVG favicon that adapts to light/dark via `prefers-color-scheme`.
- Icon-only buttons have an `aria-label`.
- Hover tooltips contain no interactive content.
- Images are real `<img>` elements (screen readers, right-click copy).
- Illustrations built from HTML get an `aria-label` instead of exposing raw markup.
- Gradient text resets its gradient on `::selection`.
- Nested menus use a "prediction cone" so moving the pointer diagonally doesn't close them.

## Design
- Optimistic updates, roll back with feedback on error.
- Auth redirects happen on the server before the page loads.
- Style `::selection` (ours: rose background, #FAFAFA text).
- Feedback appears next to its trigger: inline checkmark after copying (e.g. copy email), highlight the field with the error.
- Empty states invite the next action.
