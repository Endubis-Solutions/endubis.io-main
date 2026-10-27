"""
Render the "Implementing Stablecoins in Ethiopia" technical paper.

Input
  c:\\Users\\nebex\\Downloads\\Implementing_Stablecoins_in_Ethiopia.md

Outputs (public/papers/)
  implementing-stablecoins-in-ethiopia.html          styled, self-contained paper
  implementing-stablecoins-in-ethiopia.md            original markdown (download)
  stablecoin_ethiopia_assets/ethiopia_access_indicators.svg
  stablecoin_ethiopia_assets/remittance_sensitivity.svg

Usage:  python scripts/render-paper.py
"""
import html
import os
import re
import sys

import markdown

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_MD = r"c:\Users\nebex\Downloads\Implementing_Stablecoins_in_Ethiopia.md"
OUT_DIR = os.path.join(ROOT, "public", "papers")
ASSETS = os.path.join(OUT_DIR, "stablecoin_ethiopia_assets")
GOLD = "#D4A54F"


def resolve_source():
    """CLI argument wins, then the in-repo copy, then the original download."""
    if len(sys.argv) > 1:
        return sys.argv[1]
    local = os.path.join(OUT_DIR, "implementing-stablecoins-in-ethiopia.md")
    return local if os.path.exists(local) else SRC_MD

# ---------------------------------------------------------------- figures

def write_access_svg():
    """Bar figure for the three 2024 access indicators (different denominators)."""
    rows = [
        ("Adults with an account (2024)", 48.83, "% of adults"),
        ("Individuals using the internet (2024)", 21.94, "% of population"),
        ("Mobile-cellular subscriptions (2024)", 65.08, "per 100 people"),
    ]
    w, pad_l, pad_t, bar_h, gap = 860, 330, 46, 40, 34
    h = pad_t + len(rows) * (bar_h + gap) + 46
    max_v, plot_w = 70.0, w - pad_l - 150
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'width="{w}" height="{h}" role="img" '
        f'aria-label="Ethiopian 2024 access indicators: 48.83 percent of adults have an account, '
        f'21.94 percent of the population uses the internet, 65.08 mobile subscriptions per 100 people.">',
        '<style>text{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif}'
        '.lbl{fill:#d4d4d8;font-size:15px}.val{fill:#fafafa;font-size:16px;font-weight:600}'
        '.unit{fill:#71717a;font-size:12px;letter-spacing:.08em;text-transform:uppercase}'
        '.axis{stroke:#27272a;stroke-width:1}</style>',
        f'<rect width="{w}" height="{h}" fill="none"/>',
    ]
    for i in range(0, 5):
        x = pad_l + plot_w * i / 4
        parts.append(f'<line class="axis" x1="{x:.1f}" y1="{pad_t - 14}" x2="{x:.1f}" y2="{h - 34}"/>')
        parts.append(f'<text class="unit" x="{x:.1f}" y="{h - 16}" text-anchor="middle">{int(max_v * i / 4)}%</text>')
    for i, (label, value, unit) in enumerate(rows):
        y = pad_t + i * (bar_h + gap) + 12
        bw = plot_w * value / max_v
        parts.append(f'<text class="lbl" x="{pad_l - 16}" y="{y + bar_h / 2 + 5}" text-anchor="end">{html.escape(label)}</text>')
        parts.append(f'<rect x="{pad_l}" y="{y}" width="{plot_w}" height="{bar_h}" rx="4" fill="#18181b"/>')
        parts.append(f'<rect x="{pad_l}" y="{y}" width="{bw:.1f}" height="{bar_h}" rx="4" fill="{GOLD}"/>')
        parts.append(f'<text class="val" x="{pad_l + bw + 12:.1f}" y="{y + bar_h / 2 + 6}">{value:.2f}</text>')
        parts.append(f'<text class="unit" x="{pad_l + bw + 68:.1f}" y="{y + bar_h / 2 + 6}">{unit}</text>')
    parts.append("</svg>")
    with open(os.path.join(ASSETS, "ethiopia_access_indicators.svg"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(parts))



def write_remittance_svg():
    """Grouped bars for the 3x3 remittance sensitivity table (US$ millions)."""
    data = {
        "5%": [3.57, 7.14, 10.71],
        "15%": [10.71, 21.41, 32.12],
        "30%": [21.41, 42.83, 64.24],
    }
    series = [
        ("1 pp cost reduction", "#8a6a2f"),
        ("2 pp cost reduction", GOLD),
        ("3 pp cost reduction", "#f0cf8a"),
    ]
    w, h = 860, 420
    pad_l, pad_r, pad_t, pad_b = 74, 24, 30, 84
    plot_w, plot_h = w - pad_l - pad_r, h - pad_t - pad_b
    max_v = 70.0
    groups = list(data.keys())
    group_w = plot_w / len(groups)
    bar_w = group_w * 0.22
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" '
        f'aria-label="Illustrative gross annual remittance savings in US dollars millions: at 5 percent adoption '
        f'3.57 to 10.71 million; at 15 percent adoption 10.71 to 32.12 million; at 30 percent adoption 21.41 to 64.24 million.">',
        '<style>text{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif}'
        '.lbl{fill:#d4d4d8;font-size:14px}.val{fill:#fafafa;font-size:12px;font-weight:600}'
        '.unit{fill:#71717a;font-size:12px;letter-spacing:.06em}.axis{stroke:#27272a;stroke-width:1}'
        '.glabel{fill:#a1a1aa;font-size:15px}</style>',
    ]
    for i in range(0, 6):
        v = max_v * i / 5
        y = pad_t + plot_h - plot_h * i / 5
        parts.append(f'<line class="axis" x1="{pad_l}" y1="{y:.1f}" x2="{w - pad_r}" y2="{y:.1f}"/>')
        parts.append(f'<text class="unit" x="{pad_l - 12}" y="{y + 4:.1f}" text-anchor="end">{v:.0f}</text>')
    for gi, g in enumerate(groups):
        gx = pad_l + gi * group_w
        for si, (name, color) in enumerate(series):
            value = data[g][si]
            bh = plot_h * value / max_v
            x = gx + group_w * 0.16 + si * (bar_w + group_w * 0.045)
            y = pad_t + plot_h - bh
            parts.append(
                f'<rect x="{x:.1f}" y="{y:.1f}" width="{bar_w:.1f}" height="{bh:.1f}" rx="3" fill="{color}"/>'
            )
            parts.append(f'<text class="val" x="{x + bar_w / 2:.1f}" y="{y - 8:.1f}" text-anchor="middle">{value:.2f}</text>')
        parts.append(
            f'<text class="glabel" x="{gx + group_w / 2:.1f}" y="{pad_t + plot_h + 26:.1f}" '
            f'text-anchor="middle">{g} of reported inflow</text>'
        )
    lx = pad_l
    for name, color in series:
        parts.append(f'<rect x="{lx}" y="{h - 38}" width="12" height="12" rx="2" fill="{color}"/>')
        parts.append(f'<text class="lbl" x="{lx + 19}" y="{h - 27}">{name}</text>')
        lx += 210
    parts.append(f'<text class="unit" x="{w - pad_r}" y="{h - 27}" text-anchor="end">US$ millions per year</text>')
    parts.append("</svg>")
    with open(os.path.join(ASSETS, "remittance_sensitivity.svg"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(parts))


def write_architecture_svg():
    """Layer diagram for section 4 (five operational planes plus supporting planes)."""
    W, H = 920, 606
    mx, mw = 32, 620
    sx, sw = 664, 224

    def box(x, y, w, h, title, sub_lines, gold=False, dashed=False, side=False):
        stroke = GOLD if gold else "#2f2f36"
        fill = "#16130d" if gold else "#111114"
        dash = ' stroke-dasharray="5 5"' if dashed else ""
        t_cls, s_cls = ("ts", "ss") if side else ("t", "s")
        out = [
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{fill}" stroke="{stroke}"{dash}/>',
            f'<text class="{t_cls}" x="{x + 14}" y="{y + 25}">{html.escape(title)}</text>',
        ]
        for i, line in enumerate(sub_lines):
            out.append(
                f'<text class="{s_cls}" x="{x + 14}" y="{y + 45 + i * 16}">{html.escape(line)}</text>'
            )
        return out

    def arrow(x, y1, y2, label):
        return [
            f'<path d="M {x} {y1} L {x} {y2}" stroke="#52525b" stroke-width="1.5" fill="none" '
            f'marker-end="url(#arrow)"/>',
            f'<text class="a" x="{x + 14}" y="{(y1 + y2) / 2 + 4}">{html.escape(label)}</text>',
        ]

    def link(x1, y, x2):
        return [f'<path d="M {x1} {y} L {x2} {y}" stroke="#3f3f46" stroke-width="1" stroke-dasharray="4 4"/>']

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" '
        f'aria-label="Reference architecture with five operational planes: access and identity, licensed wallet '
        f'services, issuer control, blockchain settlement, existing payment rails; supporting planes cover reserves, '
        f'NBE supervision, domestic data custody and an optional Midnight proof layer.">',
        "<defs><marker id=\"arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" "
        "orient=\"auto-start-reverse\"><path d=\"M 0 0 L 10 5 L 0 10 z\" fill=\"#52525b\"/></marker></defs>",
        '<style>text{font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif}'
        '.t{fill:#fafafa;font-size:14px;font-weight:600}.ts{fill:#fafafa;font-size:13px;font-weight:600}'
        f'.s{{fill:#a1a1aa;font-size:11.5px}}.ss{{fill:#a1a1aa;font-size:10.5px}}'
        f'.a{{fill:{GOLD};font-size:11px;letter-spacing:.04em}}'
        '.note{fill:#71717a;font-size:11.5px}</style>',
    ]

    parts += box(mx, 24, mw, 74, "1 \u00b7 Access and identity", [
        "Customers, assisted agents, USSD and smartphone channels",
        "Fayda identifiers and customer due diligence stay off-chain",
    ])
    parts += arrow(mx + 46, 98, 126, "authenticated request")
    parts += box(mx, 126, mw, 74, "2 \u00b7 Licensed wallet services", [
        "Regulated wallet providers own customer relationships and support",
        "Revocable policy credentials authorize participation",
    ])
    parts += arrow(mx + 46, 200, 228, "funding / redemption instruction")
    parts += box(mx, 228, mw, 74, "3 \u00b7 Issuer control plane", [
        "Mint and burn approval, allowlisting, freeze, limits, dual control",
        "HSM quorum, signed approvals, ledgers, daily reconciliation",
    ], gold=True)
    parts += arrow(mx + 46, 302, 330, "authorized state change")
    parts += box(mx, 330, mw, 74, "4 \u00b7 Blockchain settlement", [
        "Cardano native asset under CIP-113 transfer policy",
        "Independent nodes, redundant indexers, signed checkpoints",
    ])
    parts += arrow(mx + 46, 404, 432, "settlement reference")
    parts += box(mx, 432, mw, 74, "5 \u00b7 Existing payment rails", [
        "Banks, EthSwitch, instant payments, cash-in and cash-out agents",
        "Reserve movements and customer settlement remain in ETB",
    ])

    parts += link(mx + mw, 163, sx)
    parts += box(sx, 126, sw, 74, "Reserve banks & custodians", [
        "Segregated liquid ETB reserves,",
        "confirmations, assurance",
    ], side=True)
    parts += link(mx + mw, 265, sx)
    parts += box(sx, 228, sw, 74, "NBE supervision", [
        "Sandbox reporting, limits,",
        "incidents, intervention rights",
    ], side=True)
    parts += link(mx + mw, 367, sx)
    parts += box(sx, 330, sw, 74, "Domestic data custody", [
        "PII, biometrics, accounts:",
        "residency, retention, access",
    ], side=True)
    parts += link(mx + mw, 469, sx)
    parts += box(sx, 432, sw, 74, "Optional Midnight layer", [
        "Selective-disclosure proofs",
        "for eligibility and limits",
    ], dashed=True, side=True)

    parts.append(
        '<text class="note" x="32" y="556">Trust boundary: only approved wallet providers and institutions may '
        "hold or transfer the token; policy credentials are revocable.</text>"
    )
    parts.append(
        '<text class="note" x="32" y="578">Public-chain data is limited to supply, pseudonymous addresses and '
        "policy references; identity data stays in the domestic vault.</text>"
    )
    parts.append("</svg>")
    with open(os.path.join(ASSETS, "reference_architecture.svg"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(parts))


# ------------------------------------------------------------ markdown -> html

SUB_BRACE = re.compile(r"([A-Za-z])_\{([^}]*)\}")
SUB_CHAR = re.compile(r"([A-Za-z])_([A-Za-z0-9])")
SYMBOLS = {
    "times": "\u00d7",
    "cdot": "\u00b7",
    "geq": "\u2265",
    "ge": "\u2265",
    "leq": "\u2264",
    "le": "\u2264",
    "neq": "\u2260",
    "approx": "\u2248",
    "pm": "\u00b1",
    "sum": "\u03a3",
    "infty": "\u221e",
    "to": "\u2192",
    "Rightarrow": "\u21d2",
}


def typeset(expr):
    """Very small LaTeX-to-HTML conversion for the formulas used in the paper."""
    s = html.escape(expr.strip())
    s = re.sub(r"\\text\{([^}]*)\}", r"\1", s)
    s = re.sub(r"\\([A-Za-z]+)", lambda m: SYMBOLS.get(m.group(1), ""), s)
    s = SUB_BRACE.sub(r"\1<sub>\2</sub>", s)
    s = SUB_CHAR.sub(r"\1<sub>\2</sub>", s)
    s = s.replace("\\", "").replace(" - ", " \u2212 ")
    return re.sub(r"\s+", " ", s).strip()


def protect_math(md_text):
    """Swap LaTeX delimiters for placeholders so markdown leaves them untouched."""
    store = []

    def display(match):
        store.append(("block", match.group(1)))
        return "\n\nMATHBLOCK%dEND\n\n" % (len(store) - 1)

    def inline(match):
        store.append(("inline", match.group(1)))
        return "MATHINL%dEND" % (len(store) - 1)

    md_text = re.sub(r"\\\[(.+?)\\\]", display, md_text, flags=re.S)
    md_text = re.sub(r"\\\((.+?)\\\)", inline, md_text, flags=re.S)
    return md_text, store


def restore_math(body, store):
    def block(match):
        expr = store[int(match.group(1))][1]
        return '<div class="mathblock">%s</div>' % typeset(expr)

    def inline(match):
        expr = store[int(match.group(1))][1]
        return '<var class="mathinline">%s</var>' % typeset(expr)

    body = re.sub(r"<p>\s*MATHBLOCK(\d+)END\s*</p>", block, body)
    body = re.sub(r"MATHBLOCK(\d+)END", block, body)
    body = re.sub(r"MATHINL(\d+)END", inline, body)
    return body


def post_process(body):
    # Keep figure sources relative (stablecoin_ethiopia_assets/...) so the page works
    # at any deploy path - root domain, subfolder, static export, or opened from disk.
    body = body.replace("reference_architecture.png", "reference_architecture.svg")
    body = re.sub(
        r'<p\s*>\s*(<img[^>]*?alt="([^"]*)"[^>]*?>)\s*</p>',
        r'<figure>\1<figcaption>\2</figcaption></figure>',
        body,
        flags=re.S,
    )
    body = re.sub(r"(<table>.*?</table>)", r'<div class="table-wrap">\1</div>', body, flags=re.S)
    body = re.sub(
        r'<a href="(https?://[^"]+)"',
        r'<a href="\1" target="_blank" rel="noopener noreferrer"',
        body,
    )
    return body

CSS = r"""
:root{
  --bg:#0a0a0a; --bg-soft:#0f0f11; --line:#1f1f23; --line-soft:#27272a;
  --text:#d4d4d8; --text-dim:#a1a1aa; --text-faint:#71717a; --white:#fafafa; --gold:#D4A54F;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;background-color:var(--bg);color:var(--text);
  font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  font-size:17px;line-height:1.75;-webkit-font-smoothing:antialiased;
  background-image:radial-gradient(1000px 520px at 50% -220px,rgba(212,165,79,.10),transparent 70%);
  background-repeat:no-repeat;
}
.topbar{position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:14px 24px;background:rgba(10,10,10,.85);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.brand{display:flex;align-items:center;gap:10px;color:var(--white);text-decoration:none;
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;letter-spacing:.22em}
.brand img{height:26px;width:auto;display:block}
.brand-sep{color:var(--gold);margin:0 2px}
.topnav{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.topnav a,.doc-footer-links a{font-size:12px;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;
  padding:8px 14px;border-radius:6px;transition:all .2s}
.ghost{color:var(--text-dim);border:1px solid var(--line-soft)}
.ghost:hover{color:var(--white);border-color:var(--gold)}
.solid{color:#0a0a0a;background:var(--gold);border:1px solid var(--gold);font-weight:600}
.solid:hover{background:#e3b962}
.shell{max-width:880px;margin:0 auto;padding:56px 24px 96px}
.meta-strip{display:flex;align-items:center;gap:14px;margin-bottom:28px;flex-wrap:wrap}
.pill{font-family:ui-monospace,monospace;font-size:11px;letter-spacing:.18em;color:var(--gold);
  background:rgba(212,165,79,.10);border:1px solid rgba(212,165,79,.25);padding:5px 10px;border-radius:4px}
.meta-text{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--text-faint)}
.toc-box{border:1px solid var(--line);background:var(--bg-soft);border-radius:8px;padding:14px 18px;margin-bottom:44px}
.toc-box summary{cursor:pointer;font-family:ui-monospace,monospace;font-size:11px;letter-spacing:.2em;
  text-transform:uppercase;color:var(--gold)}
.toc-box .toc{margin-top:12px}
.toc-box ul{list-style:none;margin:0;padding:0;columns:2;column-gap:32px}
.toc-box li{margin:0 0 6px;break-inside:avoid}
.toc-box a{color:var(--text-dim);text-decoration:none;font-size:14px}
.toc-box a:hover{color:var(--gold)}
.paper h1{font-size:clamp(28px,5vw,44px);line-height:1.15;font-weight:300;color:var(--white);
  margin:0 0 18px;letter-spacing:-.01em}
.paper h2{font-size:clamp(22px,3vw,30px);font-weight:300;color:var(--white);margin:64px 0 20px;
  padding-top:28px;border-top:1px solid var(--line);scroll-margin-top:88px}
.paper h3{font-size:19px;font-weight:500;color:var(--gold);margin:36px 0 12px;scroll-margin-top:88px}
.paper h4{font-size:16px;color:var(--white);margin:26px 0 10px}
.paper p{margin:0 0 18px}
.paper .subtitle{font-size:19px;line-height:1.6;font-weight:300;color:var(--text-dim);margin:0 0 26px}
.paper strong{color:var(--white);font-weight:600}
.paper a{color:var(--gold);text-decoration:none;border-bottom:1px solid rgba(212,165,79,.35)}
.paper a:hover{border-bottom-color:var(--gold)}
.paper ul,.paper ol{margin:0 0 18px;padding-left:22px}
.paper li{margin-bottom:8px}
.paper blockquote{margin:26px 0;padding:18px 22px;border-left:2px solid var(--gold);
  background:var(--bg-soft);border-radius:0 6px 6px 0;color:var(--text-dim)}
.paper blockquote p:last-child{margin-bottom:0}
.paper code{font-family:ui-monospace,monospace;font-size:.86em;background:#18181b;border:1px solid var(--line);
  padding:1px 5px;border-radius:4px;color:#f0cf8a}
.paper hr{border:0;border-top:1px solid var(--line);margin:44px 0}
.table-wrap{overflow-x:auto;margin:0 0 26px;border:1px solid var(--line);border-radius:8px;background:var(--bg-soft)}
.paper table{border-collapse:collapse;width:100%;font-size:14px;min-width:560px}
.paper th{text-align:left;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);
  font-weight:600;padding:12px 14px;border-bottom:1px solid var(--line-soft);background:#0c0c0e;vertical-align:bottom}
.paper td{padding:12px 14px;border-bottom:1px solid var(--line);color:var(--text-dim);vertical-align:top}
.paper tr:last-child td{border-bottom:0}
.paper td strong{color:var(--white)}
.paper figure{margin:32px 0;padding:18px;border:1px solid var(--line);border-radius:8px;background:var(--bg-soft)}
.paper figure img{width:100%;height:auto;display:block}
.paper figcaption{margin-top:12px;font-size:12px;letter-spacing:.06em;text-transform:uppercase;
  color:var(--text-faint);text-align:center}
.mathblock{margin:24px 0;padding:18px 22px;border:1px solid var(--line);border-radius:8px;background:#0c0c0e;
  font-family:"Cambria Math",Cambria,Georgia,serif;font-style:italic;font-size:19px;color:var(--white);
  text-align:center;overflow-x:auto}
.mathblock sub{font-style:normal;font-size:.62em}
.paper var{font-family:"Cambria Math",Cambria,Georgia,serif;font-style:italic;color:var(--white)}
.doc-footer{margin-top:72px;padding-top:28px;border-top:1px solid var(--line)}
.doc-footer p{color:var(--text-faint);font-size:13px;line-height:1.7}
.doc-footer-links{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
@media (max-width:640px){
  .toc-box ul{columns:1}
  .topnav .ghost:first-child{display:none}
  body{font-size:16px}
}
@media print{
  body{background:#fff;color:#111;background-image:none}
  .topbar,.toc-box,.doc-footer-links{display:none}
  .shell{padding:0;max-width:none}
  .paper h1,.paper h2,.paper h3,.paper strong,.paper td strong,.mathblock,.paper var{color:#000}
  .paper h2,.paper h3{border-color:#ddd}
  .paper a{color:#8a6a2f}
  .paper td,.paper blockquote{color:#333}
  .table-wrap,.paper blockquote,.paper figure{background:#fff;border-color:#ddd}
  .paper h2,.paper h3{break-after:avoid}
  .table-wrap,.paper figure{break-inside:avoid}
}
"""

# -------------------------------------------------------------------- template

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Implementing Stablecoins in Ethiopia | Endubis Research</title>
<meta name="description" content="A technical, regulatory, and economic roadmap for a licensed ETB token on Cardano, with an optional Midnight privacy layer." />
<meta name="theme-color" content="#0A0A0A" />
<link rel="icon" href="../favicon.ico" />
<link rel="icon" href="../icon.png" type="image/png" sizes="512x512" />
<style>{{CSS}}</style>
</head>
<body>
<header class="topbar">
  <a class="brand" href="../">
    <img src="../endubis-logo-mark.png" alt="" aria-hidden="true" />
    <span>ENDUBIS<span class="brand-sep">/</span>RESEARCH</span>
  </a>
  <nav class="topnav">
    <a class="ghost" href="implementing-stablecoins-in-ethiopia.md" download>Download .md</a>
    <a class="ghost" href="#" onclick="window.print();return false;">Print / PDF</a>
    <a class="solid" href="../">&larr; Back to site</a>
  </nav>
</header>
<main class="shell">
  <div class="meta-strip">
    <span class="pill">PAPER 01</span>
    <span class="meta-text">Research &amp; Policy &middot; 27 October 2026</span>
  </div>
  <details class="toc-box">
    <summary>Contents</summary>
    {{TOC}}
  </details>
  <article class="paper">
{{BODY}}
  </article>
  <footer class="doc-footer">
    <p>Technical research and implementation proposal prepared by Endubis. For research and general informational purposes only &mdash; it does not constitute legal, financial, investment, tax, or regulatory advice.</p>
    <div class="doc-footer-links">
      <a class="ghost" href="implementing-stablecoins-in-ethiopia.md" download>Download source (.md)</a>
      <a class="solid" href="../">&larr; Back to Endubis</a>
    </div>
  </footer>
</main>
</body>
</html>
"""


def main():
    os.makedirs(ASSETS, exist_ok=True)
    write_access_svg()
    write_remittance_svg()
    write_architecture_svg()

    with open(resolve_source(), "rb") as fh:
        raw_bytes = fh.read()
    raw = raw_bytes.decode("utf-8")

    md_target = os.path.join(OUT_DIR, "implementing-stablecoins-in-ethiopia.md")
    with open(md_target, "wb") as fh:
        fh.write(raw_bytes)

    protected, store = protect_math(raw)
    md = markdown.Markdown(
        extensions=["extra", "sane_lists", "toc"],
        extension_configs={"toc": {"toc_depth": "2-2"}},
    )
    body = md.convert(protected)
    body = post_process(restore_math(body, store))
    toc = md.toc

    # The paper's strapline is authored as an h2; present it as a subtitle instead.
    strapline = re.search(r'<h2 id="a-technical-regulatory[^"]*">(.*?)</h2>', body, flags=re.S)
    if strapline:
        body = body.replace(strapline.group(0), '<p class="subtitle">%s</p>' % strapline.group(1))
        toc = re.sub(r'<li><a href="#a-technical-regulatory[^"]*">.*?</a></li>\s*', "", toc, flags=re.S)

    page = TEMPLATE.replace("{{CSS}}", CSS).replace("{{TOC}}", toc).replace("{{BODY}}", body)
    html_target = os.path.join(OUT_DIR, "implementing-stablecoins-in-ethiopia.html")
    with open(html_target, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(page)

    print("wrote", html_target, len(page), "bytes")
    print("wrote", md_target, len(raw_bytes), "bytes")
    print("toc items:", toc.count("<li>"))
    print("unresolved math placeholders:", len(re.findall(r"MATH(BLOCK|INL)\\d+END", page)))
    print("images:", len(re.findall(r"<img ", page)), "tables:", page.count("<table>"))


if __name__ == "__main__":
    main()


