from pathlib import Path
import json

OUT_DIR = Path("public/products")
OUT_DIR.mkdir(parents=True, exist_ok=True)

PRODUCTS = [
    ("luma-001", "Asteria Brass Table Lamp", "Table Lamps", 249.99, "Dome-shaded brass task lamp with a stone base and warm downward pool of light.", "table", "#b98232", "#f7efe3"),
    ("luma-002", "Nora Opal Globe Pendant", "Pendant Lights", 179.99, "Suspended opal glass globe pendant for soft dining and entryway illumination.", "pendant", "#d8d8d2", "#fff7d6"),
    ("luma-003", "Linea Oak Floor Lamp", "Floor Lamps", 329.00, "Slender oak and linen floor lamp sized for reading corners and lounge seating.", "floor", "#9b6b43", "#f7e5bd"),
    ("luma-004", "Halo Flush Ceiling Light", "Ceiling Lights", 219.00, "Low-profile circular ceiling light with an even opal diffuser.", "ceiling", "#e9e4d8", "#fff2b7"),
    ("luma-005", "Mika Black Wall Sconce", "Wall Lights", 149.00, "Matte black up-down wall sconce with crisp architectural light.", "sconce", "#202020", "#ffd48a"),
    ("luma-006", "Sol Edison Amber Bulb", "LED Bulbs", 32.99, "Vintage amber glass LED bulb with a visible spiral filament.", "bulb", "#c88534", "#ffb84c"),
    ("luma-007", "Vera Outdoor Lantern", "Outdoor Lights", 189.00, "Weather-sealed black lantern with clear glass panels and a candle-style LED.", "lantern", "#22201d", "#ffcf8a"),
    ("luma-008", "Prism Crystal Chandelier", "Chandeliers", 1299.00, "Compact crystal chandelier with faceted drops and a polished nickel canopy.", "chandelier", "#cfd7df", "#fff1c9"),
    ("luma-009", "Aura Smart Color Bulb", "Smart Lights", 44.99, "RGB smart bulb with tunable white and saturated color scenes.", "smartbulb", "#f2f2f2", "#9f7cff"),
    ("luma-010", "Cove LED Strip Kit", "LED Strips", 69.99, "Flexible LED strip for shelves, desks, and indirect cove lighting.", "strip", "#f3f1e8", "#ffc86b"),
    ("luma-011", "Arco Marble Desk Lamp", "Table Lamps", 279.00, "Arched desk lamp with a marble base and brushed metal shade.", "table", "#7f8c8d", "#ffe2a3"),
    ("luma-012", "Bell Linen Pendant", "Pendant Lights", 210.00, "Textured linen bell pendant with a warm residential glow.", "pendant", "#d7c1a1", "#ffe4aa"),
    ("luma-013", "Totem Tripod Floor Lamp", "Floor Lamps", 389.00, "Tripod floor lamp with a tapered fabric shade and walnut legs.", "floor", "#6f4a2f", "#f6d49a"),
    ("luma-014", "Nova Disk Ceiling Light", "Ceiling Lights", 259.00, "Floating disk ceiling fixture with a broad luminous face.", "ceiling", "#dfe4ea", "#fff0a8"),
    ("luma-015", "Axis Brass Picture Light", "Wall Lights", 169.00, "Slim brass picture light for art walls, shelves, and headboards.", "picture", "#b8893c", "#ffd27a"),
    ("luma-016", "Filament Smoke Globe", "LED Bulbs", 39.99, "Smoke-tinted globe bulb with a decorative vertical filament.", "bulb", "#7c6a61", "#ffb65c"),
    ("luma-017", "Harbor Path Bollard", "Outdoor Lights", 229.00, "Short black bollard light for paths, patios, and garden edges.", "bollard", "#24272a", "#ffcf8a"),
    ("luma-018", "Celeste Ring Chandelier", "Chandeliers", 1599.00, "Modern suspended ring chandelier with a continuous inner glow.", "ring", "#d4b26a", "#fff0b8"),
    ("luma-019", "Pulse Portable Smart Lamp", "Smart Lights", 89.99, "Rechargeable smart lamp with a rounded diffuser and app-controlled scenes.", "portable", "#ece8df", "#7dd3fc"),
    ("luma-020", "Ribbon Neon Flex", "LED Strips", 119.00, "Bendable neon-style LED ribbon for continuous graphic accent lighting.", "neon", "#f0f0ec", "#ff6fb1"),
]


def shade(color, amount):
    color = color.lstrip("#")
    r = max(0, min(255, int(color[0:2], 16) + amount))
    g = max(0, min(255, int(color[2:4], 16) + amount))
    b = max(0, min(255, int(color[4:6], 16) + amount))
    return f"#{r:02x}{g:02x}{b:02x}"


def specs_for(kind):
    return {
        "Material": "Glass, polycarbonate, aluminum" if "bulb" in kind else "Powder-coated metal, diffuser, electrical hardware",
        "Dimensions": "H 1520mm x W 420mm" if kind == "floor" else ("Length 5m" if kind in ("strip", "neon") else "W 320mm x H 420mm"),
        "Light Source": "Integrated LED bulb" if kind in ("bulb", "smartbulb") else "Integrated LED module",
        "Dimmable": "Yes",
        "Wattage": "42W" if kind in ("chandelier", "ring") else "8W",
    }


def fixture(kind, color, lit, glow):
    dim = shade(color, -35)
    light = glow if lit else "#d8d4cb"
    glow_attrs = 'filter="url(#softGlow)"' if lit else ""
    beam = f'<ellipse cx="400" cy="500" rx="210" ry="85" fill="{glow}" opacity=".24" filter="url(#blur)"/>' if lit else ""
    bulb = f'<circle cx="400" cy="360" r="42" fill="{light}" {glow_attrs}/>'
    bodies = {
        "table": f'{beam}<rect x="382" y="385" width="36" height="150" rx="14" fill="{dim}"/><ellipse cx="400" cy="545" rx="105" ry="26" fill="{dim}"/><path d="M265 328 Q400 235 535 328 L490 394 Q400 430 310 394 Z" fill="{color}"/><path d="M300 335 Q400 288 500 335 L472 374 Q400 397 328 374 Z" fill="{glow if lit else "#eee7da"}" opacity="{".85" if lit else ".55"}"/>{bulb}',
        "pendant": f'<line x1="400" y1="80" x2="400" y2="225" stroke="{dim}" stroke-width="10"/><ellipse cx="400" cy="252" rx="54" ry="16" fill="{dim}"/>{beam}<circle cx="400" cy="360" r="118" fill="{glow if lit else color}" opacity="{".82" if lit else ".72"}" {glow_attrs}/><circle cx="365" cy="325" r="34" fill="#fff" opacity=".22"/>',
        "floor": f'{beam}<ellipse cx="400" cy="650" rx="120" ry="24" fill="{dim}"/><rect x="390" y="300" width="20" height="345" rx="10" fill="{color}"/><path d="M295 235 L505 235 L470 345 Q400 380 330 345 Z" fill="{color}"/><path d="M330 250 L470 250 L448 330 Q400 352 352 330 Z" fill="{glow if lit else "#e8ddcc"}" opacity="{".78" if lit else ".55"}"/>{bulb}',
        "ceiling": f'{beam}<ellipse cx="400" cy="250" rx="190" ry="48" fill="{dim}"/><ellipse cx="400" cy="270" rx="160" ry="40" fill="{glow if lit else color}" {glow_attrs}/><ellipse cx="400" cy="270" rx="105" ry="22" fill="#fff" opacity=".22"/>',
        "sconce": (f'<path d="M330 295 L470 295 L540 120 L260 120 Z" fill="{glow}" opacity=".18"/><path d="M330 385 L470 385 L560 640 L240 640 Z" fill="{glow}" opacity=".22"/>' if lit else "") + f'<rect x="342" y="265" width="116" height="150" rx="18" fill="{color}"/><rect x="373" y="224" width="54" height="232" rx="18" fill="{dim}"/><circle cx="400" cy="285" r="24" fill="{glow if lit else "#cbc5b8"}" {glow_attrs}/><circle cx="400" cy="395" r="24" fill="{glow if lit else "#cbc5b8"}" {glow_attrs}/>',
        "bulb": f'{beam}<path d="M320 300 Q320 190 400 190 Q480 190 480 300 Q480 372 430 410 L370 410 Q320 372 320 300 Z" fill="{glow if lit else color}" opacity="{".9" if lit else ".68"}" {glow_attrs}/><rect x="360" y="410" width="80" height="70" rx="16" fill="{dim}"/><path d="M370 288 C390 250 410 335 430 292" fill="none" stroke="{"#fff8db" if lit else "#8c6b45"}" stroke-width="10" stroke-linecap="round"/>',
        "smartbulb": f'{beam}<path d="M320 300 Q320 195 400 195 Q480 195 480 300 Q480 368 430 408 L370 408 Q320 368 320 300 Z" fill="{glow if lit else color}" opacity="{".9" if lit else ".8"}" {glow_attrs}/><rect x="358" y="408" width="84" height="76" rx="18" fill="{dim}"/><circle cx="400" cy="305" r="38" fill="{"#fff" if lit else "#d9d9d2"}" opacity="{".48" if lit else ".35"}"/>',
        "lantern": f'{beam}<path d="M312 235 L488 235 L510 540 L290 540 Z" fill="none" stroke="{color}" stroke-width="28" stroke-linejoin="round"/><rect x="330" y="275" width="140" height="220" rx="12" fill="{glow if lit else "#dbe2e4"}" opacity="{".58" if lit else ".22"}"/><path d="M350 235 Q400 170 450 235" fill="none" stroke="{color}" stroke-width="20"/><rect x="372" y="345" width="56" height="100" rx="25" fill="{glow if lit else "#c9c1b3"}" {glow_attrs}/>',
        "chandelier": f'{beam}<ellipse cx="400" cy="155" rx="140" ry="30" fill="{dim}"/><line x1="400" y1="170" x2="400" y2="270" stroke="{dim}" stroke-width="8"/><ellipse cx="400" cy="300" rx="185" ry="36" fill="{color}"/>' + "".join([f'<line x1="{x}" y1="310" x2="{x}" y2="505" stroke="{dim}" stroke-width="4"/><path d="M{x - 24} 505 L{x} 565 L{x + 24} 505 Z" fill="{glow if lit else "#dce4ec"}" opacity="{".82" if lit else ".5"}" {glow_attrs}/>' for x in (310, 355, 400, 445, 490)]),
        "strip": f'{beam}<path d="M185 415 C270 310 350 510 435 405 S585 340 640 450" fill="none" stroke="{glow if lit else color}" stroke-width="38" stroke-linecap="round" {glow_attrs}/><path d="M185 415 C270 310 350 510 435 405 S585 340 640 450" fill="none" stroke="{dim}" stroke-width="12" stroke-linecap="round" opacity=".55"/>',
        "picture": (f'<path d="M245 310 L555 310 L620 610 L180 610 Z" fill="{glow}" opacity=".2"/>' if lit else "") + f'<rect x="260" y="260" width="280" height="42" rx="21" fill="{color}"/><rect x="382" y="215" width="36" height="75" rx="16" fill="{dim}"/><rect x="225" y="510" width="350" height="16" rx="8" fill="{glow if lit else "#d6c7a6"}" opacity=".5"/>',
        "bollard": f'{beam}<ellipse cx="400" cy="650" rx="110" ry="22" fill="{dim}"/><rect x="340" y="250" width="120" height="390" rx="28" fill="{color}"/><rect x="358" y="305" width="84" height="120" rx="16" fill="{glow if lit else "#d5d7d5"}" opacity="{".65" if lit else ".2"}" {glow_attrs}/>',
        "ring": f'{beam}<ellipse cx="400" cy="335" rx="210" ry="90" fill="none" stroke="{glow if lit else color}" stroke-width="34" {glow_attrs}/><ellipse cx="400" cy="335" rx="150" ry="54" fill="none" stroke="{dim}" stroke-width="10"/><line x1="270" y1="100" x2="315" y2="270" stroke="{dim}" stroke-width="5"/><line x1="530" y1="100" x2="485" y2="270" stroke="{dim}" stroke-width="5"/>',
        "portable": f'{beam}<rect x="320" y="275" width="160" height="220" rx="76" fill="{glow if lit else color}" opacity="{".86" if lit else ".82"}" {glow_attrs}/><ellipse cx="400" cy="525" rx="115" ry="24" fill="{dim}"/><rect x="360" y="495" width="80" height="45" rx="16" fill="{dim}"/>',
        "neon": f'{beam}<path d="M210 455 Q280 260 400 410 T590 350" fill="none" stroke="{glow if lit else color}" stroke-width="42" stroke-linecap="round" {glow_attrs}/><path d="M210 455 Q280 260 400 410 T590 350" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round" opacity="{".42" if lit else ".16"}"/>',
    }
    return bodies.get(kind, bodies["table"])


def make_svg(product, lit):
    product_id, name, _, _, _, kind, color, glow = product
    bg1 = "#111216" if lit else "#f8f4ed"
    bg2 = "#272018" if lit else "#e8ded0"
    surface = "#191515" if lit else "#ded2c0"
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 800 800" role="img" aria-labelledby="title">
  <title id="title">{name} {"on" if lit else "off"}</title>
  <defs>
    <radialGradient id="bg" cx="50%" cy="{'42%' if lit else '35%'}" r="75%"><stop offset="0" stop-color="{shade(glow, -30) if lit else '#ffffff'}"/><stop offset=".55" stop-color="{bg1}"/><stop offset="1" stop-color="{bg2}"/></radialGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="28"/></filter>
    <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="16" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .05"/></feComponentTransfer></filter>
  </defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <rect width="800" height="800" fill="#000" opacity="{'.14' if lit else '0'}"/>
  <ellipse cx="400" cy="690" rx="265" ry="58" fill="{surface}" opacity="{'.5' if lit else '.95'}"/>
  {fixture(kind, color, lit, glow)}
  <rect width="800" height="800" filter="url(#grain)" opacity="{'.65' if lit else '.35'}"/>
</svg>
'''


catalog = []
for index, product in enumerate(PRODUCTS):
    product_id, name, category, price, description, kind, *_ = product
    (OUT_DIR / f"{product_id}-off.svg").write_text(make_svg(product, False), encoding="utf-8")
    (OUT_DIR / f"{product_id}-on.svg").write_text(make_svg(product, True), encoding="utf-8")
    catalog.append({
        "id": product_id,
        "name": name,
        "category": category,
        "price": price,
        "description": description,
        "specs": specs_for(kind),
        "rating": round(4.6 + (index % 5) * 0.08, 1),
        "reviewsCount": 18 + index * 3,
        "imageOff": f"/products/{product_id}-off.svg",
        "imageOn": f"/products/{product_id}-on.svg",
    })

Path("src/data/products.json").write_text(json.dumps(catalog, indent=2) + "\n", encoding="utf-8")
