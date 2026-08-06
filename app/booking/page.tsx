"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function BookingPage() {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedStylist, setSelectedStylist] = useState<string>("Any Master Artist");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("11:30 AM");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [bookingRef, setBookingRef] = useState<string>("");

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = "JS-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setStep(3);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111] relative">
      <Navbar />

      <section className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="text-center space-y-2 mb-10">
            <div className="w-14 h-14 rounded-full border-2 border-[#D4AF37] p-0.5 mx-auto bg-white">
              <Image
                src="/logo.png"
                alt="JS Logo"
                width={56}
                height={56}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h1 className="font-sans text-3xl font-extrabold uppercase text-[#111111]">
              ONLINE APPOINTMENT RESERVATION
            </h1>
            <p className="text-slate-600 text-xs font-normal">
              Jugnu&apos;s Saloon • Select your service and reserve your spot in seconds.
            </p>
          </div>

          {step === 1 && (
            <div className="space-y-6 max-w-xl mx-auto">
              <div>
                <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                  Select Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-xs font-medium text-[#111111] focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="">-- Choose A Beauty Service --</option>
                  <option value="Royal HD Airbrush Bridal Makeover">
                    Royal HD Airbrush Bridal Makeover ($350.00)
                  </option>
                  <option value="Engagement & Reception Glam">
                    Engagement & Reception Glam ($220.00)
                  </option>
                  <option value="Celebration Party Glamour Makeup">
                    Celebration Party Glamour Makeup ($130.00)
                  </option>
                  <option value="24K Gold Hydrafacial & Glow Spa">
                    24K Gold Hydrafacial & Glow Spa ($160.00)
                  </option>
                  <option value="Couture Layered Cut & Volume Blowout">
                    Couture Layered Cut & Volume Blowout ($85.00)
                  </option>
                  <option value="Signature Hand-Painted Balayage">
                    Signature Hand-Painted Balayage ($220.00)
                  </option>
                  <option value="Full Set Gel / Acrylic Extensions">
                    Full Set Gel / Acrylic Extensions ($110.00)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                  Preferred Beauty Artist
                </label>
                <select
                  value={selectedStylist}
                  onChange={(e) => setSelectedStylist(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-xs font-medium text-[#111111] focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="Any Master Artist">Any Master Artist (First Available)</option>
                  <option value="Ayesha Khan">Ayesha Khan (Lead Bridal Makeup Artist)</option>
                  <option value="Elena Rostova">Elena Rostova (Hair Styling Director)</option>
                  <option value="Sophia Chen">Sophia Chen (Hydrafacial Specialist)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-xs font-medium text-[#111111] focus:border-[#D4AF37] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-xs font-medium text-[#111111] focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="06:30 PM">06:30 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!selectedService) {
                    alert("Please select a service before continuing.");
                    return;
                  }
                  setStep(2);
                }}
                className="w-full py-4 rounded-full bg-[#111111] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all shadow-md cursor-pointer"
              >
                Next Step &rarr;
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleConfirmBooking} className="space-y-5 max-w-xl mx-auto">
              <div className="p-4 rounded-2xl bg-[#F8F8F6] border border-slate-200 text-xs flex justify-between items-center">
                <div>
                  <p className="font-bold text-[#111111]">{selectedService}</p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {selectedStylist} • {selectedDate || "Today"} at {selectedTime}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[11px] text-[#996515] underline font-bold"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-xs font-medium text-[#111111] focus:border-[#D4AF37] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-bold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-xs font-medium text-[#111111] focus:border-[#D4AF37] focus:outline-none"
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
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-xs font-medium text-[#111111] focus:border-[#D4AF37] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3.5 rounded-full border border-slate-300 text-slate-700 text-xs font-bold uppercase"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-4 rounded-full bg-[#111111] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer shadow-md"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="py-8 text-center space-y-6 max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#F5E8C7] border-2 border-[#D4AF37] text-[#856404] mx-auto flex items-center justify-center text-2xl font-bold">
                ✓
              </div>

              <div className="space-y-1">
                <h2 className="font-sans text-2xl font-extrabold text-[#111111] uppercase">
                  RESERVATION CONFIRMED
                </h2>
                <p className="text-slate-600 text-xs font-normal">
                  Thank you, <strong className="text-[#111111]">{clientName}</strong>. A pass has been issued for your appointment.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8F8F6] border border-slate-200 text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Booking Ref:</span>
                  <span className="font-mono text-[#996515] font-bold text-sm">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-[#111111]">{selectedService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Artist:</span>
                  <span className="text-slate-700">{selectedStylist}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date & Time:</span>
                  <span className="text-slate-700">
                    {selectedDate || "Today"} at {selectedTime}
                  </span>
                </div>
              </div>

              <div className="flex justify-center space-x-4 pt-2">
                <Link
                  href="/"
                  className="px-8 py-3 rounded-full bg-[#111111] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-colors"
                >
                  Return Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
