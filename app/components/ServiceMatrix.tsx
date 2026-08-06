"use client";

import { useState } from "react";
import Image from "next/image";

interface ServiceMatrixProps {
  onOpenBooking: (serviceName?: string) => void;
}

interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
  popular?: boolean;
}

interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  services: ServiceItem[];
}

export default function ServiceMatrix({ onOpenBooking }: ServiceMatrixProps) {
  const [activeTab, setActiveTab] = useState<string>("bridal");

  const categories: ServiceCategory[] = [
    {
      id: "bridal",
      title: "Bridal & Glamour Makeup",
      subtitle: "HD Airbrush bridal transformations and glamour party makeup.",
      image: "/images/bridal_makeup.png",
      services: [
        {
          id: "br-hd",
          name: "Royal HD Airbrush Bridal Makeover",
          duration: "180 mins",
          price: "$350.00",
          description: "Full HD Airbrush makeup, luxury lash extensions, hair styling, jewelry setting & trial.",
          popular: true,
        },
        {
          id: "br-engagement",
          name: "Engagement & Reception Glam",
          duration: "120 mins",
          price: "$220.00",
          description: "Waterproof glowing base, signature eye makeup, hair contouring & draping.",
        },
        {
          id: "br-party",
          name: "Celebration Party Glamour Makeup",
          duration: "75 mins",
          price: "$130.00",
          description: "Flawless evening makeup look with premium lashes & hairstyle of choice.",
        },
        {
          id: "br-eyes",
          name: "Signature Eye Makeup & Lash Styling",
          duration: "45 mins",
          price: "$75.00",
          description: "Smokey or cut-crease eye art with mink lash extensions.",
        },
      ],
    },
    {
      id: "facial",
      title: "Facials & Skin Spa",
      subtitle: "Deep rejuvenating skin rituals for glowing radiance.",
      image: "/images/beauty_facial.png",
      services: [
        {
          id: "fc-gold",
          name: "24K Gold Hydrafacial & Glow Spa",
          duration: "75 mins",
          price: "$160.00",
          description: "Deep pore suction, 24K gold foil infusion, LED light therapy & soothing mask.",
          popular: true,
        },
        {
          id: "fc-detox",
          name: "Organic Deep Cleanse & Polish",
          duration: "60 mins",
          price: "$110.00",
          description: "Exfoliating herbal scrub, blackhead extraction & hydrating serum booster.",
        },
        {
          id: "fc-antiaging",
          name: "Collagen Anti-Aging Lifting Ritual",
          duration: "90 mins",
          price: "$180.00",
          description: "Skin tightening microcurrent therapy and pure hyaluronic acid soak.",
        },
      ],
    },
    {
      id: "hair",
      title: "Haircuts, Styling & Color",
      subtitle: "Precision cuts, signature balayage, and restorative hair care.",
      image: "/images/hair_styling.png",
      services: [
        {
          id: "hc-cut",
          name: "Couture Layered Cut & Volume Blowout",
          duration: "60 mins",
          price: "$85.00",
          description: "Framing layers, deep scalp wash & red carpet styled finish.",
        },
        {
          id: "hc-balayage",
          name: "Signature Hand-Painted Balayage",
          duration: "150 mins",
          price: "$220.00",
          description: "Custom dimensional blonde or bronze gradients with gloss toner.",
          popular: true,
        },
        {
          id: "hc-keratin",
          name: "Brazilian Keratin Smoothing Treatment",
          duration: "120 mins",
          price: "$250.00",
          description: "Frizz-free silky smooth hair lasting up to 4 months.",
        },
      ],
    },
    {
      id: "nails",
      title: "Nails & Mani-Pedi Spa",
      subtitle: "Luxury gel extensions, 3D nail art, and relaxing spa manicures.",
      image: "/images/hair_washing.png",
      services: [
        {
          id: "nl-ext",
          name: "Full Set Gel / Acrylic Extensions",
          duration: "90 mins",
          price: "$110.00",
          description: "Length sculpting, gel polish color of choice & shiny topcoat.",
          popular: true,
        },
        {
          id: "nl-pedi",
          name: "Royal Rose Petal Spa Mani-Pedi",
          duration: "75 mins",
          price: "$95.00",
          description: "Exfoliating foot scrub, paraffin wax dip, massage & nail shaping.",
        },
        {
          id: "nl-art",
          name: "Custom 3D Nail Art & Chrome Accent",
          duration: "30 mins",
          price: "$45.00",
          description: "Hand-painted intricate nail designs, glitter or chrome foil.",
        },
      ],
    },
  ];

  const currentCategory =
    categories.find((c) => c.id === activeTab) || categories[0];

  return (
    <section id="services" className="py-24 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#111111] uppercase tracking-tight">
            BEAUTY, BRIDAL & SPA SERVICES
          </h2>
          <p className="text-slate-600 text-sm font-normal">
            Select a category tab below to explore our transparent rates and reserve your transformation.
          </p>
        </div>

        {/* Outer Curved Container */}
        <div className="bg-[#F3F3F0] rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
          {/* Ambient Glare */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === cat.id
                    ? "bg-[#111111] text-white shadow-md"
                    : "bg-white text-slate-700 hover:text-black border border-slate-200"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Pricing List Table */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-sans text-xl font-bold text-[#111111] uppercase">
                  {currentCategory.title}
                </h3>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  {currentCategory.subtitle}
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                {currentCategory.services.map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm text-[#111111]">
                          {item.name}
                        </span>
                        {item.popular && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#F5E8C7] text-[#856404]">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-normal mt-0.5">
                        {item.description} ({item.duration})
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="font-bold text-base text-[#111111] font-mono">
                        {item.price}
                      </span>
                      <button
                        onClick={() => onOpenBooking(item.name)}
                        className="px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border border-slate-300 hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Preview Container */}
            <div className="lg:col-span-5 relative h-full flex flex-col justify-center">
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white p-2 shadow-md">
                <Image
                  src={currentCategory.image}
                  alt={currentCategory.title}
                  width={500}
                  height={400}
                  className="w-full h-72 sm:h-80 object-cover rounded-xl"
                />
                <div className="p-4 text-center">
                  <button
                    onClick={() => onOpenBooking()}
                    className="w-full py-3 rounded-full bg-[#111111] hover:bg-[#D4AF37] hover:text-black text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Reserve Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
