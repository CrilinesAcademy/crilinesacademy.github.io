# Crilines Academy — Website

Landing page for the Crilines Academy trading community.

## Project Structure

```
crilines-academy/
├── index.html          ← Main page
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← Nav, FAQ, scroll animations, counters
├── assets/             ← Add images/logos here
└── README.md
```

## Deploying to GitHub Pages

### Step 1 — Create a GitHub repository
1. Go to [github.com](https://github.com) → **New repository**
2. Name it `crilines-academy` (or any name you like)
3. Set it to **Public**
4. Do NOT initialize with README (you already have files)

### Step 2 — Push files
```bash
cd crilines-academy
git init
git add .
git commit -m "Initial launch"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/crilines-academy.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `/ (root)`
4. Click **Save**

Your site will be live at:
`https://YOUR-USERNAME.github.io/crilines-academy/`

---

## Before You Launch — Checklist

### Replace placeholder content
- [ ] Update prices (₱299, ₱699, ₱1,499) if different
- [ ] Replace placeholder team member names/bios with real ones
- [ ] Replace testimonials with real member quotes
- [ ] Add real Discord, Facebook, YouTube links in footer
- [ ] Update social icon links in footer
- [ ] Update `og:url` in `<head>` with your real GitHub Pages URL
- [ ] Update hero stats (500+ members, 3+ years) with accurate numbers

### Add your logo image (optional)
Replace the text logo mark with your actual logo:
1. Save your logo as `assets/logo.png`
2. In `index.html`, find `.logo-mark` divs and replace with:
   ```html
   <img src="assets/logo.png" alt="Crilines Academy Logo" width="38" height="38" />
   ```

### Add a favicon
1. Save a 32×32 `.ico` or `.png` as `assets/favicon.ico`
2. Add inside `<head>` in `index.html`:
   ```html
   <link rel="icon" href="assets/favicon.ico" />
   ```

### Plan CTAs — update the `href` links
Find all `href="#"` in the plan cards and update them to:
- Your Discord invite link, or
- A Notion/Google Form for enrollment, or
- Your payment link (GCash, PayMongo, etc.)

---

## Customization Quick Guide

### Change brand colors
Edit `:root` variables in `css/style.css`:
```css
--green: #00C853;   /* your accent color */
--black: #101214;   /* dark background */
```

### Add/remove sections
Each section has a clear comment block in `index.html`:
```html
<!-- ══ SECTION NAME ══ -->
<section id="section-id" ...>
```

### Add a new FAQ item
```html
<div class="faq-item reveal">
  <button class="faq-q">
    Your question here?
    <span class="faq-chevron">▾</span>
  </button>
  <p class="faq-a">Your answer here.</p>
</div>
```

### Update stats counters
Find `data-count` attributes in the hero section:
```html
<span data-count="500" data-suffix="+">500+</span>
```
Change the number and suffix to match your real stats.

---

## Tech Stack

- Plain HTML5 + CSS3 + vanilla JavaScript (no frameworks, no build tools)
- Google Fonts — Poppins
- Hosted on GitHub Pages (free)
- Zero dependencies — loads fast on mobile

---

*Built for Crilines Academy. Good luck on launch! 🚀*
