import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, MessageCircle, Share2, Search, UserPlus } from "lucide-react";
import { groups } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/community")({
  component: Community,
  head: () => ({ meta: [{ title: "Community · RunBuddy" }] }),
});

const posts = [
  { name: "Kenji Watanabe", handle: "@kenji.runs", time: "2h", avatar: "KW", txt: "Nailed a sub-40 10k this morning 🎉 The sunrise on the East River was unreal.", cover: "linear-gradient(135deg,#FF9F1C,#FF6B35)", likes: 128, comments: 24 },
  { name: "Sofia Martinez", handle: "@sofia.runs", time: "4h", avatar: "SM", txt: "Anyone up for an easy trail run this weekend? Bear Mountain calling 🌲", likes: 42, comments: 12 },
  { name: "Marco Silva", handle: "@marco.pace", time: "8h", avatar: "MS", txt: "New PR on the Brooklyn Bridge loop! Consistency > intensity.", cover: "linear-gradient(135deg,#4CAF50,#2E7D32)", likes: 89, comments: 8 },
];

function Community() {
  const [tab, setTab] = useState<"feed" | "groups" | "runners">("feed");
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background pb-6">
      <div className="sticky top-0 z-30 bg-background/90 px-5 pt-12 pb-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link to="/home" className="grid h-10 w-10 place-items-center rounded-2xl bg-surface"><ArrowLeft className="h-5 w-5" /></Link>
          <h1 className="text-xl font-bold">Community</h1>
          <button className="ml-auto grid h-10 w-10 place-items-center rounded-2xl bg-surface"><Search className="h-4 w-4" /></button>
        </div>
        <div className="mt-4 flex rounded-2xl bg-surface p-1">
          {(["feed", "groups", "runners"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-xl py-2 text-xs font-semibold capitalize ${tab === t ? "bg-card shadow-card" : "text-muted-foreground"}`}
            >{t}</button>
          ))}
        </div>
      </div>

      {tab === "feed" && (
        <div className="space-y-4 px-5 pt-4">
          {posts.map((p, i) => (
            <div key={i} className="overflow-hidden rounded-3xl bg-card shadow-card">
              <div className="flex items-center gap-3 p-4">
                <div className="grad-primary grid h-11 w-11 place-items-center rounded-full text-sm font-bold text-primary-foreground">{p.avatar}</div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground">{p.handle} · {p.time}</p>
                </div>
                <button className="rounded-full bg-primary-soft px-3 py-1 text-[11px] font-bold text-primary">Follow</button>
              </div>
              <p className="px-4 pb-3 text-sm">{p.txt}</p>
              {p.cover && <div className="h-48" style={{ background: p.cover }} />}
              <div className="flex items-center gap-6 p-4 text-xs">
                <button className="flex items-center gap-1.5 text-muted-foreground"><Heart className="h-4 w-4" /> {p.likes}</button>
                <button className="flex items-center gap-1.5 text-muted-foreground"><MessageCircle className="h-4 w-4" /> {p.comments}</button>
                <button className="flex items-center gap-1.5 text-muted-foreground"><Share2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "groups" && (
        <div className="grid grid-cols-2 gap-3 px-5 pt-4">
          {groups.map((g) => (
            <div key={g.id} className="overflow-hidden rounded-3xl bg-card shadow-card">
              <div className="grid h-28 place-items-center text-5xl" style={{ background: g.cover }}>{g.emoji}</div>
              <div className="p-3">
                <p className="line-clamp-1 text-sm font-bold">{g.name}</p>
                <p className="text-[10px] text-muted-foreground">{g.members.toLocaleString()} members</p>
                <button className="mt-2 w-full rounded-full grad-primary py-1.5 text-[11px] font-bold text-primary-foreground">Join</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "runners" && (
        <div className="space-y-3 px-5 pt-4">
          {[
            { name: "Kenji Watanabe", meta: "Sub-3 marathoner · Tokyo", avatar: "KW" },
            { name: "Sofia Martinez", meta: "Trail runner · Madrid", avatar: "SM" },
            { name: "Marco Silva", meta: "Pace group leader · NYC", avatar: "MS" },
            { name: "Priya Shah", meta: "Ultra runner · London", avatar: "PS" },
            { name: "Leo Park", meta: "Beginner coach · Seoul", avatar: "LP" },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-card">
              <div className="grad-primary grid h-11 w-11 place-items-center rounded-full text-sm font-bold text-primary-foreground">{r.avatar}</div>
              <div className="flex-1">
                <p className="text-sm font-bold">{r.name}</p>
                <p className="text-[11px] text-muted-foreground">{r.meta}</p>
              </div>
              <button className="flex items-center gap-1 rounded-full grad-primary px-3 py-1.5 text-[11px] font-bold text-primary-foreground">
                <UserPlus className="h-3 w-3" /> Follow
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
