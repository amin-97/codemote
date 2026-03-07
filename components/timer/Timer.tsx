"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, X, Volume2 } from "lucide-react";

const PRESETS = [
  { label: "15m", seconds: 15 * 60 },
  { label: "30m", seconds: 30 * 60 },
  { label: "45m", seconds: 45 * 60 },
  { label: "1h", seconds: 60 * 60 },
  { label: "1.5h", seconds: 90 * 60 },
  { label: "2h", seconds: 120 * 60 },
];

const YOUTUBE_VIDEO_ID = "s7wQYIs30Kw";

type TimerState = "idle" | "running" | "paused" | "finished";

export function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [state, setState] = useState<TimerState>("idle");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Tick
  useEffect(() => {
    if (state === "running" && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearTimer();
            setState("finished");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return clearTimer;
  }, [state, remaining, clearTimer]);

  function start() {
    const total = hours * 3600 + minutes * 60 + seconds;
    if (total === 0) return;
    setTotalSeconds(total);
    setRemaining(total);
    setState("running");
  }

  function resume() {
    setState("running");
  }

  function pause() {
    clearTimer();
    setState("paused");
  }

  function reset() {
    clearTimer();
    setState("idle");
    setRemaining(0);
    setTotalSeconds(0);
  }

  function applyPreset(secs: number) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  }

  function dismissAlarm() {
    reset();
  }

  // Format time display
  function formatTime(totalSecs: number) {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    if (h > 0) {
      return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  // Progress for circular ring
  const progress = totalSeconds > 0 ? remaining / totalSeconds : 0;
  const circumference = 2 * Math.PI * 140;
  const dashOffset = circumference * (1 - progress);

  // Scroll wheel handler for inputs
  function handleWheel(
    e: React.WheelEvent,
    value: number,
    setter: (v: number) => void,
    max: number,
  ) {
    e.preventDefault();
    if (state !== "idle") return;
    const delta = e.deltaY < 0 ? 1 : -1;
    const next = value + delta;
    if (next >= 0 && next <= max) setter(next);
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md">
      {/* Finished — YouTube alarm */}
      {state === "finished" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl mx-4 rounded-2xl border border-neutral-700 bg-neutral-900 p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400">
                <Volume2 className="h-5 w-5 animate-pulse" />
                <span className="text-sm font-semibold">Time&apos;s Up!</span>
              </div>
              <button
                onClick={dismissAlarm}
                className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&start=0`}
                title="Timer Alarm"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              />
            </div>

            <button
              onClick={dismissAlarm}
              className="mt-4 w-full rounded-lg bg-neutral-100 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-white"
            >
              Dismiss & Reset
            </button>
          </div>
        </div>
      )}

      {/* Timer display */}
      {state !== "idle" ? (
        <>
          {/* Circular timer */}
          <div className="relative flex items-center justify-center">
            <svg width="320" height="320" className="-rotate-90">
              {/* Background ring */}
              <circle
                cx="160"
                cy="160"
                r="140"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-neutral-800/50"
              />
              {/* Progress ring */}
              <circle
                cx="160"
                cy="160"
                r="140"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className={
                  remaining <= 60 && remaining > 0
                    ? "text-red-400 transition-all duration-1000"
                    : remaining <= totalSeconds * 0.25
                      ? "text-amber-400 transition-all duration-1000"
                      : "text-emerald-400 transition-all duration-1000"
                }
              />
            </svg>

            {/* Time text */}
            <div className="absolute flex flex-col items-center">
              <span className="font-mono text-5xl font-bold tracking-wider text-neutral-100">
                {formatTime(remaining)}
              </span>
              <span className="mt-1 text-xs text-neutral-500">
                {state === "paused" ? "paused" : "remaining"}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {state === "running" ? (
              <button
                onClick={pause}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800/50 text-neutral-300 transition-colors hover:bg-neutral-700"
              >
                <Pause className="h-6 w-6" />
              </button>
            ) : (
              <button
                onClick={resume}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 transition-colors hover:bg-emerald-500/25"
              >
                <Play className="h-6 w-6 ml-0.5" />
              </button>
            )}
            <button
              onClick={reset}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800/50 text-neutral-400 transition-colors hover:bg-neutral-700 hover:text-neutral-200"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Time setter */}
          <div className="flex items-center gap-2">
            {/* Hours */}
            <div className="flex flex-col items-center">
              <label className="mb-2 text-[10px] font-medium uppercase tracking-widest text-neutral-600">
                Hours
              </label>
              <div
                onWheel={(e) => handleWheel(e, hours, setHours, 2)}
                className="relative"
              >
                <input
                  type="number"
                  min={0}
                  max={2}
                  value={hours}
                  onChange={(e) => {
                    const v = parseInt(e.target.value) || 0;
                    setHours(Math.min(2, Math.max(0, v)));
                  }}
                  className="h-24 w-24 rounded-xl border border-neutral-700 bg-neutral-800/50 text-center font-mono text-4xl font-bold text-neutral-100 outline-none focus:border-neutral-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            <span className="mt-6 text-3xl font-bold text-neutral-600">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <label className="mb-2 text-[10px] font-medium uppercase tracking-widest text-neutral-600">
                Min
              </label>
              <div
                onWheel={(e) => handleWheel(e, minutes, setMinutes, 59)}
                className="relative"
              >
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={minutes}
                  onChange={(e) => {
                    const v = parseInt(e.target.value) || 0;
                    setMinutes(Math.min(59, Math.max(0, v)));
                  }}
                  className="h-24 w-24 rounded-xl border border-neutral-700 bg-neutral-800/50 text-center font-mono text-4xl font-bold text-neutral-100 outline-none focus:border-neutral-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>

            <span className="mt-6 text-3xl font-bold text-neutral-600">:</span>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <label className="mb-2 text-[10px] font-medium uppercase tracking-widest text-neutral-600">
                Sec
              </label>
              <div
                onWheel={(e) => handleWheel(e, seconds, setSeconds, 59)}
                className="relative"
              >
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={seconds}
                  onChange={(e) => {
                    const v = parseInt(e.target.value) || 0;
                    setSeconds(Math.min(59, Math.max(0, v)));
                  }}
                  className="h-24 w-24 rounded-xl border border-neutral-700 bg-neutral-800/50 text-center font-mono text-4xl font-bold text-neutral-100 outline-none focus:border-neutral-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap justify-center gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p.seconds)}
                className="rounded-lg border border-neutral-700/50 bg-neutral-800/30 px-4 py-2 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Start button */}
          <button
            onClick={start}
            disabled={hours === 0 && minutes === 0 && seconds === 0}
            className="flex items-center gap-2 rounded-xl bg-emerald-500/15 px-8 py-3 text-sm font-semibold text-emerald-400 transition-colors hover:bg-emerald-500/25 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Play className="h-4 w-4 ml-0.5" />
            Start Timer
          </button>

          {/* Hint */}
          <p className="text-xs text-neutral-600">
            Scroll on the inputs to adjust &middot; Max 2 hours
          </p>
        </>
      )}
    </div>
  );
}
