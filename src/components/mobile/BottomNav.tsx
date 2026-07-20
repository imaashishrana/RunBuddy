import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Compass, Plus, Activity, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/explore", icon: Compass, label: "Explore" },
  { to: "/create", icon: Plus, label: "Create", primary: true },
  { to: "/activity", icon: Activity, label: "Activity" },
  { to: "/profile", icon: User, label: "Profile" },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 border-t border-border/60 bg-card/90 backdrop-blur-xl">
      <div className="mx-auto grid max-w-[440px] grid-cols-5 items-end px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {items.map(({ to, icon: Icon, label, primary }) => {
          const active = pathname === to;
          if (primary) {
            return (
              <Link key={to} to={to} className="flex flex-col items-center justify-end">
                <span className="grad-primary shadow-float -mt-6 grid h-14 w-14 place-items-center rounded-2xl text-primary-foreground transition-transform active:scale-95">
                  <Icon className="h-6 w-6" strokeWidth={2.5} />
                </span>
                <span className="mt-1 text-[10px] font-medium text-muted-foreground">{label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 transition-colors",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className={cn("h-5 w-5 transition-transform", active && "scale-110")} strokeWidth={active ? 2.6 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
