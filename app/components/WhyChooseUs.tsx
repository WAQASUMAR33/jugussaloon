"use client";

interface WhyChooseUsProps {
  onOpenBooking: (serviceName?: string) => void;
}

export default function WhyChooseUs({ onOpenBooking }: WhyChooseUsProps) {
  const cards = [
    {
      title: "OUR SALON",
      subtitle: "Luxury Ambience",
      description:
        "Jugnu's Saloon offers bespoke beauty, makeup, private VIP suites, and complimentary tea in a serene atmosphere.",
      buttonText: "Book Appointment",
      action: () => onOpenBooking(),
      icon: (
        <svg
          className="w-6 h-6 text-[#996515]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
    {
      title: "WE LOVE TO SERVE",
      subtitle: "Artistry & Care",
      description:
        "Our certified master artists & aestheticians work with your features to deliver a personalized look that stands out.",
      buttonText: "Get Services",
      action: () => onOpenBooking(),
      icon: (
        <svg
          className="w-6 h-6 text-[#996515]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "GIFT VOUCHERS",
      subtitle: "Exclusive Pass",
      description:
        "Treat your loved ones to an unforgettable signature bridal makeover, 24K gold facial, or luxury spa treatment.",
      buttonText: "Buy A Gift Voucher",
      action: () => onOpenBooking("Gift Voucher Inquiry"),
      icon: (
        <svg
          className="w-6 h-6 text-[#996515]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V6a2 2 0 10-2 2h2zm0 13C10.832 19.877 8 18.23 8 15V8h8v7c0 3.23-2.832 4.877-4 6z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-[#FAFAFA] relative overflow-hidden">
      {/* Background Gold Glare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-6">
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#111111] uppercase tracking-tight leading-tight">
              A SIGNATURE BEAUTY EXPERIENCE LIKE NO OTHER
            </h2>
          </div>

          <div className="lg:col-span-6 flex items-center">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              At Jugnu&apos;s Saloon, we offer a complete luxury beauty lounge. Our artists work with your vision to deliver a personalized experience that elevates your confidence and natural glow.
            </p>
          </div>
        </div>

        {/* 3 White Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_35px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between text-center items-center space-y-6 group"
            >
              {/* Soft Taupe/Gold Icon Pill */}
              <div className="w-16 h-16 rounded-2xl bg-[#F5E8C7] border border-[#D4AF37]/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <div className="space-y-2">
                <h3 className="font-sans text-lg font-bold text-[#111111] uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-xs font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>

              <button
                onClick={item.action}
                className="w-full py-3 rounded-full border border-slate-300 hover:border-[#111111] text-[#111111] font-bold text-xs uppercase tracking-wider hover:bg-[#111111] hover:text-white transition-all cursor-pointer"
              >
                {item.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
