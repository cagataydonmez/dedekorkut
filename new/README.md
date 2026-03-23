# Dede Korkut Pedal — New Static Website

## Folder structure
- `index.html` — landing page
- `products.html` — product listing
- `legacy.html` — legacy/social archive
- `products/*.html` — individual product marketing pages
- `about.html`, `contact.html`, `faq.html`
- `privacy.html`, `terms.html`
- `assets/css/style.css` — shared design system
- `assets/js/main.js` — nav + theme interaction
- `assets/js/products-data.js` — single source-of-truth product dataset
- `assets/js/products-render.js` — shared render layer for home / products / legacy listings
- `assets/images/*` — local product and brand images used by the `/new` site bundle
- `sitemap.xml`, `robots.txt`

## Editing products
1. Edit product and legacy entries in `assets/js/products-data.js`.
2. Edit `products/*.html` directly for product-detail copy and structure.
3. Update shared listing logic in `assets/js/products-render.js` only if home / catalog / legacy behavior changes.

## Deployment (Nginx)
Use `/new` as site root for direct static hosting.

```nginx
server {
  listen 80;
  server_name your-domain.com;
  root /var/www/dedekorkut/new;
  index index.html;

  location / {
    try_files $uri $uri/ =404;
  }
}
```

## Local preview
```bash
cd /workspace/dedekorkut
python3 -m http.server 4173
# open http://localhost:4173/new/
```

## Packaging
To package the full site folder:
```bash
cd /workspace/dedekorkut
zip -r new-site.zip new
```
