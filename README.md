# Oleksandr Kovalenko — Portfolio

Live site: [akovalenko777.github.io/portfolio](https://akovalenko777.github.io/portfolio/) · [EN version](https://akovalenko777.github.io/portfolio/en/)

## About Me

I'm a Senior Front-End Engineer with 18+ years of experience in full-cycle web development — from building custom CMS architectures on PHP/MySQL to modern, high-performance, accessible applications with React and Vue 3.

Worked as a Software Engineer at GlobalLogic and other companies, building scalable front-end applications and reusable component libraries. I also teach Front-End Development at Beetroot Academy, mentoring students through code reviews and hands-on projects.

**Core stack:** React, Vue 3 (Composition API), Nuxt, TypeScript, Node.js
**Also comfortable with:** PHP (OOP), MySQL/PostgreSQL, REST API design, custom CMS development

- Email: [akovalenko777@gmail.com](mailto:akovalenko777@gmail.com)
- LinkedIn: [oleksandr-kovalenko-a2053b5a](https://www.linkedin.com/in/oleksandr-kovalenko-a2053b5a/)
- Telegram: [@OKovalenko777](https://t.me/OKovalenko777)

## About This Project

This repository contains the source code for my personal portfolio site — a static, multilingual (Ukrainian / English) single-page site built with Vite and deployed to GitHub Pages.

## Tech Stack & Tooling

### Build

- **[Vite](https://vitejs.dev/)** — build tool and dev server
- **Custom multi-page setup** — a recursive HTML-entry scanner (`getHtmlEntries`) so both the Ukrainian (`/`) and English (`/en/`) pages are built as separate Rollup entry points from plain HTML files
- **[vite-plugin-html-inject](https://www.npmjs.com/package/vite-plugin-html-inject)** — HTML partial includes, used to share repeated markup (header, footer, nav) between the UA and EN pages
- **[vite-plugin-image-optimizer](https://www.npmjs.com/package/vite-plugin-image-optimizer)** — automatic image compression (PNG/JPEG/WebP) during build, including assets served from `public/`
- **Custom Sharp-based script** — recursively walks the images directory and generates `.webp` versions of all `.png`/`.jpg` source images ahead of build

### Front-end

- **HTML5** (semantic markup), **SCSS**, **vanilla JavaScript** — no framework overhead for a static portfolio; all interactivity (mobile nav, project detail modals, lightbox galleries) is hand-rolled
- **PhotoSwipe-style lightbox galleries** for full-size project screenshots
- **`<picture>` + WebP with PNG/JPEG fallback** for key images
- Native lazy loading (`loading="lazy"`) for below-the-fold images

### SEO & Discoverability

- Full **Open Graph** and **Twitter Card** metadata for rich link previews
- **JSON-LD (`schema.org/Person`)** structured data
- `hreflang` alternate links between the UA and EN versions, plus a proper `canonical` URL per page
- Per-page `meta description`, unique per language
- Descriptive `alt` text on all content images

### Accessibility

- Semantic heading hierarchy (single `h1`, no skipped levels)
- Keyboard-accessible navigation and modals
- Content authored with WCAG guidelines in mind

### Internationalization

- Two fully localized entry points (Ukrainian and English) sharing a common component/partial structure via `vite-plugin-html-inject`

### Hosting

- **GitHub Pages**, deployed from the Vite production build (`dist/`)

## Project Structure

```
.
├── index.html              # Ukrainian version (root)
├── en/
│   └── index.html          # English version
├── src/
│   ├── assets/
│   │   ├── images/         # Source images (per-project screenshots, thumbs, certs)
│   │   └── ...
│   └── ...
├── public/
│   └── assets/images/      # Optimized/static images copied as-is to dist
├── scripts/
│   └── convert-images.js   # Recursive PNG/JPEG → WebP conversion (Sharp)
├── vite.config.js
└── README.md
```

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is generated in `dist/`, ready to be deployed to GitHub Pages.

## License

All rights reserved. This repository showcases personal portfolio work; project screenshots belong to their respective clients/organizations and are used here for demonstration purposes only.