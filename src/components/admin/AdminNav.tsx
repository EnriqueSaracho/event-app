"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/admin" className="text-lg font-semibold text-primary">
          ConcreteBC Admin
        </Link>
        <nav className="flex items-center gap-4" aria-label="Admin navigation">
          <Link
            href="/admin"
            className={`text-sm font-medium ${
              pathname === "/admin"
                ? "text-primary"
                : "text-muted hover:text-foreground"
            }`}
          >
            Content
          </Link>
          <Link
            href="/admin/content/1"
            className={`text-sm font-medium ${
              pathname.startsWith("/admin/content")
                ? "text-primary"
                : "text-muted hover:text-foreground"
            }`}
          >
            Edit
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted hover:text-foreground"
          >
            Attendee app
          </Link>
        </nav>
      </div>
    </header>
  );
}
