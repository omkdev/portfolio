# Om Kanse — Portfolio

Personal portfolio for **Om Kanse**, Software Engineer · Fintech company. Built with React, Vite, Tailwind CSS, and Framer Motion. Deployed on Vercel.

**Live:** [omkdev.vercel.app](https://omkdev.vercel.app)

## Features

- Single-page portfolio (Hero, About, Experience, Projects, Skills, Contact)
- **Contact form** — Vercel serverless API (`api/contact.js`) with Nodemailer (SMTP)
- **Cloudflare Turnstile** — captcha on form submit
- **Upstash Redis** — rate limiting (5 submissions / hour / IP)
- **PostHog** — analytics and event tracking (clicks, form submissions)
- **Sentry** — error monitoring and session replay
- **Vercel Analytics** + **Speed Insights**
- Security headers via `vercel.json`

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Contact API runs on Vercel only. For local API testing:

```bash
npm run dev:full
```

Requires [Vercel CLI](https://vercel.com/docs/cli) and env vars in `.env`.

## Build

```bash
npm run lint
npm run build
npm run preview
```

## Environment variables

Copy `.env.example` to `.env` locally. On Vercel, set the same keys in **Project → Settings → Environment Variables**.

| Variable | Where | Purpose |
|----------|--------|---------|
| `VITE_POSTHOG_KEY` | Client | PostHog project key |
| `VITE_POSTHOG_HOST` | Client | PostHog API host |
| `VITE_SENTRY_DSN` | Client | Sentry DSN |
| `VITE_TURNSTILE_SITE_KEY` | Client | Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Server | Turnstile secret |
| `UPSTASH_REDIS_REST_URL` | Server | Rate limit Redis |
| `UPSTASH_REDIS_REST_TOKEN` | Server | Rate limit token |
| `SMTP_*`, `CONTACT_TO_EMAIL` | Server | Email delivery |

Never commit real secrets. Use placeholders in `.env.example` only.

## Project structure

| Path | Purpose |
|------|---------|
| `src/sections/` | Page sections |
| `src/components/` | Navbar, cards, footer |
| `src/data/` | Experience, projects, skills, metrics |
| `src/constants/navLinks.js` | Nav, profile, social links |
| `src/lib/posthog.js` | Lazy-loaded PostHog helpers |
| `src/lib/sentry.js` | Lazy-loaded Sentry init |
| `api/contact.js` | Contact form serverless handler |
| `public/` | Static assets |

## Assets to add locally

| File | Location | Used by |
|------|----------|---------|
| `HeroSectionVdo.mp4` | `src/assets/videos/` | Hero background (gradient fallback if missing) |
| `resume.pdf` | `public/resume.pdf` | Set `socialLinks.resume` to `/resume.pdf` in `navLinks.js` |

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 4**
- **Framer Motion**
- **Nodemailer** + Vercel serverless functions
- **PostHog**, **Sentry**, **Turnstile**, **Upstash**

## CI

GitHub Actions (`.github/workflows/build.yml`) runs `npm ci`, lint, and build on push/PR to `main`.

## Contact

- Email: [omkanse1010@gmail.com](mailto:omkanse1010@gmail.com)
- Blog: [omkanse.hashnode.dev](https://omkanse.hashnode.dev/)
- LinkedIn: [linkedin.com/in/omkanse](https://www.linkedin.com/in/omkanse)
- GitHub: [github.com/omkdev](https://github.com/omkdev)
