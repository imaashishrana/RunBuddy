import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Share2, MapPin, Calendar, Clock, Users, MessageCircle, Heart } from "lucide-react";
import { runEvents } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/event/$id")({
  component: EventDetail,
  head: () => ({ meta: [{ title: "Event · RunBuddy" }] }),
  notFoundComponent: () => (
    <div className="grid min-h-[100dvh] place-items-center p-6 text-center">
      <div>
        <p className="text-4xl">🔍</p>
        <p className="mt-2 font-bold">Event not found</p>
        <Link to="/explore" className="mt-3 inline-block rounded-full grad-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Explore</Link>
      </div>
    </div>
  ),
});

function EventDetail() {
  const { id } = useParams({ from: "/event/$id" });
  const event = runEvents.find((r) => r.id === id) ?? runEvents[0];

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background pb-24">
      <div className="relative h-72" style={{ background: event.cover }}>
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 pt-12">
          <Link to="/explore" className="grid h-10 w-10 place-items-center rounded-2xl bg-black/25 text-white backdrop-blur">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex gap-2">
            <button className="grid h-10 w-10 place-items-center rounded-2xl bg-black/25 text-white backdrop-blur"><Heart className="h-4 w-4" /></button>
            <button className="grid h-10 w-10 place-items-center rounded-2xl bg-black/25 text-white backdrop-blur"><Share2 className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5">
          <div className="flex gap-1.5">
            {event.tags.map((t) => (
              <span key={t} className="rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur">{t}</span>
            ))}
          </div>
          <h1 className="mt-2 text-3xl font-bold text-white">{event.title}</h1>
          <p className="text-sm text-white/80">by {event.organizer}</p>
        </div>
      </div>

      <div className="-mt-6 flex-1 rounded-t-[2rem] bg-background px-5 pt-6">
        <div className="rounded-3xl bg-card p-4 shadow-card">
          <div className="grid grid-cols-3 divide-x divide-border">
            <MetricCol icon={<MapPin className="h-4 w-4" />} label="Distance" value={`${event.distance} km`} />
            <MetricCol icon={<Clock className="h-4 w-4" />} label="Pace" value={event.pace} />
            <MetricCol icon={<Users className="h-4 w-4" />} label="Joined" value={`${event.participants}/${event.maxParticipants}`} />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
          <div className="grad-primary grid h-12 w-12 place-items-center rounded-2xl text-lg font-bold text-primary-foreground">{event.organizerAvatar}</div>
          <div className="flex-1">
            <p className="text-sm font-bold">{event.organizer}</p>
            <p className="text-[11px] text-muted-foreground">Organizer · 4.9 ★ · 32 runs hosted</p>
          </div>
          <button className="rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold text-primary">Follow</button>
        </div>

        <h3 className="mt-5 text-base font-bold">About this run</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Join us for a scenic {event.distance}km loop through {event.location}. All paces welcome — we regroup at the halfway point and finish with coffee at a local spot. Bring water and a smile ☀️
        </p>

        <h3 className="mt-5 text-base font-bold">Meeting point</h3>
        <div className="mt-2 rounded-2xl bg-card p-3 shadow-card">
          <div className="relative h-32 overflow-hidden rounded-xl" style={{ background: "linear-gradient(135deg,#e6f4ea,#a5d6a7)" }}>
            <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full opacity-40">
              <path d="M0 100 Q 100 60 200 100 T 400 100" stroke="#fff" strokeWidth="6" fill="none" />
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
              <div className="grad-accent rounded-2xl px-3 py-1.5 text-xs font-bold text-accent-foreground shadow-float">📍 Start</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span className="font-semibold">{event.location}</span>
            <span className="ml-auto rounded-full bg-primary-soft px-2 py-0.5 font-bold text-primary">1.2 km away</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <h3 className="text-base font-bold">Runners going</h3>
          <span className="text-xs text-muted-foreground">{event.participants}/{event.maxParticipants}</span>
        </div>
        <div className="mt-2 flex -space-x-2">
          {["AN", "MS", "PS", "LP", "NR", "+7"].map((a, i) => (
            <div key={i} className={`grid h-10 w-10 place-items-center rounded-full border-2 border-background text-xs font-bold ${i === 5 ? "bg-surface text-foreground" : "grad-primary text-primary-foreground"}`}>{a}</div>
          ))}
        </div>

        <h3 className="mt-6 text-base font-bold">Comments</h3>
        <div className="mt-2 space-y-3">
          {[
            { name: "Marco Silva", txt: "Can't wait! Bringing my dog if that's cool.", time: "2h" },
            { name: "Priya Shah", txt: "First time joining — beginner friendly right?", time: "5h" },
          ].map((c, i) => (
            <div key={i} className="flex gap-3">
              <div className="grad-primary grid h-9 w-9 place-items-center rounded-full text-xs font-bold text-primary-foreground">{c.name[0]}</div>
              <div className="flex-1 rounded-2xl bg-card p-3 shadow-card">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground">{c.time}</p>
                </div>
                <p className="mt-1 text-xs">{c.txt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[440px] items-center gap-3 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button className="grid h-12 w-12 place-items-center rounded-2xl bg-surface"><MessageCircle className="h-5 w-5" /></button>
          <button
            onClick={() => toast.success("You're in!", { description: `See you at ${event.time}` })}
            className="grad-primary shadow-float flex-1 rounded-2xl py-3.5 text-sm font-bold text-primary-foreground active:scale-[0.98]"
          >
            Join this run · Free
          </button>
        </div>
      </div>
    </div>
  );
}

function MetricCol({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center px-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">{icon}</span>
      <p className="mt-1.5 text-sm font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
