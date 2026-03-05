import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-4">
      <div className="noise pointer-events-none fixed inset-0 opacity-[0.03]" />

      <div className="relative z-10 flex max-w-lg flex-col items-center text-center">
        <div className="mb-6 flex items-center gap-3">
          <svg
            width="40"
            height="40"
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
          <span className="text-2xl font-bold tracking-tight text-neutral-100">
            Code<span className="text-neutral-500">mote</span>
          </span>
        </div>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-neutral-100 sm:text-5xl">
          Track your grind.
        </h1>
        <p className="mb-8 max-w-md text-lg text-neutral-400">
          Log every LeetCode problem. Visualize your streaks. Get AI-powered
          recommendations on what to study next.
        </p>

        <div className="flex gap-3">
          <SignInButton mode="modal">
            <button className="rounded-lg bg-neutral-100 px-6 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-white">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="rounded-lg border border-neutral-700 bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-neutral-300 transition-colors hover:border-neutral-600 hover:text-neutral-100">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
