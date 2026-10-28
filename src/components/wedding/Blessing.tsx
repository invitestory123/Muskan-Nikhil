import { invitation } from "@/config/invitation";
import { Reveal } from "./Reveal";

export function Blessing() {
  const { blessing } = invitation;

  return (
    <section className="relative px-5 py-20 bg-parchment">
      <Reveal className="mx-auto max-w-lg text-center">
        <p className="text-[0.68rem] tracking-[0.35em] text-gold uppercase font-medium">
          Sacred Blessings
        </p>
        <div className="mx-auto mt-4 w-24 gold-rule" />

        <p className="mt-8 font-display text-xl sm:text-2xl leading-relaxed italic text-pine max-w-md mx-auto">
          “{blessing.translation}”
        </p>

        <p className="mt-6 text-xs sm:text-sm tracking-wide text-ink/75 max-w-sm mx-auto leading-relaxed">
          {blessing.subtext}
        </p>
        <div className="mx-auto mt-8 w-24 gold-rule" />
      </Reveal>
    </section>
  );
}
