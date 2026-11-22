import re
import sys
from pathlib import Path

root = Path(sys.argv[1])
version = sys.argv[2]
base = f"/{version}/"

REMOVE = [
    ("src/components/ProjectsGrid.tsx", ["Alerte E25"]),
    ("src/components/TeamProjects.tsx", ["DMG - Gestion Administrative"]),
    ("src/components/ServerRoom.tsx", ['id: "ccdo-dmg"', 'id: "ccdo-staff-timekeeping"', 'id: "civis-alerte"']),
]

GOV_DESCRIPTION = "Technical support for public institutions on their digital projects, from design to production."
GOV_ACHIEVEMENTS = [
    "Designed and built web and mobile applications",
    "Advised on technical architecture and data security",
    "Worked alongside business and institutional teams",
]


def enclosing_object(src, idx):
    depth = 0
    i = idx
    while i >= 0:
        c = src[i]
        if c == "}":
            depth += 1
        elif c == "{":
            if depth == 0:
                break
            depth -= 1
        i -= 1
    start = i
    depth = 0
    j = start
    in_str = None
    while j < len(src):
        c = src[j]
        if in_str:
            if c == "\\":
                j += 2
                continue
            if c == in_str:
                in_str = None
        elif c in "\"'`":
            in_str = c
        elif c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                break
        j += 1
    end = j + 1
    while start > 0 and src[start - 1] in " \t":
        start -= 1
    m = re.match(r"\s*,", src[end:])
    if m:
        end += m.end()
    return start, end


def remove_objects(path, needles):
    p = root / path
    if not p.exists():
        return
    src = p.read_text()
    count = 0
    for needle in needles:
        while needle in src:
            s, e = enclosing_object(src, src.index(needle))
            src = src[:s] + src[e:].lstrip("\n") if src[e:].startswith("\n") else src[:s] + src[e:]
            count += 1
    p.write_text(src)
    print(f"  {path}: removed {count}")


def generalize_government(path):
    p = root / path
    src = p.read_text()
    i = src.find('id: "3b"')
    if i < 0:
        return
    s, e = enclosing_object(src, i)
    block = src[s:e]
    block = re.sub(r'description:\s*"[^"]*"', f'description: "{GOV_DESCRIPTION}"', block)
    block = re.sub(r"achievements:\s*\[[^\]]*\]", "achievements: [\n" + "".join(f'      "{a}",\n' for a in GOV_ACHIEVEMENTS) + "    ]", block)
    block = block.replace(', "Government Standards"', "").replace(',\n      "Government Standards"', "")
    src = src[:s] + block + src[e:]
    p.write_text(src)
    print(f"  {path}: generalized 3b")


def rebase(path_glob):
    for p in root.glob(path_glob):
        src = p.read_text()
        new = re.sub(r"""(["'`(])\.?/images/""", lambda m: f"{m.group(1)}{base}images/", src)
        if new != src:
            p.write_text(new)


for path, needles in REMOVE:
    remove_objects(path, needles)
generalize_government("src/components/ExperienceSection.tsx")
for pattern in ["src/**/*.tsx", "src/**/*.ts", "src/**/*.css", "index.html"]:
    rebase(pattern)

main = root / "src/main.tsx"
main.write_text(main.read_text().replace("<BrowserRouter>", f'<BrowserRouter basename="/{version}">'))

vite = root / "vite.config.ts"
vite.write_text(re.sub(r'base:\s*"[^"]*"', f'base: "{base}"', vite.read_text()))

html = root / "index.html"
h = html.read_text()
h = re.sub(r'\s*<link rel="canonical"[^>]*>', "", h)
h = re.sub(r'\s*<meta name="robots"[^>]*>', "", h)
h = h.replace("</head>", f'  <meta name="robots" content="noindex, follow" />\n    <script src="/version-switcher.js" data-current="{version}" defer></script>\n  </head>', 1)
html.write_text(h)
