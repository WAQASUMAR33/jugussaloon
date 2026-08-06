"use client";

import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  onOpenBooking?: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  return (
    <footer id="contact" className="bg-[#0A0A0B] border-t border-[#D4AF37]/20 pt-20 pb-12 text-slate-300">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Logo & Newsletter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-16 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] p-0.5 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <Image
                src="/logo.png"
                alt="Jugnu's Saloon Emblem"
                width={64}
                height={64}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-sans text-2xl font-bold text-white tracking-wider">
                JUGNU&apos;S SALOON
              </h3>
              <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                EXQUISITE BEAUTY & BRIDAL ARTISTRY
              </p>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email for VIP offers..."
              className="px-4 py-3 rounded-lg bg-[#141417] border border-white/10 text-white placeholder-slate-500 text-xs focus:border-[#D4AF37] focus:outline-none min-w-[280px]"
            />
            <button
              onClick={() => alert("Thank you for subscribing to Jugnu VIP Salon Newsletter!")}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#F3E5AB] text-black font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16 text-xs">
          {/* Column 1: Our Salons */}
          <div className="space-y-4">
            <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-[#D4AF37]">
              OUR SALONS
            </h4>
            <div className="space-y-3 font-light text-slate-400">
              <div>
                <p className="font-semibold text-white uppercase tracking-wider">
                  Flagship Downtown Salon
                </p>
                <p>124 High Street, Luxury District</p>
                <p className="text-[11px] text-[#D4AF37] mt-0.5">Mon - Sat: 9:00 AM - 9:00 PM</p>
              </div>
              <div className="pt-2 border-t border-white/5">
                <p className="font-semibold text-white uppercase tracking-wider">
                  Uptown Boutique & Spa
                </p>
                <p>58 Royal Avenue, West End</p>
                <p className="text-[11px] text-[#D4AF37] mt-0.5">Sun: 10:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-[#D4AF37]">
              EXPLORE
            </h4>
            <ul className="space-y-2 font-light">
              <li>
                <Link href="/" className="hover:text-[#D4AF37] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D4AF37] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#D4AF37] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/our-work" className="hover:text-[#D4AF37] transition-colors">
                  Our work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Support */}
          <div className="space-y-4">
            <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-[#D4AF37]">
              HELP & POLICIES
            </h4>
            <ul className="space-y-2 font-light">
              <li>
                <Link href="/booking" className="hover:text-[#D4AF37] transition-colors">
                  Online Booking Pass
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D4AF37] transition-colors">
                  About Jugnu&apos;s Saloon
                </Link>
              </li>
              <li>
                <Link href="/our-work" className="hover:text-[#D4AF37] transition-colors">
                  Press & Reviews
                </Link>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#D4AF37]">
                  Privacy Policy & Hygiene
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#D4AF37]">
                  Cancellation Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Connected */}
          <div className="space-y-4">
            <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-[#D4AF37]">
              STAY CONNECTED
            </h4>
            <div className="space-y-2 font-light text-slate-300">
              <p className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-[#D4AF37]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a href="tel:+11234567890" className="hover:text-[#D4AF37]">
                  +1 (123) 456-7890
                </a>
              </p>

              <p className="flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-[#D4AF37]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href="mailto:info@jugnusaloon.com" className="hover:text-[#D4AF37]">
                  info@jugnusaloon.com
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {["Instagram", "Facebook", "YouTube", "LinkedIn"].map((platform, i) => (
                <span
                  key={i}
                  className="w-8 h-8 rounded-full bg-[#1A1A1D] border border-white/10 hover:border-[#D4AF37] text-slate-300 hover:text-[#D4AF37] flex items-center justify-center text-[10px] font-bold uppercase transition-colors cursor-pointer"
                  title={platform}
                >
                  {platform[0]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar with Developer Credit */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left text-slate-400 text-xs gap-4">
          <p>© 2026 Jugnu&apos;s Saloon. All Rights Reserved.</p>
          <p className="text-[12px] font-medium text-slate-300">
            Developed by{" "}
            <a
              href="https://rapidtechpro.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] hover:text-[#F3E5AB] font-bold underline underline-offset-4 transition-colors"
            >
              Rapidtechpro
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
