"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onOpenBooking?: (serviceName?: string) => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Our work", href: "/our-work" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md py-3 border-b border-slate-200 shadow-sm"
          : "bg-white py-4 border-b border-slate-100"
      }`}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#D4AF37] p-0.5 group-hover:scale-105 transition-transform bg-white">
            <Image
              src="/logo.png"
              alt="Jugnu's Saloon Logo"
              width={44}
              height={44}
              className="object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-lg sm:text-xl font-bold tracking-tight text-[#111111] group-hover:text-[#D4AF37] transition-colors">
              JUGNU&apos;S
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#996515] uppercase font-bold">
              SALOON
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10 text-xs font-semibold tracking-wider uppercase text-slate-800">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors py-1 relative ${
                  isActive
                    ? "text-[#996515] font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#D4AF37]"
                    : "hover:text-[#D4AF37] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all after:duration-300"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden sm:flex items-center space-x-4">
          {/* Phone Call Link */}
          <a
            href="tel:03194415757"
            className="text-xs tracking-wider uppercase text-slate-800 hover:text-[#996515] font-bold px-3 py-2 flex items-center space-x-1.5 transition-colors"
            title="Call Jugnu's Saloon at 0319 4415757"
          >
            <svg
              className="w-3.5 h-3.5 text-[#D4AF37]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>0319 4415757</span>
          </a>

          {/* Social Links */}
          <div className="flex items-center space-x-2 border-l border-slate-200 pl-3">
            <a
              href="https://www.instagram.com/jugnus_saloon_phalia/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#111111] text-slate-700 hover:text-[#D4AF37] flex items-center justify-center transition-all"
              title="Instagram"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@jugnusaloonphalia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-[#111111] text-slate-700 hover:text-[#D4AF37] flex items-center justify-center transition-all"
              title="TikTok"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 003 15.57 6.33 6.33 0 009.33 22 6.33 6.33 0 0015.66 15.67V9.4a8.16 8.16 0 004.84 1.57v-3.53a4.85 4.85 0 01-.91-.75z" />
              </svg>
            </a>
          </div>

          {onOpenBooking ? (
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#111111] hover:bg-[#D4AF37] hover:text-black transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Book Online
            </button>
          ) : (
            <Link
              href="/booking"
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#111111] hover:bg-[#D4AF37] hover:text-black transition-all shadow-md active:scale-95 text-center"
            >
              Book Online
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center space-x-3">
          {onOpenBooking ? (
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-[#111111]"
            >
              Book
            </button>
          ) : (
            <Link
              href="/booking"
              className="sm:hidden px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-[#111111]"
            >
              Book
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 hover:text-[#D4AF37] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold tracking-widest uppercase text-slate-800 hover:text-[#D4AF37] border-b border-slate-100"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            {onOpenBooking ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-full text-center text-xs font-bold uppercase tracking-wider text-white bg-[#111111]"
              >
                Book Appointment Now
              </button>
            ) : (
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3 rounded-full text-center text-xs font-bold uppercase tracking-wider text-white bg-[#111111]"
              >
                Book Appointment Now
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
