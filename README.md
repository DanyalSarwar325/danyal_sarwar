# Next.js Blog

Concise, production-ready blog built with Next.js App Router, Supabase, and modern UI tooling. Includes authentication, ISR for fast content delivery, and user-friendly error handling.

## Quick Start
- Clone: `git clone https://github.com/DanyalSarwar325/danyal_sarwar.git`
- Install: `pnpm i`
- Run: `pnpm run dev`

App runs at `http://localhost:3000`.

## Prerequisites
- Node.js 18+
- `pnpm` installed globally
- Optional: Supabase account (only if using your own project)

## Supabase Setup
You can run with the provided test Supabase credentials, or use your own.

### Use Provided Credentials (Testing)
Supabase credentials are preconfigured for testing. Just install and run.

### Use Your Own Supabase Project (Optional)
1. Create a project in Supabase Dashboard.
2. Retrieve the credentials below and set them in an `.env.local` file at the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_GRAPHQL_URL=your-graphql-url
```

## Google Auth Configuration
Authentication uses Google via Supabase.

### Enable Google in Supabase
- In Supabase Dashboard: Authentication → Providers → enable Google.
- Keep the page open to paste credentials from Google Cloud.

Note: Supabase does not create Google OAuth credentials — you must create them in Google Cloud Console.

### Create Google OAuth Credentials
In Google Cloud Console:
- Create/select a project.
- APIs & Services → OAuth consent screen → User Type: External.
- Fill required fields and add your email as a test user.
- Credentials → Create Credentials → OAuth Client ID.
- Configure:
	- Authorized JavaScript origins: `https://YOUR_PROJECT_ID.supabase.co`
	- Authorized redirect URIs: `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`

Paste the Client ID and Client Secret back into Supabase Google provider settings.

## Bonus Features
- Zod validation: strict runtime validation for forms and API responses.
- Incremental Static Regeneration (ISR): fast pages with periodic revalidation.
- React Hot Toast: friendly notifications for auth, validation, and API errors.

## Workspace Tips
- Monorepo managed with `pnpm` and `turbo`.
- App code in `apps/web` with shared packages under `packages/`.
- Common scripts in `tooling/scripts`.

## Useful Scripts
- `pnpm run dev`: start local development server.
- `pnpm run build`: build the production bundle.
- `pnpm run lint`: run ESLint across the workspace.

## License
See `LICENSE` for details.