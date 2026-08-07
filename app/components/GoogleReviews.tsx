"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface GoogleReview {
  id?: string;
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

interface GoogleReviewsData {
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
  place_url: string;
  name: string;
  is_live: boolean;
}

export default function GoogleReviews() {
  const [data, setData] = useState<GoogleReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/google-reviews");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to fetch Google Reviews:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const rating = data?.rating || 4.9;
  const totalReviews = data?.user_ratings_total || 148;
  const reviews = data?.reviews || [];
  const placeUrl = data?.place_url || "https://maps.google.com/?q=Jugnu+Saloon";

  return (
    <section id="google-reviews" className="py-20 bg-[#FAFAFA] relative border-t border-slate-200">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Heading - STRICT RULE: NO PILL TAGS OVER HEADINGS */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] uppercase tracking-tight">
            CLIENT REVIEWS & GOOGLE RATING
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal font-georgia">
            Read real, verified Google reviews from clients who have experienced Jugnu&apos;s Saloon.
          </p>
        </div>

        {/* Google Summary Header Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Google Icon Badge */}
            <div className="w-20 h-20 rounded-2xl bg-[#111111] border border-[#D4AF37]/40 flex items-center justify-center p-4 shadow-sm shrink-0">
              <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
            </div>

            {/* Score & Stars */}
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <span className="font-sans text-4xl sm:text-5xl font-black text-[#111111]">
                  {rating.toFixed(1)}
                </span>
                <div>
                  <div className="flex text-[#D4AF37] text-lg sm:text-xl font-bold tracking-tight">
                    {"★".repeat(Math.round(rating))}
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Google Customer Score
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                Based on <span className="font-bold text-[#111111]">{totalReviews}+ authentic Google reviews</span>
                {data?.is_live && (
                  <span className="ml-2 inline-flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live Sync
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={placeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#111111] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all shadow-sm flex items-center gap-2"
            >
              <span>Review Us on Google</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href={placeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#FAFAFA] text-[#111111] font-bold text-xs uppercase tracking-widest border border-slate-300 hover:border-[#111111] transition-all"
            >
              View on Google Maps
            </a>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                  </div>
                </div>
                <div className="h-3 bg-slate-100 rounded w-full"></div>
                <div className="h-3 bg-slate-100 rounded w-4/5"></div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.slice(0, visibleCount).map((review, idx) => (
              <div
                key={review.id || idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Author Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {review.profile_photo_url ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          className="w-12 h-12 rounded-full object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#111111] text-[#D4AF37] font-bold text-lg flex items-center justify-center border border-[#D4AF37]">
                          {review.author_name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-sans text-sm font-bold text-[#111111] group-hover:text-[#996515] transition-colors">
                          {review.author_name}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {review.relative_time_description}
                        </p>
                      </div>
                    </div>

                    {/* Google Badge Icon */}
                    <div title="Verified Google Review" className="text-slate-400 group-hover:text-[#4285F4] transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761H12.545z" />
                      </svg>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1.5 text-[#D4AF37] text-sm">
                    {"★".repeat(review.rating)}
                    <span className="text-[10px] uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold ml-1">
                      Verified Review
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-georgia font-normal line-clamp-4 group-hover:line-clamp-none transition-all">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-slate-600">
                    <svg className="w-3.5 h-3.5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Google Business Review
                  </span>
                  <a
                    href={placeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#996515] font-bold hover:underline"
                  >
                    View on Google &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && visibleCount < reviews.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="px-8 py-3.5 rounded-full bg-white text-[#111111] font-bold text-xs uppercase tracking-widest border border-slate-300 hover:border-[#D4AF37] hover:text-[#996515] transition-all shadow-sm"
            >
              Load More Google Reviews ({reviews.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
