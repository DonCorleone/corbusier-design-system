# Design System — Le Corbusier × AnalogJS

A design system drawn in Figma, coded in AnalogJS — built on the color palette of Le Corbusier.

Implements three accessible Angular ARIA components (Toolbar, MenuBar, Tree) with four interaction states (Default, Hover, Pressed, Disabled) mapped to four Figma button layouts (Default, Primary, Secondary, Tertiary).

## Stack

- **[AnalogJS](https://analogjs.org)** — fullstack Angular meta-framework (Vite + Nitro)
- **[@angular/aria](https://angular.dev)** — accessible component primitives (Toolbar, MenuBar, Tree)
- **Figma MCP** — design tokens pulled directly from Figma at implementation time

## Setup

```bash
npm install
npm start        # dev server → http://localhost:5173/
npm run build    # production build
npm run test     # unit tests (Vitest)
```

## Color Palette

| Token | Hex | Figma Layout |
|---|---|---|
| `--default` | `#91afa1` | Toolbar widgets |
| `--primary` | `#b7a392` | MenuBar items |
| `--secondary` | `#eacfa6` | Dropdown items |
| `--tertiary` | `#d46c40` | Tree items |

Each token has a `-darker` (Hover/Pressed) and `-lighter` (Disabled) variant.

## Interaction States

| State | Visual |
|---|---|
| Default | base fill |
| Hover | darker fill + drop-shadow |
| Pressed | darker fill + 2px black border |
| Disabled | lighter fill + blur(2px) + pointer-events: none |
