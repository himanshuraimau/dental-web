# Dental Clinic Landing Page — Plan

## 1. Overview

A single-page, responsive landing site for a dental clinic, built with **plain HTML, CSS and JavaScript** (no frameworks, no build step, no backend).

- **Goal:** turn visitors into booked appointments via **WhatsApp** or a **phone call**.
- **Style:** premium and modern, like a cosmetic dentistry clinic.
- **Language:** English only.
- **Hosting:** any static host (Netlify, Vercel, GitHub Pages) or ordinary shared hosting. You just upload the files.

> Anything in `[[DOUBLE BRACKETS]]` is a placeholder. Replace it with real clinic details before launch.

| Placeholder | Example |
|---|---|
| `[[CLINIC_NAME]]` | Smile Studio Dental Clinic |
| `[[DOCTOR_NAME]]` | Dr. A. Sharma, BDS, MDS |
| `[[PHONE]]` | +91 98xxxxxxx |
| `[[WHATSAPP_NUMBER]]` | 9198xxxxxxxx (country code, no `+` or spaces) |
| `[[ADDRESS]]` | Shop 12, Main Road, City – PIN |
| `[[HOURS]]` | Mon–Sat 10:00–20:00, Sun closed |
| `[[EMAIL]]` | hello@clinic.com |
| `[[MAP_EMBED_URL]]` | Google Maps → Share → Embed a map → copy the `src` |

---

## 2. File Structure

```
dental-web/
├── index.html          # the whole landing page
├── css/
│   └── style.css       # all styles
├── js/
│   └── main.js         # nav, scroll effects, WhatsApp links
├── images/
│   ├── logo.svg
│   ├── hero.jpg        # clinic interior or a smiling patient (≈1600px wide)
│   ├── doctor.jpg      # doctor portrait (≈800px)
│   └── icons/          # service icons (SVG)
└── favicon.png
```

---

## 3. Design System

### Colors (CSS variables in `:root`)
| Token | Value | Use |
|---|---|---|
| `--color-dark` | `#0F1B2D` (deep navy) | Header, hero overlay, footer, dark sections |
| `--color-gold` | `#C9A86A` (muted gold) | Accent: buttons, highlights, icons |
| `--color-light` | `#F7F5F0` (warm off-white) | Page background |
| `--color-white` | `#FFFFFF` | Cards |
| `--color-text` | `#1E2633` | Body text on light backgrounds |
| `--color-muted` | `#6B7280` | Secondary text |
| `--color-whatsapp` | `#25D366` | WhatsApp button only |

### Typography (Google Fonts)
- **Headings:** `Playfair Display` (serif, for the elegant look), weights 500/700
- **Body:** `Inter` or `Poppins`, weights 400/500/600
- Fluid sizes using `clamp()`, e.g. `h1: clamp(2.2rem, 5vw, 3.8rem)`

### UI rules
- Generous whitespace: section padding `96px` on desktop, `64px` on mobile
- Max content width `1200px`, centered
- Border radius `12px` on cards, `999px` (pill) on buttons
- Soft shadows on cards: `0 10px 30px rgba(15,27,45,.08)`
- Thin gold divider line under section titles
- Subtle fade-up animation when a section scrolls into view

### Breakpoints
- Mobile first. Changes at `768px` (tablet) and `1024px` (desktop).

---

## 4. Page Sections (top to bottom)

### 4.1 Header / Navbar (sticky)
- Left: logo + `[[CLINIC_NAME]]`
- Center/right: links to **About · Services · Why Us · Contact** (smooth scroll)
- Right: gold **"Book Appointment"** button (opens WhatsApp)
- Transparent over the hero, turns solid navy with a shadow after scrolling 50px
- Mobile: hamburger icon that opens a full-width dropdown menu

### 4.2 Hero
- Full-viewport background image (`hero.jpg`) with a dark navy gradient overlay
- Small gold label: *"Advanced & Cosmetic Dentistry"*
- Headline (H1): **"Your Perfect Smile, Crafted With Care"**
- Subtext: one line about painless, modern treatment in `[[CITY]]`
- Two CTAs:
  - **Primary (gold):** "Book on WhatsApp"
  - **Secondary (outline):** "Call Now" → `tel:[[PHONE]]`
- Trust strip below the CTAs: `10+ Years Experience · 5000+ Happy Patients · 4.9★ Google Rating` (placeholder numbers)

### 4.3 About / Doctor
- Two columns: doctor photo on the left, text on the right (stacked on mobile)
- Doctor name, qualifications, short 3–4 line bio
- 3 small highlight points with gold check icons (e.g. "Certified implantologist", "Sterilised, modern equipment", "Gentle and pain-free approach")
- Optional signature-style name image for the premium feel

### 4.4 Services
- Section title: **"Our Treatments"**
- Responsive card grid: 3 columns desktop, 2 tablet, 1 mobile
- Each card has an icon, a title, a one-line description, and a "Book this →" link that opens WhatsApp with the service name pre-filled
- Suggested services (8):
  1. General Check-up & Cleaning
  2. Teeth Whitening
  3. Dental Implants
  4. Root Canal Treatment
  5. Braces & Clear Aligners
  6. Smile Makeover / Veneers
  7. Crowns & Bridges
  8. Kids Dentistry
- Hover effect: card lifts slightly and the icon turns gold

### 4.5 Why Choose Us
- **Dark navy section** for contrast
- 4 feature blocks in a row (2×2 on mobile), each with a gold icon, a title and a short line:
  - Painless Treatment
  - Modern Technology (digital X-ray, intraoral camera)
  - Strict Sterilisation
  - Transparent Pricing
- Optional animated counters (years, patients, treatments) that count up when the section comes into view

### 4.6 Contact & Location
- Two columns:
  - **Left:** address, phone (click to call), email, opening hours table, and big WhatsApp + Call buttons
  - **Right:** embedded Google Map `<iframe>` (`loading="lazy"`)
- Stacked on mobile, with the map below the details

### 4.7 Footer
- Navy background
- Logo + one-line tagline
- Quick links (same as the navbar)
- Contact info repeated in short form
- Social icons (Instagram, Facebook, Google Business) as placeholders
- `© [[YEAR]] [[CLINIC_NAME]]. All rights reserved.` (year set by JS)

### 4.8 Floating WhatsApp Button
- Fixed in the bottom-right on every screen size
- Green circle with the WhatsApp icon and a gentle pulse animation
- Always one tap away from booking

---

## 5. Booking Logic (WhatsApp + Call)

No backend needed. Everything uses standard links.

- **Call:** `<a href="tel:+91XXXXXXXXXX">`
- **WhatsApp:** `https://wa.me/[[WHATSAPP_NUMBER]]?text=<url-encoded message>`

Default message:
```
Hi [[CLINIC_NAME]], I'd like to book an appointment.
```

Service-specific message (from service cards):
```
Hi [[CLINIC_NAME]], I'd like to book an appointment for Teeth Whitening.
```

**JS approach:** keep the number and clinic name in one config object at the top of `main.js`. Every element with a `data-whatsapp` attribute (and an optional `data-service="Teeth Whitening"`) gets its `href` built automatically. You then only change the number in one place.

```js
const CONFIG = {
  clinicName: "[[CLINIC_NAME]]",
  whatsapp: "[[WHATSAPP_NUMBER]]",
  phone: "[[PHONE]]"
};
```

---

## 6. JavaScript Features (`main.js`)

Keep it small, with no libraries:

1. **Mobile menu toggle.** Open/close the hamburger menu and close it after a link is clicked.
2. **Sticky header style.** Add a `.scrolled` class when `scrollY > 50`.
3. **Smooth scroll.** Use CSS `scroll-behavior: smooth` plus `scroll-margin-top` so the sticky header doesn't cover section titles.
4. **Active nav link.** Highlight the section currently in view with `IntersectionObserver`.
5. **Reveal on scroll.** Add a `.visible` class to `.reveal` elements with `IntersectionObserver`.
6. **Counter animation.** Count the numbers up once when they come into view.
7. **WhatsApp link builder.** See section 5.
8. **Footer year.** `new Date().getFullYear()`.
9. Respect `prefers-reduced-motion` by turning off animations for users who request it.

---

## 7. SEO, Performance & Accessibility

**SEO**
- `<title>`: `[[CLINIC_NAME]] | Best Dentist in [[CITY]]`
- Meta description (≈155 characters) with the city and key services
- Open Graph tags (title, description, image) for nice WhatsApp/Facebook link previews
- `LocalBusiness` / `Dentist` JSON-LD structured data (name, address, phone, hours, geo) to help Google Maps and local search
- One `<h1>` only. Use proper `h2`/`h3` for the rest.

**Performance**
- Compress images (WebP, under 200 KB each) and set `width`/`height` to avoid layout shift
- `loading="lazy"` on all images below the hero and on the map iframe
- Preconnect to Google Fonts and use `display=swap`
- A single CSS file and a single JS file loaded with `defer`

**Accessibility**
- Semantic tags: `header`, `nav`, `main`, `section`, `footer`
- Alt text on all images
- Good contrast (gold on navy and navy on off-white both pass)
- Visible focus styles on links and buttons
- `aria-label` on icon-only buttons (hamburger, floating WhatsApp, social icons)
- `aria-expanded` on the menu toggle

---

## 8. Build Steps (order of work)

1. Create the folder structure and empty files
2. Write the HTML skeleton for all sections with placeholder content
3. Add CSS variables, reset, typography and base layout
4. Style each section (mobile first, then the tablet and desktop media queries)
5. Add the JS features one by one
6. Add real images, the logo and clinic details
7. Add SEO meta tags and JSON-LD
8. Test on mobile (Chrome DevTools plus a real phone), check the WhatsApp/Call links, and run Lighthouse (target 90+ on all scores)
9. Deploy to a static host and connect the domain

---

## 9. Content Needed From You (before launch)

- [ ] Clinic name and logo
- [ ] Doctor name, qualifications, short bio and photo
- [ ] Phone and WhatsApp number
- [ ] Full address, Google Maps embed link, opening hours
- [ ] Final list of services you offer
- [ ] Real stats (years of experience, number of patients, Google rating)
- [ ] 2–4 good-quality clinic photos
- [ ] Social media links
- [ ] Domain name (if you already have one)

---

## 10. Possible Later Additions (out of scope for now)

- Testimonials / Google reviews section
- Before/after smile gallery
- FAQ and pricing section
- Hindi language version
- Online booking form
