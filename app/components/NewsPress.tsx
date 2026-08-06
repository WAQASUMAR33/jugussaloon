"use client";

import Image from "next/image";

export default function NewsPress() {
  const articles = [
    {
      badge: "News",
      title: "Beyond Haircuts: The signature Jugnu Saloon experience",
      excerpt:
        "At Jugnu's Saloon, every beauty transformation is a work of art. Discover how our artists bring your vision to life.",
      date: "25 July 2026",
      source: "Jugnu Saloon",
      image: "/images/bridal_makeup.png",
    },
    {
      badge: "Medical / Spa",
      title: "A look inside Jugnu Saloon's tranquil atmosphere",
      excerpt:
        "Step into a sanctuary of calm, organic head spa rinses, 24K gold hydrafacials, and private VIP suites.",
      date: "25 July 2026",
      source: "Jugnu Saloon",
      image: "/images/beauty_facial.png",
    },
    {
      badge: "News",
      title: "Jugnu Saloon's approach to customized hair & bridal design",
      excerpt:
        "Artistry, color science, and HD airbrush makeup come together for a unique personal aesthetic.",
      date: "25 July 2026",
      source: "Jugnu Saloon",
      image: "/images/hair_styling.png",
    },
  ];

  const testimonials = [
    {
      quote:
        "Jugnu's Saloon is unmatched in quality. The HD airbrush bridal makeup Ayesha created for me turned heads everywhere!",
      client: "Victoria Sterling",
      stars: 5,
    },
    {
      quote:
        "The attention to detail, 24K gold facial, and warm hospitality make this the best beauty salon in the city.",
      client: "Alexander Hayes",
      stars: 5,
    },
    {
      quote:
        "The gold monogram logo matches their high skill. My keratin smoothing treatment and party glam were completely flawless.",
      client: "Sophia Lauren",
      stars: 5,
    },
  ];

  return (
    <section id="our-work" className="py-24 bg-[#FAFAFA] relative">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#111111] uppercase tracking-tight">
            OUR WORK & REVIEWS
          </h2>
          <p className="text-slate-600 text-sm font-normal">
            Read recent press stories and real reviews from our valued salon clients.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {articles.map((article, idx) => (
            <article
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-xl"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-white/90 text-[#111111] shadow-sm">
                    {article.badge}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-sans text-base font-bold text-[#111111] group-hover:text-[#996515] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-normal leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>{article.source}</span>
                <span className="text-[#996515] font-bold">{article.date}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Testimonials Panel */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-sans text-2xl font-bold text-[#111111] uppercase">
              WHAT OUR CLIENTS SAY
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F8F8F6] border border-slate-200 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex text-[#D4AF37] text-sm">
                    {"★".repeat(t.stars)}
                  </div>
                  <p className="text-slate-700 text-xs italic leading-relaxed font-normal">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <p className="font-sans text-xs font-bold text-[#111111]">
                    {t.client}
                  </p>
                  <p className="text-[10px] uppercase font-bold text-[#996515]">
                    Verified Client
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
