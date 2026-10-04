# GiziLens product cover

A single 16:9 cover introducing GiziLens as an everyday nutrition companion.

- `GiziLens-showcase.png` — final 1920 × 1080 image, ready for a portfolio cover or thumbnail.
- `GiziLens-showcase.svg` — editable composition with embedded screen captures; independent of external assets.
- `index.html` — portable browser preview at native 1920 × 1080 pixels without automatic viewport scaling, also published locally at `http://localhost:3005/showcase.html` through the existing frontend dev server.
- `assets/` — original desktop and mobile dashboard captures from Chrome through the CUA browser/Playwright surface.
- `build_showcase.py` — rebuilds the PNG, SVG, and both HTML previews using Python's standard library and `rsvg-convert`.

Run from the repository root:

```sh
python showcase/build_showcase.py
```

## Content and design

The cover uses the application's actual headline, "Eat well. Understand why.", and three concise capabilities: meals and nutrition, personal goals and hydration, and daily insights. It makes no AI, medical, or automation claims.

The palette follows the application: teal `#187b67`, lime `#d6ef9b`, warm pale background, and dark green typography. The app's leaf symbol, outline icons, rounded surfaces, and calm spacing are reused. The desktop dashboard is the main visual; the mobile dashboard demonstrates the responsive experience.

The screen data and UI are captured directly from the running application. Screenshot viewport bounds are cropped inside the frames to remove browser capture margins, without recreating or replacing the UI. The mobile viewport override was reset after capture.

## Research

- [Canva — The ultimate guide to visual hierarchy](https://www.canva.com/learn/visual-hierarchy/): hierarchy through scale, contrast, typography, spacing, and composition. These principles informed the short headline, restrained palette, whitespace, and separation between copy and product imagery.
- [Behance — Personal Diet Management Dashboard](https://www.behance.net/gallery/83101141/Personal-Diet-Management-Dashboard): nutrition product showcase reference identified during research. The reference project was not copied into this cover.

## Verification

The exported PNG remains at native 1920 × 1080 resolution. It was reopened and visually inspected at full size; a separate temporary 480 × 270 render was used only to check thumbnail legibility. The headline and identity remain readable at thumbnail scale; the desktop and mobile screens function as product evidence. The browser preview uses a fixed 1920 × 1080 canvas at 1:1 CSS pixels. Smaller browser windows scroll rather than shrinking the cover. No backend service, commit, or push is involved.
