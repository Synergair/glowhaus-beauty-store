# GLOWHAUS Headless Storefront

Next.js storefront implementation with Shopify Storefront API support and JSON fallback mode.

## Run

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` and set:

- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_STOREFRONT_API_VERSION`

If environment variables are missing, storefront data falls back to `data/products.json`.

## Route Coverage

- Core ecommerce: `/`, `/collection`, `/product`, `/product/[slug]`, `/cart`, `/checkout`, `/confirmation`, `/search`, `/wishlist`, `/account`, `/login`, `/register`, `/forgot-password`, `/subscribe`, `/subscription-dashboard`, `/track-order`, `/rewards`
- Info: `/about`, `/contact`, `/faq`, `/shipping`, `/returns`, `/privacy`, `/terms`
- AI brand features: `/skin-analysis`, `/routine-builder`, `/virtual-try-on`, `/shade-matcher`, `/ingredient-scanner`, `/skin-diary`, `/dupe-finder`
- Shared AI features: `/chatbot`, `/voice-shop`, `/price-alerts`, `/eco-score`, `/trends`, `/social-shopping`, `/creators`, `/live`

## 21st.dev Source of Truth

Component provenance is tracked in `components-manifest.json`.

## SONAR + 21st

- 21st registry imports are stored under `components/registry/ui/` and mapped in `components-manifest.json`.
- SONAR pattern references used for layout direction are documented in `SONAR_UI_REFERENCE.md`.
