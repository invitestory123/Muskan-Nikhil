import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, Sparkles } from "lucide-react";

interface TheRitualDiyaProps {
  onLit?: () => void;
}

export function TheRitualDiya({ onLit }: TheRitualDiyaProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isLit, setIsLit] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Play gentle sound using Web Audio API synthesized warm chime
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(528, ctx.currentTime); // Love/miracle tone 528Hz
      osc.frequency.exponentialRampToValueAtTime(792, ctx.currentTime + 1.2);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.5);
    } catch {
      // AudioContext muted/unsupported - silent fallback
    }
  };

  const startHold = () => {
    if (isLit) return;
    setIsHolding(true);
  };

  const endHold = () => {
    if (isLit) return;
    setIsHolding(false);
    setProgress(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (isHolding && !isLit) {
      const step = 2; // progress speed
      timerRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsLit(true);
            playChime();
            if (onLit) onLit();
            return 100;
          }
          return prev + step;
        });
      }, 30);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHolding, isLit, onLit]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#6b1411] via-[#851c14] to-[#4e0c0a] px-6 py-20 text-center text-[#faf6ef]">
      {/* Background Decorative Circles */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
        <div className="size-[540px] rounded-full border border-amber-300/40" />
        <div className="absolute size-[420px] rounded-full border border-dashed border-amber-300/30 animate-[spin_60s_linear_infinite]" />
        <div className="absolute size-[300px] rounded-full border border-amber-300/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-md">
        {/* Hindi & English Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-hindi text-base tracking-[0.2em] text-amber-200"
        >
          ॥ पवित्र दीप प्रज्वलन ॥
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-2 font-display text-2xl tracking-[0.35em] text-amber-100 uppercase"
        >
          The Ritual
        </motion.h2>

        <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />

        {/* Interactive Diya Container */}
        <div className="relative my-12 flex flex-col items-center justify-center">
          {/* Concentric Glow Disc */}
          <div
            className={`relative flex size-64 items-center justify-center rounded-full transition-all duration-700 ${
              isLit
                ? "bg-gradient-to-br from-amber-500/30 via-orange-600/20 to-transparent shadow-[0_0_80px_rgba(245,158,11,0.5)] ring-2 ring-amber-300/60"
                : "bg-black/20 ring-1 ring-amber-400/25 shadow-inner"
            }`}
          >
            {/* SVG Progress Ring */}
            <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="transparent"
                stroke="rgba(245,158,11,0.15)"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="transparent"
                stroke="#fcd34d"
                strokeWidth="3"
                strokeDasharray="289"
                strokeDashoffset={289 - (289 * progress) / 100}
                strokeLinecap="round"
                className="transition-all duration-75"
              />
            </svg>

            {/* Diya Graphic & Touch Button */}
            <button
              type="button"
              onMouseDown={startHold}
              onMouseUp={endHold}
              onMouseLeave={endHold}
              onTouchStart={startHold}
              onTouchEnd={endHold}
              className="group relative flex size-44 cursor-pointer flex-col items-center justify-center select-none active:scale-95 transition-transform"
              aria-label="Press and hold the wick to light the diya"
            >
              {/* Flame (Revealed when holding or lit) */}
              <AnimatePresence>
                {(isHolding || isLit) && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0, y: 15 }}
                    animate={{
                      scale: isLit ? [1, 1.15, 0.98, 1.1] : [0.5, 0.8, 0.6],
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 0.9,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-3 left-[50%] -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none"
                  >
                    <div className="relative size-12">
                      <div className="absolute inset-0 rounded-full bg-amber-400 blur-md opacity-80" />
                      <div className="absolute inset-2 rounded-full bg-yellow-200 blur-sm" />
                      <div className="absolute inset-x-3 bottom-0 top-1 rounded-t-full bg-white" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Diya Lamp Image */}
              <div className="relative z-20 overflow-hidden rounded-full p-2 border border-amber-300/30 bg-[#420a08]/80 shadow-2xl">
                <img
                  src="/images/traditional-diya.jpg"
                  alt="Auspicious Wedding Diya"
                  className="size-36 rounded-full object-cover object-center filter saturate-110"
                />
                {/* Golden Overlay Ring */}
                <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-amber-300/40" />
              </div>

              {/* Sparkle effects on light */}
              {isLit && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                >
                  <Sparkles className="absolute -top-2 -right-2 size-6 text-amber-300 animate-bounce" />
                  <Sparkles className="absolute -bottom-2 -left-2 size-5 text-amber-200 animate-pulse" />
                </motion.div>
              )}
            </button>
          </div>
        </div>

        {/* State Label & Instruction */}
        <AnimatePresence mode="wait">
          {!isLit ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <p className="font-display text-lg italic text-amber-100/90">
                Press and hold the wick to offer a light.
              </p>
              <p className="font-hindi text-xs tracking-wider text-amber-200/75">
                दीपक प्रज्वलित करने के लिए बत्ती को दबाकर रखें
              </p>
              <p className="text-[0.65rem] tracking-[0.35em] text-amber-300/80 uppercase">
                {isHolding ? `LIGHTING... ${progress}%` : "HOLD FOR ONE BREATH"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="lit"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-2 rounded-2xl border border-amber-300/40 bg-amber-500/10 p-4 backdrop-blur-sm"
            >
              <div className="flex items-center justify-center gap-2 text-amber-300">
                <Flame className="size-5 text-amber-400" />
                <span className="font-hindi text-base font-semibold">दीप प्रज्वलित हुआ • मंगल हो</span>
                <Flame className="size-5 text-amber-400" />
              </div>
              <p className="font-display text-sm text-amber-100">
                May your presence illuminate Muskan &amp; Nikhil's auspicious union with love and blessings.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
