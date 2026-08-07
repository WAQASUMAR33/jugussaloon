"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyChooseUs from "./components/WhyChooseUs";
import AboutSection from "./components/AboutSection";
import ServiceAndWorkflowSection from "./components/ServiceAndWorkflowSection";
import Stylists from "./components/Stylists";
import NewsPress from "./components/NewsPress";
import BookingModal from "./components/BookingModal";
import Footer from "./components/Footer";
import Link from "next/link";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenBooking = (serviceName: string = "") => {
    setSelectedService(serviceName);
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedService("");
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111] relative">
      {/* Navigation Header */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Hero Section */}
      <Hero onOpenBooking={() => handleOpenBooking()} />

      {/* Benefits & Signature Experience */}
      <WhyChooseUs onOpenBooking={handleOpenBooking} />

      {/* About Jugnu's Saloon Section */}
      <AboutSection onOpenBooking={() => handleOpenBooking("Beauty Consultation")} />

      {/* Combined Services & How It Works Master Section (Inspiration Design) */}
      <ServiceAndWorkflowSection onOpenBooking={handleOpenBooking} />

      {/* Beauty & Makeup Artists Team */}
      <Stylists onOpenBooking={handleOpenBooking} />

      {/* Our Work, Press & Reviews */}
      <NewsPress />

      {/* View Full Gallery Banner Link */}
      <div className="bg-[#FAFAFA] py-8 text-center border-t border-slate-200">
        <Link
          href="/our-work"
          className="inline-block px-8 py-3.5 rounded-full bg-[#111111] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all shadow-md"
        >
          Explore Full Transformations & Work &rarr;
        </Link>
      </div>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Booking Drawer / Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        initialService={selectedService}
      />
    </main>
  );
}
