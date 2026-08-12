"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import NewsPress from "../components/NewsPress";
import LocationMap from "../components/LocationMap";
import Image from "next/image";
import { submitContact } from "../lib/api";

export default function ContactPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Bridal & Beauty Inquiry",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const res = await submitContact({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "03009876543",
      subject: formData.subject,
      message: formData.message,
    });
    
    setIsSubmitting(false);
    if (res.success && res.message) {
      setApiMessage(res.message);
    }
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111] relative">
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      {/* Hero Header Banner */}
      <section className="relative pt-32 pb-20 bg-[#111111] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/images/hero_salon.png"
            alt="Contact Jugnu's Saloon"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <h1 className="font-sans text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
            GET IN TOUCH WITH US
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Have questions about our bridal packages, hydrafacials, or appointments? We are here to help.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Grid */}
      <section className="py-20 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-[#F8F8F6] p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
              <h2 className="font-sans text-2xl font-extrabold text-[#111111] uppercase mb-2">
                SEND US A MESSAGE
              </h2>
              <p className="text-xs text-slate-600 font-normal mb-8">
                Fill out the form below and our salon concierge will respond within 2 hours.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-white border border-[#D4AF37] text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#F5E8C7] text-[#856404] mx-auto flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>
                  <h3 className="font-sans text-xl font-bold">MESSAGE RECEIVED!</h3>
                  <p className="text-xs text-slate-600 font-normal">
                    Thank you, {formData.name}. Our concierge team will reach out to you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Eleanor Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-[#111111] focus:border-[#D4AF37] focus:outline-none font-medium"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="client@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-[#111111] focus:border-[#D4AF37] focus:outline-none font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-[#111111] focus:border-[#D4AF37] focus:outline-none font-medium"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-700 mb-1">
                        Inquiry Type
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-[#111111] focus:border-[#D4AF37] focus:outline-none font-medium"
                      >
                        <option value="Bridal & Beauty Inquiry">Bridal & Beauty Inquiry</option>
                        <option value="Hair Styling & Balayage">Hair Styling & Balayage</option>
                        <option value="Skincare & Facials">Skincare & Facials</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold text-slate-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your event date or beauty preferences..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-[#111111] focus:border-[#D4AF37] focus:outline-none font-medium resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#111111] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending Message..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Direct Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#FAFAFA] p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="font-sans text-xl font-extrabold uppercase text-[#111111]">
                  CONTACT INFORMATION
                </h3>

                <div className="space-y-4 text-xs font-normal">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#F5E8C7] text-[#856404] flex items-center justify-center font-bold shrink-0">
                      📍
                    </div>
                    <div>
                      <p className="font-bold text-[#111111] uppercase">Jugnu&apos;s Saloon Phalia</p>
                      <p className="text-slate-600 text-xs">Phalia, Mandi Bahauddin, Punjab, Pakistan</p>
                      <a
                        href="https://maps.app.goo.gl/HfbmMwJ6ugTEAmPv8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#996515] font-bold text-xs hover:underline inline-block mt-1"
                      >
                        Open Pin in Google Maps ↗
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <div className="w-8 h-8 rounded-full bg-[#F5E8C7] text-[#856404] flex items-center justify-center font-bold">
                      📞
                    </div>
                    <div>
                      <p className="font-bold text-[#111111] uppercase">Phone & WhatsApp Hotline</p>
                      <a href="tel:03194415757" className="text-slate-700 hover:text-[#996515] font-semibold text-sm">
                        0319 4415757
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <div className="w-8 h-8 rounded-full bg-[#F5E8C7] text-[#856404] flex items-center justify-center font-bold">
                      ✉️
                    </div>
                    <div>
                      <p className="font-bold text-[#111111] uppercase">Email Inquiries</p>
                      <a href="mailto:info@jugnusaloon.com" className="text-slate-700 hover:text-[#996515] font-semibold">
                        info@jugnusaloon.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <p className="font-bold text-xs text-[#111111] uppercase tracking-wider">
                    Follow Jugnu&apos;s Saloon Online
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://www.instagram.com/jugnus_saloon_phalia/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-black font-bold text-xs transition-all flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span>Instagram</span>
                    </a>

                    <a
                      href="https://www.tiktok.com/@jugnusaloonphalia"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-[#111111] text-white hover:bg-[#D4AF37] hover:text-black font-bold text-xs transition-all flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.57 6.33 6.33 0 009.33 22 6.33 6.33 0 0015.66 15.67V9.4a8.16 8.16 0 004.84 1.57v-3.53a4.85 4.85 0 01-.91-.75z" />
                      </svg>
                      <span>TikTok</span>
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="w-full py-3 rounded-full border-2 border-[#111111] text-[#111111] font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all cursor-pointer"
                  >
                    Reserve Appointment Directly
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google 5-Star Reviews & Testimonials Section */}
      <NewsPress />

      {/* Saloon Location & Interactive Google Map Section */}
      <LocationMap />

      <Footer onOpenBooking={() => setBookingOpen(true)} />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </main>
  );
}
