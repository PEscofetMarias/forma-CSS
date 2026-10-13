# forma-css

**forma-css** is a stylesheet microframework written in **SCSS**, built around modern CSS: `@layer`, `light-dark()`, the Popover API, `::details-content`, `@starting-style`, relative color syntax (`hsl(from ...)`, `rgb(from ...)`) and functions like `contrast-color()`.

Its goal: style **semantic** HTML elements with little or no utility classes, with automatic light/dark mode support and full customization through **CSS variables**.

> forma-css was born to **fill the gap left by the discontinued [Pico CSS](https://github.com/picocss/pico)**: it carries on the classless-framework philosophy, but built on modern CSS features (layers, Popover API, `light-dark()`, relative color syntax…).

## Features

- **Zero JS**: all components (accordion, dropdown, modal, toast, off-canvas, burger menu…) work with native HTML (`<details>`, `<summary>`, `popover`).
- **Automatic light/dark mode** via `light-dark()` and `color-scheme: light dark`.
- **CSS variable customization** with the `--forma-` prefix and sensible defaults.
- **Optional modules**: enable or disable each module from `scss/_config.scss` (`$modules`).
- **Ordered layers**: `forma.reset`, `forma.base`, `forma.components`, `forma.utilities`, so your own CSS always wins.
- **Responsive layout** with configurable breakpoints and variable-driven grids (`.grid`, `.display`).

## Installation

No package has been published yet; use the SCSS source directly:

```bash
git clone https://github.com/PEscofetMarias/forma-CSS.git
```

Compile the entry point:

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

## Customization with CSS variables

The whole visual identity is controlled from the root (`:root`). Prefix: `--forma-`.

| Variable | Default | Description |
| --- | --- | --- |
| `--forma-font-family` | `Arial` | General font |
| `--forma-font-family-headings` | `Arial` | Heading font (h1–h6, tooltip…) |
| `--forma-font-family-buttons` | `Arial` | Font for buttons and dropdowns |
| `--forma-font-weight` | `normal` | Base font weight |
| `--forma-font-size` | `16px` | Base size (scales across breakpoints) |
| `--forma-line-height` | `120%` | Base line height |
| `--forma-color-primary` | `#083cc0` | Primary color (buttons, links, checks) |
| `--forma-color-primary-dark` | — | Primary color in dark mode (defaults to the light value) |
| `--forma-color-secondary` | `#05a5d1` | Secondary color (`.btn-secondary`) |
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
| `--forma-gutter` | `1rem` | Spacing unit |
| `--forma-transition-slow` | `0.5s` | Slow transition (accordion, modals) |
| `--forma-transition-fast` | `0.2s` | Fast transition (buttons, tooltips) |
| `--forma-border-radius-panel` | `0.5rem` | Panel and image border radius |
| `--forma-border-radius-button` | `0.25rem` | Button and input border radius |
| `--forma-filter-backdrop` | `none` | `backdrop-filter` for modal backdrops |
| `--forma-filter-panel` | `none` | `backdrop-filter` for elevated panels |
| `--forma-elevation-1/2/3` | predefined shadows | Shadows (elevation levels) |
| `--forma-icon-search`, `--forma-icon-date`, `--forma-icon-time`, `--forma-icon-expand`, `--forma-icon-check` | — | Icon images for search/date/time inputs, selects and checks |

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

| Key | Breakpoint | Max `main` viewport width |
| --- | --- | --- |
| `sm` | 600px | 540px |
| `md` | 768px | 720px |
| `lg` | 1024px | 960px |
| `xl` | 1450px | 1200px |
| `xxl` | 1536px | 1400px |

## Layout

### Containers

`body > header`, `body > main` and `body > footer` are centered and width-limited according to the active breakpoint. Add `class="fluid"` to make them full width.

### `.grid`

Equal-column grid controlled by CSS variables, with per-breakpoint values:

```html
<div class="grid" style="--grid-columns: 1; --grid-md-columns: 2; --grid-lg-columns: 3; --grid-xxl-columns: 5">
  ...
</div>
```

### `.display`

Changes an element's `display` per breakpoint:

```html
<div class="display" style="--display: flex; --display-lg: grid"></div>
```

### Utilities (`layout/helpers`)

- `.flex-row` — flex row with `flex-wrap`.
- `.flex-full` — `justify-content: space-between`.
- `.m-0`, `.p-0`, `.mt-0`, `.mb-0`, `.ml-0`, `.mr-0`, `.pt-0`, `.pb-0`, `.pl-0`, `.pr-0` — spacing resets.

## Content

### Typography

Based on the `$text-sizes` map (editable in `_config.scss`). Default sizes:

| Selector | Size | Weight |
| --- | --- | --- |
| `h1`, `.heading-1` | 5rem | 300 |
| `h2`, `.heading-2` | 4rem | 300 |
| `h3`, `.heading-3` | 3rem | 300 |
| `h4`, `.heading-4` | 2rem | 300 |
| `h5`, `.heading-5` | 1.5rem | 300 |
| `h6`, `.heading-6` | 1.2rem | 300 |
| `p` | 1rem | — |
| `.lead` | 1.5× | — |
| `.small`, `small` | 0.8× | — |

Details:

- Each element exposes its size as a local `--forma-font-size`, so you can override it per element: `<h1 style="--forma-font-size: 3rem">…</h1>`.
- `.lead` and `.small` are standalone classes: they work on any element, not just `p`. Since they scale the element's local size (1.5× and 0.8×), they also work on headings: an `h1.lead` is truly large (7.5rem), an `h2.lead` renders at 6rem, and so on. This way default headings stay at contained sizes, and the `.lead` class gives you the big display headline when you need one.

```html
<h1>Contained title</h1>
<h1 class="lead">Really large title</h1>
```
- `h1` and `h2` enable `hyphens: auto` on small screens (`sm` and below) to prevent overflow.
- When switching between light and dark themes, the background and text colors fade smoothly.

### Buttons

Every `<button>`, `.btn` and `input[type=button|submit|reset]` is styled out of the box. Variants:

| Class | Description |
| --- | --- |
| `.btn` | Base button (primary color background) |
| `.btn-secondary` | Secondary color background |
| `.btn-contrast` | Color contrasted against the page background |
| `.btn-outline`, `.btn-outline-secondary`, `.btn-outline-contrast` | Outlined versions with transparent background |
| `.btn-sm`, `.btn-lg` | Small and large sizes |
| `.btn-round` | Circular button |
| `.btn-group`, `.btn-group-vertical` | Groups adjacent buttons (`<a>`, `<button>` or `<details><summary>`) |

### Tables

Base styling for `table`; add `.stripped` for alternating row colors.

### Other

- `<blockquote>` — 4px left border, generous padding, and `cite` with an automatic em dash (`— `) and smaller size.
- `<figure>` / `<figcaption>` — full width, rounded corners.
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

Position variants: `.dropup`, `.dropright`, `.dropleft` (combinable: `dropup dropright`). Alignment: `.dropdown-align-right`. Closes on outside click (overlay generated with `summary::before`).

### Burger menu — `.burger-menu`

```html
<details class="burger-menu">
  <summary><i><span></span></i></summary>
  <ul>
    <li><a href="#">Home</a></li>
  </ul>
</details>
```

The `<span>` draws the three bars that turn into a cross when opened.

### Modal — `.modal-window`

```html
<button popovertarget="m">Open</button>
<div id="m" popover class="modal-window">
  <h2>Title</h2>
  <button popovertarget="m" popovertargetaction="hide">Close</button>
</div>
```

Uses the Popover API; backdrop via `::backdrop` and enter/exit fade via `@starting-style`.

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

Shows a tooltip (with arrow) on `:hover`/`:focus`, built from the `data-text` attribute.

### Nav

Every link inside a `<nav>` is styled **without any class**: text color, `1.25rem` size, and primary color on `:hover`. Links with the `.btn` class (e.g. a button inside the navigation) are excluded and keep the button styling.

```html
<nav>
  <a href="#">Home</a>
  <a href="#">Projects</a>
  <a href="#" class="btn">Contact</a>
</nav>
```

## Forms

- **Base (`forms/basics`)**: `label`, `input` and `select` styled out of the box (2px border, focus with `panel-elevation-2` shadow, `disabled` state). `input[type=search|date|time]` show an icon (`--forma-icon-*`); `select` uses `--forma-icon-expand`; `input[type=color]` and `input[type=file]` have specific handling.
- **`.hidden-search`**: expanding search based on `<details>` — the form expands via `::details-content` when opened. Includes a `summary` with a search icon and a `span.close-icon` for the close icon.
- **Checkbox / radio**: `:checked` states drawn with pure CSS (`--forma-icon-check` icon for checkboxes, ring for radios).
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

All modules are enabled by default. Disable them via `$modules` in `_config.scss`:

`content/buttons`, `content/figure`, `content/typography`, `content/mark`, `content/table`, `content/blockquote`, `components/nav`, `components/accordion`, `components/dropdown`, `components/burger-menu`, `components/toast`, `components/off-canvas`, `components/modal`, `components/card`, `components/tooltip`, `forms/basics`, `forms/hidden-search`, `forms/radio-checkbox`, `forms/switch`, `layout/normalize`, `layout/layout`, `layout/helpers`.

## Browser support

forma-css assumes modern browsers (Chrome/Edge 120+, Firefox 129+, Safari 17.4+). It relies on: `@layer`, `light-dark()`, `::details-content`, `@starting-style`, `popover`, `transition-behavior: allow-discrete`, relative color syntax and `contrast-color()`.

## License

[MIT](LICENSE) — forma-css is free and open-source software.