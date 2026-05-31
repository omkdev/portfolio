# Om Kanse — Portfolio

Personal portfolio site for **Om Kanse**, Backend Engineer at Trully Capital. Built with React, Vite, Tailwind CSS, and Framer Motion.

## Live site

Deploy via Vercel (see `vercel.json`) or run locally with the commands below.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Project structure

| Path | Purpose |
|------|---------|
| `src/sections/` | Page sections (Hero, Metrics, About, Experience, Projects, Skills, Contact) |
| `src/data/` | Content data (experience, projects, skills, metrics) |
| `src/constants/navLinks.js` | Navigation, profile, and social links |
| `public/` | Static assets served as-is |

## Assets to add locally

These files are not committed (placeholders included). Add them before deploying for the full experience:

| File | Location | Used by |
|------|----------|---------|
| `HeroSectionVdo.mp4` | `src/assets/videos/HeroSectionVdo.mp4` | Hero background video (falls back to gradient if missing) |
| `resume.pdf` | `public/resume.pdf` | Resume button in Contact — update `socialLinks.resume` in `navLinks.js` to `/resume.pdf` |

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 4**
- **Framer Motion** — scroll and entrance animations
- **Lucide React** — icons
- **react-countup** — animated metric counters

## Contact

- Email: [omkanse1010@gmail.com](mailto:omkanse1010@gmail.com)
- LinkedIn: [linkedin.com/in/omkanse](https://www.linkedin.com/in/omkanse)
- GitHub: [github.com/omkdev](https://github.com/omkdev)
