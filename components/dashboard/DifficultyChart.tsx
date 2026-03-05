"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DifficultyChartProps {
  easy: number;
  medium: number;
  hard: number;
}

const COLORS = {
  easy: "#34d399",
  medium: "#fbbf24",
  hard: "#f87171",
};

export function DifficultyChart({ easy, medium, hard }: DifficultyChartProps) {
  const total = easy + medium + hard;
  const data = [
    { name: "Easy", value: easy, color: COLORS.easy },
    { name: "Medium", value: medium, color: COLORS.medium },
    { name: "Hard", value: hard, color: COLORS.hard },
  ].filter((d) => d.value > 0);

  return (
    <div className="rounded-xl border border-neutral-800/60 bg-neutral-900/50 p-5">
      <h3 className="mb-4 text-sm font-medium text-neutral-300">
        Difficulty Split
      </h3>

      {total === 0 ? (
        <div className="flex h-48 items-center justify-center text-sm text-neutral-600">
          No questions logged yet
        </div>
      ) : (
        <>
          <div className="relative mx-auto h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} opacity={0.85} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-neutral-100">
                {total}
              </span>
              <span className="text-xs text-neutral-500">total</span>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-5">
            {[
              { label: "Easy", value: easy, color: "bg-emerald-400" },
              { label: "Medium", value: medium, color: "bg-amber-400" },
              { label: "Hard", value: hard, color: "bg-red-400" },
            ].map((d) => (
              <div key={d.label} className="flex items-center gap-1.5 text-xs">
                <div className={`h-2 w-2 rounded-full ${d.color}`} />
                <span className="text-neutral-400">{d.label}</span>
                <span className="font-mono text-neutral-500">{d.value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
