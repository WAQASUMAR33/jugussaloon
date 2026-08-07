"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import ServiceMatrix from "../components/ServiceMatrix";
import Image from "next/image";

export default function ContactPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Bridal & Beauty Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                    className="w-full py-4 rounded-full bg-[#111111] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer shadow-md"
                  >
                    Send Message
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
                    <div className="w-8 h-8 rounded-full bg-[#F5E8C7] text-[#856404] flex items-center justify-center font-bold">
                      📍
                    </div>
                    <div>
                      <p className="font-bold text-[#111111] uppercase">Flagship Downtown Salon</p>
                      <p className="text-slate-600">124 High Street, Luxury District, City Center</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pt-2">
                    <div className="w-8 h-8 rounded-full bg-[#F5E8C7] text-[#856404] flex items-center justify-center font-bold">
                      📍
                    </div>
                    <div>
                      <p className="font-bold text-[#111111] uppercase">Uptown Boutique & Spa</p>
                      <p className="text-slate-600">58 Royal Avenue, West End</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 pt-2">
                    <div className="w-8 h-8 rounded-full bg-[#F5E8C7] text-[#856404] flex items-center justify-center font-bold">
                      📞
                    </div>
                    <div>
                      <p className="font-bold text-[#111111] uppercase">Phone Hotline</p>
                      <a href="tel:+11234567890" className="text-slate-700 hover:text-[#996515] font-semibold">
                        +1 (123) 456-7890
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

                <div className="pt-2">
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="w-full py-3 rounded-full border-2 border-[#111111] text-[#111111] font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all"
                  >
                    Reserve Appointment Directly
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Salon Services & Pricing Matrix */}
      <ServiceMatrix onOpenBooking={() => setBookingOpen(true)} />

      <Footer onOpenBooking={() => setBookingOpen(true)} />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </main>
  );
}
