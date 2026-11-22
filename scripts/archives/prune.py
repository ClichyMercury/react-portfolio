import subprocess
import sys
from pathlib import Path

dist = Path(sys.argv[1])
version = sys.argv[2]

text = ""
for p in dist.rglob("*"):
    if p.suffix in {".js", ".css", ".html"}:
        text += p.read_text(errors="ignore")

images = dist / "images"
kept = removed = 0
freed = 0
if images.exists():
    for img in images.rglob("*"):
        if not img.is_file():
            continue
        rel = img.relative_to(dist).as_posix()
        if f"/{version}/{rel}" in text or rel in text:
            kept += 1
        else:
            freed += img.stat().st_size
            img.unlink()
            removed += 1

renames = {}
if images.exists():
    for img in list(images.rglob("*")):
        if img.suffix.lower() not in {".png", ".jpg", ".jpeg"} or img.stat().st_size < 150_000:
            continue
        target = img.with_suffix(".webp")
        if target.exists():
            continue
        subprocess.run(["cwebp", "-quiet", "-q", "78", "-resize", "1600", "0", str(img), "-o", str(target)], check=True)
        if target.stat().st_size < img.stat().st_size:
            renames[img.relative_to(dist).as_posix()] = target.relative_to(dist).as_posix()
            img.unlink()
        else:
            target.unlink()

if renames:
    for p in dist.rglob("*"):
        if p.suffix in {".js", ".css", ".html"}:
            src = p.read_text(errors="ignore")
            new = src
            for old, rep in renames.items():
                new = new.replace(old, rep)
            if new != src:
                p.write_text(new)

for p in [dist / "sitemap.xml", dist / "robots.txt"]:
    if p.exists():
        p.unlink()

size = sum(p.stat().st_size for p in dist.rglob("*") if p.is_file())
print(f"  webp {len(renames)}, images kept {kept}, removed {removed} ({freed / 1048576:.1f} MB), total {size / 1048576:.1f} MB")
