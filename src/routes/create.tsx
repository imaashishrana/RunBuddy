import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MapPin, Calendar, Clock, Route as RouteIcon, Zap, Users, Lock, Globe, Camera } from "lucide-react";
import { AppFrame } from "@/components/mobile/AppFrame";
import { toast } from "sonner";

export const Route = createFileRoute("/create")({
  component: Create,
  head: () => ({ meta: [{ title: "Create a run · RunBuddy" }] }),
});

function Create() {
  const navigate = useNavigate();
  const [privacy, setPrivacy] = useState<"public" | "private">("public");
  const [difficulty, setDifficulty] = useState("Moderate");

  return (
    <AppFrame>
      <div className="px-5 pt-12">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate({ to: "/home" })} className="grid h-10 w-10 place-items-center rounded-2xl bg-surface">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Create Run</h1>
            <p className="text-xs text-muted-foreground">Host your own group run</p>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); toast.success("Run created!", { description: "Your crew has been notified." }); navigate({ to: "/home" }); }}
          className="mt-5 space-y-4 pb-8"
        >
          {/* Cover upload */}
          <button type="button" className="grad-hero shadow-float flex h-40 w-full flex-col items-center justify-center gap-2 rounded-3xl text-primary-foreground">
            <Camera className="h-8 w-8" />
            <span className="text-sm font-semibold">Upload cover image</span>
            <span className="text-[11px] opacity-80">Tap to select or capture</span>
          </button>

          <TextField label="Run name" placeholder="Morning Riverside Loop" required />
          <TextField label="Description" placeholder="Chill social run, all paces welcome" multiline />

          <div className="rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="h-4 w-4 text-primary" /> Meeting point
            </div>
            <input
              placeholder="Search location..."
              className="mt-3 w-full rounded-xl bg-surface px-4 py-3 text-sm outline-none"
            />
            <div className="mt-3 h-32 overflow-hidden rounded-xl" style={{ background: "linear-gradient(135deg,#e6f4ea,#a5d6a7)" }}>
              <svg viewBox="0 0 400 200" className="h-full w-full opacity-50">
                <path d="M0 100 Q 100 60 200 100 T 400 100" stroke="#fff" strokeWidth="5" fill="none" />
                <path d="M120 0 L 140 200" stroke="#fff" strokeWidth="5" fill="none" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <IconField icon={<Calendar className="h-4 w-4" />} label="Date" value="Sat, Jul 25" />
            <IconField icon={<Clock className="h-4 w-4" />} label="Time" value="07:00 AM" />
            <IconField icon={<RouteIcon className="h-4 w-4" />} label="Distance" value="8 km" />
            <IconField icon={<Zap className="h-4 w-4" />} label="Pace" value="5:30/km" />
          </div>

          <div className="rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold">Max participants</p>
              </div>
              <p className="text-lg font-bold text-primary">20</p>
            </div>
            <input type="range" defaultValue={20} min={2} max={100} className="mt-3 w-full accent-[color:var(--color-primary)]" />
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground">Difficulty</p>
            <div className="grid grid-cols-3 gap-2">
              {["Easy", "Moderate", "Hard"].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`rounded-2xl py-3 text-sm font-semibold transition-all ${
                    difficulty === d ? "grad-primary text-primary-foreground shadow-card" : "bg-surface"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold text-muted-foreground">Visibility</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPrivacy("public")}
                className={`flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold ${
                  privacy === "public" ? "grad-primary text-primary-foreground shadow-card" : "bg-surface"
                }`}
              >
                <Globe className="h-4 w-4" /> Public
              </button>
              <button
                type="button"
                onClick={() => setPrivacy("private")}
                className={`flex items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold ${
                  privacy === "private" ? "grad-primary text-primary-foreground shadow-card" : "bg-surface"
                }`}
              >
                <Lock className="h-4 w-4" /> Private
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="grad-primary shadow-float mt-2 w-full rounded-2xl py-4 text-base font-semibold text-primary-foreground active:scale-[0.98]"
          >
            Create Event
          </button>
        </form>
      </div>
    </AppFrame>
  );
}

function TextField({ label, placeholder, multiline, required }: { label: string; placeholder: string; multiline?: boolean; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">{label}{required && " *"}</label>
      {multiline ? (
        <textarea
          rows={3}
          placeholder={placeholder}
          className="w-full resize-none rounded-2xl border border-border bg-card px-4 py-3.5 text-sm outline-none focus:border-primary"
        />
      ) : (
        <input
          placeholder={placeholder}
          className="w-full rounded-2xl border border-border bg-card px-4 py-3.5 text-sm outline-none focus:border-primary"
        />
      )}
    </div>
  );
}

function IconField({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <button type="button" className="rounded-2xl border border-border bg-card p-3 text-left shadow-card">
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </button>
  );
}
