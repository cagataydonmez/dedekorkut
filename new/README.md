# Dede Korkut Pedal — New Static Website

## Folder structure
- `index.html` — landing page
- `products.html` — product listing
- `products/*.html` — individual product marketing pages
- `about.html`, `contact.html`, `faq.html`
- `privacy.html`, `terms.html`
- `assets/css/style.css` — shared design system
- `assets/js/main.js` — minimal nav interaction
- Reuses brand images directly from `/assets/images/*` (no duplicate copies in `/new/assets/images`)
- `sitemap.xml`, `robots.txt`

## Editing products
1. Edit card-level summaries in `products.html`.
2. Edit deep marketing copy/spec table inside `products/*.html`.
3. Replace image files in `assets/images/` and keep dimensions sensible.

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
