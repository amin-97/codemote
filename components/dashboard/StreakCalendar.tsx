"use client";

import { useMemo, useState } from "react";

interface StreakCalendarProps {
  heatmap: Record<string, number>;
}

export function StreakCalendar({ heatmap }: StreakCalendarProps) {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  const { weeks, months } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 364);

    // Align to Sunday
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    const weeks: { date: Date; count: number; dateStr: string }[][] = [];
    const months: { label: string; col: number }[] = [];
    let currentWeek: { date: Date; count: number; dateStr: string }[] = [];
    let lastMonth = -1;

    const cursor = new Date(startDate);

    while (cursor <= today || currentWeek.length > 0) {
      const dateStr = cursor.toISOString().split("T")[0];
      const count = heatmap[dateStr] || 0;

      if (cursor.getDay() === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      if (cursor.getMonth() !== lastMonth && cursor <= today) {
        lastMonth = cursor.getMonth();
        months.push({
          label: cursor.toLocaleString("en", { month: "short" }),
          col: weeks.length,
        });
      }

      if (cursor <= today) {
        currentWeek.push({ date: new Date(cursor), count, dateStr });
      }

      cursor.setDate(cursor.getDate() + 1);
      if (cursor > today && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    return { weeks, months };
  }, [heatmap]);

  function getColor(count: number) {
    if (count === 0) return "bg-neutral-800/50";
    if (count === 1) return "bg-emerald-900/60";
    if (count <= 3) return "bg-emerald-700/60";
    if (count <= 5) return "bg-emerald-500/70";
    return "bg-emerald-400";
  }

  return (
    <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5">
      <h3 className="mb-4 text-sm font-medium text-neutral-300">Activity</h3>

      <div className="relative overflow-x-auto">
        {/* Month labels */}
        <div className="mb-1 flex">
          <div className="w-8" />
          <div className="flex">
            {months.map((m, i) => (
              <div
                key={i}
                className="text-xs text-neutral-500"
                style={{ position: "relative", left: `${m.col * 14}px` }}
              >
                {m.label}
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="flex gap-0.5">
          {/* Day labels */}
          <div className="flex w-6 flex-col gap-0.5 text-xs text-neutral-600">
            <div className="h-3" />
            <div className="flex h-3 items-center">M</div>
            <div className="h-3" />
            <div className="flex h-3 items-center">W</div>
            <div className="h-3" />
            <div className="flex h-3 items-center">F</div>
            <div className="h-3" />
          </div>

          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5">
              {week.map((day, di) => (
                <div
                  key={di}
                  className={`h-3 w-3 rounded-[2px] ${getColor(day.count)} cursor-default transition-colors`}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredDay({
                      date: day.dateStr,
                      count: day.count,
                      x: rect.left,
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => setHoveredDay(null)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {hoveredDay && (
          <div
            className="pointer-events-none fixed z-50 rounded-md bg-neutral-800 px-2.5 py-1.5 text-xs text-neutral-200 shadow-lg"
            style={{ left: hoveredDay.x - 30, top: hoveredDay.y - 36 }}
          >
            <span className="font-medium">{hoveredDay.count} problems</span> on{" "}
            {hoveredDay.date}
          </div>
        )}

        {/* Legend */}
        <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-neutral-500">
          <span>Less</span>
          <div className="h-2.5 w-2.5unded-[2px] bg-neutral-800/50" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-900/60" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-700/60" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-500/70" />
          <div className="h-2.5 w-2.5 rounded-[2px] bg-emerald-400" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
