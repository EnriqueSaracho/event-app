"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Content queue", exact: true },
  { href: "/admin/content/1", label: "Edit content", exact: false },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface lg:flex"
      aria-label="Admin navigation"
    >
      <div className="border-b border-border px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Admin
        </p>
        <p className="mt-1 text-sm font-semibold text-primary">
          ConcreteBC CMS
        </p>
      </div>
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {ADMIN_NAV_ITEMS.map(({ href, label, exact }) => {
            const active = exact
              ? pathname === href
              : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:bg-surface-muted hover:text-foreground"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-border px-5 py-4">
        <Link
          href="/"
          className="text-sm font-medium text-muted hover:text-primary"
        >
          ← Attendee app
        </Link>
      </div>
    </aside>
  );
}
