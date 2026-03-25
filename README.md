# Cob's Rules Live Trial (fixed)

This version fixes the Vercel build error caused by inline server actions inside a client component.

## Vercel environment variables

- NEXT_PUBLIC_SUPABASE_URL=https://fmjzbtnvusbzmdwxzxlu.supabase.co
- NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY

## Deploy

1. Replace your repo files with these.
2. Push to GitHub.
3. Redeploy in Vercel.

## What changed

- moved delete handlers to named server actions
- removed inline `"use server"` functions from the client component
- bumped Next.js to a patched version
