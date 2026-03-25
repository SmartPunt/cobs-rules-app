# Cob's Rules Live Trial

This is a deployable Next.js + Supabase version for your private trial.

## Vercel environment variables

Set these in Project Settings -> Environment Variables

- NEXT_PUBLIC_SUPABASE_URL=https://fmjzbtnvusbzmdwxzxlu.supabase.co
- NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY

## Deploy steps

1. Put these files in a GitHub repo.
2. Import the repo into Vercel.
3. Add the two environment variables.
4. Redeploy.

## Local run

npm install
npm run dev

## Important

This app expects these Supabase tables:
- profiles
- suggested_tips
- watchlist_items
- long_term_bets

Admin vs subscriber access is controlled by public.profiles.role.

Subscriber screens use realtime subscriptions so Gareth's edits show live for logged-in users.
