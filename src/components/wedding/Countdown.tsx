import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { invitation } from "@/config/invitation";
import { Reveal } from "./Reveal";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

function calculateTimeLeft(): TimeLeft {
  const target = new Date("2026-02-10T17:00:00+05:30").getTime();
  const now = Date.now();
  // If target in 2026 has passed in runtime clock, target next 10th February so countdown stays active
  const effectiveTarget = target > now ? target : new Date("2027-02-10T17:00:00+05:30").getTime();
  const diff = effectiveTarget - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    done: false,
  };
}

const UNITS = [
  { key: "days" as const, label: "Days", hindi: "दिन" },
  { key: "hours" as const, label: "Hours", hindi: "घंटे" },
  { key: "minutes" as const, label: "Mins", hindi: "मिनट" },
  { key: "seconds" as const, label: "Secs", hindi: "सेकंड" },
];

export function Countdown() {
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setLeft(calculateTimeLeft());
    const id = setInterval(() => setLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative px-5 py-16 bg-parchment">
      <Reveal className="mx-auto max-w-lg text-center">
        <p className="font-hindi text-base tracking-[0.2em] text-gold">
          ॥ उल्टी गिनती ॥
        </p>
        <h2 className="mt-1 font-display text-2xl tracking-[0.25em] text-pine uppercase sm:text-3xl">
          {left?.done ? "Today is the Auspicious Day" : "Counting down to the celebrations"}
        </h2>
        <div className="mx-auto mt-4 w-28 gold-rule" />

        <div className="mt-8 grid grid-cols-4 gap-2 sm:gap-4">
          {UNITS.map(({ key, label, hindi }) => (
            <div
              key={key}
              className="relative overflow-hidden rounded-t-[2.2rem] border border-gold/45 bg-parchment-deep/70 px-1 py-5 shadow-[0_10px_30px_-22px_var(--color-ink)]"
            >
              <div className="pointer-events-none absolute inset-x-2 top-2 h-8 rounded-t-[1.8rem] border border-gold/25" />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={`${key}-${left?.[key] ?? "-"}`}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-display text-3xl tabular-nums text-pine sm:text-4xl"
                >
                  {left ? String(left[key]).padStart(2, "0") : "--"}
                </motion.span>
              </AnimatePresence>
              <span className="mt-1 block text-[0.6rem] tracking-[0.2em] text-ink/75 font-semibold uppercase">
                {label}
              </span>
              <span className="block font-hindi text-[0.65rem] text-gold">
                {hindi}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 font-display text-base italic text-ink/70">
          6th to 10th February • Gurgaon, Haryana
        </p>
      </Reveal>
    </section>
  );
}
