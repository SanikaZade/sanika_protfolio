# Sanika Portfolio

My personal portfolio website — built with Next.js and deployed on Vercel.

**Live site:** [sanika-protfolio.vercel.app](https://sanika-protfolio.vercel.app)

---

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router) |
| Language | TypeScript + JavaScript |
| Styling | CSS Modules / plain CSS |
| Linting | ESLint (`eslint.config.mjs`, flat config) |
| Hosting | Vercel |

---



---
.
├── public/          # Static assets (SVGs, images, fonts)
├── src/             # Application source code
├── Models/          # 3D models used on the site
├── next.config.ts   # Next.js configuration
├── eslint.config.mjs
└── tsconfig.json

Pushes to main deploy automatically via Vercel. To deploy manually:
vercel --prod


Quick note on this "everything in one file" approach: putting the license inside `README.md` works visually, but GitHub's **License** badge in the sidebar only appears when a separate `LICENSE` file exists at the repo root. Since you already committed that file, you now have two copies of the same text. That's harmless, but if you'd rather keep a single source of truth, replace the inline license with a link instead:

```markdown
## License

Distributed under the MIT License. 
