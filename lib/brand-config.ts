export const brandConfig = {
  key: "glowhaus",
  name: "GLOWHAUS",
  tagline: "Clean Beauty, Real Results",
  description:
    "Luxury beauty storefront powered by a headless Shopify-ready architecture.",
  accent: "#c9a86c",
  accentSoft: "#fdf5f5",
  headerLinks: [
    { href: "/collection", label: "Shop" },
    { href: "/skin-analysis", label: "Skin IQ" },
    { href: "/routine-builder", label: "Routine Builder" },
    { href: "/rewards", label: "Rewards" },
    { href: "/account", label: "Account" }
  ],
  sharedAiTools: [
    { slug: "chatbot", label: "GlowBot" },
    { slug: "voice-shop", label: "VoiceShop" },
    { slug: "price-alerts", label: "PricePulse" },
    { slug: "eco-score", label: "EcoScore" },
    { slug: "trends", label: "TrendRadar" },
    { slug: "social-shopping", label: "GlowSquad" },
    { slug: "creators", label: "CreatorShop" },
    { slug: "live", label: "LiveDrop" }
  ],
  brandAiTools: [
    { slug: "skin-analysis", label: "Skin IQ" },
    { slug: "routine-builder", label: "RoutineBuilder" },
    { slug: "virtual-try-on", label: "GlowLens" },
    { slug: "shade-matcher", label: "ShadeMatch" },
    { slug: "ingredient-scanner", label: "CleanCheck" },
    { slug: "skin-diary", label: "GlowDiary" },
    { slug: "dupe-finder", label: "DupeFinder" }
  ]
} as const;
