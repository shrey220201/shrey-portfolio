# Shrey Shah — Personal Portfolio Website

> **"Infrastructure that holds. AI that helps fix it."**
> A personal portfolio engineered for **Shrey Shah**, an IT Infrastructure Engineer who builds applied AI systems (RAG pipelines, LangGraph agents, QLoRA fine-tuning, and operations automations).

---

## 1. Overview & Core Narrative

Most AI engineers have never run production infrastructure (racked a server, debugged a RAID volume over SSH, or managed Active Directory replication). Most infrastructure engineers have never built a guarded LangGraph agent or fine-tuned an LLM with QLoRA.

**Shrey bridges both worlds.** This portfolio embodies the principle of **"Infrastructure-Aware AI"**:
* Restrained, crisp Apple-inspired aesthetic (generous whitespace, typography-led hierarchy, dark default + light toggle).
* Interactive, draggable procedural 3D models built with React Three Fiber.
* GSAP ScrollTrigger pinned storytelling and Framer Motion eased transitions.
* Interactive Glass Terminal / Command Palette (launch with `⌘K` or `Ctrl+K`).
* 100% typed content architecture located in `/content` for seamless editing.

---

## 2. Tech Stack

| Layer | Choice |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router, Turbopack) + TypeScript |
| **Styling** | Tailwind CSS v4 with design tokens defined via CSS variables |
| **Motion** | Framer Motion (component animation) + GSAP ScrollTrigger (scroll-pinned storytelling) |
| **Smooth Scroll** | Lenis with `prefers-reduced-motion` safety |
| **3D Graphics** | React Three Fiber + `@react-three/drei` (DPR capped at 1.5, offscreen canvas pause) |
| **Icons** | `lucide-react` + handcrafted SVG icons |
| **Typography** | `Inter` / `Geist` (UI), `JetBrains Mono` / `Geist Mono` (code, metrics, terminal) |
| **Content Layer** | Typed data files in `/content` (no CMS required) |
| **Backend** | Next.js Route Handlers (`/app/api/contact`, `/app/api/chat`) with Zod validation |
| **Target Deployment** | Vercel (static-friendly, edge-ready) |

---

## 3. Project Structure

```
shrey-portfolio/
├── app/
│   ├── api/
│   │   ├── contact/route.ts      # Contact form API with Zod validation & Zoho Mail SMTP (nodemailer)
│   │   └── chat/route.ts         # Runbook Copilot live demo streaming proxy
│   ├── projects/[slug]/page.tsx  # Dynamic SSG case study pages
│   ├── globals.css               # Design tokens, Tailwind v4 imports, glass styling
│   ├── layout.tsx                # App layout, metadata, JSON-LD, Lenis, theme provider
│   ├── page.tsx                  # Home page assembling all 10 core sections
│   ├── icon.tsx                  # Dynamic SVG/PNG favicon generator
│   ├── opengraph-image.tsx       # Dynamic edge OG preview image generator
│   ├── robots.ts                 # Crawler access policy
│   └── sitemap.ts                # Dynamic XML sitemap generator
├── components/
│   ├── motion/                   # Reveal, SplitText, Counter, Magnetic, TiltCard, PageIntro
│   ├── sections/                 # Hero, Stats, Intersection, RunbookCopilot, Projects,
│   │                             # FieldNotes, Skills, Experience, Credentials, Contact
│   ├── three/                    # SceneWrapper, IntersectionScene, NasExploded,
│   │                             # AgentGraph, DualRegionGlobe, Project3DViewer
│   └── ui/                       # GlassCard, Nav, Footer, ThemeToggle, Terminal, Cursor
├── content/
│   ├── site.ts                   # Site metadata, taglines, links, feature flags
│   ├── stats.ts                  # Real impact statistics
│   ├── projects.ts               # Complete project deep dives & LangGraph specs
│   ├── experience.ts             # Career history (ITCG Solutions, Nupur, URO)
│   ├── skills.ts                 # 10-category technical matrix with tooltips
│   ├── credentials.ts            # Degrees (Conestoga, ITM) & Certifications (NAKIVO, Google, AI Core)
│   └── fieldNotes.ts             # Real incident triage case studies
├── lib/
│   ├── theme.tsx                 # Dark/light mode theme provider & hook
│   ├── lenis.tsx                 # Smooth scroll wrapper
│   ├── useReducedMotion.ts       # Accessibility reduced motion hook
│   └── utils.ts                  # Class merger utility (clsx + tailwind-merge)
├── public/
│   └── Shrey_Shah_Resume.pdf     # Official résumé file
├── .env.example                  # Environment configuration template
└── README.md                     # Documentation
```

---

## 4. Design System & CSS Variables

Tokens are declared in `app/globals.css` and react dynamically to the `[data-theme]` attribute:

```css
--bg:            #000000   /* light: #FBFBFD */
--bg-elevated:   #0B0B0F   /* light: #FFFFFF */
--surface-glass: rgba(255,255,255,0.04) with backdrop-blur(20px)
--border:        rgba(255,255,255,0.08)
--text-primary:  #F5F5F7   /* light: #1D1D1F */
--text-secondary:#A1A1A6   /* light: #6E6E73 */
--accent:        #2997FF   /* Cool blue */
--accent-2:      #5EEAD4   /* Teal — reserved for AI moments & gradients */
--success-led:   #30D158   /* Status LED on 3D hardware */
```

---

## 5. Getting Started Locally

### Prerequisites
* Node.js 18.18+ or 20+ (tested on Node v24)
* npm, pnpm, or yarn

### Installation
```bash
# Clone or navigate to the project directory
cd shrey-portfolio

# Install dependencies (use legacy peer deps for React 19 / R3F alignment if prompted)
npm install --legacy-peer-deps

# Create your local environment file
cp .env.example .env.local

# Start the Turbopack development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the live site.

### Build & Type Verification
```bash
# Verify TypeScript types and generate production static assets
npm run build

# Run ESLint validation
npm run lint
```

---

## 6. Environment Variables (`.env.local`)

Copy `.env.example` to `.env.local` and populate the values:

```bash
# Base site URL for sitemaps and OG metadata
NEXT_PUBLIC_SITE_URL="https://shreyks.com"

# Optional public demo link for Runbook Copilot (when live)
NEXT_PUBLIC_DEMO_URL=""

# Zoho Mail SMTP via Nodemailer for Contact Form
SMTP_HOST="smtppro.zoho.in"
SMTP_PORT="465"
SMTP_SECURE="true"
SMTP_USER="shrey.shah@shreyks.com"
# paste Zoho app password here
SMTP_PASS=""
CONTACT_TO_EMAIL="shrey.shah@shreyks.com"

# Runbook Copilot GPU inference backend (Modal / Render)
RUNBOOK_COPILOT_API_URL=""
RUNBOOK_COPILOT_TOKEN=""
```

### Contact Form / SMTP & Upstash Redis Rate Limiting

The portfolio contact route (`app/api/contact/route.ts`) delivers visitor messages directly to your Zoho Mail inbox using `nodemailer`, guarded by a three-tier sliding-window rate limiter powered by `@upstash/ratelimit` and `@upstash/redis`:

* **Three-Tier Rate Limiting Rules**:
  1. **Per IP**: Max 2 messages per 15 minutes (`contact:ip:<ip>`).
  2. **Per Sender Email**: Max 2 messages per 15 minutes (`contact:email:<sha256(email)>`), protecting against IP-rotation attacks using the same address.
  3. **Global Safety Cap**: Max 20 messages per 24 hours across all visitors (`contact:global:all`), protecting your mailbox against distributed multi-IP floods.
  * All three limits are checked after Zod validation and honeypot checks, but before initializing SMTP dispatch.
  * SHA-256 hashes are used for email keys so raw email addresses are never stored in Redis.
  * On limit breaches, the API returns HTTP 429 with a `Retry-After: <seconds>` header and `{ ok: false, error: "rate_limited", retryAfterSeconds, reason }`. The frontend displays a calm inline countdown or LinkedIn alternate contact link.

* **Upstash Redis Configuration (Vercel Storage)**:
  * In [Vercel](https://vercel.com) → **Storage** → click **Create Database** → select **KV** (powered by Upstash) or **Upstash Redis**.
  * Link the database to your portfolio project.
  * Vercel will automatically provide either `KV_REST_API_URL` / `KV_REST_API_TOKEN` or `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (both naming formats are supported out-of-the-box).
  * **Graceful Degradation**: If Redis environment variables are missing (e.g. in local development) or Redis encounters an error, the API logs a warning and automatically falls back to an in-memory 2-per-15-minute limiter per IP without crashing.

* **Required SMTP Environment Variables**:
  * `SMTP_HOST`: Zoho professional SMTP server (`smtppro.zoho.in`).
  * `SMTP_PORT`: `465` (SSL, with `SMTP_SECURE=true`) or `587` (TLS / STARTTLS, with `SMTP_SECURE=false`).
  * `SMTP_SECURE`: `true` for port 465 (SSL) or `false` for port 587 (TLS).
  * `SMTP_USER`: Your authenticated Zoho email address (`shrey.shah@shreyks.com`). The outbound `from` header must match this address or Zoho SMTP rejects delivery.
  * `SMTP_PASS`: Zoho Application-Specific Password.
    * In **Zoho Mail** → **Settings** → **Mail Accounts** → **IMAP/SMTP** (or Zoho Accounts → Security → App Passwords), generate a dedicated App Password.
    * Paste it into `SMTP_PASS` in your local `.env.local` file (leave empty in git-committed files).
  * `CONTACT_TO_EMAIL`: Recipient inbox address (`shrey.shah@shreyks.com`).
* **Vercel Deployment**:
  * In [Vercel](https://vercel.com) → **Project** → **Settings** → **Environment Variables**:
  * Add `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and `CONTACT_TO_EMAIL` for both **Production** and **Preview** environments.
  * Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (if not auto-linked via Vercel Storage).
  * Trigger a **Redeploy** after saving variables so the serverless runtime picks up the new credentials.
* **Security & Safeguards**:
  * Runs on the Node.js runtime (`export const runtime = "nodejs"`).
  * Honeypot field (`company`) silently drops automated spam submissions.
  * HTML sanitization (`escapeHtml`) on all user-submitted fields before email formatting.
  * Passwords and credentials are never logged or exposed to client-side bundles.

---

## 7. Deployment Options

### Option A: Cloudflare Workers (Recommended for shreyks.com)

The project is optimized for deployment to **Cloudflare Workers** with edge asset delivery, custom domain binding (`shreyks.com`), and an edge worker script:

```bash
# 1. Login to Cloudflare Wrangler
npx wrangler login

# 2. Build and deploy directly to Cloudflare Workers
npm run deploy:cf

# Or preview locally with Cloudflare workerd runtime
npm run preview:cf
```

Configuration files:
* [`wrangler.jsonc`](file:///C:/Users/Shrey/.gemini/antigravity/scratch/shrey-portfolio/wrangler.jsonc) / [`wrangler.toml`](file:///C:/Users/Shrey/.gemini/antigravity/scratch/shrey-portfolio/wrangler.toml)
* [`worker/index.ts`](file:///C:/Users/Shrey/.gemini/antigravity/scratch/shrey-portfolio/worker/index.ts) (Edge router, security headers & API dispatcher)

### Option B: Deployment to Vercel

1. Push your repository to GitHub (`github.com/shrey220201/shrey-portfolio`).
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Framework Preset will auto-detect as **Next.js**.
5. Under **Environment Variables**, add:
   * `NEXT_PUBLIC_SITE_URL`: `https://shreyks.com`
   * `SMTP_HOST`: `smtppro.zoho.in`
   * `SMTP_PORT`: `465`
   * `SMTP_SECURE`: `true`
   * `SMTP_USER`: `shrey.shah@shreyks.com`
   * `SMTP_PASS`: *(your Zoho app password)*
   * `CONTACT_TO_EMAIL`: `shrey.shah@shreyks.com`
6. Click **Deploy**.

---

## 8. Customizing Content & Placeholders

All text, projects, credentials, and settings are managed in `/content/`:
* **Site flags & links**: Edit [`/content/site.ts`](file:///C:/Users/Shrey/.gemini/antigravity/scratch/shrey-portfolio/content/site.ts).
  - Toggle `flags.showPhone` to true when ready to display your phone number.
  - Update `placeholders.runbookCopilotRepoUrl` with your actual GitHub repo link.
* **Résumé file**: Replace [`/public/Shrey_Shah_Resume.pdf`](file:///C:/Users/Shrey/.gemini/antigravity/scratch/shrey-portfolio/public/Shrey_Shah_Resume.pdf) with your updated resume PDF.
* **Adding or updating projects**: Modify [`/content/projects.ts`](file:///C:/Users/Shrey/.gemini/antigravity/scratch/shrey-portfolio/content/projects.ts). The SSG router automatically builds new case studies for any added slugs.

---

## 9. Interactive CLI Easter Egg

Press **`⌘K`** (macOS) or **`Ctrl+K`** (Windows) anywhere on the site or click the **`>_`** button in the bottom-right corner to open the glass terminal.

Available commands:
* `whoami` — Summary and philosophy
* `skills` — Technical capability matrix
* `projects` — Active architectures and projects
* `cat runbook-copilot.md` — Flagship system specifications & metrics
* `experience` — Career path and promotion details
* `resume` — Downloads official résumé PDF
* `contact` — Direct channels and location
* `theme dark` / `theme light` — Toggle system appearance
* `clear` — Clear terminal history
* `sudo hire shrey` — Root access onboarding sequence that routes to the contact channel!

---

*Designed & engineered with Next.js 15, Tailwind CSS v4, Framer Motion, and React Three Fiber.*
