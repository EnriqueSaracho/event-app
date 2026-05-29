"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ATTENDEE_NAV_ITEMS,
  isNavActive,
  NavIcon,
} from "@/components/attendee/nav-items";

export function AttendeeMobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface lg:hidden"
      aria-label="Main navigation"
    >
      <ul className="flex items-stretch justify-around px-1 py-1">
        {ATTENDEE_NAV_ITEMS.map(({ href, label, icon }) => {
          const active = isNavActive(pathname, href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={`flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-md px-1 py-1 text-xs font-medium transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted hover:text-foreground"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <NavIcon name={icon} active={active} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
