"""Download page images (originals, not -300x200 thumbs) into src/assets/pages/<slug>/.

Usage: python3 -I fetch_image.py <slug> <url> [<dest-name>] ...
Pass url and dest-name pairs: python3 -I fetch_image.py botox URL1 hero.jpg URL2 body-1.jpg
A -WxH size suffix is stripped from the URL so the full-size original is fetched.
Files are saved as data only; they are never opened or executed.
"""
import os
import re
import subprocess
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))


def main():
    slug = sys.argv[1]
    rest = sys.argv[2:]
    outdir = os.path.join(ROOT, "src", "assets", "pages", slug)
    os.makedirs(outdir, exist_ok=True)
    for i in range(0, len(rest), 2):
        url, name = rest[i], rest[i + 1]
        full = re.sub(r"-\d+x\d+(\.(?:jpe?g|png|webp))$", r"\1", url, flags=re.I)
        dest = os.path.join(outdir, name)
        r = subprocess.run(
            ["curl", "-sS", "-f", "-A", "Mozilla/5.0", "-o", dest, "-w", "%{http_code} %{size_download}", full],
            capture_output=True,
            text=True,
        )
        if r.returncode != 0 and full != url:
            r = subprocess.run(
                ["curl", "-sS", "-f", "-A", "Mozilla/5.0", "-o", dest, "-w", "%{http_code} %{size_download}", url],
                capture_output=True,
                text=True,
            )
            full = url
        print(name, full, r.stdout, r.stderr.strip())


main()
