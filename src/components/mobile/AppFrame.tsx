import { type ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function AppFrame({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <main className="flex-1 pb-4">{children}</main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
