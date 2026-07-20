import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Trophy, TrendingUp, Timer, Flame, ChevronRight, Medal } from "lucide-react";
import { AppFrame } from "@/components/mobile/AppFrame";
import { weeklyDistance, achievements, pastRuns, leaderboard } from "@/lib/mock-data";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell } from "recharts";

export const Route = createFileRoute("/activity")({
  component: Activity,
  head: () => ({ meta: [{ title: "Activity · RunBuddy" }] }),
});

function Activity() {
  const [tab, setTab] = useState<"stats" | "history" | "board">("stats");

  return (
    <AppFrame>
      <div className="px-5 pt-12">
        <h1 className="text-2xl font-bold">Your Activity</h1>
        <p className="text-xs text-muted-foreground">Every kilometer counts</p>

        <div className="mt-5 flex rounded-2xl bg-surface p-1">
          {(["stats", "history", "board"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-xl py-2.5 text-xs font-semibold capitalize ${
                tab === t ? "bg-card shadow-card text-foreground" : "text-muted-foreground"
              }`}
            >
              {t === "board" ? "Leaderboard" : t}
            </button>
          ))}
        </div>
      </div>

      {tab === "stats" && <StatsTab />}
      {tab === "history" && <HistoryTab />}
      {tab === "board" && <BoardTab />}
    </AppFrame>
  );
}

function StatsTab() {
  const total = weeklyDistance.reduce((s, d) => s + d.km, 0);
  return (
    <div className="space-y-4 px-5 pt-5 pb-6">
      <div className="grid grid-cols-2 gap-3">
        <BigStat icon={<TrendingUp className="h-4 w-4" />} label="This week" value={`${total.toFixed(1)} km`} sub="+18% vs last week" tone="primary" />
        <BigStat icon={<Timer className="h-4 w-4" />} label="Avg pace" value="5:24" sub="/ km" tone="accent" />
        <BigStat icon={<Flame className="h-4 w-4" />} label="Streak" value="12" sub="days" tone="accent" />
        <BigStat icon={<Trophy className="h-4 w-4" />} label="Total runs" value="147" sub="all time" tone="primary" />
      </div>

      <div className="rounded-3xl bg-card p-4 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Weekly distance</p>
            <p className="text-xl font-bold">{total.toFixed(1)} km</p>
          </div>
          <div className="rounded-full bg-primary-soft px-2.5 py-1 text-[10px] font-bold text-primary">This week</div>
        </div>
        <div className="mt-2 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyDistance} margin={{ top: 8, right: 0, left: -30, bottom: 0 }}>
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
              <Bar dataKey="km" radius={[8, 8, 0, 0]}>
                {weeklyDistance.map((d, i) => (
                  <Cell key={i} fill={d.km > 8 ? "var(--accent)" : "var(--primary)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-bold">Achievements</h3>
          <button className="flex items-center text-xs font-semibold text-primary">See all <ChevronRight className="h-3.5 w-3.5" /></button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((a) => (
            <div
              key={a.id}
              className={`rounded-2xl p-3 text-center shadow-card ${a.unlocked ? "bg-card" : "bg-surface opacity-60"}`}
            >
              <div className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl text-2xl ${a.unlocked ? "grad-primary" : "bg-muted"}`}>
                {a.icon}
              </div>
              <p className="mt-2 line-clamp-1 text-[11px] font-bold">{a.title}</p>
              <p className="line-clamp-2 text-[9px] text-muted-foreground">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HistoryTab() {
  return (
    <div className="space-y-3 px-5 pt-5 pb-6">
      {pastRuns.map((r) => (
        <div key={r.id} className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
          <div className="grad-primary grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">{r.title}</p>
            <p className="text-[11px] text-muted-foreground">{r.date} · {r.time} · +{r.elev}m elev</p>
          </div>
          <div className="text-right">
            <p className="text-base font-bold">{r.distance} km</p>
            <p className="text-[11px] text-muted-foreground">{r.pace}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BoardTab() {
  return (
    <div className="px-5 pt-5 pb-6">
      <div className="mb-4 flex gap-2">
        {["Weekly", "Friends", "City", "Country"].map((f, i) => (
          <button
            key={f}
            className={`flex-1 rounded-full py-2 text-[11px] font-semibold ${
              i === 0 ? "grad-primary text-primary-foreground shadow-card" : "bg-surface"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mb-5 grid grid-cols-3 items-end gap-2">
        {[leaderboard[1], leaderboard[0], leaderboard[2]].map((p, i) => {
          const heights = ["h-24", "h-32", "h-20"];
          const medals = ["🥈", "🥇", "🥉"];
          return (
            <div key={p.rank} className="text-center">
              <div className="grad-primary mx-auto mb-2 grid h-14 w-14 place-items-center rounded-full text-lg font-bold text-primary-foreground shadow-float">
                {p.avatar}
              </div>
              <p className="line-clamp-1 text-xs font-bold">{p.name}</p>
              <p className="text-[10px] text-muted-foreground">{p.km} km</p>
              <div className={`${heights[i]} mt-2 rounded-t-2xl ${i === 1 ? "grad-accent" : "grad-primary"} grid place-items-center text-2xl`}>
                {medals[i]}
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-2">
        {leaderboard.slice(3).map((p) => (
          <div key={p.rank} className={`flex items-center gap-3 rounded-2xl p-3 ${p.isYou ? "grad-primary text-primary-foreground shadow-card" : "bg-card shadow-card"}`}>
            <span className={`w-6 text-center text-sm font-bold ${p.isYou ? "" : "text-muted-foreground"}`}>{p.rank}</span>
            <div className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${p.isYou ? "bg-white/20" : "bg-primary-soft text-primary"}`}>
              {p.avatar}
            </div>
            <p className="flex-1 text-sm font-semibold">{p.name}</p>
            <div className="text-right">
              <p className="text-sm font-bold">{p.km} km</p>
              <p className={`text-[10px] ${p.isYou ? "opacity-80" : "text-muted-foreground"}`}>{p.change}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BigStat({ icon, label, value, sub, tone }: { icon: React.ReactNode; label: string; value: string; sub: string; tone: "primary" | "accent" }) {
  return (
    <div className="rounded-3xl bg-card p-4 shadow-card">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${tone === "primary" ? "bg-primary-soft text-primary" : "bg-accent-soft text-accent"}`}>
        {icon}
      </span>
      <p className="mt-3 text-2xl font-bold">{value}</p>
      <p className="text-[11px] font-medium text-muted-foreground">{label} · {sub}</p>
    </div>
  );
}
