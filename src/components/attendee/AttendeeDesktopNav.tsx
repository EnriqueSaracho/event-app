"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ATTENDEE_NAV_ITEMS,
  isNavActive,
  NavIcon,
} from "@/components/attendee/nav-items";

export function AttendeeDesktopNav() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden w-[var(--sidebar-width)] shrink-0 flex-col border-r border-border bg-surface lg:flex"
      aria-label="Main navigation"
    >
      <div className="border-b border-border px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          ConcreteBC
        </p>
        <p className="mt-1 text-sm font-semibold text-primary">Events</p>
      </div>
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {ATTENDEE_NAV_ITEMS.map(({ href, label, icon }) => {
            const active = isNavActive(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:bg-surface-muted hover:text-foreground"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <NavIcon name={icon} active={active} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
