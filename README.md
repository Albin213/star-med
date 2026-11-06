# STARMED General Trading LLC website

Next.js (App Router), TypeScript, Tailwind CSS v4, Motion, Lenis.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
```

`package.json` pins `magic-string` through `overrides` because the latest version is ESM-only
and breaks Tailwind on Node below 22.12. Remove the override once everyone is on a newer Node.

## Structure

```
public/images/
  banners/  catalogue/  logos/  products/
src/
  app/                    routes: /, /products, /products/[slug], /brands, /about,
                          /distribution, /contact, plus sitemap and robots
  components/
    layout/               Header, Footer, Preloader, SmoothScroll
    ui/                   Button, Logo, PageHero, PulseLine, Reveal, TextReveal, Counter
    home/                 homepage sections
    products/             catalogue, cards, detail page
    inquiry/              enquiry list drawer
    brands/ about/ distribution/ contact/
  context/InquiryContext.tsx
  data/                   products, brands, categories, site details
  lib/                    catalogue helpers, WhatsApp message builders
```

## Common edits

- Phone, email, addresses, homepage stats: `src/data/site.ts`
- Products: `src/data/products.ts`, with images in `public/images/products/`
- Colours and fonts: the `@theme` block in `src/app/globals.css`
