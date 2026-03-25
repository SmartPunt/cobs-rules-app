"use client";

import { useActionState } from "react";
import { signInAction } from "@/lib/actions";
import { Panel } from "@/components/ui";

export default function LoginPage() {
  const [state, action, pending] = useActionState(signInAction, { error: null as string | null });

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_420px]">
        <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Cob's Rules</p>
          <h1 className="mt-3 text-4xl font-semibold">Private live trial</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            This is the real Supabase-backed version. Admin users can access the head tipper backend. Subscriber users can only access the punter-facing Suggested Tips experience.
          </p>
        </div>

        <Panel>
          <form action={action} className="space-y-5 p-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Sign in</h2>
              <p className="mt-1 text-sm text-slate-500">Use your real Supabase login credentials.</p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input name="email" type="email" className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 outline-none" />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Password</label>
              <input name="password" type="password" className="mt-2 w-full rounded-2xl border border-slate-200 px-3 py-2 outline-none" />
            </div>

            <button type="submit" className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              {pending ? "Signing in..." : "Login to private trial"}
            </button>

            {state.error ? <div className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{state.error}</div> : null}
          </form>
        </Panel>
      </div>
    </div>
  );
}
