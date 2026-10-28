import { CalendarPlus, Clock, MapPin, Shirt } from "lucide-react";
import jaali from "@/assets/jaali.jpg";
import { invitation } from "@/config/invitation";
import { directionsUrl, googleCalendarUrl } from "@/lib/wedding";
import { Reveal } from "./Reveal";

export function Details() {
  const { mainWedding } = invitation;

  return (
    <section className="relative overflow-hidden px-5 py-20 bg-parchment">
      {/* Background Subtle Watermark */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{ backgroundImage: `url(${jaali})`, backgroundSize: "280px" }}
      />
      <div aria-hidden className="absolute inset-0 bg-parchment/80 pointer-events-none" />

      <Reveal className="relative mx-auto max-w-md">
        {/* Arch Card matching Image 4 */}
        <div className="relative rounded-t-[9.5rem] rounded-b-[2.5rem] border border-gold/55 bg-[#faf6ef] px-6 sm:px-9 pt-16 pb-10 text-center shadow-[0_30px_60px_-30px_rgba(36,63,54,0.35)] paper-grain">
          {/* Inner Decorative Arch Border */}
          <div className="pointer-events-none absolute inset-x-3.5 top-3.5 bottom-3.5 rounded-t-[8.8rem] rounded-b-[2rem] border border-gold/35" />

          {/* Section Subtitle */}
          <p className="text-[0.68rem] tracking-[0.38em] text-ink/70 uppercase font-medium">
            MUHURTHA
          </p>

          {/* Large Auspicious Date */}
          <p className="mt-4 font-display text-3xl sm:text-4xl tracking-[0.18em] text-gold font-medium">
            {mainWedding.dateLabel}
          </p>

          {/* Elegant Gold Divider with Diamond */}
          <div className="mx-auto my-5 flex items-center justify-center w-28">
            <div className="h-px w-full bg-gold/50" />
            <span className="mx-2 rotate-45 text-[8px] text-gold select-none">♦</span>
            <div className="h-px w-full bg-gold/50" />
          </div>

          {/* Event Specific Details */}
          <ul className="mt-7 space-y-4 text-xs sm:text-sm text-ink/85">
            <li className="flex items-center justify-center gap-2.5">
              <Clock className="size-4 text-gold shrink-0" aria-hidden />
              <span>{mainWedding.muhurthaTiming}</span>
            </li>
            <li className="flex items-start justify-center gap-2.5">
              <MapPin className="size-4 text-gold shrink-0 mt-0.5" aria-hidden />
              <span className="leading-snug">
                <span className="font-semibold text-ink">{mainWedding.venue.name}</span>
                <br />
                <span className="text-ink/65 text-[0.8rem]">{mainWedding.venue.address}</span>
              </span>
            </li>
            <li className="flex items-center justify-center gap-2.5">
              <Shirt className="size-4 text-gold shrink-0" aria-hidden />
              <span className="text-xs sm:text-sm text-ink/80">{mainWedding.dressCode}</span>
            </li>
          </ul>

          {/* Reception to Follow note */}
          <p className="mt-7 font-display text-lg italic text-ink/75">
            Reception to follow
          </p>

          {/* Action Buttons matching Image 4 */}
          <div className="mt-8 flex flex-col gap-3">
            <a
              href={googleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-pine px-6 py-3.5 text-[0.7rem] tracking-[0.24em] text-parchment uppercase transition-all duration-200 hover:bg-[#1b312a] active:scale-95 shadow-md"
            >
              <CalendarPlus className="size-4 transition-transform group-hover:rotate-6" />
              ADD TO CALENDAR
            </a>
            <a
              href={directionsUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/70 py-3 px-6 text-[0.68rem] tracking-[0.22em] text-pine uppercase transition-colors hover:bg-gold/15 active:scale-95 font-medium"
            >
              DIRECTIONS
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
