"use client";

import { useMemo, useState } from "react";
import {
  deleteLongTermBetAction,
  deleteSuggestedTipAction,
  deleteWatchItemAction,
  signOutAction,
  upsertLongTermBet,
  upsertSuggestedTip,
  upsertWatchItem,
} from "@/lib/actions";
import { Badge, Panel, TipPill } from "@/components/ui";
import { useRealtimeTable } from "@/components/useRealtimeTable";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export default function AdminDashboard({
  currentUser,
  initialSuggestedTips,
  initialWatchlistItems,
  initialLongTermBets,
}: {
  currentUser: any;
  initialSuggestedTips: any[];
  initialWatchlistItems: any[];
  initialLongTermBets: any[];
}) {
  const suggestedTips = useRealtimeTable("suggested_tips", initialSuggestedTips);
  const watchlistItems = useRealtimeTable("watchlist_items", initialWatchlistItems);
  const longTermBets = useRealtimeTable("long_term_bets", initialLongTermBets);

  const emptyTip = useMemo(() => ({ id: "", race: "", horse: "", type: "Win", confidence: "High", note: "", commentary: "" }), []);
  const emptyWatch = useMemo(() => ({ id: "", race: "", horse: "", label: "Horse to Watch", commentary: "" }), []);
  const emptyLong = useMemo(() => ({ id: "", title: "", horse: "", bet_type: "Win", odds: "", commentary: "" }), []);

  const [tipForm, setTipForm] = useState(emptyTip);
  const [watchForm, setWatchForm] = useState(emptyWatch);
  const [longForm, setLongForm] = useState(emptyLong);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-slate-200 bg-white p-5">
          <div className="rounded-3xl bg-slate-900 p-4 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Cob's Rules</p>
            <h1 className="mt-1 text-lg font-semibold">Head Tipper CMS</h1>
            <p className="mt-2 text-sm text-slate-300">Supabase live admin area</p>
          </div>

          <Panel className="mt-6">
            <div className="space-y-3 p-4 text-sm text-slate-600">
              <div className="flex items-center justify-between"><span>Logged in as</span><Badge tone="blue">admin</Badge></div>
              <div className="flex items-center justify-between"><span>Sync mode</span><Badge tone="green">Supabase live</Badge></div>
              <div className="flex items-center justify-between"><span>Suggested tips</span><Badge tone="green">{suggestedTips.length}</Badge></div>
              <div className="flex items-center justify-between"><span>Watch items</span><Badge tone="amber">{watchlistItems.length}</Badge></div>
              <div className="flex items-center justify-between"><span>Long-term bets</span><Badge tone="rose">{longTermBets.length}</Badge></div>
            </div>
          </Panel>

          <div className="mt-4">
            <form action={signOutAction}>
              <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">Log out</button>
            </form>
          </div>
        </aside>

        <main className="p-4 lg:p-8">
          <div className="mb-6 rounded-[2rem] bg-white p-5 shadow-sm lg:flex lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-slate-500">Private admin trial</p>
              <h2 className="text-3xl font-semibold tracking-tight">Head tipper backend</h2>
              <p className="mt-1 text-sm text-slate-500">Logged in as {currentUser.full_name || currentUser.email}</p>
            </div>
            <div className="mt-4 flex gap-3 lg:mt-0">
              <Badge tone="blue">Backend hidden from subscribers</Badge>
              <Badge tone="green">Live updates enabled</Badge>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Head Tipper Backend</h2>
              <p className="text-sm text-slate-500">Changes here write to Supabase and show on subscriber logins live.</p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Panel>
                <form action={upsertSuggestedTip} className="space-y-5 p-5">
                  <input type="hidden" name="id" value={tipForm.id} readOnly />
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">Suggested tips of the day</h3>
                      <p className="text-sm text-slate-500">Add win, place, or all up tips.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {tipForm.id ? <Badge tone="blue">Editing</Badge> : null}
                      <Badge tone="green">{suggestedTips.length} published</Badge>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Race">
                      <input name="race" className="w-full rounded-2xl border border-slate-200 px-3 py-2" value={tipForm.race} onChange={(e) => setTipForm((p) => ({ ...p, race: e.target.value }))} />
                    </Field>
                    <Field label="Horse / Selection">
                      <input name="horse" className="w-full rounded-2xl border border-slate-200 px-3 py-2" value={tipForm.horse} onChange={(e) => setTipForm((p) => ({ ...p, horse: e.target.value }))} />
                    </Field>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <Field label="Tip type">
                      <select name="type" className="w-full rounded-2xl border border-slate-200 px-3 py-2" value={tipForm.type} onChange={(e) => setTipForm((p) => ({ ...p, type: e.target.value }))}>
                        <option>Win</option>
                        <option>Place</option>
                        <option>All Up</option>
                      </select>
                    </Field>
                    <Field label="Confidence">
                      <select name="confidence" className="w-full rounded-2xl border border-slate-200 px-3 py-2" value={tipForm.confidence} onChange={(e) => setTipForm((p) => ({ ...p, confidence: e.target.value }))}>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </Field>
                    <Field label="Short note">
                      <input name="note" className="w-full rounded-2xl border border-slate-200 px-3 py-2" value={tipForm.note} onChange={(e) => setTipForm((p) => ({ ...p, note: e.target.value }))} />
                    </Field>
                  </div>

                  <Field label="Commentary">
                    <textarea name="commentary" className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-3 py-2" value={tipForm.commentary} onChange={(e) => setTipForm((p) => ({ ...p, commentary: e.target.value }))} />
                  </Field>

                  <div className="flex gap-3">
                    <button type="submit" className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                      {tipForm.id ? "Update suggested tip" : "Publish suggested tip"}
                    </button>
                    {tipForm.id ? (
                      <button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700" onClick={() => setTipForm(emptyTip)}>
                        Cancel edit
                      </button>
                    ) : null}
                  </div>
                </form>
              </Panel>

              <Panel>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">Manage suggested tips</h3>
                  <div className="mt-4 space-y-3">
                    {suggestedTips.map((tip: any) => (
                      <div key={tip.id} className="rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm text-slate-500">{tip.race}</p>
                            <p className="font-semibold">{tip.horse}</p>
                          </div>
                          <TipPill type={tip.type} />
                        </div>
                        <p className="mt-2 text-sm text-slate-600">{tip.commentary}</p>
                        <div className="mt-3 flex gap-2">
                          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700" onClick={() => setTipForm({ id: String(tip.id), race: tip.race, horse: tip.horse, type: tip.type, confidence: tip.confidence, note: tip.note, commentary: tip.commentary })}>
                            Edit
                          </button>
                          <form action={deleteSuggestedTipAction}>
                            <input type="hidden" name="id" value={tip.id} />
                            <button className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-medium text-white">Delete</button>
                          </form>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Panel>
                <form action={upsertWatchItem} className="space-y-5 p-5">
                  <input type="hidden" name="id" value={watchForm.id} readOnly />
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">Horses / races to watch</h3>
                      <p className="text-sm text-slate-500">Add watch items and commentary.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {watchForm.id ? <Badge tone="blue">Editing</Badge> : null}
                      <Badge tone="amber">{watchlistItems.length} published</Badge>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Race">
                      <input name="race" className="w-full rounded-2xl border border-slate-200 px-3 py-2" value={watchForm.race} onChange={(e) => setWatchForm((p) => ({ ...p, race: e.target.value }))} />
                    </Field>
                    <Field label="Horse / Focus">
                      <input name="horse" className="w-full rounded-2xl border border-slate-200 px-3 py-2" value={watchForm.horse} onChange={(e) => setWatchForm((p) => ({ ...p, horse: e.target.value }))} />
                    </Field>
                  </div>

                  <Field label="Watch label">
                    <select name="label" className="w-full rounded-2xl border border-slate-200 px-3 py-2" value={watchForm.label} onChange={(e) => setWatchForm((p) => ({ ...p, label: e.target.value }))}>
                      <option>Horse to Watch</option>
                      <option>Race to Watch</option>
                    </select>
                  </Field>

                  <Field label="Commentary">
                    <textarea name="commentary" className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-3 py-2" value={watchForm.commentary} onChange={(e) => setWatchForm((p) => ({ ...p, commentary: e.target.value }))} />
                  </Field>

                  <div className="flex gap-3">
                    <button type="submit" className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                      {watchForm.id ? "Update watch item" : "Publish watch item"}
                    </button>
                    {watchForm.id ? (
                      <button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700" onClick={() => setWatchForm(emptyWatch)}>
                        Cancel edit
                      </button>
                    ) : null}
                  </div>
                </form>
              </Panel>

              <Panel>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">Manage watchlist items</h3>
                  <div className="mt-4 space-y-3">
                    {watchlistItems.map((item: any) => (
                      <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm text-slate-500">{item.race || "Watchlist"}</p>
                            <p className="font-semibold">{item.horse || "Race note"}</p>
                          </div>
                          <TipPill type={item.label} />
                        </div>
                        <p className="mt-2 text-sm text-slate-600">{item.commentary || ""}</p>
                        <div className="mt-3 flex gap-2">
                          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700" onClick={() => setWatchForm({ id: String(item.id), race: item.race || "", horse: item.horse || "", label: item.label, commentary: item.commentary || "" })}>
                            Edit
                          </button>
                          <form action={deleteWatchItemAction}>
                            <input type="hidden" name="id" value={item.id} />
                            <button className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-medium text-white">Delete</button>
                          </form>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <Panel>
                <form action={upsertLongTermBet} className="space-y-5 p-5">
                  <input type="hidden" name="id" value={longForm.id} readOnly />
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">Long-term bets</h3>
                      <p className="text-sm text-slate-500">Add futures and longer-range plays.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {longForm.id ? <Badge tone="blue">Editing</Badge> : null}
                      <Badge tone="rose">{longTermBets.length} published</Badge>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Long-term bet title">
                      <input name="title" className="w-full rounded-2xl border border-slate-200 px-3 py-2" value={longForm.title} onChange={(e) => setLongForm((p) => ({ ...p, title: e.target.value }))} />
                    </Field>
                    <Field label="Horse / Selection">
                      <input name="horse" className="w-full rounded-2xl border border-slate-200 px-3 py-2" value={longForm.horse} onChange={(e) => setLongForm((p) => ({ ...p, horse: e.target.value }))} />
                    </Field>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Bet type">
                      <select name="bet_type" className="w-full rounded-2xl border border-slate-200 px-3 py-2" value={longForm.bet_type} onChange={(e) => setLongForm((p) => ({ ...p, bet_type: e.target.value }))}>
                        <option>Win</option>
                        <option>Place</option>
                        <option>All Up</option>
                      </select>
                    </Field>
                    <Field label="Current odds">
                      <input name="odds" className="w-full rounded-2xl border border-slate-200 px-3 py-2" value={longForm.odds} onChange={(e) => setLongForm((p) => ({ ...p, odds: e.target.value }))} />
                    </Field>
                  </div>

                  <Field label="Commentary">
                    <textarea name="commentary" className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-3 py-2" value={longForm.commentary} onChange={(e) => setLongForm((p) => ({ ...p, commentary: e.target.value }))} />
                  </Field>

                  <div className="flex gap-3">
                    <button type="submit" className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                      {longForm.id ? "Update long-term bet" : "Publish long-term bet"}
                    </button>
                    {longForm.id ? (
                      <button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700" onClick={() => setLongForm(emptyLong)}>
                        Cancel edit
                      </button>
                    ) : null}
                  </div>
                </form>
              </Panel>

              <Panel>
                <div className="p-5">
                  <h3 className="text-lg font-semibold">Manage long-term bets</h3>
                  <div className="mt-4 space-y-3">
                    {longTermBets.map((item: any) => (
                      <div key={item.id} className="rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm text-slate-500">{item.title}</p>
                            <p className="font-semibold">{item.horse}</p>
                          </div>
                          <TipPill type="Long Term" />
                        </div>
                        <p className="mt-2 text-sm text-slate-600">{item.commentary || ""}</p>
                        <div className="mt-3 flex gap-2">
                          <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700" onClick={() => setLongForm({ id: String(item.id), title: item.title || "", horse: item.horse || "", bet_type: item.bet_type, odds: item.odds || "", commentary: item.commentary || "" })}>
                            Edit
                          </button>
                          <form action={deleteLongTermBetAction}>
                            <input type="hidden" name="id" value={item.id} />
                            <button className="rounded-2xl bg-red-600 px-4 py-2 text-sm font-medium text-white">Delete</button>
                          </form>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Panel>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
