"""Build the single GiziLens cover from real, locally captured UI screens."""

from base64 import b64encode
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parent


def image(name):
    return "data:image/jpeg;base64," + b64encode((ROOT / "assets" / name).read_bytes()).decode()


desktop = image("dashboard-desktop.jpg")
mobile = image("dashboard-mobile.jpg")
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1920" height="1080" viewBox="0 0 1920 1080">
<title>GiziLens — Eat well. Understand why.</title>
<desc>A nutrition companion for tracking meals, hydration and personal goals. A single product cover with the actual desktop and mobile dashboards.</desc>
<defs>
  <filter id="shadow" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="24" stdDeviation="25" flood-color="#083f35" flood-opacity=".20"/></filter>
  <filter id="phoneShadow" x="-40%" y="-20%" width="190%" height="160%"><feDropShadow dx="0" dy="16" stdDeviation="16" flood-color="#092c26" flood-opacity=".28"/></filter>
  <clipPath id="desktopClip"><rect x="858" y="262" width="963" height="714" rx="5"/></clipPath>
  <clipPath id="phoneClip"><rect x="1601" y="518" width="243" height="524" rx="25"/></clipPath>
  <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.2" fill="#bad4bd"/></pattern>
  <g id="leaf" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19C-1 8 10 3 21 3c0 12-5 19-13 15M3 21 16 8"/></g>
  <g id="bowl" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11h18a9 9 0 0 1-18 0zM6 21h12M8 3v4M12 2v5M16 3v4"/></g>
  <g id="target" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></g>
  <g id="chart" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3v18h17M8 16v-5M13 16V6M18 16v-8"/></g>
</defs>
<rect width="1920" height="1080" fill="#f5f7ef"/>
<rect x="1370" y="0" width="550" height="1080" fill="#187b67"/>
<path d="M1115 0H1490V1080H783C815 915 771 747 805 577 839 408 1004 335 1094 183 1118 142 1135 79 1115 0Z" fill="#187b67"/>
<circle cx="1752" cy="83" r="340" fill="#278872"/>
<circle cx="1752" cy="83" r="254" fill="none" stroke="#64a58c" stroke-opacity=".3" stroke-width="1.5"/>
<circle cx="1752" cy="83" r="195" fill="none" stroke="#64a58c" stroke-opacity=".3" stroke-width="1.5"/>
<rect x="760" y="53" width="223" height="128" fill="url(#dots)" opacity=".7"/>
<g font-family="Noto Sans, sans-serif" fill="#182c29">
  <rect x="88" y="78" width="63" height="63" rx="20" fill="#187b67"/>
  <use xlink:href="#leaf" transform="translate(101 91) scale(1.55)" color="white"/>
  <text x="169" y="126" font-size="49" font-weight="700" letter-spacing="-2">GiziLens<tspan fill="#187b67">.</tspan></text>
  <text x="90" y="241" font-size="20" font-weight="700" letter-spacing="3.1" fill="#187b67">YOUR NUTRITION COMPANION</text>
  <text x="84" y="366" font-size="103" font-weight="700" letter-spacing="-5.5">Eat well.</text>
  <text x="84" y="486" font-size="82" font-weight="700" letter-spacing="-4.7">Understand <tspan fill="#187b67">why.</tspan></text>
  <path d="M573 506C618 491 674 491 715 500" fill="none" stroke="#bddc76" stroke-width="8" stroke-linecap="round"/>
  <text x="90" y="571" font-size="28" fill="#66766d">Know your food. Find your balance.</text>
  <text x="90" y="614" font-size="28" fill="#66766d">Build habits that feel good.</text>
  <g transform="translate(90 700)">
    <rect width="52" height="52" rx="16" fill="#e8eee0"/>
    <use xlink:href="#bowl" transform="translate(13 13) scale(1.08)" color="#187b67"/>
    <text x="73" y="34" font-size="25" font-weight="600">Meals &amp; nutrition</text>
  </g>
  <g transform="translate(90 778)">
    <rect width="52" height="52" rx="16" fill="#e8eee0"/>
    <use xlink:href="#target" transform="translate(13 13) scale(1.08)" color="#187b67"/>
    <text x="73" y="34" font-size="25" font-weight="600">Personal goals &amp; hydration</text>
  </g>
  <g transform="translate(90 856)">
    <rect width="52" height="52" rx="16" fill="#e8eee0"/>
    <use xlink:href="#chart" transform="translate(13 13) scale(1.08)" color="#187b67"/>
    <text x="73" y="34" font-size="25" font-weight="600">Daily habits. Clearer insights.</text>
  </g>
  <line x1="90" y1="971" x2="683" y2="971" stroke="#d9e2d1"/>
  <text x="90" y="1015" font-size="18" fill="#66766d">A LITTLE BETTER, EVERY DAY</text>
  <text x="680" y="1015" text-anchor="end" font-size="18" fill="#66766d">Made for your rhythm.</text>
  <rect x="1443" y="91" width="389" height="47" rx="23.5" fill="#d6ef9b"/>
  <circle cx="1471" cy="115" r="4" fill="#105e50"/>
  <text x="1490" y="122" font-size="18" font-weight="600" fill="#105e50">Everyday choices. Lasting habits.</text>
</g>
<g transform="rotate(-2 1328 604)">
  <rect x="844" y="207" width="991" height="783" rx="22" fill="#fff" filter="url(#shadow)"/>
  <rect x="844" y="207" width="991" height="48" rx="22" fill="#f4f5f1"/>
  <rect x="844" y="231" width="991" height="24" fill="#f4f5f1"/>
  <circle cx="867" cy="231" r="5" fill="#d4ddd2"/><circle cx="885" cy="231" r="5" fill="#d4ddd2"/><circle cx="903" cy="231" r="5" fill="#d4ddd2"/>
  <rect x="1193" y="220" width="307" height="24" rx="7" fill="#e8ede4"/>
  <text x="1346" y="237" text-anchor="middle" font-family="Noto Sans, sans-serif" font-size="12" fill="#6c7b76">GiziLens · Your workspace</text>
  <g clip-path="url(#desktopClip)"><svg x="858" y="262" width="963" height="714" viewBox="0 0 1556 1154" overflow="hidden" preserveAspectRatio="xMinYMin meet">
    <image width="1944" height="1518" xlink:href="{desktop}"/>
  </svg></g>
</g>
<g transform="rotate(5 1722 780)">
  <rect x="1590" y="490" width="265" height="564" rx="38" fill="#102e27" filter="url(#phoneShadow)"/>
  <rect x="1596" y="496" width="253" height="552" rx="33" fill="#f6f8f5"/>
  <g clip-path="url(#phoneClip)"><svg x="1601" y="518" width="243" height="524" viewBox="0 0 371 800" overflow="hidden" preserveAspectRatio="xMinYMin meet">
    <image width="463" height="1000" xlink:href="{mobile}"/>
  </svg></g>
  <rect x="1667" y="504" width="111" height="11" rx="5.5" fill="#102e27"/>
  <rect x="1684" y="1033" width="76" height="4" rx="2" fill="#102e27"/>
</g>
</svg>'''

(ROOT / "GiziLens-showcase.svg").write_text(svg)
subprocess.run(["rsvg-convert", "-o", str(ROOT / "GiziLens-showcase.png"), str(ROOT / "GiziLens-showcase.svg")], check=True)
html = f'''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>GiziLens · Product showcase</title><style>*{{box-sizing:border-box}}html,body{{margin:0;min-height:100%;background:#e4eade}}body{{min-height:100vh;padding:24px}}main{{width:1920px;height:1080px;box-shadow:0 20px 70px #16362b20}}svg{{display:block;width:1920px;height:1080px}}@media print{{body{{padding:0;background:white}}main{{width:1920px;box-shadow:none}}@page{{size:16in 9in;margin:0}}}}</style><main aria-label="GiziLens product showcase">{svg}</main></html>'''
(ROOT / "index.html").write_text(html)
public_preview = ROOT.parent / "frontend" / "public" / "showcase.html"
public_preview.write_text(html)
print("Created GiziLens-showcase.png (1920 × 1080), SVG, and standalone HTML.")
