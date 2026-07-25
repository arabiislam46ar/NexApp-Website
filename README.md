# NexApp

A web-based app store — by **NexAuras**. Discover, publish, and download apps
today on the web, with native Android and desktop apps planned next.

Developer credit: **Arabi Islam / MR. ARX**

## Stack

- Next.js 15 (App Router, TypeScript, Turbopack)
- Tailwind CSS 4
- Supabase (Auth, Postgres, Row Level Security)
- lucide-react icons

## Features (v1)

- Public catalog: browse, search, filter by category
- App detail pages with screenshots, platform tags, and a download button
  that logs each download and opens the app's external link (Google Drive,
  GitHub Releases, etc. — files themselves are not hosted here)
- Email/password auth (Supabase)
- User dashboard with personal download history
- Admin panel (role-gated) to create, edit, publish/unpublish, and delete
  app listings
- Animated launch-page credit: a typewriter effect that types
  "Developed by Arabi Islam", deletes it, then types "MR. ARX" — on a loop
  (`src/components/TypewriterCredit.tsx`, shown in the footer on every page)

## Setup

1. **Create a Supabase project** at https://supabase.com.

2. **Run the schema.** In the Supabase SQL Editor, paste and run the
   contents of `supabase/schema.sql`. This creates all tables, Row Level
   Security policies, triggers (auto-profile-on-signup, download counters),
   and seeds a few starter categories.

3. **Copy environment variables.**
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   from Supabase → Project Settings → API.

4. **Install and run.**
   ```bash
   npm install
   npm run dev
   ```

5. **Make yourself an admin.** Sign up once through the app, then in the
   Supabase SQL Editor run:
   ```sql
   update public.profiles set role = 'admin' where id = '<your-auth-user-uuid>';
   ```
   Find your UUID under Authentication → Users. You'll then see an "Admin"
   link in the navbar.

## Project structure

```
src/
  app/
    page.tsx                  Landing page (hero + featured apps)
    apps/page.tsx              Browse/search catalog
    apps/[slug]/page.tsx        App detail + download
    login/, signup/            Auth pages
    dashboard/page.tsx         User's download history
    admin/                     Role-gated admin panel (list/new/edit, actions.ts)
    auth/callback/route.ts     Supabase auth redirect handler
  components/                  Navbar, Footer, AppCard, TypewriterCredit, etc.
  lib/supabase/                Browser / server / middleware Supabase clients
  lib/types.ts                 Shared TypeScript types
supabase/schema.sql             Full DB schema, RLS policies, triggers, seed data
```

## Notes

- App files (APKs, installers, etc.) are **not** uploaded to this project —
  each listing just stores an external download link.
- The color/type system ("Nexus/Aurora" theme — deep space background,
  teal→violet→magenta gradient accent, Space Grotesk/Inter/JetBrains Mono)
  lives in `src/app/globals.css` and is applied via Tailwind's `@theme`.
- Mobile and desktop apps are represented in the schema/UI as `platforms`
  on each app and a rollout-status strip on the homepage, ready for when
  those builds ship.
"# NexApp-Website" 
