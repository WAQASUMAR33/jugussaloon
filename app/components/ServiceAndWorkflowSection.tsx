"use client";

import { useState } from "react";
import Image from "next/image";

interface ServiceAndWorkflowSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

interface ServiceItem {
  id: string;
  name: string;
  price: string;
}

interface CategoryData {
  id: string;
  title: string;
  services: ServiceItem[];
  image1: string;
  image2: string;
}

export default function ServiceAndWorkflowSection({
  onOpenBooking,
}: ServiceAndWorkflowSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("bridal");

  const categories: CategoryData[] = [
    {
      id: "bridal",
      title: "Bridal & Makeup",
      image1: "/images/bridal_makeup.png",
      image2: "/images/hair_styling.png",
      services: [
        { id: "b1", name: "Royal HD Airbrush Bridal Glam", price: "$350" },
        { id: "b2", name: "Engagement & Reception Look", price: "$220" },
        { id: "b3", name: "Celebration Party Makeup", price: "$130" },
        { id: "b4", name: "Signature Eye Makeup & Lashes", price: "$75" },
        { id: "b5", name: "Soft Glow Event Makeup", price: "$95" },
      ],
    },
    {
      id: "facials",
      title: "Facials & Skin",
      image1: "/images/beauty_facial.png",
      image2: "/images/hair_washing.png",
      services: [
        { id: "f1", name: "24K Gold Hydrafacial Spa", price: "$160" },
        { id: "f2", name: "Organic Deep Cleanse Ritual", price: "$110" },
        { id: "f3", name: "Collagen Anti-Aging Facial", price: "$180" },
        { id: "f4", name: "Radiance Vitamin C Glow", price: "$125" },
        { id: "f5", name: "Herbal Polish & Exfoliation", price: "$85" },
      ],
    },
    {
      id: "hair",
      title: "Hair & Styling",
      image1: "/images/hair_styling.png",
      image2: "/images/hero_salon.png",
      services: [
        { id: "h1", name: "Couture Layered Cut & Blowout", price: "$85" },
        { id: "h2", name: "Signature Hand-Painted Balayage", price: "$220" },
        { id: "h3", name: "Full Head Foil Highlights", price: "$190" },
        { id: "h4", name: "Brazilian Keratin Smoothing", price: "$250" },
        { id: "h5", name: "Deep Scalp Detox Treatment", price: "$95" },
      ],
    },
    {
      id: "nails",
      title: "Nails & Spa",
      image1: "/images/hair_washing.png",
      image2: "/images/bridal_makeup.png",
      services: [
        { id: "n1", name: "Full Set Gel Extensions", price: "$110" },
        { id: "n2", name: "Royal Rose Petal Mani-Pedi", price: "$95" },
        { id: "n3", name: "Custom 3D Acrylic Nail Art", price: "$45" },
        { id: "n4", name: "Paraffin Hydrating Spa Pedi", price: "$65" },
        { id: "n5", name: "Classic French Gel Overlay", price: "$55" },
      ],
    },
  ];

  const currentCategory =
    categories.find((c) => c.id === activeCategory) || categories[0];

  const workflowSteps = [
    { num: 1, title: "Consultation", isCurved: false },
    { num: 2, title: "Choose Your Service", isCurved: true },
    { num: 3, title: "Book an Appointment", isCurved: false },
    { num: 4, title: "Enjoy the Experience", isCurved: false },
  ];

  return (
    <section id="services" className="py-20 bg-[#FAFAFA]">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Outer Container with Soft Curved Card Design */}
        <div className="bg-[#EBEBE8] rounded-[36px] p-6 sm:p-10 border border-slate-300 shadow-sm relative overflow-hidden space-y-12">
          {/* Subtle Ambient Glare in top left & bottom right */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

          {/* TOP SUB-SECTION: Services & Pricelist */}
          <div className="space-y-8 relative z-10">
            {/* Category Navigation Tabs */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive
                        ? "bg-white text-[#111111] shadow-md border-2 border-[#111111]"
                        : "text-slate-700 hover:text-black hover:bg-white/50 font-semibold"
                    }`}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>

            {/* Grid Layout: Left Price Card + Right 2 Photos */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Price List Box */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="divide-y divide-slate-100">
                  {currentCategory.services.map((item) => (
                    <div
                      key={item.id}
                      className="py-3.5 flex items-center justify-between font-sans text-xs sm:text-sm font-semibold text-[#111111]"
                    >
                      <span className="text-slate-800">{item.name}</span>
                      <span className="font-bold text-[#111111] font-mono ml-4">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: 2 Side-by-Side Photo Cards */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white h-full min-h-[220px] shadow-sm">
                  <Image
                    src={currentCategory.image1}
                    alt={currentCategory.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white h-full min-h-[220px] shadow-sm">
                  <Image
                    src={currentCategory.image2 || "/images/hero_salon.png"}
                    alt={currentCategory.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Center Pill Action Button */}
            <div className="text-center pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="px-10 py-3.5 rounded-full bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-black font-bold text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 cursor-pointer"
              >
                BOOK A CALL
              </button>
            </div>
          </div>

          {/* BOTTOM SUB-SECTION: How It Works */}
          <div className="bg-[#F8F8F6] rounded-[32px] p-6 sm:p-10 border border-slate-200 shadow-sm relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column Text */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                  How It Works
                </span>
                <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#111111] leading-tight">
                  At Jugnu&apos;s Saloon, achieving your ideal look is easy
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                  Select your service, schedule an appointment, and receive top-notch care from our skilled artists.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onOpenBooking()}
                    className="px-8 py-3.5 rounded-full bg-[#111111] hover:bg-[#D4AF37] text-white hover:text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    GET A CONSULTATION
                  </button>
                </div>
              </div>

              {/* Right Column 2x2 Step Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {workflowSteps.map((step) => (
                  <div
                    key={step.num}
                    className={`bg-white p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center justify-center space-y-3 min-h-[120px] transition-all hover:border-[#D4AF37] ${
                      step.isCurved
                        ? "rounded-tl-2xl rounded-bl-2xl rounded-br-2xl rounded-tr-[36px]"
                        : "rounded-2xl"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 text-[#996515] font-bold text-xs flex items-center justify-center border border-[#D4AF37]/40">
                      {step.num}
                    </div>
                    <h4 className="font-sans text-xs sm:text-sm font-bold text-[#111111]">
                      {step.title}
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
