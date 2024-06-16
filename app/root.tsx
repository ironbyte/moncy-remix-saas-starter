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

import { DefaultErrorBoundary } from "./components/error-boundary";

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
      <header className="h-14 border-b">
        <div className="container flex h-full items-center px-4 lg:px-6">
          <Link className="flex items-center justify-center" to="/">
            <span className="sr-only">Kyros Labs</span>
            <span className="font-black">Kyros Labs</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              className="font-medium underline-offset-4 hover:underline"
              to="/features"
            >
              Features
            </Link>
            <Link
              className="font-medium underline-offset-4 hover:underline"
              to="/pricing"
            >
              Pricing
            </Link>
            <Link
              className="font-medium underline-offset-4 hover:underline"
              to="/contact"
            >
              Contact
            </Link>
            <Link
              className="font-medium underline-offset-4 hover:underline"
              to="/sign-in"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
      <footer className="border-t">
        <div className="container flex w-full shrink-0 flex-col items-center gap-2 px-4 py-6 sm:flex-row md:px-6">
          <p className="text-sm text-gray-500 dark:text-gray-200">
            © 2024 Kyros Labs. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:ml-auto sm:gap-6">
            <Link className="text-sm underline-offset-4 hover:underline" to="#">
              Pricing
            </Link>
            <Link className="text-sm underline-offset-4 hover:underline" to="#">
              Docs
            </Link>
            <Link className="text-sm underline-offset-4 hover:underline" to="#">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export function ErrorBoundary() {
  return <DefaultErrorBoundary />;
}
