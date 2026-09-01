// A single, consistent focus-visible and hover-transition treatment, reused by every interactive
// control (buttons, links, nav items) that doesn't already define its own. An outline, not
// Tailwind's `ring`/box-shadow utilities: it always reads correctly against any background (an
// element's own color, a toast's tinted background, dark mode) without needing a matching
// `ring-offset-color` per context. No `outline-none` here: Tailwind's `outline-<n>` utilities only
// set outline-width and read outline-style from a shared `--tw-outline-style` custom property that
// Tailwind's own base layer already sets to `solid` on every element; adding `outline-none` would
// overwrite that property to `none` unconditionally (it isn't scoped to `:focus-visible`), and no
// later `focus-visible:` utility would ever restore it, since none of them write the property, only
// read it. Leaving the browser with no authored outline at all outside `:focus-visible` is already
// invisible (the CSS-spec initial `outline-style` is `none`), so nothing extra is needed for that
// case. `transition` (not `transition-colors`) also covers the opacity-based hover treatments (e.g.
// the toast dismiss button) that a color-only transition would miss.
export const INTERACTIVE_CLASS_NAME =
  'transition duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:focus-visible:outline-sky-400'
