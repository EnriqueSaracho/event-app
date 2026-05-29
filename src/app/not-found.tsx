import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-6xl font-semibold text-primary/20">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-foreground">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        The page you are looking for does not exist or may have moved.
      </p>
      <Link href="/" className="mt-8">
        <Button variant="accent">Go to home</Button>
      </Link>
    </div>
  );
}
