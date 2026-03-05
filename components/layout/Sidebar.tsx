"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ListChecks,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Questions",
    href: "/questions",
    icon: ListChecks,
  },
  {
    label: "Daily Review",
    href: "/daily-review",
    icon: CalendarDays,
  },
  {
    label: "AI Recommend",
    href: "/ai-recommend",
    icon: Sparkles,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 flex-col border-r border-neutral-800/60 bg-neutral-950">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2.5 border-b border-neutral-800/60 px-5">
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="32"
            height="32"
            rx="7"
            fill="#171717"
            stroke="#262626"
            strokeWidth="1"
          />
          <path
            d="M11 10L6.5 16L11 22"
            stroke="#A3A3A3"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 10L25.5 16L21 22"
            stroke="#A3A3A3"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 16.5L15.2 18.7L19.5 13.5"
            stroke="#E5E5E5"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-base font-bold tracking-tight text-neutral-100">
          Code<span className="text-neutral-500">mote</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-neutral-800/70 text-neutral-100"
                  : "text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-neutral-800/60 px-5 py-3">
        <p className="text-xs text-neutral-600">LeetCode Tracker</p>
      </div>
    </aside>
  );
}
