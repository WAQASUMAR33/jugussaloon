"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { bookAppointment, getServices, ServiceItem } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function BookingPage() {
  const { customer, isAuthenticated, openAuthModal } = useAuth();

  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("11:30 AM");
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [bookingRef, setBookingRef] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");
  const [liveServices, setLiveServices] = useState<ServiceItem[]>([]);
  const [loadingServices, setLoadingServices] = useState<boolean>(true);

  // Autofill if customer is logged in
  useEffect(() => {
    if (customer) {
      setClientName(customer.name || "");
      setClientPhone(customer.phone_no1 || "");
    }
  }, [customer]);

  useEffect(() => {
    async function loadServices() {
      try {
        setLoadingServices(true);
        const services = await getServices();
        if (services && services.length > 0) {
          setLiveServices(services);
          setSelectedService(String(services[0].id));
        }
      } catch (err) {
        console.error("[BookingPage] Error loading live services:", err);
      } finally {
        setLoadingServices(false);
      }
    }
    loadServices();

    // Default preferred date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    // If not authenticated, prompt sign in first
    if (!isAuthenticated && !customer) {
      openAuthModal(
        "Please sign in or register to complete your reservation.",
        (loggedCustomer) => {
          setClientName(loggedCustomer.name);
          setClientPhone(loggedCustomer.phone_no1);
        }
      );
      return;
    }

    if (!clientName.trim() || !clientPhone.trim()) {
      setApiError("Please enter your full name and phone number.");
      return;
    }

    setIsSubmitting(true);
    setApiError("");

    // Convert time to 24-hour HH:mm
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

    // Match service ID
    const matchedService = liveServices.find(
      (s) =>
        String(s.id) === selectedService ||
        s.title.toLowerCase() === selectedService.toLowerCase()
    );

    const serviceIdNum = matchedService
      ? matchedService.id
      : parseInt(selectedService, 10) || 1;
    const serviceTitle = matchedService ? matchedService.title : selectedService;

    const payload = {
      customer_name: clientName.trim(),
      customer_phone: clientPhone.trim(),
      customer_email: clientEmail.trim() || undefined,
      appointment_date: selectedDate || new Date().toISOString().split("T")[0],
      start_time: formattedTime,
      service_ids: [serviceIdNum],
      notes: notes.trim()
        ? `Service: ${serviceTitle} | Notes: ${notes.trim()}`
        : `Service Reserved: ${serviceTitle}`,
      receipt_image: receiptFile,
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
        setApiError(
          res.error ||
            res.message ||
            "Failed to book appointment. Please verify details."
        );
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setApiError(err?.message || "Connection error. Please try again.");
    }
  };

  const getSelectedServiceTitle = () => {
    const matched = liveServices.find(
      (s) =>
        String(s.id) === selectedService ||
        s.title.toLowerCase() === selectedService.toLowerCase()
    );
    return matched ? matched.title : selectedService || "Custom Service";
  };

  const getSelectedServicePrice = () => {
    const matched = liveServices.find(
      (s) =>
        String(s.id) === selectedService ||
        s.title.toLowerCase() === selectedService.toLowerCase()
    );
    if (matched) {
      const finalPrice = matched.discounted_price || matched.price;
      return `Rs. ${finalPrice.toLocaleString()}`;
    }
    return "Rs. 2,500";
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#111111] relative">
      <Navbar />

      <section className="pt-36 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full" />
            <p className="text-slate-600 text-xs font-normal">
              Jugnu&apos;s Saloon • Select your service and reserve your spot in seconds.
            </p>
          </div>

          {/* Member Login Notice if not logged in */}
          {!isAuthenticated && (
            <div className="mb-8 max-w-xl mx-auto p-4 rounded-2xl bg-[#111111] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="space-y-0.5 text-center sm:text-left">
                <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  Client Authentication
                </p>
                <p className="text-[11px] text-slate-300">
                  Sign in or create an account for 1-click booking & member perks.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openAuthModal(
                    "Sign in or register to book your appointment.",
                    (logged) => {
                      setClientName(logged.name);
                      setClientPhone(logged.phone_no1);
                    }
                  )
                }
                className="px-5 py-2.5 rounded-full bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all whitespace-nowrap cursor-pointer"
              >
                Sign In / Register
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 max-w-xl mx-auto">
              {/* Service Selection */}
              <div>
                <label className="block text-xs uppercase font-bold text-slate-700 mb-1.5">
                  Select Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-xs font-medium text-[#111111] focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="">
                    {loadingServices
                      ? "-- Loading Live API Services... --"
                      : "-- Choose A Beauty Service --"}
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

              {apiError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center">
                  ⚠️ {apiError}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  if (!selectedService) {
                    setApiError("Please select a service before continuing.");
                    return;
                  }
                  setApiError("");
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
              {apiError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center">
                  ⚠️ {apiError}
                </div>
              )}

              <div className="p-4 rounded-2xl bg-[#F8F8F6] border border-slate-200 text-xs flex justify-between items-center">
                <div>
                  <p className="font-bold text-[#111111]">{getSelectedServiceTitle()}</p>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {selectedDate} at {selectedTime} •{" "}
                    <span className="text-[#996515] font-bold">
                      {getSelectedServicePrice()}
                    </span>
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
                  Full Name *
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
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    placeholder="0300 1234567"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-xs font-medium text-[#111111] focus:border-[#D4AF37] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-bold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-xs font-medium text-[#111111] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-slate-700 mb-1">
                  Special Notes / Requests (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bridal dressing, sensitive skin, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-xs font-medium text-[#111111] focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Advance Payment Receipt Upload */}
              <div>
                <label className="block text-xs uppercase font-bold text-slate-700 mb-1">
                  Advance Payment Receipt (Optional, Max 5MB)
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setReceiptFile(e.target.files[0]);
                    }
                  }}
                  className="w-full p-2.5 rounded-xl bg-[#FAFAFA] border border-slate-300 text-[#111111] text-xs file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#111111] file:text-[#D4AF37] hover:file:bg-black cursor-pointer"
                />
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3.5 rounded-full border border-slate-300 text-slate-700 text-xs font-bold uppercase hover:bg-slate-100 transition-colors"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-3.5 rounded-full bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Confirm & Reserve"}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center space-y-6 max-w-md mx-auto py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto border-2 border-emerald-500">
                ✓
              </div>

              <div className="space-y-1">
                <h2 className="font-sans text-2xl font-extrabold uppercase text-[#111111]">
                  RESERVATION CONFIRMED
                </h2>
                <p className="text-xs text-slate-600 font-normal">
                  Thank you, <span className="font-bold text-[#111111]">{clientName}</span>. Your appointment has been recorded.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-slate-200 text-xs text-left space-y-2.5">
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
                  <span className="text-slate-500">Phone Contact:</span>
                  <span className="font-bold">{clientPhone}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/"
                  className="w-full py-3.5 rounded-full bg-[#111111] text-white text-center font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all"
                >
                  Return to Home
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
