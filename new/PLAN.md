# Dede Korkut Pedal — Redesign Plan

## Phase 1: Analysis of Existing Site

### Brand identity discovered
- Boutique guitar pedal brand with DSP focus.
- Founded in 2014.
- Positioning: practical controls + musical behavior at competitive value.
- Core products promoted: **Ferromagnetic**, **Reverberant Reverb**, **Dynamic Tremolo**.

### Product information discovered
- **Ferromagnetic**: multi-head tape delay concept with fixed/multi modes and rhythmic head divisions.
- **Reverberant Reverb**: 6 algorithms (Hall, Plate, Spring, Large Hall, Room, Shimmer) with deep controls.
- **Dynamic Tremolo**: touch-sensitive tremolo behavior with sine/saw/square and added ambience controls.

## UX Problems (Current Site)
- Old builder patterns, heavy scripts, and dated interaction conventions.
- Low scannability due to crowded layouts and inconsistent spacing.
- Weak narrative flow from first impression to product selection.
- Mobile navigation and product discovery feel secondary.

## Design Problems (Current Site)
- Inconsistent typography hierarchy and contrast rhythm.
- Card and section styling lacks a premium, cohesive visual system.
- Product marketing copy exists but is not presented in conversion-first structure.

## Conversion Problems (Current Site)
- Home hero is not fully value-led for new visitors.
- CTA hierarchy is not strong enough across sections.
- Objection handling is limited (no FAQ funnel for purchase confidence).
- Trust signals and positioning cues are fragmented.

## Missing/Required Pages
- FAQ for pre-purchase concerns and setup education.
- Privacy + Terms for trust and legal completeness.
- robots.txt + sitemap.xml for SEO crawl support.

## Proposed New Architecture
- `/new/index.html` — conversion-focused landing page.
- `/new/products.html` — product comparison and entry point.
- `/new/products/ferromagnetic.html`
- `/new/products/reverberant.html`
- `/new/products/dynamictremolo.html`
- `/new/about.html`
- `/new/contact.html`
- `/new/faq.html`
- `/new/privacy.html`
- `/new/terms.html`
- `/new/assets/css/style.css`, `/new/assets/js/main.js`, `/new/assets/images/*`
