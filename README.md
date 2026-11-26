# forma-css

**forma-css** is a stylesheet microframework written in **SCSS**, built around modern CSS: `@layer`, `light-dark()`, the Popover API, `::details-content`, `@starting-style`, relative color syntax in **`oklch`** and functions like `contrast-color()`.

Its goal: style **semantic** HTML elements with little or no utility classes, with automatic light/dark mode support and full customization through **CSS variables**. Interaction states (hover, active) and color variants are derived with **relative color syntax in `oklch`**, so the variants stay perceptually consistent for any color you choose.

Layout follows the same idea. Grids can be defined **massively** with `.grid` plus responsive custom properties — no need to repeat classnames when the modules are identical — or **selectively** with `.responsive-container` (which sets the grid size via `--grid`) and `.responsive-column` (which sets its exact width via `--span`). Unlike Bootstrap or Pico, forma-css combines CSS styles with custom properties written in the markup itself, which considerably reduces the weight of the generated CSS.

## Why forma-css?

forma-css was born out of a real need, not a trend. After years of building with **Bootstrap** (v3 to v5), its author — like the framework's creator — became increasingly concerned with **energy efficiency in web development** and started working to drive the carbon footprint of websites as low as possible.

That search led to **[Pico CSS](https://github.com/picocss/pico)**: classless, semantic HTML meant less CSS *and* less markup to ship. But Pico (~80 kB) was still more than the job required — and its development was discontinued.

So forma-css was created to **fill the gap left by Pico CSS**: it carries on the classless-framework philosophy, but pushes efficiency further with modern CSS features (layers, the Popover API, `light-dark()`, relative color syntax…). The result: websites built with forma-css consistently achieve **A+ ratings on [Ecograder](https://ecograder.com)**. Its own documentation site, [formacss.com](https://formacss.com), holds an **A+ Digital Carbon Rating** — under 10 kB of CSS, around 150 kB of total page weight, under 0.02 g CO₂ per pageview, zero JS libraries.

## Features

- **Zero JS**: all components (accordion, dropdown, modal, toast, burger menu…) work with native HTML (`<details>`, `<summary>`, `popover`).
- **Automatic light/dark mode** via `light-dark()` and `color-scheme: light dark`.
- **CSS variable customization** with the `--forma-` prefix and sensible defaults.
- **Optional modules**: enable or disable each module from `scss/_config.scss` (`$modules`).
- **Ordered layers**: `forma.reset`, `forma.base`, `forma.components`, `forma.utilities`, so your own CSS always wins.
- **Responsive layout** with configurable breakpoints and variable-driven grids (`.grid`, `.responsive-container`/`.responsive-column` with `--grid`/`--span`, `.display`).
- **Accessible by default (WCAG 2.2 AA)**: keyboard focus rings on every interactive control, tabs navigable with arrow keys, `prefers-reduced-motion` support, forced-colors (Windows high contrast) fallbacks, legible color defaults and underlined links inside running text.
- **Not a single `!important`** in the whole codebase: ordered layers (plus the deliberately unlayered `.display` utility and motion preferences) mean your rules win by construction.
- **Graceful degradation, not silence**: rules that depend on the newest CSS (`contrast-color()`) carry grouped `@supports` fallbacks with precomputed `light-dark()` pairs, so buttons, badges and form controls stay legible while the feature is unsupported.

## Installation

Install from [npm](https://www.npmjs.com/package/forma-css):

```bash
npm install forma-css
```

Or link the minified CSS directly from a CDN — no installation required:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/forma-css@1/css/forma-css.min.css" />
```

Or compile your own build from the SCSS source:

```bash
sass scss/forma-css.scss dist/forma-css.css
```

And link the compiled CSS:

```html
<link rel="stylesheet" href="dist/forma-css.css" />
```

To include only part of the framework, `@use` the modules you need and disable the rest via `$modules`:

```scss
@use "config" with (
  $modules: (
    "layout/normalize": true,
    "content/typography": true,
    "content/buttons": true,
    "components/modal": true
  )
);
@use "index";
```

## Documentation

The full documentation lives at **[formacss.com](https://formacss.com)** — the framework's first real project, built with forma-css itself. It covers getting started, customization (runtime custom properties and build-time SCSS), layout, content, forms and every component, plus a Philosophy section with the numbers behind the framework and migration guides if you come from Pico CSS, Bootstrap or Tailwind.

## Customization with CSS variables

The whole visual identity is controlled from the root (`:root`). Prefix: `--forma-`.

| Variable | Default | Description |
| -------- | ------- | ----------- |
| `--forma-font-family` | `Arial` | General font |
| `--forma-font-family-headings` | `Arial` | Heading font (h1–h6, tooltip…) |
| `--forma-font-family-buttons` | `Arial` | Font for buttons and dropdowns |
| `--forma-font-weight` | `normal` | Base font weight |
| `--forma-font-size` | `16px` | Base size (scales across breakpoints) |
| `--forma-line-height` | `120%` | Base line height |
| `--forma-color-primary` | `#083cc0` | Primary color (buttons, links, checks, `.color-primary`) |
| `--forma-color-primary-dark` | — | Primary color in dark mode (defaults to the light value) |
| `--forma-color-secondary` | `#05a5d1` | Secondary color (`.btn-secondary`, `.color-secondary`) |
| `--forma-color-secondary-dark` | — | Secondary color in dark mode (defaults to the light value) |
| `--forma-color-text` | `#222` | Text color (light mode) |
| `--forma-color-text-dark` | `white` | Text color (dark mode) |
| `--forma-color-background` | `white` | Page background (light mode) |
| `--forma-color-background-dark` | `#2a2a2a` | Page background (dark mode) |
| `--forma-color-backdrop` | `rgb(from white r g b / 0.4)` | Backdrop background (modals, light mode) |
| `--forma-color-backdrop-dark` | `rgb(from black r g b / 0.2)` | Backdrop background (dark mode) |
| `--forma-color-panel` | `white` | Panel background (modals, toasts, dropdowns) |
| `--forma-color-panel-dark` | `black` | Panel background (dark mode) |
| `--forma-color-border-panel` | `#e0e0e0` | Panel border |
| `--forma-color-border-panel-dark` | `#2a2a2a` | Panel border (dark mode) |
| `--forma-color-gray-highlight` | `#cccccc` | General-purpose gray (input borders, table rows) |
| `--forma-color-success` | `green` | Success color (form validation, `.color-success`) |
| `--forma-color-success-dark` | `#4caf50` | Success color in dark mode (defaults to the light value) |
| `--forma-color-danger` | `#d63c00` | Danger color (form validation, `.color-danger`) |
| `--forma-color-danger-dark` | `#ff7043` | Danger color in dark mode (defaults to the light value) |
| `--forma-color-info` | `#0059ff` | Info color (`.color-info`) |
| `--forma-color-info-dark` | `#5b8cff` | Info color in dark mode (defaults to the light value) |
| `--forma-color-warning` | `#8a7500` | Warning color (`.color-warning`) |
| `--forma-color-warning-dark` | `#ffe014` | Warning color in dark mode (defaults to the light value) |
| `--forma-font-size-base` | per breakpoint | Document base size; updates itself at each breakpoint |
| `--forma-scale-sm` | `0.7` | Scaling factor for the `.sm` class |
| `--forma-scale-lg` | `1.3` | Scaling factor for the `.lg` class |
| `--forma-scale-xl` | `1.5` | Scaling factor for the `.xl` class |
| `--forma-gutter` | `1rem` | Spacing unit |
| `--forma-transition-slow` | `0.5s` | Slow transition (accordion, modals) |
| `--forma-transition-fast` | `0.2s` | Fast transition (buttons, tooltips) |
| `--forma-border-radius-panel` | `0.5rem` | Panel and image border radius |
| `--forma-border-radius-button` | `0.25rem` | Button and input border radius |
| `--forma-filter-backdrop` | `none` | `backdrop-filter` for modal backdrops |
| `--forma-filter-panel` | `none` | `backdrop-filter` for elevated panels |
| `--forma-elevation-1/2/3` | predefined shadows | Shadows (elevation levels) |
| `--forma-icon-search`, `--forma-icon-date`, `--forma-icon-time`, `--forma-icon-expand`, `--forma-icon-check`, `--forma-icon-invalid-true`, `--forma-icon-invalid-false` | built-in SVG | Icons for inputs (search/date/time, selects, checks) and validation states. Every icon falls back to a built-in inline SVG, so default controls are fully functional and readable even without configuration |

Example:

```css
:root {
  --forma-color-primary: #d63a2f;
  --forma-font-family: "Inter", sans-serif;
  --forma-gutter: 1.5rem;
}
```

### Breakpoints

Defined in `$breakpoints` (editable in `_config.scss`):

| Key | Breakpoint | Fixed `main` viewport width |
| --- | --------- | ------------------------- |
| `sm` | 600px | 540px |
| `md` | 768px | 720px |
| `lg` | 1024px | 960px |
| `xl` | 1450px | 1200px |
| `xxl` | 1536px | 1400px |

## Layout

### Containers

`body > header`, `body > main` and `body > footer` are centered with a **fixed width** according to the active breakpoint (`width`, not `max-width`): each breakpoint sets an exact container width, so the layout stays constant while the viewport grows within a breakpoint. Add `class="fluid"` to make them full width.

### `.grid`

Equal-column grid controlled by CSS variables, with per-breakpoint values:

```html
<div class="grid" style="--grid-columns: 1; --grid-columns-sm: 2; --grid-columns-lg: 3; --grid-columns-xxl: 5">
  ...
</div>
```

Values cascade across breakpoints (`--grid-columns` → `--grid-columns-sm` → `--grid-columns-md` → `--grid-columns-lg` → `--grid-columns-xl` → `--grid-columns-xxl`).

### `.responsive-container` / `.responsive-column`

Flex-based column layout over a 12-column base grid. The container declares the grid size with `--grid` (default `12`); each column declares how many grid columns it occupies with the `--span` variable, with per-breakpoint values. The width is computed automatically, including the gutters between the spanned columns:

```html
<div class="responsive-container" style="--grid: 12">
  <article class="responsive-column" style="--span: 6; --span-lg: 8">…</article>
  <article class="responsive-column" style="--span: 6; --span-lg: 4">…</article>
</div>
```

A column without `--span` takes the whole grid (`--span` defaults to `--grid`). Unlike `.grid`, every column sets its width independently, so mixed widths per element wrap naturally: a column that does not fit moves to the next line. Values cascade across the full breakpoint chain (`--span` → `--span-sm` → `--span-md` → `--span-lg` → `--span-xl` → `--span-xxl`), each falling back to the previous one. Spans admit **decimal values** (e.g. `--span-lg: 2.5`), which class-based grid systems cannot express.

### `.display`

Changes an element's `display` per breakpoint:

```html
<div class="display" style="--display: flex; --display-sm: block; --display-lg: grid"></div>
```

### Utilities (`layout/helpers`)

- `.flex-row` — flex row with `flex-wrap`.
- `.align-center` — `align-items: center`.
- `.flex-full` — `justify-content: space-between`.
- `.overflow` — full width with `overflow: auto`.
- `.sm`, `.lg`/`.lead`, `.xl` — universal size classes (`.lead` is an alias of `.lg`; see [Typography](#size-classes-sm-lg-xl)).
- `.color-primary`, `.color-secondary` — brand text colors (driven by the primary/secondary color variables, with automatic dark-mode variants).
- `.color-success`, `.color-danger`, `.color-info`, `.color-warning` — state text colors, driven by the state color variables (with automatic dark-mode variants).
- `.color-contrast` — the text color inverted against the page background (`contrast-color()`).

## Content

### Typography

Based on the `$text-sizes` map (editable in `_config.scss`). Default sizes:

| Selector | Size | Weight |
| -------- | ---- | ------ |
| `h1`, `.heading-1` | 5rem | 300 |
| `h2`, `.heading-2` | 4rem | 300 |
| `h3`, `.heading-3` | 3rem | 300 |
| `h4`, `.heading-4` | 2rem | 300 |
| `h5`, `.heading-5` | 1.5rem | 300 |
| `h6`, `.heading-6` | 1.2rem | 300 |
| `p`, `li` | 1em | — |

**Per-element customization.** Every property of every element can be overridden through its own variable: `--forma-heading1-font-size`, `--forma-heading1-line-height`, `--forma-heading1-margin`, `--forma-heading1-font-family`… (same pattern for `heading2`–`heading6`, `paragraph`, `hr`, etc.). You can define them at `:root` or on any container:

```css
:root {
  --forma-heading1-font-size: 4em;
  --forma-paragraph-line-height: 150%;
}
```

**Relative sizes (em).** All default values are in `em`, so sizes scale in cascade: if a container has the `.sm` class (or `.lg`/`.xl`), every text and button inside scales with it — no need to repeat the class on each element.

```html
<section class="sm">
  <h2>This h2 is smaller</h2>
  <p>And so is this paragraph.</p>
  <button class="btn">And this button.</button>
</section>
```

Details:

- Each element exposes its size as a local `--forma-font-size-base`, so you can override it per element: `<h1 style="--forma-font-size-base: 3rem">…</h1>`.
- `h1` and `h2` enable `hyphens: auto` on small screens (`sm` and below) to prevent overflow.
- When switching between light and dark themes, the background and text colors fade smoothly.

#### Size classes: `.sm`, `.lg`, `.xl`

Scale any element by multiplying its base size (`--forma-font-size-base`, the element's local one or the document's global) by a configurable factor:

| Class | Factor | Description |
| ----- | ------ | ----------- |
| `.sm` | 0.7× | Smaller version (equivalent to `<small>`) |
| `.lg` | 1.3× | Larger version |
| `.xl` | 1.5× | Really large version |

```html
<h1>Contained title</h1>
<h1 class="lg">Large title</h1>
<button class="btn xl">Large button</button>
```

The factors are adjustable from `:root` via `--forma-scale-sm`, `--forma-scale-lg` and `--forma-scale-xl`. Since button padding, gaps and icons use relative units, the size classes scale **the whole element**, not just the text.

### Links

Links are bold in the primary color. Inside running text (`p`, `li`, `td`, `figcaption`) they also carry an underline, so they never rely on color alone (WCAG 1.4.1). Button-like links (`.btn`) and navigation links are not underlined.

### Buttons

Every `<button>`, `.btn` and `<input type=button|submit|reset>` is styled out of the box. Variants:

| Class | Description |
| ----- | ----------- |
| `.btn` | Base button (primary color background) |
| `.btn-secondary` | Secondary color background |
| `.btn-contrast` | Color contrasted against the page background |
| `.btn-outline`, `.btn-outline-secondary`, `.btn-outline-contrast` | Outlined versions with transparent background |
| `.btn-round` | Circular button |
| `.btn-group`, `.btn-group-vertical` | Groups adjacent buttons (`<a>`, `<button>` or `<details><summary>`) |

To make a button bigger or smaller, use the universal size classes (`.sm`, `.lg`, `.xl`) — they work on buttons because all their metrics are in relative units.

**Button customization.** Every button metric has its own variable: `--forma-button-font-size` (default `1em`), `--forma-button-font-weight` (`300`), `--forma-button-line-height` (`1em`), `--forma-button-padding` (`0.5em 0.75em`), `--forma-button-gap` (`0.5em`) and `--forma-font-family-buttons` (font). Define them at `:root` or on any container to tune all the buttons of a section.

### Badges — `.badge`

Small inline label for counts, statuses or tags. The badge inverts itself against the page background with `contrast-color()`, so it stays legible in light and dark mode without any extra class. Badges are sized relatively (`0.65em`) and the parent of any direct `.badge` child automatically becomes a centered flex row with a small gap, so a badge always sits aligned with its label. Combine with the utility color classes (`.color-*`) or the universal size classes (`.sm`, `.lg`) for variants:

```html
<p>Unread messages <span class="badge">12</span></p>
<span class="badge color-danger">Deprecated</span>
```

### Icons — `<i>`, `.bi`

Icons (`<i>` or any element with the `.bi` class, e.g. Bootstrap Icons SVGs) keep a `1em` height with automatic width. Inside `h1`–`h6` **and the `.heading-1`–`.heading-6` classes**, icons scale with the heading: their height becomes half the heading font size (`--forma-font-size-base * 0.5`).

### Text with emphasis

`<u>`, `<ins>`, `<del>`, `<s>` get a gradient underline instead of `text-decoration` (on `del`/`s` the line sits in the middle), and `<mark>` uses a secondary→primary gradient as text color. In forced-colors (Windows high contrast) mode the native decorations and the system `Highlight` colors are restored, so emphasis stays visible.

### Tables

Base styling for `table`; add `.stripped` for alternating row colors.

### Code

Inline `code` gets a subtle gray-highlight background, rounded corners and a smaller size (`0.75em`). `pre` blocks get panel padding, a rounded border and horizontal scroll; a `code` inside `pre` is reset (transparent background, no padding, `1em`) so markup to display inside code blocks needs no extra class.

```html
<p>Edit <code>scss/_config.scss</code> to change breakpoints.</p>
<pre><code>body { margin: 0; }</code></pre>
```

### Other

- `<blockquote>` — 4px left border, generous padding, and `cite` with an automatic em dash (—) and smaller size.
- `<figure>` / `<figcaption>` — full width, rounded corners.
- `<u>`, `<ins>`, `<del>`, `<s>` — gradient underline (thin line in the text color) instead of `text-decoration`; on `del`/`s` the line sits in the middle.
- `<mark>` — secondary→primary gradient as text color.
- `<hr>` — horizontal rule in the text color.

## Components

All based on native HTML; no JavaScript.

### Accordion — `.accordion`

```html
<div class="accordion">
  <details>
    <summary>Title <span></span></summary>
    <p>Content…</p>
  </details>
</div>
```

Opening animation via `::details-content`; the `<span>` inside `summary` draws the rotating cross.

### Dropdown — `.dropdown`

```html
<details class="dropdown">
  <summary>Options</summary>
  <ul>
    <li><a href="#">Action 1</a></li>
    <li><hr /></li>
    <li><a href="#">Action 2</a></li>
  </ul>
</details>
```

Menu items stack with a small gap between them. Give an item the `.active` class (e.g. the current page) and it gets a pressed background derived with relative color syntax.

Position variants: `.dropup`, `.dropright`, `.dropleft` (combinable: `dropup dropright`). Alignment: `.dropdown-align-right`. Closes on outside click (overlay generated with `summary::before`).

**Multi-level menus.** A `.dropdown` can contain other `.dropdown`s nested inside its `li`s — each level works independently and without JavaScript. Combine with `.dropright` to create lateral submenus:

```html
<details class="dropdown">
  <summary>Options</summary>
  <ul>
    <li><a href="#">Action 1</a></li>
    <li>
      <details class="dropdown dropright">
        <summary>More…</summary>
        <ul>
          <li><a href="#">Sub-action 1</a></li>
          <li><a href="#">Sub-action 2</a></li>
        </ul>
      </details>
    </li>
    <li><hr /></li>
    <li><a href="#">Action 2</a></li>
  </ul>
</details>
```

### Burger menu — `.burger-menu`

```html
<details class="burger-menu">
  <summary><i><span></span></i></summary>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
    </ul>
  </nav>
</details>
```

The `<span>` draws the three bars that turn into a cross when opened. The list is wrapped in a `<nav>`, and other `.dropdown`s (e.g. a language switcher) can be nested inside its `li`s without conflicts.

### Expanding search — `.hidden-search`

A search field that takes minimal space (just the icon) and expands with animation when opened. Built on `<details>` with `::details-content` — no JavaScript.

```html
<details class="hidden-search">
  <summary class="search-icon">🔍</summary>
  <form>
    <input type="search" placeholder="Search…" />
  </form>
  <span class="close-icon">✕</span>
</details>
```

Notes:

- The content (`<form>`) expands from the right with `scaleX` and an `allow-discrete` transition.
- With the details open, the search icon is hidden and the `close-icon` is shown (define it with any content you like).
- The search icon inside the input comes from the `--forma-icon-search` variable.
- Recommended inside a `<nav>` or `<header>`, with the search icon as the `summary`.

### Modal — `.modal-window`

```html
<button popovertarget="m">Open</button>
<div id="m" popover class="modal-window">
  <h2>Title</h2>
  <button popovertarget="m" popovertargetaction="hide">Close</button>
</div>
```

Uses the Popover API; backdrop via `::backdrop` and enter/exit fade via `@starting-style`.

Size variants: `.modal-sm` (60/40/30vw per breakpoint) and `.modal-lg` (90/80/70vw); the default is 80/60/40vw. With `popover="manual"` the modal only closes through its own buttons; a plain `popover` also closes on outside click or Esc. Add `.modal-body.scrollable` for a body area that scrolls independently (`overflow: auto`, `max-height: 80vh`).

### Toast — `.toast`

A fixed `popover` element in the top-right corner, with breakpoint-adaptive width (30vw → 40vw → 60vw → 80vw).

```html
<div id="t" popover class="toast">Message…</div>
```

### Off-canvas — `.off-canvas`

A full-height `popover` anchored to the right edge of the screen (extends `.toast`); slides in with a `translateX` transition.

### Card — `.card` / `<article>`

Every `<article>` (or `.card` element) gets card styling: padding (`--card-padding`), radius, shadow and edge-to-edge `figure`. Use `.card-horizontal` for a horizontal card (image on the left with `object-fit: cover`).

### Tooltip — `[data-text]`

```html
<button data-text="Contextual help">?</button>
```

Shows a tooltip (with arrow) on `:hover`/`:focus`, built from the `data-text` attribute. Pseudo-element based, so it does not render on void elements (`<input>`, `<img>`…).

### Nav

Every link inside a `<nav>` is styled **without any class**: text color, `1.25em` size (scales with the size classes), and primary color on `:hover`. Links with the `.btn` class (e.g. a button inside the navigation) are excluded and keep the button styling.

```html
<nav>
  <a href="#">Home</a>
  <a href="#">Projects</a>
  <a href="#" class="btn">Contact</a>
</nav>
```

### Tabs — `.tabs`

Tab system built on **radio inputs**: no JavaScript. Each `label` is a tab, and panels are toggled through adjacent selectors (`input:checked + label + .tab-panel`). The radios are visually hidden but remain focusable (WCAG 2.1.1): `Tab` enters the group, the arrow keys move between tabs (native radio behavior), and the focus ring is projected onto the active tab label.

```html
<div class="tabs">
  <input type="radio" name="tabs" id="t1" checked />
  <label for="t1">First</label>
  <input type="radio" name="tabs" id="t2" />
  <label for="t2">Second</label>

  <div class="separator"></div>

  <div class="tab-panel">First panel content…</div>
  <div class="tab-panel">Second panel content…</div>
</div>
```

Notes: the `.separator` (a `div` with a top border) divides the tabs from the panels; with the `.full-width` modifier class, the tabs split the container's full width evenly.

## Forms

- **Base (`forms/basics`)**: `label`, `input` and `select` styled out of the box (2px border, focus with a 2px focus ring plus the `panel-elevation-2` shadow, `disabled` state). `input[type=search|date|time]` show an icon (`--forma-icon-*`); `select` uses `--forma-icon-expand`; `input[type=color]` and `input[type=file]` have specific handling.
- **Validation (`forms/validation`)**: fields with `aria-invalid` get a state border plus a built-in status icon (`--forma-icon-invalid-*` with SVG fallback), and the focus ring takes the field state color (danger/success) instead of the primary.
- **`.hidden-search`**: expanding search based on `<details>` — the form expands via `::details-content` when opened. Includes a `summary` with a search icon and a `span.close-icon` for the close icon.
- **Checkbox / radio**: `:checked` states drawn with pure CSS (`--forma-icon-check` icon for checkboxes, ring for radios). All control types get an explicit `:focus-visible` ring, and their checked state survives Windows high contrast mode (`forced-colors`).
- **Switch**: `<input type="checkbox" role="switch">` becomes an animated toggle.

```html
<label>
  <input type="checkbox" role="switch" checked />
  Notifications
</label>
```

## Mixins (for SCSS development)

Defined in `scss/mixins/_mixins.scss`:

- `@include media($key, $direction: up)` — media query based on `$breakpoints` (`up`/`down`).
- `@include panel-elevation-1|2|3` — panel with background, border and shadow for the given level (2 and 3 add `backdrop-filter`).
- `@include initialize-fading` — enter/exit fade for `popover` elements.

```scss
@use "mixins/mixins" as m;

.featured-card {
  @include m.panel-elevation-3;
  @include m.media(md, up) { padding: 2rem; }
}
```

## Modules

**Core modules** — `layout/normalize` and `layout/layout` **are always loaded**: they are the foundation of the framework (reset, the global responsive `--forma-font-size-base` variable per breakpoint, containers and grids) and cannot be disabled. All other modules depend on them.

The remaining modules are enabled by default. Disable them via `$modules` in `_config.scss`:

`content/buttons`, `content/badge`, `content/figure`, `content/typography`, `content/mark`, `content/table`, `content/blockquote`, `components/nav`, `components/accordion`, `components/tab-nav`, `components/dropdown`, `components/burger-menu`, `components/toast`, `components/off-canvas`, `components/modal`, `components/card`, `components/tooltip`, `forms/basics`, `forms/hidden-search`, `forms/radio-checkbox`, `forms/switch`, `layout/helpers`.

## Browser support

forma-css targets modern browsers: **Chrome/Edge 120+, Firefox 129+ and Safari 18.4+**. It relies on: `@layer`, `light-dark()` (Safari 17.5+), `@starting-style` (17.5+), the Popover API (17+), `::details-content` (Safari 18.4+), `transition-behavior: allow-discrete`, relative color syntax (Safari 18+) and `contrast-color()`.

`contrast-color()` is the newest piece (Chrome/Edge 147+, Firefox 146+, Safari 26+). Browsers without it do not just skip one declaration — the affected rules become invalid, colors fall back to inheritance, and filled buttons and badges turn unreadable. Those rules therefore carry grouped `@supports` fallbacks with precomputed `light-dark()` black/white pairs for the default tokens: buttons, badges, the range-slider thumb and `.color-contrast` stay legible on every browser listed above. Browsers with native support always resolve the exact runtime contrast, which matters if you override `--forma-button-color` (or the badge backgrounds) with colors of a very different luminance.

## License

[MIT](LICENSE) — forma-css is free and open-source software.
