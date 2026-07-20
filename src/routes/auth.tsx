import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <div className="grad-hero relative overflow-hidden px-6 pt-14 pb-16 text-primary-foreground">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <Link to="/" className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-3xl font-bold">{mode === "login" ? "Welcome back" : "Join RunBuddy"}</h1>
        <p className="mt-2 text-sm opacity-90">
          {mode === "login" ? "Lace up. Your crew is waiting." : "Create your account and find your pace."}
        </p>
      </div>

      <div className="-mt-8 flex-1 rounded-t-[2rem] bg-background px-6 pt-8 pb-6">
        <div className="mb-6 flex rounded-2xl bg-surface p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                mode === m ? "bg-card shadow-card text-foreground" : "text-muted-foreground"
              }`}
            >
              {m === "login" ? "Log in" : "Sign up"}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); navigate({ to: "/home" }); }}
          className="space-y-3"
        >
          {mode === "signup" && (
            <Field label="Full name" placeholder="Alex Rivera" />
          )}
          <Field label="Email" placeholder="you@example.com" icon={<Mail className="h-4 w-4" />} type="email" />
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Password</label>
            <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 focus-within:border-primary">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <input
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="text-muted-foreground">
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {mode === "login" && (
            <div className="flex justify-end pt-1">
              <button type="button" className="text-xs font-semibold text-primary">Forgot password?</button>
            </div>
          )}

          <button
            type="submit"
            className="grad-primary shadow-float mt-2 w-full rounded-2xl py-4 text-base font-semibold text-primary-foreground active:scale-[0.98]"
          >
            {mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          or continue with
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SocialBtn label="Google" glyph="G" onClick={() => navigate({ to: "/home" })} />
          <SocialBtn label="Apple" glyph="" onClick={() => navigate({ to: "/home" })} />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to RunBuddy's Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
}

function Field({ label, placeholder, icon, type = "text" }: { label: string; placeholder: string; icon?: React.ReactNode; type?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3.5 focus-within:border-primary">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
        />
      </div>
    </div>
  );
}

function SocialBtn({ label, glyph, onClick }: { label: string; glyph: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3.5 text-sm font-semibold shadow-card active:scale-[0.98]"
    >
      <span className="text-lg font-bold">{glyph}</span>
      {label}
    </button>
  );
}
