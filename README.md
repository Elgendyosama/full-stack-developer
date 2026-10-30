# Osama Elgendy Agency Portfolio & Executive Admin Dashboard

A high-converting, modern Web Design & Development Agency Portfolio website with a fully featured, password-protected Admin Dashboard. Built with **Next.js 14 (App Router)**, **TypeScript**, **Ant Design (antd v5+)**, **Tailwind CSS**, and **Lucide Icons**.

---

## 🚀 Key Modules & Architecture

### 1. Public-Facing Showcase & Conversion Engine (`/`)
- **Interactive Device Mockups with Smooth Scroll:**
  - Realistic browser window, MacBook laptop, and mobile smartphone frames for showcase cards.
  - Smooth CSS full-page auto-scroll on hover (`translateY(calc(-100% + height))`), returning cleanly on mouse leave.
  - "Live Preview" button opening an Ant Design Modal with interactive responsive device toggles (Desktop, Tablet, Mobile) and detailed technical specifications.
- **Multi-Dimensional Filtering & Real-Time Search:**
  - Filter by Technology: `React / Next.js`, `Laravel / PHP`, `WordPress / WooCommerce`, `Custom HTML/CSS`.
  - Filter by Industry / Type: `E-Commerce`, `Corporate Portals`, `Landing Pages`, `SaaS / Web Apps`.
  - Real-time search by project title, client name, or tags via Ant Design `Input.Search`.
  - "Featured Only" switch filter.
- **Global Agency Content Sections:**
  - Hero Section with live project counters, glowing backdrop, and dual CTAs.
  - Capabilities & Services Overview Grid (6 high-demand packages with pricing badges and checklists).
  - Client Testimonials Slider with star ratings and authentic quotes.
  - Dynamic Contact & Project Estimate form with interactive deliverable selector, timeline options, budget calculator, and instant scope ballpark.
  - Sticky Navbar & Rich Footer with social links, sitemap links, and SEO links.

### 2. Comprehensive Admin Dashboard (`/admin`)
- **Password-Protected Authentication:**
  - Clean executive login with pre-configured credentials (`admin` / `admin2026`).
  - Session persistence via cookies and localStorage with secure logout.
- **Portfolio & Projects Manager:**
  - Full CRUD: Add, edit, reorder, feature toggle, and delete showcase projects.
  - Form fields: Title, slug, client, date, technology stack selector, industry selector, screenshot asset URL, key features list, and display order.
  - **Live interactive mockup preview** directly inside the modal editor before publishing.
- **Global Technical SEO Suite:**
  - Real-time Google SERP Simulator (Desktop & Mobile views) with dynamic character counters and truncation warnings for title and description.
  - Verification IDs Manager (Google Search Console, Bing Webmaster, Google Tag Manager container).
  - Automated XML Sitemap (`/sitemap.xml`) & Robots (`/robots.txt`) dynamically synced with published projects.
  - Structured Data Generator: Automatic injection of `WebSite`, `Organization`, `Service`, and `BreadcrumbList` JSON-LD schemas.
- **Site Content & Branding CMS:**
  - Visual editor for Hero copy, value propositions, stats, service offerings, testimonials, and contact channels.
- **Executive Analytics Overview:**
  - High-level KPIs, technology stack distribution bars, and health checks.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5 (Strict Mode, zero `any` types)
- **UI Components:** Ant Design 5 (with `@ant-design/nextjs-registry` for zero-FOUC SSR)
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide Icons & Ant Design Icons
- **State & Storage:** Centralized store (`src/lib/store.ts`) with disk persistence (`data/portfolio-store.json`) and REST API routes (`/api/projects`, `/api/settings`, `/api/auth`).

---

## 💻 Quick Start & Commands

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build for production
npm run build

# 4. Start production server
npm run start
```

Access:
- **Public Portfolio:** [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin) (Username: `admin`, Password: `admin2026`)
- **XML Sitemap:** [http://localhost:3000/sitemap.xml](http://localhost:3000/sitemap.xml)
- **Robots Directives:** [http://localhost:3000/robots.txt](http://localhost:3000/robots.txt)

