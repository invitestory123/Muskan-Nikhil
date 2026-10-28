import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Hero } from "@/components/wedding/Hero";
import { TheRitualDiya } from "@/components/wedding/TheRitualDiya";
import { ScratchCardReveal } from "@/components/wedding/ScratchCardReveal";
import { Countdown } from "@/components/wedding/Countdown";
import { EventSchedule } from "@/components/wedding/EventSchedule";
import { Details } from "@/components/wedding/Details";
import { Blessing } from "@/components/wedding/Blessing";
import { SiteFooter } from "@/components/wedding/SiteFooter";
import { Petals } from "@/components/wedding/Petals";
import { ScrollProgress } from "@/components/wedding/ScrollProgress";
import { OpenGate } from "@/components/wedding/OpenGate";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { invitation } from "@/config/invitation";

const { couple, meta } = invitation;
const title = meta.title;
const description = meta.description;
const ogUrl = meta.url;
const ogImage = meta.image;
const siteName = meta.siteName;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: ogUrl },
      { property: "og:image", content: ogImage },
      { property: "og:image:alt", content: title },
      { property: "og:site_name", content: siteName },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ],
    links: [{ rel: "canonical", href: ogUrl }],
  }),
  component: InvitationPage,
});

function InvitationPage() {
  return (
    <OpenGate>
      <main className="relative bg-parchment min-h-screen">
        <ScrollProgress />
        <Petals />
        <MusicPlayer />
        <Hero />
        <TheRitualDiya />
        <ScratchCardReveal />
        <Countdown />
        <EventSchedule />
        <Details />
        <Blessing />
        <SiteFooter />
        <Toaster position="top-center" />
      </main>
    </OpenGate>
  );
}
