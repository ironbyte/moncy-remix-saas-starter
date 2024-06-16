import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import "./tailwind.css";
import "./font.css";

import { json, type LoaderFunctionArgs } from "@remix-run/node";

import { Button } from "~/components/ui/button";
import DefaultErrorBoundary from "~/components/ui/error-boundary";

export function loader({ request }: LoaderFunctionArgs) {
  const user = {};

  return json({
    user,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = "dark";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body
        className={`${theme} min-h-screen overflow-x-hidden bg-background text-foreground antialiased`}
      >
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="container border-b bg-slate-500 py-6">
        <nav className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8">
          <span>LOGO</span>
          <div className="flex items-center gap-10">
            <Button asChild>
              <Link to="/sign-in">Sign in</Link>
            </Button>
          </div>
        </nav>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="container flex justify-between border-t bg-slate-500 pb-5">
        <span>FOOTER</span>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return <DefaultErrorBoundary />;
}
