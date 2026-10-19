# forma-css

**forma-css** is a stylesheet microframework written in **SCSS**, built around modern CSS: `@layer`, `light-dark()`, the Popover API, `::details-content`, `@starting-style`, relative color syntax in **`oklch`** and functions like `contrast-color()`.

Its goal: style **semantic** HTML elements with little or no utility classes, with automatic light/dark mode support and full customization through **CSS variables**. Interaction states (hover, active) and color variants are derived with **relative color syntax in `oklch`**, so the variants stay perceptually consistent for any color you choose.

## Why forma-css?

forma-css was born out of a real need, not a trend. After years of building with **Bootstrap** (v3 to v5), its author — like the framework's creator — became increasingly concerned with **energy efficiency in web development** and started working to drive the carbon footprint of websites as low as possible.

That search led to **[Pico CSS](https://github.com/picocss/pico)**: classless, semantic HTML meant less CSS *and* less markup to ship. But Pico (~80 kB) was still more than the job required — and its development was discontinued.

So forma-css was created to **fill the gap left by Pico CSS**: it carries on the classless-framework philosophy, but pushes efficiency further with modern CSS features (layers, the Popover API, `light-dark()`, relative color syntax…). The result: websites built with forma-css consistently achieve **A+ ratings on [Ecograder](https://ecograder.com)**.

## Features

- **Zero JS**: all components (accordion, dropdown, modal, toast, off-canvas, burger menu…) work with native HTML (`<details>`, `<summary>`, `popover`).
- **Automatic light/dark mode** via `light-dark()` and `color-scheme: light dark`.
- **CSS variable customization** with the `--forma-` prefix and sensible defaults.
- **Optional modules**: enable or disable each module from `scss/_config.scss` (`$modules`).
- **Ordered layers**: `forma.reset`, `forma.base`,
 `forma.components`, `forma.utilities`, so your own CSS always wins.
- **Responsive layout** with configurable breakpoints and variable-driven grids (`.grid`, `.display`).

## Installation

Install from [npm](https://www.npmjs.com/package/forma-css):

```bash
npm install forma-css
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


| Variable                                                                                                     | Default                       | Description                                                 |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------- | ----------------------------------------------------------- |
| `--forma-font-family`                                                                                        | `Arial`                       | General font                                                |
| `--forma-font-family-headings`                                                                               | `Arial`                       | Heading font (h1–h6, tooltip…)                              |
| `--forma-font-family-buttons`                                                                                | `Arial`                       | Font for buttons and dropdowns                              |
| `--forma-font-weight`                     
                                                                   | `normal`                      | Base font weight                                            |
| `--forma-font-size`                                                                                          | `16px`                        | Base size (scales across breakpoints)                       |
| `--forma-line-height`                                                                                        | `120%`                        | Base line height                                            |
| `--forma-color-primary`                                                                                      | `#083cc0`                     | Primary color (buttons, links, checks)                      |
| `--forma-color-primary-dark`                                                                                 | —                             | Primary color in dark mode (defaults to the light value)    |
| `--forma-color-secondary`                                                                                    | `#05a5d1`                     | Secondary color (`.btn-secondary`)                          |
| `--forma-color-secondary-dark`                                                                               | —                             | Secondary color in dark mode (defaults to the light value)  |
| `--forma-color-text`                                                                                         | `#222`                        | Text color (light mode)                                     |
| `--forma-color-text-dark`                                                                                    | `white`                       | Text color (dark mode)                                      |
| `--forma-color-background`                                                                                   | `white`                       | Page background (light mode)        
                        |
| `--forma-color-background-dark`                                                                              | `#2a2a2a`                     | Page background (dark mode)                                 |
| `--forma-color-backdrop`                                                                                     | `rgb(from white r g b / 0.4)` | Backdrop background (modals, light mode)                    |
| `--forma-color-backdrop-dark`                                                                                | `rgb(from black r g b / 0.2)` | Backdrop background (dark mode)                             |
| `--forma-color-panel`                                                                                        | `white`                       | Panel background (modals, toasts, dropdowns)                |
| `--forma-color-panel-dark`                                                                                   | `black`                       | Panel background (dark mode)                                |
| `--forma-color-border-panel`                                                                                 | `#e0e0e0`                     | Panel border                                                |
| `--forma-color-border-panel-dark`                                                                            | `#2a2a2a`                     | Panel border (dark mode)                                    |
| `--forma-color-gray-highlight`                                                                               | `#cccccc`                     | General-purpose gray (input borders, table rows)            |
| `--forma-font-size-base`                                                                                     | per breakpoint                | Document base size; updates itself at each breakpoint       |
| `--forma-scale-sm`                                                                                           
| `0.7`                         | Scaling factor for the `.sm` class                          |
| `--forma-scale-lg`                                                                                           | `1.3`                         | Scaling factor for the `.lg` class                          |
| `--forma-scale-xl`                                                                                           | `1.5`                         | Scaling factor for the `.xl` class                          |
| `--forma-gutter`                                                                                             | `1rem`                        | Spacing unit                                                |
| `--forma-transition-slow`                                                                                    | `0.5s`                        | Slow transition (accordion, modals)                         |
| `--forma-transition-fast`                                                                                    | `0.2s`                        | Fast transition (buttons, tooltips)                         |
| `--forma-border-radius-panel`                                                                                | `0.5rem`                      | Panel and image border radius                               |
| `--forma-border-radius-button`                                                                               | `0.25rem`                     | Button and input border radius                              |
| `--forma-filter-backdrop`                                                                                    | `none`                        | `backdrop-filter` for modal backdrops                       |
| `--forma-filter-panel`                                                                                       | `none`                        | `backdrop-filter` for elevated panels                       |
| `--forma-elevation-1/2/3`              
                                                                      | predefined shadows            | Shadows (elevation levels)                                  |
| `--forma-icon-search`, `--forma-icon-date`, `--forma-icon-time`, `--forma-icon-expand`, `--forma-icon-check` | —                             | Icon images for search/date/time inputs, selects and checks |


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


| Key   | Breakpoint | Max `main` viewport width |
| ----- | ---------- | ------------------------- |
| `sm`  | 600px      | 540px                     |
| `md`  | 768px      | 720px                     |
| `lg`  | 1024px     | 960px                     |
| `xl`  | 1450px     | 1200px                    |
| `xxl` | 1536px     | 1400px                    |


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
- `.overflow` — full width with `overflow: auto`.
- `.sm`, `.lg`, `.xl` — universal size classes (see [Typography](#size-classes-sm-lg-xl)).

## Content

### Typography

Based on the `$text-sizes` map (editable in `_config.scss`). Default sizes:


| Selector           | Size   | Weight |
| ------------------ | ------ | ------ |
| `h1`, `.heading-1` | 5rem   
| 300    |
| `h2`, `.heading-2` | 4rem   | 300    |
| `h3`, `.heading-3` | 3rem   | 300    |
| `h4`, `.heading-4` | 2rem   | 300    |
| `h5`, `.heading-5` | 1.5rem | 300    |
| `h6`, `.heading-6` | 1.2rem | 300    |
| `p`, `li`          | 1em    | —      |


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


| Class | Factor | Description                               |
| ----- | ------ | ----------------------------------------- |
| `.sm` | 0.7×   | Smaller version (equivalent to `<small>`) |
| `.lg` | 1.3×   | Larger version                            |
| `.xl` | 1.5×   | Really large version                      |


```html
<h1>Contained title</h1>
<h1 class="lg
">Large title</h1>
<button class="btn xl">Large button</button>
```

The factors are adjustable from `:root` via `--forma-scale-sm`, `--forma-scale-lg` and `--forma-scale-xl`. Since button padding, gaps and icons use relative units, the size classes scale **the whole element**, not just the text.

### Buttons

Every `<button>`, `.btn` and `input[type=button|submit|reset]` is styled out of the box. Variants:


| Class                                                             | Description                                                         |
| ----------------------------------------------------------------- | ------------------------------------------------------------------- |
| `.btn`                                                            | Base button (primary color background)                              |
| `.btn-secondary`                                                  | Secondary color background                                          |
| `.btn-contrast`                                                   | Color contrasted against the page background                        |
| `.btn-outline`, `.btn-outline-secondary`, `.btn-outline-contrast` | Outlined versions with transparent background                       |
| `.btn-round`                                                      | Circular button                                                     |
| `.btn-group`, `.btn-group-vertical`                               | Groups adjacent buttons (`<a>`, `<button>` or `<details><summary>`) |


To make a button bigger or smaller, use the universal size classes (`.sm`, `.lg`, `.xl`) — they work on buttons because all their metrics are in relative units.

**Button customization.** Every button metric has its own variable: `--forma-button-font-size` (default `1em`), `--forma-button-font-weight` (`300`), `--forma-button-line-height` (`1em`), `--forma-button-padding` (`0.5em 0.75em`), `--forma-button-gap` (`0.5em`) and `--forma-font-family-buttons` (font).
 Define them at `:root` or on any container to tune all the buttons of a section.

### Tables

Base styling for `table`; add `.stripped` for alternating row colors.

### Other

- `<blockquote>` — 4px left border, generous padding, and `cite` with an automatic em dash (`—` ) and smaller size.
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

### Burger menu — `.burge
r-menu`

```html
<details class="burger-menu">
  <summary><i><span></span></i></summary>
  <ul>
    <li><a href="#">Home</a></li>
  </ul>
</details>
```

The `<span>` draws the three bars that turn into a cross when opened.

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
<button data-text="
Contextual help">?</button>
```

Shows a tooltip (with arrow) on `:hover`/`:focus`, built from the `data-text` attribute.

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

Tab system built on **hidden radio inputs**: no JavaScript. Each `label` is a tab, and panels are toggled through adjacent selectors (`input:checked + label + .tab-panel`). Keyboard navigation works out of the box because the radio inputs are native.

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

- **Base (`forms/basics`)**: `label`, `input` and `select` styled out of the box (2px border, focus with `panel-elevation-2` shadow, `disabled` state). `input[type=search|date|time]` show an icon (`--forma-icon-*`); `select` uses `--forma-icon-expand`; `input[type=color]` and `input[type=file]` have specific handling.
- **`.hidden-search`**: expanding search based on `<details>` — the form expands via `::details-content` when opened. Includes a `summary` with a search icon and a `span.close-icon` for the close icon.
- **Checkbox / radio**: `:checked` states drawn with pure CSS (`--forma-icon-check` icon for checkboxes, ring for radios).
- **Switch**: `<input type="checkbox" role="switch"
>` becomes an animated toggle.

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

`content/buttons`, `content/figure`, `content/typography`, `content/mark`, `content/table`, `content/blockquote`, `components/nav`, `components/accordion`, `components/tab-nav`, `components/dropdown`, `components/burger-menu`, `components/toast`, `components/off-canvas`, `components/modal`, `components/card`, `components/tooltip`, `forms/basics`, `forms/hidden-search`, `forms/radio-checkbox`, `forms/switch`, `layout/helpers`.

## Browser support

forma-css assumes modern browsers (Chrome/Edge 120+, Firefox 129+, Safari 17.4+). It relies on: `@layer`, `light-dark()`, `::details-content`, `@starting-style`, `popover`, `transition-behavior: allow-discrete`, relative color syntax and `contrast-color()`.

## License

[MIT](LICENSE) — forma-css is free and open-source software.