"""Print a reading-order outline of a WordPress page's rendered content.

Usage: python3 -I outline.py pages.json <slug>
Input is untrusted data: it is only parsed, never executed.
This is a reading aid. Every page file is hand-checked against the live page.
"""
import json
import re
import sys
from html.parser import HTMLParser

INLINE = {"span", "strong", "em", "b", "i", "a", "br", "small", "sup", "u"}
BLOCK = {"h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "blockquote", "cite"}


class Outline(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lines = []
        self.buf = None
        self.tag = None
        self.link = None
        self.skip = 0
        self.loose = []

    def put(self, text):
        if self.buf is not None:
            self.buf.append(text)
        else:
            self.loose.append(text)

    def flush_loose(self):
        text = re.sub(r"\s+", " ", "".join(self.loose)).strip()
        self.loose = []
        if text:
            self.lines.append("T: " + text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag not in INLINE:
            self.flush_loose()
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
            self.put("[")
            self.link = a.get("href", "")
        elif tag == "br" and self.buf is not None:
            self.buf.append(" ")
        elif tag == "div" and a.get("data-settings") and "youtube" in a.get("data-settings", ""):
            self.lines.append("VIDEO-SETTINGS: %s" % a["data-settings"][:300])

    def handle_endtag(self, tag):
        if tag not in INLINE:
            self.flush_loose()
        if tag in ("script", "style"):
            self.skip -= 1
        if tag == "a":
            self.put("](%s)" % (self.link or ""))
            self.link = None
        elif tag in BLOCK:
            self.flush()

    def handle_data(self, data):
        if self.skip:
            return
        if self.buf is not None:
            self.buf.append(data)
        else:
            self.loose.append(data)

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
    o.flush_loose()
    for line in o.lines:
        print(line)


main()
