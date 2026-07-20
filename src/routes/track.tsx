import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { Pause, Play, Square, Lock, Music } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/track")({
  component: Track,
  head: () => ({ meta: [{ title: "Live run · RunBuddy" }] }),
});

function Track() {
  const [running, setRunning] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
  }, [running]);

  const distance = (seconds * 0.0035).toFixed(2);
  const pace = seconds > 30 ? "5:24" : "--:--";
  const calories = Math.round(seconds * 0.18);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      {/* Map background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#d7ecd9 0%,#a5d6a7 60%,#81c784 100%)" }} />
      <svg viewBox="0 0 400 800" className="absolute inset-0 h-full w-full opacity-40">
        <path d="M0 200 Q 100 180 200 220 T 400 210" stroke="#fff" strokeWidth="6" fill="none" />
        <path d="M0 400 Q 120 420 220 380 T 400 420" stroke="#fff" strokeWidth="6" fill="none" />
        <path d="M100 0 L 120 800" stroke="#fff" strokeWidth="6" fill="none" />
        <path d="M300 0 L 280 800" stroke="#fff" strokeWidth="6" fill="none" />
      </svg>
      {/* Route trace */}
      <svg viewBox="0 0 400 800" className="absolute inset-0 h-full w-full">
        <path
          d="M80 600 Q 150 400 200 380 T 320 250"
          stroke="var(--accent)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="0"
          className="drop-shadow"
        />
        <circle cx="320" cy="250" r="10" fill="var(--accent)" />
        <circle cx="80" cy="600" r="8" fill="#fff" stroke="var(--primary)" strokeWidth="3" />
      </svg>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-12">
        <div className="rounded-full bg-card/90 px-3 py-1.5 text-xs font-bold shadow-card backdrop-blur">
          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" /> LIVE
        </div>
        <div className="flex gap-2">
          <button className="grid h-10 w-10 place-items-center rounded-2xl bg-card/90 shadow-card backdrop-blur"><Music className="h-4 w-4" /></button>
          <button className="grid h-10 w-10 place-items-center rounded-2xl bg-card/90 shadow-card backdrop-blur"><Lock className="h-4 w-4" /></button>
        </div>
      </div>

      {/* Stats card */}
      <div className="relative z-10 mt-auto space-y-3 p-5">
        <div className="rounded-3xl bg-card/95 p-5 shadow-float backdrop-blur-xl">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">Distance</p>
          <p className="text-center text-6xl font-black tracking-tight">
            {distance}<span className="text-2xl font-bold text-muted-foreground"> km</span>
          </p>

          <div className="mt-5 grid grid-cols-3 divide-x divide-border">
            <StatBlock label="Time" value={`${mm}:${ss}`} />
            <StatBlock label="Pace /km" value={pace} />
            <StatBlock label="kcal" value={String(calories)} />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => { toast("Run saved!", { description: `${distance} km · ${mm}:${ss}` }); navigate({ to: "/activity" }); }}
            className="grid h-16 w-16 place-items-center rounded-full bg-card shadow-card"
          >
            <Square className="h-6 w-6 fill-destructive text-destructive" />
          </button>
          <button
            onClick={() => setRunning(!running)}
            className="grad-primary shadow-float grid h-20 w-20 place-items-center rounded-full text-primary-foreground active:scale-95"
          >
            {running ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current" />}
          </button>
          <button className="grid h-16 w-16 place-items-center rounded-full bg-card shadow-card text-xl">
            🆘
          </button>
        </div>
        <p className="text-center text-[10px] text-muted-foreground">Hold SOS for 3s to alert emergency contacts</p>
      </div>
    </div>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-xl font-bold">{value}</p>
      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
    </div>
  );
}
