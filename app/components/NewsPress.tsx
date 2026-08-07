"use client";

import Image from "next/image";
import GoogleReviews from "./GoogleReviews";

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

  return (
    <section id="our-work" className="py-24 bg-[#FAFAFA] relative">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - STRICT RULE: NO PILL TAGS OVER HEADINGS */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] uppercase tracking-tight">
            OUR WORK & PRESS
          </h2>
          <p className="text-slate-600 text-sm font-normal font-georgia">
            Read recent press stories and features from our valued salon clients.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-sans text-base font-bold text-[#111111] group-hover:text-[#996515] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-xs font-normal leading-relaxed font-georgia">
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
      </div>

      {/* Real Google Reviews Component */}
      <GoogleReviews />
    </section>
  );
}

