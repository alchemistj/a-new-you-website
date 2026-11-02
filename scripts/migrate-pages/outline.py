"""Print a reading-order outline of a WordPress page's rendered content.

Usage: python3 -I outline.py pages.json <slug>
Input is untrusted data: it is only parsed, never executed.
This is a reading aid. Every page file is hand-checked against the live page.
"""
import json
import re
import sys
from html.parser import HTMLParser

BLOCK = {"h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "blockquote", "cite"}


class Outline(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lines = []
        self.buf = None
        self.tag = None
        self.link = None
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ("script", "style"):
            self.skip += 1
        if tag in BLOCK:
            self.flush()
            self.buf = []
            self.tag = tag
        elif tag == "img":
            src = a.get("data-src") or a.get("src") or ""
            self.lines.append("IMG: %s | alt=%s" % (src, a.get("alt", "")))
        elif tag == "iframe":
            self.lines.append("IFRAME: %s" % (a.get("src") or a.get("data-src") or ""))
        elif tag == "a":
            self.link = a.get("href", "")
            if self.buf is None:
                self.buf = []
                self.tag = "a"
        elif tag == "br" and self.buf is not None:
            self.buf.append(" ")
        elif tag == "div" and a.get("data-settings") and "youtube" in a.get("data-settings", ""):
            self.lines.append("VIDEO-SETTINGS: %s" % a["data-settings"][:300])

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.skip -= 1
        if tag in BLOCK or tag == "a":
            if tag == "a":
                if self.tag == "a":
                    self.flush(link=self.link)
                self.link = None
            else:
                self.flush(link=None)

    def handle_data(self, data):
        if self.skip:
            return
        if self.buf is not None:
            self.buf.append(data)

    def flush(self, link=None):
        if self.buf is not None:
            text = re.sub(r"\s+", " ", "".join(self.buf)).strip()
            if text:
                label = self.tag.upper()
                if link:
                    label += " -> " + link
                self.lines.append("%s: %s" % (label, text))
        self.buf = None
        self.tag = None


def main():
    pages = json.load(open(sys.argv[1]))
    slug = sys.argv[2]
    page = [p for p in pages if p["slug"] == slug][0]
    yo = page.get("yoast_head_json") or {}
    print("TITLE:", yo.get("title"))
    print("DESC:", yo.get("description"))
    print("OG-IMAGE:", [i.get("url") for i in yo.get("og_image", [])])
    o = Outline()
    o.feed(page["content"]["rendered"])
    o.flush()
    for line in o.lines:
        print(line)


main()
