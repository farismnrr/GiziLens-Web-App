"""Build the GiziLens SVG assets. Requires fonttools for outlining the wordmark."""

from pathlib import Path
import subprocess
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parent
PUBLIC = ROOT.parent / "frontend" / "public"
FONT = Path("/usr/share/fonts/noto/NotoSans-Bold.ttf")
RING = "M45.5 18.5A19.1 19.1 0 1 0 51.1 32H38"
LEAF = "M24 32C22 23 29 17 39 17C39 26 32 34 24 32Z"


def mark(bg="#187b67", ring="white", leaf="#d6ef9b"):
    background = f'<rect width="64" height="64" rx="19" fill="{bg}"/>' if bg else ""
    return background + f'<path d="{RING}" fill="none" stroke="{ring}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="{LEAF}" fill="{leaf}"/>'


def svg(body, width=64, height=64, label="GiziLens"):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="{label}"><title>{label}</title>{body}</svg>'


font = TTFont(FONT)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
scale = 40 / font["head"].unitsPerEm
x = 82.0
letter_paths = []
for letter in "GiziLens":
    name = cmap[ord(letter)]
    pen = SVGPathPen(glyphs)
    glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, x, 47.5)))
    letter_paths.append(pen.getCommands())
    x += (font["hmtx"].metrics[name][0] - 24) * scale
word = " ".join(letter_paths)
width = round(x + 8)

primary = svg(mark() + f'<path fill="#182c29" d="{word}"/>', width, 64)
reverse = svg(mark("#d6ef9b", "#105e50", "#187b67") + f'<path fill="white" d="{word}"/>', width, 64)
mono = svg(mark(None, "#182c29", "#182c29") + f'<path fill="#182c29" d="{word}"/>', width, 64)
icon = svg(mark())
glyph = svg(mark(None, "#187b67", "#187b67"))

for name, body in {
    "GiziLens-logo.svg": primary,
    "GiziLens-logo-reverse.svg": reverse,
    "GiziLens-logo-monochrome.svg": mono,
    "GiziLens-icon.svg": icon,
    "GiziLens-symbol.svg": glyph,
}.items():
    (ROOT / name).write_text(body)
(PUBLIC / "logo.svg").write_text(icon)
(PUBLIC / "brand").mkdir(exist_ok=True)
for name in ("GiziLens-logo.svg", "GiziLens-logo-reverse.svg", "GiziLens-logo-monochrome.svg", "GiziLens-symbol.svg"):
    (PUBLIC / "brand" / name).write_text((ROOT / name).read_text())

# A visual sheet for reviewing the finished identity; actual logo files are transparent.
sheet = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="800" viewBox="0 0 1400 800">
<rect width="1400" height="800" fill="#f5f7ef"/><rect x="700" width="700" height="520" fill="#187b67"/>
<g transform="translate(85 217) scale(1.8)">{mark()}<path fill="#182c29" d="{word}"/></g>
<g transform="translate(785 217) scale(1.8)">{mark("#d6ef9b", "#105e50", "#187b67")}<path fill="white" d="{word}"/></g>
<g font-family="Noto Sans, sans-serif"><text x="85" y="88" font-size="18" letter-spacing="2.5" fill="#187b67">GIZILENS / BRAND IDENTITY</text>
<text x="785" y="88" font-size="18" letter-spacing="2.5" fill="#d6ef9b">REVERSE APPLICATION</text>
<text x="85" y="453" font-size="24" fill="#66766d">Nutrition. In focus.</text><text x="785" y="453" font-size="24" fill="#d6ef9b">Clarity for a healthier you.</text>
<text x="85" y="596" font-size="18" letter-spacing="2.5" fill="#66766d">A MARK THAT WORKS AT EVERY SIZE</text>
<text x="880" y="596" font-size="18" letter-spacing="2.5" fill="#66766d">ONE COLOR</text></g>
<g transform="translate(85 651) scale(1.5)">{mark()}</g><g transform="translate(235 683)">{mark()}</g><g transform="translate(355 711) scale(.5625)">{mark()}</g><g transform="translate(450 723) scale(.375)">{mark()}</g><g transform="translate(527 731) scale(.25)">{mark()}</g>
<g transform="translate(881 651) scale(1.5)">{mark(None, "#182c29", "#182c29")}</g><g transform="translate(1061 651) scale(1.5)">{mark(None, "#187b67", "#187b67")}</g>
</svg>'''
(ROOT / "GiziLens-logo-preview.svg").write_text(sheet)
subprocess.run(["rsvg-convert", "-o", str(ROOT / "GiziLens-logo-preview.png"), str(ROOT / "GiziLens-logo-preview.svg")], check=True)
print(f"Built outlined SVG logo ({width} × 64), icon, reverse and monochrome variants.")
