# krittisharma.github.io

Source for Kritti Sharma's academic website — built with **Jekyll**, the
static-site generator GitHub Pages supports natively. That means:

- No build step to configure — push to GitHub and Pages builds it for you.
- Shared layout (nav, footer, fonts) lives in one place (`_layouts/default.html`,
  `_includes/`), so editing the nav or footer once updates every page.
- Publications, press, and outreach are **data files** (`_data/*.yml`), not
  hand-written HTML — adding a paper means adding one YAML entry, not editing
  a page.

## Why Jekyll (and not Astro / Hugo / Next.js)

You asked for the framework choice to be explained briefly: Jekyll is the
static-site generator GitHub Pages was built around, with first-class
support via a one-file GitHub Actions workflow (already set up in
`.github/workflows/pages.yml` — you don't need to touch it). Astro or
Next.js would look and perform similarly, but Jekyll's plain-YAML content
model (`_data/*.yml` for publications/press/outreach) is the easiest one
for a non-web-developer to keep updating for years without touching code.

---

## 1. Deploying this site

1. Create a GitHub repository named exactly `<your-username>.github.io`
   (e.g. `krittisharma.github.io`). If you'd rather use a different repo
   name, that's fine too — just set `baseurl: "/your-repo-name"` in
   `_config.yml`.
2. Push everything in this folder to that repository's `main` branch
   (the `.github/workflows/pages.yml` file must come along — it's what
   builds and deploys the site).
3. In the repo's **Settings → Pages**, set **Source** to **"GitHub
   Actions"** (not "Deploy from a branch" — that older path uses GitHub's
   own bundled Jekyll version, which is why we build with a workflow
   instead).
4. Push triggers a build automatically. Watch it under the repo's
   **Actions** tab; when it's green, visit `https://<your-username>.github.io`.

This setup builds with the exact Ruby/Jekyll versions pinned in the
`Gemfile`, rather than whatever GitHub's legacy branch-based builder
happens to support — which is also why local preview (below) matches
production exactly.

### Building locally (optional, to preview changes before pushing)

**Recommended: Docker (nothing installed on your Mac's actual system).**
This runs Jekyll inside an isolated container — no Ruby, no compiler, no
touching Xcode Command Line Tools, nothing to undo later.

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
   (one normal app install, like any other Mac app).
2. From inside this folder:
   ```bash
   docker compose up
   ```
3. Open **http://localhost:4000**. Leave the terminal running — edits to
   any file reload automatically; refresh the page to see them.
4. When you're done, `Ctrl+C`, or `docker compose down` from another
   terminal. Nothing on your Mac outside this project folder (and Docker's
   own sandboxed storage) is touched.

**Alternative: a native Ruby install.** This is faster once set up, but it
installs Ruby gems system-wide and, on a Mac with broken Xcode Command Line
Tools, may need `sudo xcode-select --install` (after removing the broken
CLT folder) to get a working compiler first. If you'd rather not run that,
Docker above sidesteps it entirely.

```bash
bundle install
bundle exec jekyll serve
# visit http://localhost:4000
```

---

## 2. What's real vs. a placeholder right now

The **CV page already works** — your uploaded CV PDF is embedded at
`assets/cv/kritti-sharma-cv.pdf`. Everything else that needs an image or a
confirmed link is clearly marked in the rendered page (look for the amber
"ADD …" / "PLACEHOLDER" tags) so nothing is silently wrong. Checklist:

### Photo
- [ ] `assets/images/kritti-photo.jpg` — your professional photo (home page)

### Research page figures (all in `assets/images/figures/`)
- [ ] `fig1-feedback-sims` — fly-through/animation comparing 3 hydro sims
- [ ] `fig2-halo-mass-sensitivity.png` — halo-mass sensitivity of probes
- [ ] `fig3-frb-dm-sightline-sim.png` — FRB propagating through a sim, DM building up
- [ ] `fig4-sightline-schematic.png` — FRB sightline schematic
- [ ] `dsa-array.jpg` — image of the Deep Synoptic Array
- [ ] `project1-fig9.png` — Fig. 9, Sharma+2025 (arXiv:2504.18745)
- [ ] `project2-fig3.png` — Fig. 3, Sharma+2024 (Nature 635)
- [ ] `project3-fig4.png` — Fig. 4, Sharma+2026 (arXiv:2604.17162)
- [ ] `project4-fig1.png`, `fig2.png`, `fig3.png` — Figs. 1–3, Sharma+2026 (arXiv:2604.22105)
- [ ] `project4-voids-fig2.png` — Fig. 2, Sharma+2026 (arXiv:2605.01994)
- [ ] `project5-fig3.png` — Fig. 3, Sharma+2026 (arXiv:2511.16850)
- [ ] `project6-fig5.png` — Fig. 5, Sharma+2026 (arXiv:2509.05866)

Figures now show up automatically — the moment a file exists at one of
these paths, the placeholder box on the Research page is replaced with
the real image (or video, for the Figure 1 fly-through) on the next
rebuild. No template editing required; any common extension works
(`.png`, `.jpg`, `.webp`, `.gif`, `.svg`, `.mp4`, `.webm`, `.mov`) — just
match the filename stem exactly (e.g. `project1-fig9.jpg` works just as
well as `project1-fig9.png`). If a figure still shows the placeholder
after you've added the file, double-check the name matches exactly and
that Jekyll picked up the change (restart `docker compose up` if the
watcher didn't catch it).

### Press page (`_data/press.yml`)
Three entries have a `url: ""` placeholder — no confident link was found
while building this site:
- [ ] AAS Nova, "Diving into the Darkest Corners of the Universe with Fast Radio Bursts"
- [ ] IIT Bombay press release, "IITB students discover closest known asteroid to fly by Earth"
- [ ] European Space Agency, "2020 QG, the closest close approach"

### Contact page
- [ ] Google Scholar profile URL
- [ ] Confirm the exact `sites.google.com/...` URL (CV lists it in shorthand)

---

## 3. Adding content later

**A new publication** → add one entry to `_data/publications.yml` (copy the
shape of an existing entry: `role`, `year`, `title`, `authors`, `venue`,
`arxiv`). The Publications page sorts and filters automatically.

**A new press item** → same idea, in `_data/press.yml`.

**A new outreach activity** → same idea, in `_data/outreach.yml`. Each entry
supports a `media_note` field (and can be extended with an `image`/`link`
field) for photos or video once you have them.

**A new research project card** on the Research page → copy one `<article
class="project">` block in `research.html` and update the number, status
badge, title, description, figure(s), and links.

**Nav or footer changes** → edit `_includes/nav.html` / `_includes/footer.html`
once; every page picks it up.

---

## 4. Design notes

Dark theme built around one motif: the "dedispersion sweep" — the way a
Fast Radio Burst's high frequencies arrive before its low frequencies,
delayed by the baryons it passed through. It appears once, large, in the
home-page hero, and quietly afterwards as a section divider
(`_includes/sweep-divider.html`). Type is STIX Two Text (the typeface of
physics journals) for headings, IBM Plex Sans for body text, and IBM Plex
Mono for nav/labels/data. All three load from Google Fonts in
`_layouts/default.html`.
