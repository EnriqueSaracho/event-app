import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-2xl font-semibold text-primary">Page not found</h1>
      <p className="mt-2 text-sm text-muted">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 text-sm font-medium text-accent hover:underline"
      >
        Go to home
      </Link>
    </div>
  );
}
