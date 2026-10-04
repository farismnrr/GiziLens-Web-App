# GiziLens identity

The symbol combines a **G**, a circular lens/plate, and a leaf. The open circle and horizontal terminal form the initial; the circular geometry relates to clarity and the nutrition dashboard's energy ring; the inner leaf connects the mark to food and wellbeing.

The design is an original vector composition. Reference logos were studied for their use of integrated letterforms, circular shapes and organic details; no reference artwork is included in the assets.

## Assets

- `GiziLens-logo.svg`: primary horizontal lockup, transparent background.
- `GiziLens-logo-reverse.svg`: lime badge and white wordmark for teal/dark backgrounds.
- `GiziLens-logo-monochrome.svg`: one-color horizontal lockup.
- `GiziLens-icon.svg`: square app icon and favicon.
- `GiziLens-symbol.svg`: standalone monochrome symbol.
- `GiziLens-logo-preview.svg` / `.png`: identity review sheet, including small-size and one-color applications.

All final logo assets use SVG geometry; the wordmark is outlined and does not require fonts or external resources. The primary palette is teal `#187b67`, lime `#d6ef9b`, and ink `#182c29`. Leave at least 8 units of clear space around a 64-unit badge. Use the icon or standalone symbol for small placements rather than the full wordmark.

The app uses `BrandMark.vue` for the same geometry, with a reverse color treatment on the auth sidebar. General-purpose leaf icons elsewhere in the UI retain their original meaning. The favicon and PWA use the square mark in `frontend/public/logo.svg`; horizontal logo variants are also available in `frontend/public/brand/`.

## Research

- [Material Design: Icons](https://m1.material.io/style/icons.html): simple geometric forms, a consistent grid, strong shapes, and readability at small sizes.
- [Letter N + Leaf logo mark by Aleksandar](https://dribbble.com/shots/27153916-Letter-N-Leaf-logo-mark): letterform/leaf concept identified during reference research.
- [Negative Space Logo Collection 2](https://www.behance.net/gallery/85641701/Negative-Space-Logo-Collection-2): reference for combining an initial and an organic motif.

## Rebuild

```sh
python -m venv /tmp/gizilens-logo-tools
/tmp/gizilens-logo-tools/bin/pip install fonttools
/tmp/gizilens-logo-tools/bin/python brand/build_logo.py
python showcase/build_showcase.py
```

The generator uses the installed Noto Sans Bold at `/usr/share/fonts/noto/NotoSans-Bold.ttf` to create the outlined wordmark. Change the `FONT` path if needed. Rendering the review PNG and showcase requires `rsvg-convert`.

The product showcase retains native **1920 × 1080** output and a 1:1 browser preview.
