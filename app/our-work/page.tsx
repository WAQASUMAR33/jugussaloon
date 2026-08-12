"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import NewsPress from "../components/NewsPress";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import Image from "next/image";

export default function OurWorkPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenBooking = (serviceName: string = "") => {
    setSelectedService(serviceName);
    setBookingOpen(true);
  };

  const galleryItems = [
    {
      title: "Royal HD Airbrush Bridal Glam",
      category: "Bridal Makeup",
      image: "/images/bridal_makeup.png",
    },
    {
      title: "24K Gold Hydrafacial Skin Radiance",
      category: "Skin Spa",
      image: "/images/beauty_facial.png",
    },
    {
      title: "Signature Hand-Painted Balayage",
      category: "Hair Artistry",
      image: "/images/hair_styling.png",
    },
    {
      title: "Relaxing Scalp Rinse & Hair Spa",
      category: "Hair & Scalp",
      image: "/images/hair_washing.png",
    },
    {
      title: "Curated Salon Product Collection",
      category: "Care Products",
      image: "/images/hair_products.png",
    },
    {
      title: "Luxury Salon Atmosphere & VIP Suite",
      category: "Salon Ambience",
      image: "/images/hero_salon.png",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111] relative">
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Hero Header Banner */}
      <section className="relative pt-32 pb-20 bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/images/bridal_makeup.png"
            alt="Our Work & Portfolio"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <h1 className="font-sans text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
            OUR WORK & PORTFOLIO
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Browse real bridal makeovers, skincare treatments, hair styling transformations, and client reviews.
          </p>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-sans text-3xl font-extrabold uppercase text-[#111111]">
              TRANSFORMATION GALLERY
            </h2>
            <p className="text-slate-600 text-sm font-normal mt-1">
              A glimpse into the artistry produced every day at Jugnu&apos;s Saloon.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white hover:border-[#D4AF37] transition-all"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5E8C7]">
                      {item.category}
                    </span>
                    <h3 className="font-sans text-base font-bold">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google 5-Star Reviews & Client Testimonials */}
      <NewsPress />

      <Footer onOpenBooking={() => handleOpenBooking()} />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={selectedService}
      />
    </main>
  );
}
