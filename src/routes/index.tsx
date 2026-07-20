import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, MapPin, Users, Trophy } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Splash,
});

const slides = [
  {
    emoji: "🏃‍♀️",
    title: "Find your running crew",
    desc: "Discover runners near you and never train alone again.",
    grad: "grad-primary",
    icon: Users,
  },
  {
    emoji: "🗺️",
    title: "Explore new routes",
    desc: "Scout parks, trails, and bridges from real local runners.",
    grad: "grad-hero",
    icon: MapPin,
  },
  {
    emoji: "🏆",
    title: "Level up together",
    desc: "Track pace, earn badges, and climb the weekly leaderboard.",
    grad: "grad-sunset",
    icon: Trophy,
  },
];

function Splash() {
  const [i, setI] = useState(0);
  const navigate = useNavigate();
  const s = slides[i];
  const Icon = s.icon;

  const next = () => {
    if (i < slides.length - 1) setI(i + 1);
    else navigate({ to: "/auth" });
  };

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <div className={`${s.grad} relative flex-1 overflow-hidden text-primary-foreground`}>
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -left-10 bottom-24 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-10 flex h-full flex-col px-8 pt-16 pb-10">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wide">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/20 backdrop-blur">🏃</span>
            RunBuddy
          </div>
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="grid h-40 w-40 place-items-center rounded-[2.5rem] bg-white/15 text-8xl backdrop-blur-xl shadow-float">
              {s.emoji}
            </div>
            <div className="mt-8 flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur">
              <Icon className="h-3.5 w-3.5" /> Step {i + 1} of {slides.length}
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight">{s.title}</h1>
            <p className="mt-3 max-w-xs text-base opacity-90">{s.desc}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-white" : "w-2 bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-3 bg-background px-6 pt-6 pb-8">
        <button
          onClick={next}
          className="grad-primary shadow-float flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
        >
          {i === slides.length - 1 ? "Get Started" : "Next"}
          <ChevronRight className="h-5 w-5" />
        </button>
        <Link
          to="/auth"
          className="block w-full rounded-2xl py-3 text-center text-sm font-medium text-muted-foreground"
        >
          Skip
        </Link>
      </div>
    </div>
  );
}
