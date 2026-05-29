"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Content queue", exact: true },
  { href: "/admin/content/1", label: "Edit content", exact: false },
] as const;

export function AdminMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-foreground hover:bg-surface-muted"
          aria-label="Open admin menu"
          aria-expanded={open}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span className="text-sm font-semibold text-primary">ConcreteBC Admin</span>
        <Link
          href="/"
          className="text-xs font-medium text-muted hover:text-primary"
        >
          Attendee
        </Link>
      </header>

      {open ? (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Admin navigation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-foreground/40"
            onClick={closeMenu}
            aria-label="Close menu"
          />
          <nav className="absolute left-0 top-0 flex h-full w-72 flex-col bg-surface shadow-lg">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <p className="font-semibold text-primary">Admin menu</p>
              <button
                type="button"
                onClick={closeMenu}
                className="rounded-md p-2 text-muted hover:bg-surface-muted"
                aria-label="Close menu"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="flex-1 space-y-1 p-3">
              {ADMIN_NAV_ITEMS.map(({ href, label, exact }) => {
                const active = exact
                  ? pathname === href
                  : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted hover:bg-surface-muted"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-border p-4">
              <Link
                href="/"
                onClick={closeMenu}
                className="text-sm font-medium text-muted hover:text-primary"
              >
                ← Attendee app
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
