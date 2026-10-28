import { motion } from "motion/react";
import { Clock, MapPin, Navigation } from "lucide-react";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import { invitation } from "@/config/invitation";
import { Reveal } from "./Reveal";

const EVENT_IMAGES: Record<string, string> = {
  "sagan-chowki": story1,
  "mehndi-sangeet": story2,
  "wedding-reception": story3,
};

export function EventSchedule() {
  return (
    <section className="relative overflow-hidden bg-parchment px-4 sm:px-6 py-20 text-ink">
      <div className="relative mx-auto max-w-lg">
        {/* Itinerary Header matching Image 3 */}
        <Reveal className="text-center">
          <h2 className="font-display text-3xl sm:text-4xl tracking-[0.2em] text-pine uppercase font-normal">
            ITINERARY
          </h2>
          {/* Gold rule with diamond marker */}
          <div className="mx-auto mt-4 flex items-center justify-center w-36">
            <div className="h-px w-full bg-gold/50" />
            <span className="mx-2 rotate-45 text-[8px] text-gold select-none">♦</span>
            <div className="h-px w-full bg-gold/50" />
          </div>
        </Reveal>

        {/* Vertical Timeline matching Image 3 */}
        <div className="relative mt-14">
          {/* Continuous Left Vertical Timeline Line */}
          <div className="absolute top-4 bottom-4 left-3.5 sm:left-4 w-px bg-gold/40" />

          {/* Events List */}
          <div className="space-y-16">
            {invitation.events.map((ev, idx) => {
              const imageSrc = EVENT_IMAGES[ev.id] || story1;

              return (
                <Reveal key={ev.id} delay={idx * 0.1}>
                  <div className="relative pl-9 sm:pl-12">
                    {/* Diamond Marker on the Timeline (Image 3 style) */}
                    <div className="absolute left-3.5 sm:left-4 -translate-x-1/2 top-8 z-10 flex items-center justify-center">
                      <span className="block size-2.5 rotate-45 bg-gold border border-[#b8860b] shadow-sm" />
                    </div>

                    {/* Event Content Container */}
                    <div className="flex flex-col">
                      {/* Arched Event Image (Mughal Art / Image 3 style) */}
                      <div className="overflow-hidden rounded-t-[3.5rem] rounded-b-2xl border border-gold/45 shadow-md bg-[#faf6ef]">
                        <img
                          src={imageSrc}
                          alt={ev.titleEnglish.replace("\n", " ")}
                          loading="lazy"
                          className="h-56 sm:h-64 w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                        />
                      </div>

                      {/* Date Label (e.g. 06 FEBRUARY, Image 3 style) */}
                      <p className="mt-4 font-body text-xs tracking-[0.3em] text-gold font-medium uppercase">
                        {ev.dateNumber} {ev.month}
                      </p>

                      {/* Event Title */}
                      {ev.id === "sagan-chowki" ? (
                        <h3 className="mt-1 font-display text-2xl sm:text-3xl tracking-[0.08em] text-pine uppercase font-semibold leading-tight">
                          SAGAN
                          <span className="block">MATA KI CHOWKI</span>
                        </h3>
                      ) : (
                        <h3 className="mt-1 font-display text-2xl sm:text-3xl tracking-[0.08em] text-pine uppercase font-semibold leading-tight">
                          {ev.titleEnglish}
                        </h3>
                      )}

                      {/* Primary Time & Venue (Image 3 style) */}
                      <p className="mt-1 text-sm text-ink/75 font-serif">
                        {ev.timings[0]?.time}, {ev.venue.name}
                      </p>

                      {/* Detailed Ceremony Schedule */}
                      <div className="mt-4 rounded-xl border border-gold/25 bg-[#faf6ef]/90 p-3.5 shadow-sm">
                        <ul className="space-y-2 text-xs divide-y divide-gold/15">
                          {ev.timings.map((t, tidx) => (
                            <li
                              key={tidx}
                              className={`flex items-center justify-between ${
                                tidx > 0 ? "pt-2" : ""
                              }`}
                            >
                              <span className="font-medium text-ink/90">{t.label}</span>
                              <span className="text-gold font-sans font-semibold tracking-wide">
                                {t.time}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Venue Address & Maps Link */}
                        <div className="mt-3 pt-2.5 border-t border-gold/20 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex items-start gap-1.5 text-ink/70 max-w-[220px]">
                            <MapPin className="size-3.5 text-gold shrink-0 mt-0.5" />
                            <span className="text-[0.72rem] leading-snug">
                              {ev.venue.complex ? `${ev.venue.complex}, ` : ""}
                              {ev.venue.address}
                            </span>
                          </div>
                          <a
                            href={ev.venue.mapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-full border border-gold/60 bg-gold/10 px-3 py-1 text-[0.62rem] tracking-wider text-pine uppercase font-medium hover:bg-gold/20 transition-colors"
                          >
                            <Navigation className="size-2.5" />
                            Directions
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
