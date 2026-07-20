import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, Share2, Edit3, Trophy, MapPin, Zap, Moon, Bell, Shield, Globe, HelpCircle, LogOut, ChevronRight, Ruler } from "lucide-react";
import { AppFrame } from "@/components/mobile/AppFrame";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({ meta: [{ title: "Profile · RunBuddy" }] }),
});

function Profile() {
  const [dark, setDark] = useState(false);
  const [units, setUnits] = useState<"km" | "mi">("km");

  return (
    <AppFrame>
      <div className="grad-hero relative overflow-hidden pt-12 pb-24 text-primary-foreground">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center justify-between px-5">
          <h1 className="text-lg font-bold">Profile</h1>
          <div className="flex gap-2">
            <button className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 backdrop-blur"><Share2 className="h-4 w-4" /></button>
            <button className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 backdrop-blur"><Settings className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="relative mt-6 flex flex-col items-center">
          <div className="relative">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-white/25 text-3xl font-bold backdrop-blur shadow-float">AR</div>
            <button className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full grad-accent text-accent-foreground shadow-card">
              <Edit3 className="h-3.5 w-3.5" />
            </button>
          </div>
          <h2 className="mt-3 text-xl font-bold">Alex Rivera</h2>
          <p className="text-xs opacity-90">Weekend warrior · Brooklyn, NY</p>
          <p className="mt-2 max-w-[280px] text-center text-xs opacity-80">"Chasing sunrises, one kilometer at a time 🌅"</p>
        </div>
      </div>

      <div className="-mt-16 px-5 pb-6">
        <div className="rounded-3xl bg-card p-4 shadow-card">
          <div className="grid grid-cols-3 divide-x divide-border">
            <Stat label="Runs" value="147" />
            <Stat label="Distance" value="1,284" sub="km" />
            <Stat label="Followers" value="892" />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <MiniStat icon={<Trophy className="h-4 w-4" />} label="Rank" value="#12" />
          <MiniStat icon={<Zap className="h-4 w-4" />} label="Avg pace" value="5:24" />
          <MiniStat icon={<MapPin className="h-4 w-4" />} label="Cities" value="8" />
        </div>

        <h3 className="mt-6 mb-3 text-base font-bold">Recent badges</h3>
        <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
          {["🔥", "🌅", "💯", "⛰️", "🏅", "⚡"].map((b, i) => (
            <div key={i} className="grid h-14 w-14 flex-none place-items-center rounded-2xl bg-card text-2xl shadow-card">{b}</div>
          ))}
        </div>

        <h3 className="mt-6 mb-3 text-base font-bold">Settings</h3>
        <div className="rounded-3xl bg-card shadow-card">
          <ToggleRow icon={<Moon className="h-4 w-4" />} label="Dark mode" active={dark} onToggle={() => {
            const newVal = !dark; setDark(newVal);
            document.documentElement.classList.toggle("dark", newVal);
          }} />
          <Divider />
          <SettingRow icon={<Bell className="h-4 w-4" />} label="Notifications" hint="On" />
          <Divider />
          <div className="flex items-center gap-3 p-4">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary"><Ruler className="h-4 w-4" /></span>
            <p className="flex-1 text-sm font-semibold">Units</p>
            <div className="flex rounded-xl bg-surface p-0.5">
              {(["km", "mi"] as const).map((u) => (
                <button key={u} onClick={() => setUnits(u)} className={`rounded-lg px-3 py-1 text-xs font-bold uppercase ${units === u ? "grad-primary text-primary-foreground" : "text-muted-foreground"}`}>{u}</button>
              ))}
            </div>
          </div>
          <Divider />
          <SettingRow icon={<Shield className="h-4 w-4" />} label="Privacy" />
          <Divider />
          <SettingRow icon={<Globe className="h-4 w-4" />} label="Language" hint="English" />
          <Divider />
          <SettingRow icon={<HelpCircle className="h-4 w-4" />} label="Help center" />
        </div>

        <Link to="/auth" className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 py-4 text-sm font-semibold text-destructive">
          <LogOut className="h-4 w-4" /> Log out
        </Link>
        <p className="mt-4 text-center text-[11px] text-muted-foreground">RunBuddy v1.0.0</p>
      </div>
    </AppFrame>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="text-center">
      <p className="text-xl font-bold">{value}<span className="text-xs font-medium text-muted-foreground"> {sub}</span></p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card p-3 shadow-card">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">{icon}</span>
      <p className="mt-2 text-base font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
function SettingRow({ icon, label, hint }: { icon: React.ReactNode; label: string; hint?: string }) {
  return (
    <button className="flex w-full items-center gap-3 p-4">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">{icon}</span>
      <p className="flex-1 text-left text-sm font-semibold">{label}</p>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
function ToggleRow({ icon, label, active, onToggle }: { icon: React.ReactNode; label: string; active: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center gap-3 p-4">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary">{icon}</span>
      <p className="flex-1 text-sm font-semibold">{label}</p>
      <button onClick={onToggle} className={`relative h-6 w-11 rounded-full transition-colors ${active ? "grad-primary" : "bg-muted"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${active ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}
function Divider() { return <div className="mx-4 border-t border-border" />; }
