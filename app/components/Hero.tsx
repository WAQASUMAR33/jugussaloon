"use client";

import Image from "next/image";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Full-bleed background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_salon.png"
          alt="Jugnu's Saloon luxury interior"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Clean dual-tone overlay: strong left fade for text, gentle right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.60) 45%, rgba(10,10,10,0.28) 100%)",
          }}
        />
        {/* Subtle gold warmth bloom — left side */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 15% 60%, rgba(212,175,55,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="max-w-[1480px] mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10">
        <div className="min-h-screen flex flex-col justify-center py-36 max-w-2xl">


          {/* Headline */}
          <h1
            className="font-sans font-extrabold leading-[1.06] text-white mb-6"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
          >
            Where Beauty
            <br />
            <span style={{ color: "#D4AF37" }}>Meets Artistry</span>
          </h1>


          {/* Body copy */}
          <p
            className="text-base sm:text-[17px] leading-relaxed font-normal mb-10 max-w-md font-georgia"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Premium bridal makeovers, hair artistry, 24K gold facials &amp; more, all crafted for you with the finest touch of luxury.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-5 mb-14">
            {/* Primary: Book */}
            <button
              onClick={onOpenBooking}
              className="cursor-pointer"
              style={{
                backgroundColor: "#D4AF37",
                color: "#111111",
                padding: "15px 36px",
                borderRadius: "3px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.20em",
                textTransform: "uppercase",
                border: "2px solid #D4AF37",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = "transparent";
                el.style.color = "#D4AF37";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.backgroundColor = "#D4AF37";
                el.style.color = "#111111";
              }}
            >
              Book Now
            </button>

            {/* Secondary: Call */}
            <a
              href="tel:03194415757"
              className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.20em] transition-colors"
              style={{ color: "rgba(255,255,255,0.80)", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.80)")
              }
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0319 4415757
            </a>
          </div>

          {/* Stats row */}
          <div
            className="flex items-center gap-8 pt-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}
          >
            <div>
              <p className="text-2xl font-extrabold text-white">30K+</p>
              <p
                className="text-[11px] uppercase tracking-widest font-medium mt-0.5"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                Happy Clients
              </p>
            </div>
            <div
              className="w-px h-10"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            />
            <div>
              <p className="text-2xl font-extrabold text-white">5.0 ★</p>
              <p
                className="text-[11px] uppercase tracking-widest font-medium mt-0.5"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                Rated Excellence
              </p>
            </div>
            <div
              className="w-px h-10"
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            />
            <div>
              <p className="text-2xl font-extrabold text-white">15+</p>
              <p
                className="text-[11px] uppercase tracking-widest font-medium mt-0.5"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                Years of Craft
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into page */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, #FAFAFA 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
