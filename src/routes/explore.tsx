import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, SlidersHorizontal, MapPin, Clock, Users, Map as MapIcon, List } from "lucide-react";
import { AppFrame } from "@/components/mobile/AppFrame";
import { runEvents } from "@/lib/mock-data";

export const Route = createFileRoute("/explore")({
  component: Explore,
  head: () => ({ meta: [{ title: "Explore runs · RunBuddy" }] }),
});

const filters = ["All", "Morning", "Evening", "Weekend", "< 5km", "5-10km", "10km+", "Easy", "Hard"];

function Explore() {
  const [view, setView] = useState<"list" | "map">("list");
  const [active, setActive] = useState("All");

  return (
    <AppFrame>
      <div className="px-5 pt-12 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Explore</h1>
            <p className="text-xs text-muted-foreground">42 runs near you</p>
          </div>
          <div className="flex rounded-2xl bg-surface p-1">
            <button
              onClick={() => setView("list")}
              className={`grid h-9 w-9 place-items-center rounded-xl ${view === "list" ? "bg-card shadow-card" : ""}`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("map")}
              className={`grid h-9 w-9 place-items-center rounded-xl ${view === "map" ? "bg-card shadow-card" : ""}`}
            >
              <MapIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search runs, locations, crews" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60" />
          </div>
          <button className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-float">
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        </div>

        <div className="hide-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                active === f
                  ? "grad-primary text-primary-foreground shadow-card"
                  : "bg-surface text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {view === "map" ? <MapView /> : <ListView />}
    </AppFrame>
  );
}

function MapView() {
  return (
    <div className="px-5">
      <div className="relative h-[380px] overflow-hidden rounded-3xl shadow-card">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg,#e6f4ea 0%,#c8e6c9 40%,#a5d6a7 100%)",
          }}
        />
        {/* streets */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full opacity-40">
          <path d="M0 120 Q 100 100 200 140 T 400 130" stroke="#fff" strokeWidth="6" fill="none" />
          <path d="M0 240 Q 120 260 220 220 T 400 260" stroke="#fff" strokeWidth="6" fill="none" />
          <path d="M120 0 L 140 400" stroke="#fff" strokeWidth="6" fill="none" />
          <path d="M280 0 L 260 400" stroke="#fff" strokeWidth="6" fill="none" />
        </svg>
        {[
          { top: "22%", left: "18%", label: "5k" },
          { top: "48%", left: "60%", label: "10k" },
          { top: "68%", left: "30%", label: "8k" },
          { top: "30%", left: "72%", label: "15k" },
        ].map((p, i) => (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ top: p.top, left: p.left }}>
            <div className="grad-accent shadow-float rounded-2xl px-3 py-1.5 text-xs font-bold text-accent-foreground">
              {p.label}
            </div>
            <div className="mx-auto h-2 w-2 -translate-y-0.5 rotate-45 grad-accent" />
          </div>
        ))}
        <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-card/95 p-3 shadow-card backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="grad-primary grid h-11 w-11 place-items-center rounded-xl text-lg text-primary-foreground">🏃</div>
            <div className="flex-1">
              <p className="text-sm font-bold">Sunrise Central Park Loop</p>
              <p className="text-xs text-muted-foreground">1.2 km away · Tomorrow 6:30 AM</p>
            </div>
            <button className="rounded-full grad-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Join</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListView() {
  return (
    <div className="space-y-3 px-5 pb-6">
      {runEvents.map((r) => (
        <Link
          key={r.id}
          to="/event/$id"
          params={{ id: r.id }}
          className="block overflow-hidden rounded-3xl bg-card shadow-card active:scale-[0.99]"
        >
          <div className="relative h-40" style={{ background: r.cover }}>
            <div className="absolute left-3 top-3 flex gap-1.5">
              {r.tags.map((t) => (
                <span key={t} className="rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                  {t}
                </span>
              ))}
            </div>
            <span
              className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold backdrop-blur ${
                r.difficulty === "Easy" ? "bg-green-500/80 text-white" :
                r.difficulty === "Moderate" ? "bg-yellow-500/80 text-white" :
                "bg-red-500/80 text-white"
              }`}
            >
              {r.difficulty}
            </span>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <p className="text-base font-bold text-white">{r.title}</p>
              <p className="text-xs text-white/80">by {r.organizer}</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{r.location}</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{r.time}</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs">
                <span className="rounded-full bg-primary-soft px-2.5 py-1 font-bold text-primary">{r.distance}km</span>
                <span className="text-muted-foreground">{r.pace}</span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-3 w-3" />{r.participants}/{r.maxParticipants}
                </span>
              </div>
              <span className="rounded-full grad-primary px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-card">Join</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
