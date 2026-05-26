<div align="center">
  <br/>
  <img src="https://img.shields.io/badge/Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind%20CSS%204-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4"/>
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/next--auth-5B5F6E?style=for-the-badge&logo=auth0&logoColor=white" alt="next-auth"/>
  <img src="https://img.shields.io/badge/next--intl-4.12-0288D1?style=for-the-badge&logo=i18next&logoColor=white" alt="next-intl"/>
  <br/><br/>
  <img src="./public/icon.png" alt="Travio AI" width="80" height="80"/>
  <h1>Travio AI</h1>
  <h3>✦ Smart Travel, Zero Stress</h3>
  <p><em>Your intelligent travel concierge — personalized itineraries powered by AI</em></p>

  <br/>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-environment-variables">Env Vars</a>
  </p>
</div>

<br/>

---

## ✦ Features

<div align="center">
  <table>
    <tr>
      <td align="center" width="25%">
        <br/>
        <b>🧠 AI Itineraries</b><br/>
        <sub>Gemini-powered trip generation tailored to your tastes</sub>
      </td>
      <td align="center" width="25%">
        <br/>
        <b>🌍 Multi-language</b><br/>
        <sub>Full EN/ES with next-intl — more locales ready</sub>
      </td>
      <td align="center" width="25%">
        <br/>
        <b>🔐 Auth</b><br/>
        <sub>Email/password + Google OAuth, credentials, and sessions</sub>
      </td>
      <td align="center" width="25%">
        <br/>
        <b>💬 AI Concierge</b><br/>
        <sub>Real-time chat with your travel assistant</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="25%">
        <br/>
        <b>📱 Responsive</b><br/>
        <sub>Tailwind CSS 4 — mobile-first design</sub>
      </td>
      <td align="center" width="25%">
        <br/>
        <b>⚡ PPR + Streaming</b><br/>
        <b><sub>Next.js 16 Partial Prerendering</sub></b>
      </td>
      <td align="center" width="25%">
        <br/>
        <b>📸 Rich Images</b><br/>
        <sub>Wikipedia REST API + Picsum fallback</sub>
      </td>
      <td align="center" width="25%">
        <br/>
        <b>📬 Email</b><br/>
        <sub>Resend for password reset flows</sub>
      </td>
    </tr>
  </table>
</div>

<br/>

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [Next.js 16.2.6](https://nextjs.org/) (Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Database** | PostgreSQL (Supabase) via Prisma 6 |
| **Auth** | next-auth v5 (Credentials + Google) |
| **AI** | Gemini 2.5 Flash (`@google/generative-ai`) |
| **i18n** | next-intl 4.12 (EN / ES) |
| **Email** | Resend |
| **Images** | Wikipedia REST API + Picsum (fallback) |
| **Caching** | Next.js `use cache` with `cacheLife` |
| **Icons** | Custom SVG icons + emoji |

<br/>

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- PostgreSQL database (Supabase recommended)
- Gemini API key ([Google AI Studio](https://aistudio.google.com/))
- Resend API key ([resend.com](https://resend.com))
- Google OAuth credentials ([Google Cloud Console](https://console.cloud.google.com/))

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd travio

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
```

Then populate `.env` with your keys (see [Environment Variables](#-environment-variables) below).

```bash
# Push the database schema
npx prisma db push

# Start the dev server
pnpm dev
```

Open **[http://localhost:3000](http://localhost:3000)** and start planning trips!

<br/>

## 📁 Project Structure

```
travio/
├── app/
│   ├── [locale]/                    # Localized routes
│   │   ├── page.tsx                 # Landing page
│   │   ├── layout.tsx               # Locale layout (fonts, footer, JSON-LD)
│   │   ├── landing-content.tsx      # Landing client component
│   │   ├── login/                   # Auth pages...
│   │   ├── register/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   ├── (app)/                   # Authenticated routes (route group)
│   │   │   ├── dashboard/
│   │   │   ├── explore/
│   │   │   ├── saved/
│   │   │   ├── concierge/
│   │   │   ├── new-trip/
│   │   │   └── profile/
│   │   └── trip/[id]/
│   ├── api/                         # Route handlers
│   ├── components/                  # Shared components (Footer, TripCard, etc.)
│   ├── layout.tsx                   # Root layout (metadata, icons)
│   ├── sitemap.ts                   # Dynamic sitemap (EN/ES)
│   ├── robots.ts                    # Dynamic robots.txt
│   └── globals.css
├── lib/
│   ├── cache.ts                     # Data layer with `use cache`
│   ├── get-city-image.ts            # Wikipedia image fetcher
│   ├── prisma.ts                    # Prisma client singleton
│   └── unsplash.ts                  # Unsplash image fallback
├── auth.ts                          # NextAuth configuration
├── proxy.ts                         # i18n middleware (Next.js 16 proxy)
├── i18n/
│   ├── routing.ts
│   ├── navigation.ts
│   └── request.ts
├── messages/
│   ├── en.json
│   └── es.json
├── public/
│   ├── favicon.ico                  # Favicon
│   ├── icon.png                     # App icon (192×192)
│   └── opengraph-image.png          # Social preview
└── prisma/
    └── schema.prisma
```

<br/>

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection (Supabase pooler) | ✅ |
| `DIRECT_URL` | Direct database connection (migrations) | ✅ |
| `AUTH_GOOGLE_ID` | Google OAuth client ID | ✅ |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret | ✅ |
| `NEXTAUTH_URL` | App URL (`http://localhost:3000`) | ✅ |
| `AUTH_SECRET` | NextAuth encryption secret | ✅ |
| `GEMINI_API_KEY` | Google Gemini API key | ✅ |
| `UNSPLASH_ACCESS_KEY` | Unsplash API access key | ✅ |
| `RESEND_API_KEY` | Resend API key for emails | ✅ |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO | for production |

<br/>

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm prisma` | Prisma CLI |

<br/>

## 🌐 Internationalization

Travio supports **English** and **Spanish** out of the box.

- Translations live in `messages/{locale}.json`
- Route localization handled by `proxy.ts` (next-intl middleware)
- SEO hreflang tags for all locales
- sitemap.xml includes both language variants for every page

<br/>

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

<br/>

---

<div align="center">
  <sub>Built with ❤️ using Next.js 16 · Prisma · Tailwind CSS 4 · Gemini AI</sub>
  <br/>
  <sub>© 2026 Travio AI. All rights reserved.</sub>
</div>
