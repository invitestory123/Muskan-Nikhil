import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart } from "lucide-react";
import { invitation } from "@/config/invitation";

export function ScratchCardReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);

  const drawFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#d4af37");
    grad.addColorStop(0.25, "#fef08a");
    grad.addColorStop(0.5, "#d97706");
    grad.addColorStop(0.75, "#fef9c3");
    grad.addColorStop(1, "#b45309");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle vertical pinstripes like Image 3
    ctx.fillStyle = "rgba(180, 83, 9, 0.12)";
    for (let x = 0; x < width; x += 6) {
      ctx.fillRect(x, 0, 2, height);
    }

    // Outer and inner border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(4, 4, width - 8, height - 8);

    // Text on foil
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 13px 'Cormorant Garamond', Georgia, serif";
    ctx.fillStyle = "#5c2a04";
    ctx.letterSpacing = "0.25em";
    ctx.fillText("SCRATCH TO REVEAL", width / 2, height / 2 - 8);

    ctx.font = "italic 11px sans-serif";
    ctx.fillStyle = "#78350f";
    ctx.letterSpacing = "0.15em";
    ctx.fillText("OR TAP BELOW TO UNVEIL", width / 2, height / 2 + 12);
  }, []);

  useEffect(() => {
    drawFoil();
  }, [drawFoil]);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentCount = 0;
      const totalPixels = pixels.length / 4;

      // Sample every 4th pixel for high performance
      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentCount += 4;
        }
      }

      const percent = Math.min(100, Math.round((transparentCount / totalPixels) * 100));
      setScratchPercent(percent);

      if (percent >= 40) {
        setIsRevealed(true);
      }
    } catch {
      // Security fallback
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2, false);
    ctx.fill();

    checkScratchPercentage();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !e.touches[0]) return;
    scratch(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
  };

  const revealInstantly = () => {
    setIsRevealed(true);
    setScratchPercent(100);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#4e0c0a] via-[#751711] to-[#5a100e] px-4 py-16 text-center text-[#faf6ef]">
      {/* Intricate Ornate Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-10 bg-[radial-gradient(#fde047_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 mx-auto max-w-md">
        {/* Invocation / Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] text-amber-300 drop-shadow-md uppercase font-medium"
        >
          Celebrating With Love &amp; Blessings
        </motion.p>

        {/* Sacred Artwork of Couple's Feet & Golden Lotus (Image 3 style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto mt-6 overflow-hidden rounded-[2.5rem] border-2 border-amber-300/40 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gradient-to-b from-amber-400/20 to-amber-900/40"
        >
          <div className="relative overflow-hidden rounded-[2.2rem]">
            <img
              src="/images/wedding-feet-art.jpg"
              alt="Sacred Wedding Ritual - Bride & Groom Feet with Henna and Golden Lotus"
              className="h-80 w-full object-cover object-center filter saturate-105"
            />
            {/* Soft inner glow gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#5a100e]/90 via-transparent to-black/20" />

            {/* Couple's Monogram Seal Floating on the Artwork */}
            <div className="absolute top-4 right-4 size-14 overflow-hidden rounded-full border border-amber-300/70 bg-[#faf6ef] p-1 shadow-lg">
              <img
                src={invitation.couple.logoImage}
                alt="Muskan Nikhil Monogram"
                className="size-full rounded-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Family Kicker */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-[0.68rem] tracking-[0.35em] text-amber-200/90 uppercase font-medium"
        >
          {invitation.invite.kicker}
        </motion.p>

        {/* Couple Names in English */}
        <div className="mt-4">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-1 font-display text-3xl font-light tracking-[0.14em] text-amber-200 sm:text-4xl"
          >
            {invitation.couple.brideShort} &amp; {invitation.couple.groomShort}
          </motion.h2>
        </div>

        <div className="mx-auto my-5 h-px w-24 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />

        {/* Interactive Scratch-to-Reveal Card (Image 3) */}
        <div className="relative mx-auto mt-6 w-full max-w-sm">
          <div className="relative min-h-[170px] overflow-hidden rounded-2xl border-2 border-amber-300/50 bg-[#2d0705] p-6 shadow-2xl">
            {/* The Hidden Content Beneath the Foil */}
            <div className="flex flex-col items-center justify-center space-y-2 py-1 text-center">
              <span className="text-xs tracking-[0.35em] text-amber-300 font-semibold uppercase">
                THE WEDDING
              </span>
              <p className="font-display text-2xl tracking-[0.18em] text-amber-100 font-semibold">
                10th February 2026
              </p>
              <p className="text-[0.72rem] tracking-[0.25em] text-amber-200/90 uppercase">
                Gurgaon, Haryana
              </p>
              <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-amber-300 flex-wrap">
                <Heart className="size-3.5 fill-amber-400 text-amber-400 shrink-0" />
                <span className="font-display italic">Sagan • Mata Ki Chowki • Sangeet • Pheras</span>
                <Heart className="size-3.5 fill-amber-400 text-amber-400 shrink-0" />
              </div>
            </div>

            {/* Canvas Scratch Foil Layer */}
            <AnimatePresence>
              {!isRevealed && (
                <motion.canvas
                  ref={canvasRef}
                  width={340}
                  height={170}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 size-full cursor-pointer touch-none select-none rounded-2xl"
                  title="Scratch to reveal the wedding date"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Quick Tap Reveal Button & Progress */}
          {!isRevealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 flex items-center justify-between px-2 text-xs text-amber-200/80"
            >
              <span className="text-[0.68rem] tracking-wider">
                {scratchPercent > 0 ? `Unveiled: ${scratchPercent}%` : "Rub or tap to uncover"}
              </span>
              <button
                type="button"
                onClick={revealInstantly}
                className="group inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-500/20 px-3 py-1 text-[0.65rem] tracking-wider text-amber-200 uppercase hover:bg-amber-500/30 transition-colors"
              >
                <Sparkles className="size-3 text-amber-300 group-hover:rotate-12 transition-transform" />
                Tap to Reveal
              </button>
            </motion.div>
          )}

          {isRevealed && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-xs tracking-widest text-amber-300/90 uppercase font-medium"
            >
              ✨ Warmest Welcome &amp; Heartfelt Greetings ✨
            </motion.p>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center gap-1 opacity-75">
          <span className="text-[0.6rem] tracking-[0.35em] text-amber-200/80 uppercase">SCROLL</span>
          <div className="h-7 w-px bg-gradient-to-b from-amber-300 to-transparent" />
        </div>
      </div>
    </section>
  );
}
