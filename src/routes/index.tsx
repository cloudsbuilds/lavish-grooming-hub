import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Preloader } from "@/components/Preloader";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { BookingSection } from "@/components/BookingSection";
import { BookingModal } from "@/components/BookingModal";
import { AdminPortal } from "@/components/AdminPortal";
import { Footer } from "@/components/Footer";
import { SalonProvider } from "@/lib/salon-store";

const TITLE = "Lavish Men's Saloon — Luxury Barbershop & Grooming";
const DESCRIPTION =
  "Refine your look and rejuvenate your skin at Lavish Men's Saloon. Precision cuts, straight-razor shaves, gold facials and premium spa packages. Book your chair today.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [serviceId, setServiceId] = useState<string | undefined>(undefined);

  const openBooking = (id?: string) => {
    setServiceId(id);
    setBookingOpen(true);
  };

  return (
    <SalonProvider>
      <Preloader />
      <Header onBook={() => openBooking()} onAdmin={() => setAdminOpen(true)} />
      <main>
        <h1 className="sr-only">Lavish Men&apos;s Saloon — luxury barbershop and grooming</h1>
        <Hero onBook={() => openBooking()} />
        <Services onBook={(id) => openBooking(id)} />
        <About />
        <BookingSection onBook={() => openBooking()} />
      </main>
      <Footer onAdmin={() => setAdminOpen(true)} />
      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialServiceId={serviceId}
      />
      <AdminPortal open={adminOpen} onClose={() => setAdminOpen(false)} />
    </SalonProvider>
  );
}
