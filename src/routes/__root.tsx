import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { PhoneShell } from "@/components/mobile/PhoneShell";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <PhoneShell>
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="grad-primary shadow-float grid h-20 w-20 place-items-center rounded-3xl text-4xl">🏃</div>
        <h1 className="text-3xl font-bold">Off the trail</h1>
        <p className="text-sm text-muted-foreground">We couldn't find that page. Let's head back to base camp.</p>
        <Link to="/home" className="grad-primary rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-float">
          Back to Home
        </Link>
      </div>
    </PhoneShell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <PhoneShell>
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="grad-sunset shadow-float grid h-20 w-20 place-items-center rounded-3xl text-4xl">⚠️</div>
        <h1 className="text-2xl font-bold">Something tripped us up</h1>
        <p className="text-sm text-muted-foreground">Give it another shot in a moment.</p>
        <div className="flex gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="grad-primary rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground shadow-float"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-border px-6 py-3 text-sm font-semibold">Home</a>
        </div>
      </div>
    </PhoneShell>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#4CAF50" },
      { title: "RunBuddy — Find your running crew" },
      { name: "description", content: "RunBuddy is the social running app to find nearby partners, join runs, track your pace, and level up your fitness." },
      { name: "author", content: "RunBuddy" },
      { property: "og:title", content: "RunBuddy — Find your running crew" },
      { property: "og:description", content: "Find nearby runs, join a crew, track every kilometer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sora:wght@500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <PhoneShell>
        <Outlet />
      </PhoneShell>
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
