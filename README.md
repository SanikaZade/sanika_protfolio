Hi Welcome to my protfolio
# Sanika Portfolio
My personal portfolio website — built with Next.js and deployed on Vercel.

**Live site:** [sanika-protfolio.vercel.app](https://sanika-protfolio.vercel.app)

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript + JavaScript |
| Styling | CSS Modules / plain CSS |
| Linting | ESLint (`eslint.config.mjs`, flat config) |
| Hosting | Vercel |

## Getting Started

Clone and install:

```bash
git clone https://github.com/SanikaZade/sanika_protfolio.git
cd sanika_protfolio
npm install
npm run dev

---
.
├── public/          # Static assets (SVGs, images, fonts)
├── src/             # Application source code
├── Models/          # 3D models used on the site
├── next.config.ts   # Next.js configuration
├── eslint.config.mjs
└── tsconfig.json


Deployment
Pushes to main deploy automatically via Vercel. To deploy manually:
vercel --prod
