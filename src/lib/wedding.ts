import { invitation } from "@/config/invitation";

const wedding = invitation.mainWedding;

function toICSDate(iso: string) {
  return new Date(iso)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

export function buildICS() {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//wedding-invite//EN",
    "BEGIN:VEVENT",
    `UID:${toICSDate(wedding.startsAt)}-wedding@invite`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(wedding.startsAt)}`,
    `DTEND:${toICSDate(wedding.endsAt)}`,
    `SUMMARY:${wedding.title}`,
    `LOCATION:${wedding.venue.name}, ${wedding.venue.address}`,
    `DESCRIPTION:${invitation.invite.line}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadICS() {
  const blob = new Blob([buildICS()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "muskan-nikhil-wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
}

export function googleCalendarUrl() {
  const details = `${invitation.invite.kicker} — ${invitation.invite.line}\n\nVenue: ${wedding.venue.name}, ${wedding.venue.address}\nDress code: ${wedding.dressCode}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: wedding.title,
    dates: `${toICSDate(wedding.startsAt)}/${toICSDate(wedding.endsAt)}`,
    details,
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function mapsUrl() {
  return wedding.venue.mapUrl;
}

export function directionsUrl() {
  return wedding.venue.mapUrl;
}

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

export function timeLeft(target = event.startsAt): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
    done: false,
  };
}
