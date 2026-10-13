"""Fotografiert öffentliche Webseiten für die nachgestellten Browser-Szenen (ohne Anmeldung).

    python werkzeuge/seiten.py videos/01-mein-thema

Liest seiten.json im Video-Ordner: [{"name": ..., "url": ..., "ganz": true/false}, ...]
und speichert public/aufnahmen/<video>/<name>.png als Bild in 1920 × 1080 (oder ganze Seite).
Cookie-Banner werden abgelehnt, nicht akzeptiert. Zusätzlich entsteht <name>.json mit den
Positionen aller Links und Knöpfe, damit die Animation den Mauszeiger genau hinführen kann.
"""
import json
import os
import sys

from playwright.sync_api import sync_playwright

ordner = sys.argv[1]
video = os.path.basename(ordner.rstrip("/\\"))
ziel = os.path.join("public", "aufnahmen", video)
os.makedirs(ziel, exist_ok=True)
seiten = json.load(open(os.path.join(ordner, "seiten.json"), encoding="utf-8"))

ABLEHNEN = ["Reject all cookies", "Alle ablehnen", "Ablehnen", "Reject all", "Decline"]

with sync_playwright() as p:
    browser = p.chromium.launch()
    kontext = browser.new_context(viewport={"width": 1920, "height": 1080}, device_scale_factor=1, locale="de-CH", color_scheme="dark")
    for s in seiten:
        seite = kontext.new_page()
        seite.goto(s["url"], wait_until="networkidle", timeout=60000)
        for text in ABLEHNEN:
            knopf = seite.get_by_role("button", name=text, exact=True)
            if knopf.count():
                knopf.first.click()
                seite.wait_for_timeout(600)
                break
        if s.get("scroll_zu"):
            seite.get_by_text(s["scroll_zu"], exact=False).first.scroll_into_view_if_needed()
            seite.evaluate("window.scrollBy(0, -160)")
        seite.wait_for_timeout(1200)
        pfad = os.path.join(ziel, s["name"] + ".png")
        seite.screenshot(path=pfad, full_page=bool(s.get("ganz")))
        # Klickziele relativ zum Bild (bei ganzer Seite: Dokument-Koordinaten)
        ziele = seite.evaluate(
            """(ganz) => [...document.querySelectorAll('a,button')].map(e => {
                const r = e.getBoundingClientRect();
                const y = r.y + (ganz ? window.scrollY : 0);
                return {text: (e.innerText || e.getAttribute('aria-label') || '').trim().slice(0, 60), x: Math.round(r.x + r.width / 2), y: Math.round(y + r.height / 2), b: Math.round(r.width), h: Math.round(r.height)};
            }).filter(z => z.text && z.b > 0 && z.h > 0)""",
            bool(s.get("ganz")),
        )
        # Marken: Texte, zu denen die Animation scrollen soll (y in Dokument-Koordinaten)
        marken = {}
        for text in s.get("marken", []):
            el = seite.get_by_text(text, exact=False).first
            box = el.evaluate("e => { const r = e.getBoundingClientRect(); return {x: r.x, y: r.y + window.scrollY, b: r.width, h: r.height}; }")
            marken[text] = {k: round(v) for k, v in box.items()}
        json.dump({"url": seite.url, "breite": 1920, "hoehe": seite.evaluate("document.documentElement.scrollHeight") if s.get("ganz") else 1080, "marken": marken, "ziele": ziele}, open(os.path.join(ziel, s["name"] + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print("  foto ", s["name"], seite.url)
        seite.close()
    browser.close()
