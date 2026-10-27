import { motion } from "motion/react";
import { Clock, MapPin, Navigation, Calendar } from "lucide-react";
import { invitation } from "@/config/invitation";
import { Reveal } from "./Reveal";

export function EventSchedule() {
  return (
    <section className="relative overflow-hidden bg-parchment px-4 py-20 text-ink">
      {/* Decorative Traditional Borders */}
      <div className="relative mx-auto max-w-xl text-center">
        <Reveal>
          <p className="font-hindi text-base tracking-[0.25em] text-gold">
            ॥ कार्यक्रम रूपरेखा ॥
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-[0.15em] text-pine uppercase sm:text-4xl">
            Wedding Itinerary
          </h2>
          <div className="mx-auto mt-4 w-28 gold-rule" />
          <p className="mt-4 text-xs tracking-wider text-ink/75">
            We rejoice in inviting you to celebrate each sacred moment with us in Gurgaon
          </p>
        </Reveal>

        {/* 3 Events Timeline Cards */}
        <div className="mt-12 space-y-10">
          {invitation.events.map((ev, idx) => (
            <Reveal key={ev.id}>
              <div className="relative overflow-hidden rounded-[2.5rem] border border-gold/45 bg-[#faf6ef] p-6 shadow-[0_20px_50px_-25px_rgba(74,13,10,0.2)] paper-grain text-left transition-transform duration-300 hover:-translate-y-1">
                {/* Top Auspicious Tag */}
                <div className="flex items-center justify-between border-b border-gold/25 pb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-gold">
                      {ev.dateNumber}
                    </span>
                    <span className="text-[0.68rem] tracking-[0.25em] font-semibold text-ink/80 uppercase">
                      {ev.month} • {ev.day}
                    </span>
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[0.62rem] tracking-wider text-amber-900 border border-gold/30">
                    Day 0{idx + 1}
                  </span>
                </div>

                {/* Event Titles in Hindi and English */}
                <div className="mt-5 text-center">
                  <h3 className="font-hindi text-2xl font-bold text-amber-950 sm:text-3xl">
                    {ev.titleHindi}
                  </h3>
                  <h4 className="mt-1 font-display text-lg tracking-[0.14em] text-ink/80 uppercase">
                    {ev.titleEnglish}
                  </h4>
                  <div className="mx-auto my-3 h-px w-20 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
                </div>

                {/* Timings List */}
                <div className="mt-6 space-y-3 rounded-2xl bg-amber-50/50 p-4 border border-gold/20">
                  <div className="flex items-center gap-2 text-gold">
                    <Clock className="size-4" />
                    <span className="font-hindi text-xs tracking-wider font-semibold text-ink/90">
                      समय सारणी (Timings)
                    </span>
                  </div>
                  <ul className="space-y-2.5 divide-y divide-gold/15 pt-1 text-xs">
                    {ev.timings.map((t, tidx) => (
                      <li key={tidx} className="flex items-center justify-between pt-2">
                        <span className="font-hindi text-sm text-ink/90">
                          {t.labelHindi}
                          <span className="block text-[0.7rem] font-sans text-ink/60">
                            {t.label}
                          </span>
                        </span>
                        <span className="font-sans font-semibold tracking-wide text-amber-900">
                          {t.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Venue Details */}
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-gold/20 bg-white/60 p-4">
                  <MapPin className="size-5 shrink-0 text-gold mt-0.5" />
                  <div className="text-xs">
                    <p className="font-display text-base font-semibold text-ink">
                      {ev.venue.name}
                    </p>
                    <p className="font-sans text-ink/75 font-medium">
                      {ev.venue.complex ? `${ev.venue.complex}, ` : ""}
                      {ev.venue.address}
                    </p>
                  </div>
                </div>

                {/* Directions Button */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={ev.venue.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#6b1411] to-[#932219] px-5 py-3 text-[0.68rem] tracking-[0.2em] text-[#faf6ef] uppercase shadow-md transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <Navigation className="size-3.5" />
                    Google Maps Directions
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
