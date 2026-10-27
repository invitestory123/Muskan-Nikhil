import { invitation } from "@/config/invitation";
import { Reveal } from "./Reveal";

export function Blessing() {
  const { blessing } = invitation;

  return (
    <section className="relative px-5 py-20 bg-parchment">
      <Reveal className="mx-auto max-w-lg text-center">
        <p className="font-hindi text-base tracking-[0.25em] text-gold">
          ॥ आशीर्वाद एवं मंगलकामनाएं ॥
        </p>
        <div className="mx-auto mt-4 w-24 gold-rule" />

        <p className="mt-8 font-hindi text-xl leading-relaxed text-amber-950 sm:text-2xl font-semibold">
          {blessing.shloka}
        </p>

        <p className="mt-5 font-display text-base leading-relaxed italic text-ink/80 max-w-md mx-auto">
          “{blessing.translation}”
        </p>

        <p className="mt-4 text-[0.65rem] tracking-[0.3em] text-gold uppercase font-medium">
          {blessing.subtext}
        </p>
        <div className="mx-auto mt-8 w-24 gold-rule" />
      </Reveal>
    </section>
  );
}
