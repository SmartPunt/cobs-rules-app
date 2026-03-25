"use client";

import {
  deleteLongTermBetAction,
  deleteSuggestedTipAction,
  deleteWatchItemAction,
  signOutAction,
  upsertLongTermBet,
  upsertSuggestedTip,
  upsertWatchItem,
} from "@/lib/actions";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Head Tipper Backend</h1>

      <form action={upsertSuggestedTip} className="mb-6 space-y-2">
        <h2 className="font-semibold">Add Suggested Tip</h2>
        <input name="race" placeholder="Race" className="border p-2 w-full" />
        <input name="horse" placeholder="Horse" className="border p-2 w-full" />
        <textarea name="commentary" placeholder="Commentary" className="border p-2 w-full" />
        <button className="bg-black text-white px-4 py-2">Save</button>
      </form>

      <form action={upsertWatchItem} className="mb-6 space-y-2">
        <h2 className="font-semibold">Add Watch Item</h2>
        <input name="race" placeholder="Race" className="border p-2 w-full" />
        <input name="horse" placeholder="Horse" className="border p-2 w-full" />
        <textarea name="commentary" placeholder="Commentary" className="border p-2 w-full" />
        <button className="bg-black text-white px-4 py-2">Save</button>
      </form>

      <form action={upsertLongTermBet} className="space-y-2">
        <h2 className="font-semibold">Add Long Term Bet</h2>
        <input name="title" placeholder="Title" className="border p-2 w-full" />
        <input name="horse" placeholder="Horse" className="border p-2 w-full" />
        <textarea name="commentary" placeholder="Commentary" className="border p-2 w-full" />
        <button className="bg-black text-white px-4 py-2">Save</button>
      </form>

      <form action={signOutAction} className="mt-6">
        <button className="text-red-500">Logout</button>
      </form>
    </div>
  );
}
