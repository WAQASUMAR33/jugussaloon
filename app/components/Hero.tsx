"use client";

import Image from "next/image";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] pt-24 pb-16 flex items-center justify-center overflow-hidden bg-[#FAFAFA]"
    >
      {/* Background Hero Banner Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bridal_makeup.png"
          alt="Jugnu's Saloon Bridal & Beauty Transformation"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Dark Contrast Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/45" />
      </div>

      {/* Subtle Gold Glare Background Effect */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/20 rounded-full blur-[130px] pointer-events-none z-10" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full text-white">
        <div className="max-w-3xl space-y-6">
          {/* Main Headline */}
          <h1 className="font-sans text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] text-white">
            EXQUISITE BEAUTY, <br />
            <span className="text-[#F5E8C7]">BRIDAL & HAIR ARTISTRY</span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-200 text-base sm:text-lg font-normal leading-relaxed max-w-xl">
            From breathtaking <strong className="text-white font-semibold">HD Airbrush Bridal Makeovers</strong> to radiant 24K gold facials, hair styling, balayage, and nail extensions — experience total luxury care at <strong className="text-white font-semibold">Jugnu&apos;s Saloon</strong>.
          </p>

          {/* Pill Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="tel:+11234567890"
              className="px-8 py-3.5 rounded-full bg-[#F5E8C7] hover:bg-[#D4AF37] text-[#111111] font-bold text-xs uppercase tracking-widest transition-all shadow-md flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4 text-[#111111]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>Call Now</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 rounded-full border-2 border-white/80 hover:border-[#D4AF37] bg-black/40 hover:bg-black/80 text-white font-bold text-xs uppercase tracking-widest transition-all backdrop-blur-sm cursor-pointer"
            >
              Book Online
            </button>
          </div>

          {/* Social Proof */}
          <div className="pt-6 flex items-center space-x-4">
            <div className="flex items-center -space-x-2">
              <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                JS
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-white bg-[#D4AF37] text-black flex items-center justify-center text-[10px] font-bold">
                ★5
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold">
                +
              </div>
            </div>

            <div className="text-xs text-slate-200">
              <span className="font-bold text-white">30,000+</span> Satisfied Beauty & Bridal Clients
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
