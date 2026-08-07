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
  duration: string;
}

interface CategoryData {
  id: string;
  label: string;
  icon: string;
  headline: string;
  subline: string;
  services: ServiceItem[];
  image: string;
}

const categories: CategoryData[] = [
  {
    id: "bridal",
    label: "Bridal & Makeup",
    icon: "✦",
    headline: "Bridal & Glamour Makeup",
    subline: "HD Airbrush transformations crafted for your most important day.",
    image: "/images/bridal_makeup.png",
    services: [
      { id: "b1", name: "Royal HD Airbrush Bridal Glam", price: "$350", duration: "180 min" },
      { id: "b2", name: "Engagement & Reception Look", price: "$220", duration: "120 min" },
      { id: "b3", name: "Celebration Party Makeup", price: "$130", duration: "75 min" },
      { id: "b4", name: "Signature Eye Makeup & Lashes", price: "$75", duration: "45 min" },
      { id: "b5", name: "Soft Glow Event Makeup", price: "$95", duration: "60 min" },
    ],
  },
  {
    id: "facials",
    label: "Facials & Skin",
    icon: "◈",
    headline: "Facials & Skin Spa",
    subline: "Deep-nourishing rituals that reveal your most luminous self.",
    image: "/images/beauty_facial.png",
    services: [
      { id: "f1", name: "24K Gold Hydrafacial Spa", price: "$160", duration: "75 min" },
      { id: "f2", name: "Organic Deep Cleanse Ritual", price: "$110", duration: "60 min" },
      { id: "f3", name: "Collagen Anti-Aging Lifting", price: "$180", duration: "90 min" },
      { id: "f4", name: "Radiance Vitamin C Glow", price: "$125", duration: "60 min" },
      { id: "f5", name: "Herbal Polish & Exfoliation", price: "$85", duration: "45 min" },
    ],
  },
  {
    id: "hair",
    label: "Hair & Styling",
    icon: "◇",
    headline: "Haircuts, Styling & Color",
    subline: "Precision cuts, signature balayage and restorative hair rituals.",
    image: "/images/hair_styling.png",
    services: [
      { id: "h1", name: "Couture Layered Cut & Blowout", price: "$85", duration: "60 min" },
      { id: "h2", name: "Signature Hand-Painted Balayage", price: "$220", duration: "150 min" },
      { id: "h3", name: "Full Head Foil Highlights", price: "$190", duration: "120 min" },
      { id: "h4", name: "Brazilian Keratin Smoothing", price: "$250", duration: "120 min" },
      { id: "h5", name: "Deep Scalp Detox Treatment", price: "$95", duration: "45 min" },
    ],
  },
  {
    id: "nails",
    label: "Nails & Spa",
    icon: "◉",
    headline: "Nails & Mani-Pedi Spa",
    subline: "Luxury gel extensions, 3D art and relaxing spa manicures.",
    image: "/images/hair_washing.png",
    services: [
      { id: "n1", name: "Full Set Gel / Acrylic Extensions", price: "$110", duration: "90 min" },
      { id: "n2", name: "Royal Rose Petal Mani-Pedi", price: "$95", duration: "75 min" },
      { id: "n3", name: "Custom 3D Acrylic Nail Art", price: "$45", duration: "30 min" },
      { id: "n4", name: "Paraffin Hydrating Spa Pedi", price: "$65", duration: "50 min" },
      { id: "n5", name: "Classic French Gel Overlay", price: "$55", duration: "40 min" },
    ],
  },
];

const workflowSteps = [
  {
    num: "01",
    title: "Consultation",
    desc: "Tell us your vision — bridal, everyday glam, or a full spa day.",
  },
  {
    num: "02",
    title: "Choose Service",
    desc: "Pick from our curated menu of premium beauty treatments.",
  },
  {
    num: "03",
    title: "Book Appointment",
    desc: "Reserve your preferred slot in seconds — online or by call.",
  },
  {
    num: "04",
    title: "Experience Luxury",
    desc: "Arrive, relax, and leave looking and feeling extraordinary.",
  },
];

export default function ServiceAndWorkflowSection({
  onOpenBooking,
}: ServiceAndWorkflowSectionProps) {
  const [activeId, setActiveId] = useState("bridal");
  const current = categories.find((c) => c.id === activeId) || categories[0];

  return (
    <section
      id="services"
      className="relative bg-[#0A0A0B] text-white overflow-hidden"
      style={{ padding: "100px 0 120px" }}
    >
      {/* ── Background Gold Atmosphere ─────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* top-left bloom */}
        <div
          className="absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.22) 0%, transparent 68%)",
            filter: "blur(80px)",
          }}
        />
        {/* bottom-right bloom */}
        <div
          className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 68%)",
            filter: "blur(80px)",
          }}
        />
        {/* centre whisper */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        {/* thin gold top border line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
          }}
        />
      </div>

      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">

        {/* ── Section Heading ──────────────────────────────────── */}
        <div className="text-center mb-16 space-y-3">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: "#D4AF37" }}
          >
            Our Services
          </p>
          <h2
            className="font-sans font-extrabold leading-tight text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            Beauty, Bridal & Spa Services
          </h2>
          <div
            className="w-14 h-[2px] mx-auto"
            style={{ backgroundColor: "#D4AF37", opacity: 0.5 }}
          />
        </div>

        {/* ── Category Tabs ────────────────────────────────────── */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-12">
          {categories.map((cat) => {
            const active = cat.id === activeId;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className="cursor-pointer transition-all duration-200"
                style={{
                  padding: "10px 26px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  border: active
                    ? "1.5px solid #D4AF37"
                    : "1.5px solid rgba(255,255,255,0.12)",
                  backgroundColor: active
                    ? "#D4AF37"
                    : "rgba(255,255,255,0.04)",
                  color: active ? "#111111" : "rgba(255,255,255,0.65)",
                  boxShadow: active
                    ? "0 0 20px rgba(212,175,55,0.25)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.28)";
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.12)";
                    e.currentTarget.style.backgroundColor =
                      "rgba(255,255,255,0.04)";
                  }
                }}
              >
                <span style={{ marginRight: "8px", opacity: 0.7 }}>
                  {cat.icon}
                </span>
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ── Main Panel ───────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: "20px",
            background: "#111113",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
          }}
        >
          {/* LEFT — Service List */}
          <div
            className="flex flex-col justify-between"
            style={{
              padding: "44px 48px",
              borderRight: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* heading */}
            <div className="mb-8">
              <h3
                className="font-sans font-extrabold text-white leading-snug"
                style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)" }}
              >
                {current.headline}
              </h3>
              <p
                className="mt-2 text-[13px] font-normal leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {current.subline}
              </p>
            </div>

            {/* service rows */}
            <div
              className="flex-1"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {current.services.map((item, idx) => (
                <div
                  key={item.id}
                  className="group flex items-center justify-between gap-4 transition-all duration-150"
                  style={{
                    padding: "18px 0",
                    borderBottom:
                      idx < current.services.length - 1
                        ? "1px solid rgba(255,255,255,0.07)"
                        : "none",
                  }}
                >
                  {/* name + duration */}
                  <div className="min-w-0">
                    <p
                      className="font-semibold text-white text-sm leading-snug"
                      style={{ letterSpacing: "0.01em" }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-[11px] mt-0.5"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {item.duration}
                    </p>
                  </div>

                  {/* price + book */}
                  <div className="flex items-center gap-5 flex-shrink-0">
                    <span
                      className="font-bold font-mono text-base"
                      style={{ color: "#D4AF37" }}
                    >
                      {item.price}
                    </span>
                    <button
                      onClick={() => onOpenBooking(item.name)}
                      className="cursor-pointer transition-all duration-200"
                      style={{
                        padding: "7px 18px",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        border: "1px solid rgba(255,255,255,0.18)",
                        borderRadius: "3px",
                        background: "transparent",
                        color: "rgba(255,255,255,0.6)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#D4AF37";
                        e.currentTarget.style.borderColor = "#D4AF37";
                        e.currentTarget.style.color = "#111111";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.18)";
                        e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                      }}
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <button
                onClick={() => onOpenBooking()}
                className="w-full cursor-pointer font-bold uppercase tracking-widest transition-all duration-200"
                style={{
                  padding: "15px 0",
                  fontSize: "11px",
                  borderRadius: "4px",
                  background: "#D4AF37",
                  color: "#111111",
                  border: "2px solid #D4AF37",
                  boxShadow: "0 8px 24px rgba(212,175,55,0.20)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#D4AF37";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#D4AF37";
                  e.currentTarget.style.color = "#111111";
                }}
              >
                Book a Consultation
              </button>
            </div>
          </div>

          {/* RIGHT — Category Hero Image */}
          <div className="relative min-h-[400px] lg:min-h-[580px] overflow-hidden">
            <Image
              key={current.id}
              src={current.image}
              alt={current.headline}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* dark left-side fade for blending */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, rgba(17,17,19,0.65) 0%, transparent 45%)",
              }}
            />
            {/* bottom overlay with gold accent bar */}
            <div
              className="absolute bottom-0 left-0 right-0 p-8"
              style={{
                background:
                  "linear-gradient(to top, rgba(10,10,11,0.85) 0%, transparent 100%)",
              }}
            >
              <div
                className="w-10 h-[2px] mb-3"
                style={{ backgroundColor: "#D4AF37" }}
              />
              <p
                className="font-extrabold text-white"
                style={{ fontSize: "1.15rem", letterSpacing: "0.02em" }}
              >
                {current.headline}
              </p>
              <p
                className="text-[12px] mt-1"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                {current.services.length} signature treatments
              </p>
            </div>
          </div>
        </div>

        {/* ── How It Works ─────────────────────────────────────── */}
        <div className="mt-20">
          {/* heading row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div className="space-y-2">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: "#D4AF37" }}
              >
                How It Works
              </p>
              <h3
                className="font-sans font-extrabold text-white leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                Your journey to beauty —{" "}
                <span style={{ color: "#D4AF37" }}>four simple steps.</span>
              </h3>
            </div>
            <button
              onClick={() => onOpenBooking()}
              className="cursor-pointer self-start sm:self-auto font-bold uppercase tracking-widest transition-all duration-200 flex-shrink-0"
              style={{
                padding: "13px 32px",
                fontSize: "11px",
                borderRadius: "4px",
                background: "transparent",
                color: "#D4AF37",
                border: "1.5px solid rgba(212,175,55,0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D4AF37";
                e.currentTarget.style.color = "#111111";
                e.currentTarget.style.borderColor = "#D4AF37";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#D4AF37";
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)";
              }}
            >
              Get a Consultation
            </button>
          </div>

          {/* steps grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((step, idx) => (
              <div
                key={step.num}
                className="relative group transition-all duration-200"
                style={{
                  padding: "32px 28px",
                  background: "#111113",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(212,175,55,0.4)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 0 30px rgba(212,175,55,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* connector line (not on last) */}
                {idx < workflowSteps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-[52px] right-0 w-4 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(212,175,55,0.3), transparent)",
                      transform: "translateX(100%)",
                      zIndex: 1,
                    }}
                  />
                )}

                {/* step number */}
                <div
                  className="font-bold font-mono mb-5"
                  style={{
                    fontSize: "2rem",
                    color: "rgba(212,175,55,0.18)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {step.num}
                </div>

                {/* gold accent */}
                <div
                  className="w-7 h-[2px] mb-4"
                  style={{ backgroundColor: "#D4AF37", opacity: 0.6 }}
                />

                <h4
                  className="font-sans font-bold text-white mb-2"
                  style={{ fontSize: "0.95rem" }}
                >
                  {step.title}
                </h4>
                <p
                  className="text-[12px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.40)" }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
