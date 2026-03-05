"use client";

import { Trophy, Flame, Target, RotateCcw } from "lucide-react";
import type { Stats } from "@/types";

interface StatsCardsProps {
  stats: Stats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      label: "Total Solved",
      value: stats.total_solved,
      sub: `solved`,
      icon: Target,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      label: "Current Streak",
      value: stats.current_streak,
      sub: `days`,
      icon: Flame,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      label: "Longest Streak",
      value: stats.longest_streak,
      sub: `days`,
      icon: Trophy,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Need Revisit",
      value: stats.total_revisit,
      sub: `problems`,
      icon: RotateCcw,
      color: "text-sky-400",
      bg: "bg-sky-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-neutral-400">{card.label}</p>
            <div className={`rounded-lg p-2 ${card.bg}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-100">
              {card.value}
            </span>
            <span className="text-sm text-neutral-500">{card.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
