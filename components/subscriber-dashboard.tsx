"use client";

import { signOutAction } from "@/lib/actions";

export default function SubscriberDashboard({ tips }: { tips: any[] }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Suggested Tips</h1>

      {tips.map((tip) => (
        <div key={tip.id} className="border p-4 mt-4">
          <p>{tip.race}</p>
          <h2 className="font-bold">{tip.horse}</h2>
          <p>{tip.commentary}</p>
        </div>
      ))}

      <form action={signOutAction} className="mt-6">
        <button className="text-red-500">Logout</button>
      </form>
    </div>
  );
}
