import { type ReactNode } from "react";

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="phone-shell">
      <div className="phone-frame">{children}</div>
    </div>
  );
}
