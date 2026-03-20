# SONAR Clone Reference (Glowhaus)

## SONAR sources used

- Crawl report:
  - `node crawl-son-engine.js --base https://www.paulaschoice.com --max-pages 6 --max-depth 1 --extract-timeout-ms 90000 --out output/son-engine-paulaschoice-quick.json`
  - Output: `/Users/justinleanca/SONAR/output/son-engine-paulaschoice-quick.json`
- Static clone:
  - `node clone-site-static.js --base https://www.paulaschoice.com --report output/son-engine-paulaschoice-quick.json --out-dir output/paulaschoice-clone-static-render --max-pages 12 --max-assets 6000 --route-profile core --no-strict-pages`
  - Output: `/Users/justinleanca/SONAR/output/paulaschoice-clone-static-render`
- Token extraction used for visual direction:
  - `/Users/justinleanca/SONAR/output/paulaschoice.com/*.tokens.json`

## Clone patterns mapped into storefront

From `paulaschoice-clone-static-render/index.html`:
- promo tray sequence (`NEW CellularYouth...`, routine discount, shipping offer)
- guidance-first hero framing (`Discover your best skin ever`)
- PAIGE question cards
- concern-based merchandising grid (`Skin Perfecting`, `Plump + Firm`, etc.)
- innovation shelf layout and trust/proof band conventions

## 21st components used as implementation layer

Source of truth imported from 21st.dev:
- `https://21st.dev/r/shadcn/*` and `https://21st.dev/r/originui/*` primitives in `components/registry/ui/*`
- additional imports for this pass:
  - `https://21st.dev/r/shadcn/carousel`
  - `https://21st.dev/r/shadcn/sheet`
  - `https://21st.dev/r/shadcn/switch`

## Applied files in this pass

- `app/globals.css`
- `app/layout.tsx`
- `components/site/header.tsx`
- `components/site/footer.tsx`
- `components/site/layout-shell.tsx`
- `components/site/product-card.tsx`
- `components/pages/home-page.tsx`
- `components/pages/collection-page.tsx`
- `components/pages/product-page.tsx`
- `components/pages/search-page.tsx`
- `components/pages/page-header.tsx`
- `components/pages/info-page.tsx`
- `components/pages/auth-page.tsx`
- `components/pages/account-page.tsx`
- `components/pages/engagement-pages.tsx`
- `components/ui/carousel.tsx`
- `components/ui/sheet.tsx`
- `components/ui/switch.tsx`
