# Nectar Sweet Marketing — Website

A five-page static site. No build step, no dependencies, no framework — just HTML,
CSS and one small JavaScript file. It will run on any host: Netlify, Vercel,
GitHub Pages, Squarespace's code hosting, or plain shared hosting via FTP.

```
website/
├── index.html          Home
├── services.html       The five service areas + engagement models + FAQ
├── platform.html       The Hive (CRM)
├── about.html          Story, values, approach
├── contact.html        Contact form + details
└── assets/
    ├── css/style.css   All styling (design tokens at the top)
    ├── js/main.js      Nav, scroll reveal, FAQ accordion, contact form
    └── img/            Logo mark, favicon, founder photos
```

## Preview it locally

From inside the `website` folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. (Opening `index.html` by double-clicking works
too, but a local server matches how it will behave once deployed.)

## Deploy it

The simplest route is Netlify Drop — go to <https://app.netlify.com/drop> and drag
the `website` folder onto the page. It's live in about ten seconds on a temporary
`something-random.netlify.app` address. Make a free account to keep that URL, then
point `nectarsweetmarketing.com` at it from Site settings → Domain management.

**Cost:** Netlify's free tier covers a site like this comfortably — 100 GB of
bandwidth a month, unlimited sites, automatic HTTPS, and custom domains all
included. A static five-page site uses a rounding error of that allowance. The one
thing that isn't free is the domain name itself (~$12–15/year from any registrar);
if he already owns `nectarsweetmarketing.com` for the email address, that's covered.

Netlify Forms — the optional form backend mentioned below — is free for the first
100 submissions a month, then paid. Formspree's free tier is 50/month. Either is
plenty at the start.

---

## Already wired in

From the business card — no action needed:

- **Righteous Osa**, Performance Advisor & CEO — About page heading, role line,
  photo alt text, contact page, and the homepage structured data
- **righteous@nectarsweetmarketing.com** — footer of all five pages, contact page,
  and the form's fallback
- **945-394-0128** — footer of all five pages and the contact page, as a tappable
  `tel:` link
- **Dallas–Fort Worth, Texas** — footer, contact page, and the `PostalAddress` in
  the homepage structured data (this is what helps local search)
- **"Media · Marketing · Coaching"** — now the eyebrow line above the homepage headline

## Before it goes live — still to fill in

Both are marked with a `TODO` comment in the HTML.

### 1. Social links
The four social icons (Instagram, YouTube, LinkedIn, Facebook) currently point at
`#`. Search for `aria-label="Instagram"` to find them — they're in the footer of
every page plus the contact page. Delete any platform he isn't on rather than
leaving it linking nowhere.

### 2. His story — `about.html`
The name, title and location are in. The third paragraph under his name is still
generic positioning — it should become his actual story: background, what started
the business, what shaped it. It's the one place on the site where people meet
*him* rather than the offer, so it's worth him writing himself.

### 3. Make the contact form actually deliver

Right now the form opens the visitor's email app with everything pre-filled. That
works from day one and needs no backend, but it loses people who use webmail.

To collect submissions properly, add one attribute to the `<form>` tag in
`contact.html`:

```html
<form class="form" data-contact data-endpoint="https://formspree.io/f/YOUR_ID">
```

Any service that accepts a JSON POST will work — [Formspree](https://formspree.io)
(free tier is fine to start), Netlify Forms, a Zapier catch hook, or a webhook from
the Hive CRM if it exposes one. The JavaScript already handles the POST, the
loading state, and the success and error messages.

### 4. Optional but worth doing
- **Testimonials.** There's no testimonial section, deliberately — I didn't want to
  ship invented quotes. Once he has two or three real ones, they'd sit well between
  the process steps and the CTA on the homepage.
- **Photography.** The two portraits are the only images. Some behind-the-scenes
  production shots, or photos from speaking engagements, would strengthen the
  services and media sections a lot.
- **Real URLs.** The `<link rel="canonical">` and `og:` tags assume
  `https://nectarsweetmarketing.com/`. Update if the domain differs.

---

## Design notes

**Brand.** Colours and the honeycomb motif are taken from the logo proof sheet:
gold gradients (`#F3CE2E` → `#C9A227` → `#B8860B`), chrome and silver for secondary
text, near-black backgrounds. All of it is defined as CSS custom properties at the
top of `style.css` — change a value there and it updates everywhere.

**The logo.** `assets/img/mark.svg` is the seven-hexagon mark rebuilt as vector, so
it stays sharp at any size and has a transparent background. The wordmark next to it
is live text in Montserrat, which is a close match to the proof sheet. If you have
the original logo files from the designer, a proper SVG export would be better still
— drop it in as `mark.svg` and it will pick up automatically.

**Honeycomb texture.** The faint hex pattern in the hero, CTA and quote bands is a
seamlessly tiling SVG defined once in CSS (`--honeycomb`), not an image file.

**Type.** Montserrat for headings and UI, Inter for body copy, both from Google
Fonts.

**Accessibility.** Semantic landmarks, a skip link, visible focus rings, labelled
form fields, `aria-expanded` on the menu and FAQ, and full support for
`prefers-reduced-motion`.

**Responsive.** Single-column below 860px with a slide-in drawer nav. Tested at
375px, 768px and 1440px.
