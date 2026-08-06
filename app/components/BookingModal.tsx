"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialService = "",
}: BookingModalProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>(initialService);
  const [selectedStylist, setSelectedStylist] = useState<string>("Any Master Artist");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("11:30 AM");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [bookingRef, setBookingRef] = useState<string>("");

  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = "JS-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setStep(3);
  };

  const resetAndClose = () => {
    setStep(1);
    setBookingRef("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-[#111111]">
        {/* Header Bar */}
        <div className="p-6 bg-[#FAFAFA] border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] p-0.5 bg-white">
              <Image
                src="/logo.png"
                alt="JS Logo"
                width={40}
                height={40}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-sans text-base font-bold text-[#111111] uppercase">
                RESERVE BEAUTY APPOINTMENT
              </h3>
              <p className="text-[10px] text-[#996515] uppercase tracking-widest font-bold">
                Jugnu&apos;s Saloon Booking
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors font-bold"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#996515] font-bold">
                  Step 1 of 2
                </span>
                <h4 className="font-sans text-lg font-bold">Select Service & Preferences</h4>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                  Choose Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-slate-300 text-[#111111] focus:border-[#D4AF37] focus:outline-none text-xs font-medium"
                >
                  <option value="">-- Select A Beauty Service --</option>
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

              {/* Artist Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                  Preferred Beauty Artist
                </label>
                <select
                  value={selectedStylist}
                  onChange={(e) => setSelectedStylist(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-slate-300 text-[#111111] focus:border-[#D4AF37] focus:outline-none text-xs font-medium"
                >
                  <option value="Any Master Artist">Any Master Artist (First Available)</option>
                  <option value="Ayesha Khan">Ayesha Khan (Lead Bridal Makeup Artist)</option>
                  <option value="Elena Rostova">Elena Rostova (Hair Styling Director)</option>
                  <option value="Sophia Chen">Sophia Chen (Hydrafacial Specialist)</option>
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-slate-300 text-[#111111] focus:border-[#D4AF37] focus:outline-none text-xs font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-slate-300 text-[#111111] focus:border-[#D4AF37] focus:outline-none text-xs font-medium"
                  >
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="06:30 PM">06:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedService) {
                      alert("Please select a service before continuing.");
                      return;
                    }
                    setStep(2);
                  }}
                  className="w-full py-3.5 rounded-full bg-[#111111] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer"
                >
                  Continue &rarr;
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#996515] font-bold">
                  Step 2 of 2
                </span>
                <h4 className="font-sans text-lg font-bold">Your Contact Information</h4>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F8F8F6] border border-slate-200 text-xs flex justify-between items-center">
                <div>
                  <p className="font-bold text-[#111111]">{selectedService}</p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {selectedStylist} • {selectedDate || "Next Available"} at {selectedTime}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-[11px] text-[#996515] underline font-bold"
                >
                  Edit
                </button>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-slate-300 text-[#111111] focus:border-[#D4AF37] focus:outline-none text-xs font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-slate-300 text-[#111111] focus:border-[#D4AF37] focus:outline-none text-xs font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-slate-300 text-[#111111] focus:border-[#D4AF37] focus:outline-none text-xs font-medium"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-full border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-100"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3.5 rounded-full bg-[#111111] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer shadow-md"
                >
                  Confirm Reservation
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="py-8 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#F5E8C7] border-2 border-[#D4AF37] text-[#856404] mx-auto flex items-center justify-center text-2xl font-bold">
                ✓
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-[#996515] font-bold">
                  Reservation Confirmed!
                </span>
                <h4 className="font-sans text-2xl font-extrabold text-[#111111]">
                  WE LOOK FORWARD TO YOUR BEAUTY VISIT
                </h4>
                <p className="text-slate-600 text-xs font-normal max-w-md mx-auto">
                  Thank you, <strong className="text-[#111111]">{clientName || "Valued Client"}</strong>. A confirmation SMS & email have been sent with your booking pass.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F8F6] border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Booking Ref:</span>
                  <span className="font-mono text-[#996515] font-bold">{bookingRef}</span>
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

              <div>
                <button
                  onClick={resetAndClose}
                  className="px-8 py-3 rounded-full bg-[#111111] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
