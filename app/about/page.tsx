"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import WhyChooseUs from "../components/WhyChooseUs";
import LocationMap from "../components/LocationMap";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import Image from "next/image";

export default function AboutPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenBooking = (serviceName: string = "") => {
    setSelectedService(serviceName);
    setBookingOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111] relative">
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Hero Header Banner */}
      <section className="relative pt-32 pb-20 bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/images/hero_salon.png"
            alt="About Jugnu's Saloon"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <h1 className="font-sans text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
            ABOUT JUGNU&apos;S SALOON
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Step into our sanctuary of high-end beauty, HD bridal artistry, skincare facials, and luxury salon care.
          </p>
        </div>
      </section>

      {/* Main Brand Story */}
      <AboutSection onOpenBooking={() => handleOpenBooking("Beauty Consultation")} />

      {/* Why Choose Us */}
      <WhyChooseUs onOpenBooking={handleOpenBooking} />

      {/* Saloon Location & Google Map */}
      <LocationMap />

      <Footer onOpenBooking={() => handleOpenBooking()} />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={selectedService}
      />
    </main>
  );
}
