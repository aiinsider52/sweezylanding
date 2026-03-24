import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-dark-900 px-6 text-center text-white">
      <p className="text-sm font-semibold text-accent-green">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-base text-white/55">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Link
          href="/"
          className="rounded-xl bg-accent-green px-5 py-3 text-sm font-semibold text-dark-950 transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          href="/support"
          className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          Support
        </Link>
      </div>
    </main>
  );
}
