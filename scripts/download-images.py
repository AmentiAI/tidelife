#!/usr/bin/env python3
"""Download product images from Phiogen and save with our site's slug names."""

import json, os, sys, time, urllib.request, urllib.error

PRODUCTS_JSON = os.path.join(os.path.dirname(__file__), "../data/products.json")
OUT_DIR = os.path.join(os.path.dirname(__file__), "../public/images/products")
BASE_URL = "https://phiogen.is/images/products"

os.makedirs(OUT_DIR, exist_ok=True)

with open(PRODUCTS_JSON) as f:
    products = json.load(f)

ok = 0
fail = 0
skip = 0

for product in products:
    our_slug = product["slug"]
    dest = os.path.join(OUT_DIR, f"{our_slug}.png")

    if os.path.exists(dest):
        print(f"  skip  {our_slug}.png  (already exists)")
        skip += 1
        continue

    # Try first variant slug, then fallback slugs
    tried = []
    downloaded = False

    for variant in product.get("variants", []):
        v_slug = variant["slug"]
        url = f"{BASE_URL}/{v_slug}.png"
        tried.append(v_slug)
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = resp.read()
            with open(dest, "wb") as f:
                f.write(data)
            print(f"  ok    {our_slug}.png  ← {v_slug}.png  ({len(data)//1024}KB)")
            ok += 1
            downloaded = True
            break
        except urllib.error.HTTPError as e:
            if e.code != 404:
                print(f"  err   {url}  HTTP {e.code}")
        except Exception as e:
            print(f"  err   {url}  {e}")

    if not downloaded:
        print(f"  FAIL  {our_slug}  (tried: {', '.join(tried[:3])})")
        fail += 1

    time.sleep(0.05)  # polite rate limit

print(f"\nDone: {ok} downloaded, {skip} skipped, {fail} failed")
if fail:
    sys.exit(1)
