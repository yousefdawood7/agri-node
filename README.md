<h1 align="center">Agri Node 🌽</h1>

<p align="center">Simple Node.js static farm marketplace app (no framework), using TypeScript and built-in <code>http</code></p>

## Overview

- Serves an overview page with product cards
- Serves individual product pages
- Uses local JSON data from `data/data.json`
- Uses in-memory HTML templates from `views/` and simple token replacement

## Features

- `/` or `/overview` -> overview page
- `/product?id=<id>` -> product detail page
- CSS served via `/product/styles.css`, `/overview/styles.css`
- 404 for unknown routes

## Project structure

- `index.ts` - main server entry
- `data/data.json` - product data
- `views/overview` - overview template and styles
- `views/product` - product template, card template, and styles

## Requirements

- Node.js >= 18 (for `import.meta` in ESM and `URL.parse` usage)
- pnpm (recommended, not required)

## Install

```bash
pnpm install
```

## Run

```bash
pnpm dev
```

or

```bash
pnpm start
```

Then open `http://localhost:3000`

## Environment

- Optional: `APP_URL` for base URL, default `http://localhost:3000`

## Notes

- This is a small demo; no database or router framework used.
- For production use, add error handling, security headers, and sanitize input.
