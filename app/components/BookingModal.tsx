"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { bookAppointment, getServices, ServiceItem } from "../lib/api";

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
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("11:30 AM");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [bookingRef, setBookingRef] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");
  const [liveServices, setLiveServices] = useState<ServiceItem[]>([]);
  const [loadingServices, setLoadingServices] = useState<boolean>(true);

  // Load services live from backend API
  useEffect(() => {
    async function loadApiServices() {
      try {
        setLoadingServices(true);
        const data = await getServices();
        if (data && data.length > 0) {
          setLiveServices(data);

          // If initialService match exists in liveServices
          if (initialService) {
            const matched = data.find(
              (s) =>
                s.title.toLowerCase() === initialService.toLowerCase() ||
                String(s.id) === initialService
            );
            if (matched) {
              setSelectedService(String(matched.id));
            } else {
              setSelectedService(initialService);
            }
          } else {
            setSelectedService(String(data[0].id));
          }
        }
      } catch (err) {
        console.error("[Modal] Error fetching live services:", err);
      } finally {
        setLoadingServices(false);
      }
    }
    if (isOpen) {
      loadApiServices();
      // Default to tomorrow's date if empty
      if (!selectedDate) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setSelectedDate(tomorrow.toISOString().split("T")[0]);
      }
    }
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      setApiError("Please provide your full name and contact phone number.");
      return;
    }

    setIsSubmitting(true);
    setApiError("");

    // Format time from 12-hour AM/PM to 24-hour HH:mm format for backend API
    let formattedTime = "14:00";
    if (selectedTime) {
      const match = selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (match) {
        let hours = parseInt(match[1], 10);
        const minutes = match[2];
        const period = match[3].toUpperCase();
        if (period === "PM" && hours < 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
        formattedTime = `${String(hours).padStart(2, "0")}:${minutes}`;
      }
    }

    // Match service ID from liveServices
    const matchedService = liveServices.find(
      (s) => String(s.id) === selectedService || s.title.toLowerCase() === selectedService.toLowerCase()
    );

    const serviceIdNum = matchedService ? matchedService.id : (parseInt(selectedService, 10) || 1);
    const serviceTitle = matchedService ? matchedService.title : selectedService;

    const payload = {
      customer_name: clientName.trim(),
      customer_phone: clientPhone.trim(),
      customer_email: clientEmail.trim() || "client@jugnussaloon.com",
      appointment_date: selectedDate || new Date().toISOString().split("T")[0],
      start_time: formattedTime,
      service_ids: [serviceIdNum],
      notes: `Service Requested: ${serviceTitle}`,
    };

    try {
      const res = await bookAppointment(payload);
      setIsSubmitting(false);

      if (res.success && res.data?.booking_no) {
        setBookingRef(res.data.booking_no);
        setApiError("");
        setStep(3);
      } else if (res.success) {
        setBookingRef(res.data?.booking_no || "APT-" + Date.now().toString().slice(-6));
        setApiError("");
        setStep(3);
      } else {
        setApiError(res.error || res.message || "Failed to book appointment. Please check your details.");
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setApiError(err?.message || "An unexpected error occurred. Please try again.");
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setBookingRef("");
    setApiError("");
    onClose();
  };

  const getSelectedServiceTitle = () => {
    const matched = liveServices.find(
      (s) => String(s.id) === selectedService || s.title.toLowerCase() === selectedService.toLowerCase()
    );
    return matched ? matched.title : selectedService || "Custom Salon Service";
  };

  const getSelectedServicePrice = () => {
    const matched = liveServices.find(
      (s) => String(s.id) === selectedService || s.title.toLowerCase() === selectedService.toLowerCase()
    );
    if (matched) {
      const finalPrice = matched.discounted_price || matched.price;
      return `Rs. ${finalPrice.toLocaleString()}`;
    }
    return "Rs. 2,500";
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
                Jugnu&apos;s Saloon Booking System
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors font-bold cursor-pointer"
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
                <h4 className="font-sans text-lg font-bold">Select Service & Date</h4>
              </div>

              {/* Service Selection (Fetched Live via API) */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1.5">
                  Choose Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-[#111111] focus:border-[#D4AF37] focus:outline-none text-xs font-medium"
                >
                  <option value="">
                    {loadingServices ? "-- Loading Live API Services... --" : "-- Select A Service --"}
                  </option>
                  {liveServices.map((service) => {
                    const finalPrice = service.discounted_price || service.price;
                    const discountBadge =
                      service.discount && service.discount > 0
                        ? ` (${service.discount}% OFF)`
                        : "";
                    const optionText = `${service.title} - Rs. ${finalPrice.toLocaleString()}${discountBadge}`;
                    return (
                      <option key={service.id} value={String(service.id)}>
                        {optionText}
                      </option>
                    );
                  })}
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
                    className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-[#111111] focus:border-[#D4AF37] focus:outline-none text-xs font-medium"
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
                    className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-[#111111] focus:border-[#D4AF37] focus:outline-none text-xs font-medium"
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
                      setApiError("Please choose a service to proceed.");
                      return;
                    }
                    setApiError("");
                    setStep(2);
                  }}
                  className="w-full py-4 rounded-xl bg-[#111111] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer shadow-md"
                >
                  Continue to Contact Details &rarr;
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="text-center space-y-1 mb-2">
                <span className="text-[10px] uppercase tracking-widest text-[#996515] font-bold">
                  Step 2 of 2
                </span>
                <h4 className="font-sans text-lg font-bold">Client Contact & Confirmation</h4>
              </div>

              {/* Error Banner */}
              {apiError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center">
                  ⚠️ {apiError}
                </div>
              )}

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-[#111111]">{getSelectedServiceTitle()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date &amp; Time:</span>
                  <span className="font-bold text-[#111111]">
                    {selectedDate} at {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5">
                  <span className="text-slate-500">Estimated Total:</span>
                  <span className="font-extrabold text-[#996515] font-mono">
                    {getSelectedServicePrice()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ayesha Khan"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-slate-300 text-[#111111] focus:border-[#D4AF37] focus:outline-none text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  placeholder="0300 1234567"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-slate-300 text-[#111111] focus:border-[#D4AF37] focus:outline-none text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-bold mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FAFAFA] border border-slate-300 text-[#111111] focus:border-[#D4AF37] focus:outline-none text-xs"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3.5 px-5 rounded-xl border border-slate-300 text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors"
                >
                  &larr; Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? "Connecting to Server..." : "Confirm & Reserve Now"}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto border-2 border-emerald-500">
                ✓
              </div>

              <div className="space-y-1">
                <h4 className="font-sans text-xl font-extrabold uppercase text-[#111111]">
                  APPOINTMENT CONFIRMED!
                </h4>
                <p className="text-xs text-slate-600 font-normal">
                  Thank you, <span className="font-bold text-[#111111]">{clientName}</span>. Your appointment has been registered with Jugnu&apos;s Saloon.
                </p>
              </div>

              {/* Receipt Box */}
              <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-slate-200 space-y-2 text-xs text-left max-w-sm mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-bold uppercase">Booking Ref:</span>
                  <span className="font-bold text-[#996515] font-mono">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold">{getSelectedServiceTitle()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Date &amp; Time:</span>
                  <span className="font-bold">
                    {selectedDate} at {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Client Phone:</span>
                  <span className="font-bold">{clientPhone}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 font-normal max-w-xs mx-auto">
                Our team will contact you on WhatsApp / Phone to confirm your arrival time.
              </p>

              <button
                onClick={resetAndClose}
                className="w-full py-3.5 rounded-xl bg-[#111111] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all cursor-pointer"
              >
                Close Receipt
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
