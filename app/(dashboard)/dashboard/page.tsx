"use client";

import { useEffect, useState } from "react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { StreakCalendar } from "@/components/dashboard/StreakCalendar";
import { TopicProgress } from "@/components/dashboard/TopicProgress";
import { DifficultyChart } from "@/components/dashboard/DifficultyChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import type { Stats, Question } from "@/types";

export default function DashboardPage() {
  const [stats, setStats] = useState<
    (Stats & { heatmap: Record<string, number> }) | null
  >(null);
  const [recent, setRecent] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [statsRes, recentRes] = await Promise.all([
          fetch("/api/stats"),
          fetch("/api/questions?limit=10"),
        ]);
        const statsData = await statsRes.json();
        const recentData = await recentRes.json();
        setStats(statsData);
        setRecent(recentData);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-xl bg-neutral-900"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="h-64 animate-pulse rounded-xl bg-neutral-900 lg:col-span-2" />
          <div className="h-64 animate-pulse rounded-xl bg-neutral-900" />
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StreakCalendar heatmap={stats.heatmap} />
        </div>
        <DifficultyChart
          easy={stats.easy_count}
          medium={stats.medium_count}
          hard={stats.hard_count}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TopicProgress topics={stats.topics} />
        </div>
        <RecentActivity questions={recent} />
      </div>
    </div>
  );
}
