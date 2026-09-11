# Nectar Sweet Marketing

Website and brand source files for **Nectar Sweet Marketing** — a coaching and media
business helping purpose-driven Christian leaders and businesses find their sweet spot
in influence, leadership, operations, branding and voice.

Founded by **Righteous Osa**, Performance Advisor & CEO — Dallas–Fort Worth, Texas.

---

## What's in here

| Path | What it is |
|---|---|
| [`website/`](website/) | The live site — five pages of static HTML, CSS and vanilla JS. No build step. |
| [`website/README.md`](website/README.md) | **Start here** — deployment, design notes, and what still needs filling in. |
| `Nectar Sweet Proofs.pdf` | Logo proof sheet from the designer — four approved lockup variants. |
| `Nectar Sweet Examples.png` | Brand mockups (signage, business card, title card). |
| `*.JPG` | Full-resolution founder photography. The site uses downscaled copies in `website/assets/img/`. |

## Running the site locally

```bash
cd website
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploying

The site is plain static files, so any host works. The quickest route is
[Netlify Drop](https://app.netlify.com/drop) — drag the `website` folder onto the page
and it's live in seconds. If you connect this repo to Netlify instead, set the
**publish directory** to `website` and leave the build command empty.

Full deployment notes, including costs and how to point the domain at it, are in
[`website/README.md`](website/README.md).

## Still outstanding

- Social profile links in the footer currently point at `#`
- The founder's personal story paragraph on the About page is still placeholder copy
- The contact form opens the visitor's email client; see the website README to wire it
  to a real endpoint

---

<sub>Kingdom-centered. Growth-driven.</sub>
