const footerFloral = "https://media.invitestory.in/sage-parchment/src/assets/footer-floral.jpg";
import { invitation } from "@/config/invitation";
import { Reveal } from "./Reveal";

export function SiteFooter() {
  const { couple } = invitation;

  return (
    <footer className="relative isolate overflow-hidden pt-20 pb-12 text-center bg-parchment">
      <img
        src={footerFloral}
        alt=""
        aria-hidden
        loading="lazy"
        width={1920}
        height={912}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-bottom opacity-40"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-parchment/70" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-parchment to-transparent"
      />

      <Reveal className="px-6">
        {/* Monogram Seal */}
        <div className="mx-auto size-16 overflow-hidden rounded-full border border-gold/70 bg-[#faf6ef] p-1 shadow-md">
          <img
            src={couple.logoImage}
            alt="Monogram"
            className="size-full rounded-full object-cover"
          />
        </div>

        <p className="mt-4 font-hindi text-2xl font-bold text-amber-950">
          {couple.brideHindi} संग {couple.groomHindi}
        </p>

        <p className="mt-1 font-display text-2xl tracking-[0.16em] text-pine uppercase">
          {couple.brideShort} <span className="text-gold">&</span> {couple.groomShort}
        </p>
        <div className="mx-auto mt-4 w-24 gold-rule" />

        <p className="mt-5 font-hindi text-sm text-ink/90 font-medium">
          ॥ दर्शनाभिलाषी: चन्दन एवं रंगवानी परिवार ॥
        </p>
        <p className="mt-1 text-xs text-ink/75">
          With warmest regards &amp; love from Chandan &amp; Rangwani Families
        </p>

        <p className="mt-8 text-[0.7rem] tracking-[0.35em] text-gold font-semibold uppercase">
          {couple.hashtag}
        </p>
      </Reveal>
    </footer>
  );
}
