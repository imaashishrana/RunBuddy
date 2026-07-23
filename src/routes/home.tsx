import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  Bell, Search, Flame, Footprints, Zap, TrendingUp,
  Play, MapPin, PlusCircle, Users, CloudSun, ChevronRight, Droplets
} from "lucide-react";
import { AppFrame } from "@/components/mobile/AppFrame";
import { runEvents, groups } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/home")({
  component: Home,
  head: () => ({ meta: [{ title: "Home · RunBuddy" }] }),
});

function Home() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/auth" });
    }
  }, [loading, user, navigate]);

  if (loading || !user) {
    return null;
  }

  const name = user.user_metadata?.full_name ?? user.email?.split("@")[0] ?? "Runner";

  return (
    <AppFrame>
      <div className="space-y-5 px-5 pt-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Good morning</p>
            <h1 className="text-2xl font-bold">{name} 👋</h1>
          </div>
          <div className="flex gap-2">
            <button className="grid h-11 w-11 place-items-center rounded-2xl bg-surface">
              <Search className="h-5 w-5" />
            </button>
            <button className="relative grid h-11 w-11 place-items-center rounded-2xl bg-surface">
              <Bell className="h-5 w-5" />
              <span className="grad-accent absolute right-2 top-2 h-2 w-2 rounded-full" />
            </button>
          </div>
        </div>

        {/* Streak + Weather Hero */}
        <div className="grad-hero shadow-float relative overflow-hidden rounded-3xl p-5 text-primary-foreground">
          <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                <Flame className="h-3.5 w-3.5" /> 12 day streak
              </div>
              <p className="mt-3 text-sm opacity-90">Today's goal</p>
              <p className="text-3xl font-bold">6.8 <span className="text-lg font-medium opacity-80">/ 10 km</span></p>
              <div className="mt-3 h-2 w-40 overflow-hidden rounded-full bg-white/25">
                <div className="h-full w-[68%] rounded-full bg-white" />
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-xs backdrop-blur">
                <CloudSun className="h-3.5 w-3.5" /> 18°C
              </div>
              <p className="mt-3 text-4xl">☀️</p>
              <p className="text-xs opacity-90">Perfect run</p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={<Footprints className="h-4 w-4" />} label="Steps" value="8,240" tone="primary" />
          <StatCard icon={<Zap className="h-4 w-4" />} label="Calories" value="642" tone="accent" />
          <StatCard icon={<TrendingUp className="h-4 w-4" />} label="Distance" value="6.8km" tone="primary" />
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link to="/track" className="grad-primary shadow-float flex items-center gap-3 rounded-2xl p-4 text-primary-foreground active:scale-[0.98]">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/20 backdrop-blur">
              <Play className="h-5 w-5 fill-white" />
            </span>
            <div>
              <p className="text-sm font-bold">Start Run</p>
              <p className="text-[11px] opacity-80">Go solo now</p>
            </div>
          </Link>
          <Link to="/explore" className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card active:scale-[0.98]">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold">Find runs</p>
              <p className="text-[11px] text-muted-foreground">Nearby crews</p>
            </div>
          </Link>
          <Link to="/create" className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card active:scale-[0.98]">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
              <PlusCircle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold">Create Run</p>
              <p className="text-[11px] text-muted-foreground">Host your own</p>
            </div>
          </Link>
          <Link to="/community" className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card active:scale-[0.98]">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
              <Users className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold">Community</p>
              <p className="text-[11px] text-muted-foreground">Follow runners</p>
            </div>
          </Link>
        </div>

        {/* Upcoming runs */}
        <SectionHeader title="Upcoming runs" href="/explore" />
        <div className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1">
          {runEvents.slice(0, 3).map((r) => (
            <Link
              key={r.id}
              to="/event/$id"
              params={{ id: r.id }}
              className="shadow-card w-[280px] flex-none snap-start overflow-hidden rounded-3xl bg-card"
            >
              <div className="relative h-32" style={{ background: r.cover }}>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <span className="rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                    {r.date} · {r.time}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <p className="line-clamp-1 text-sm font-bold">{r.title}</p>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">📍 {r.location}</p>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="rounded-full bg-primary-soft px-2 py-0.5 font-semibold text-primary">{r.distance}km</span>
                  <span className="text-muted-foreground">{r.participants}/{r.maxParticipants} joined</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Water reminder */}
        <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-500">
            <Droplets className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-bold">Hydration reminder</p>
            <p className="text-xs text-muted-foreground">You've had 3 of 8 glasses today</p>
          </div>
          <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">+ Log</button>
        </div>

        {/* Groups */}
        <SectionHeader title="Nearby groups" href="/community" />
        <div className="hide-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-4">
          {groups.map((g) => (
            <div key={g.id} className="w-[160px] flex-none overflow-hidden rounded-3xl shadow-card bg-card">
              <div className="grid h-24 place-items-center text-4xl" style={{ background: g.cover }}>
                {g.emoji}
              </div>
              <div className="p-3">
                <p className="line-clamp-1 text-xs font-bold">{g.name}</p>
                <p className="text-[10px] text-muted-foreground">{g.members.toLocaleString()} members</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

function StatCard({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: "primary" | "accent" }) {
  return (
    <div className="rounded-2xl bg-card p-3 shadow-card">
      <span className={`grid h-8 w-8 place-items-center rounded-lg ${tone === "primary" ? "bg-primary-soft text-primary" : "bg-accent-soft text-accent"}`}>
        {icon}
      </span>
      <p className="mt-2 text-lg font-bold">{value}</p>
      <p className="text-[10px] font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

function SectionHeader({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-center justify-between pt-1">
      <h2 className="text-lg font-bold">{title}</h2>
      <Link to={href as never} className="flex items-center gap-0.5 text-xs font-semibold text-primary">
        See all <ChevronRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
