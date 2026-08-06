"use client";

import { useState } from "react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  image: string;
  badge?: string;
}

export default function ProductStore() {
  const [cartCount, setCartCount] = useState<number>(0);
  const [notification, setNotification] = useState<string | null>(null);

  const products: Product[] = [
    {
      id: "p1",
      name: "Jugnu Gold Ionic Blow Dryer",
      category: "Styling Tools",
      price: "$230.00",
      rating: 5,
      image: "/images/hair_products.png",
      badge: "Best Seller",
    },
    {
      id: "p2",
      name: "Argan Luxe Repair Serum",
      category: "Hair Treatment",
      price: "$65.00",
      rating: 5,
      image: "/images/hair_washing.png",
      badge: "Organic",
    },
    {
      id: "p3",
      name: "Keratin Nourishing Hair Mask",
      category: "Hair Treatment",
      price: "$85.00",
      rating: 4.9,
      image: "/images/hair_styling.png",
    },
    {
      id: "p4",
      name: "Titanium Precision Straightener",
      category: "Styling Tools",
      price: "$195.00",
      rating: 5,
      image: "/images/hero_salon.png",
    },
  ];

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setNotification(`Added "${productName}" to your salon shopping cart.`);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <section id="products" className="py-24 bg-[#FAFAFA] relative">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Cart Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#111111] uppercase">
              OUR PRODUCTS
            </h2>
            <p className="text-slate-600 text-sm font-normal mt-1">
              Experience the difference with top-tier products that enhance both the aesthetics and health of your hair & skin.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="px-4 py-2 rounded-full border border-slate-300 bg-white text-[#111111] font-bold text-xs flex items-center space-x-2 shadow-sm">
              <svg
                className="w-4 h-4 text-[#996515]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>Cart ({cartCount})</span>
            </div>

            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full border border-[#111111] hover:bg-[#111111] hover:text-white font-bold text-xs uppercase tracking-wider text-[#111111] transition-all"
            >
              Open Store
            </a>
          </div>
        </div>

        {/* Floating Notification */}
        {notification && (
          <div className="mb-6 p-3 rounded-full bg-[#111111] text-white text-xs font-bold uppercase tracking-wider text-center shadow-lg border border-[#D4AF37]">
            {notification}
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 bg-[#F8F8F6] rounded-xl p-4 flex items-center justify-center overflow-hidden mb-4">
                  {item.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#F5E8C7] text-[#856404] z-10 border border-[#D4AF37]/30">
                      {item.badge}
                    </span>
                  )}
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
                  />
                </div>

                <span className="text-[10px] uppercase font-bold tracking-widest text-[#996515]">
                  {item.category}
                </span>
                <h3 className="font-sans text-base font-bold text-[#111111] mt-1 group-hover:text-[#996515] transition-colors">
                  {item.name}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                <span className="font-bold text-base text-[#111111]">
                  {item.price}
                </span>

                <button
                  onClick={() => handleAddToCart(item.name)}
                  className="px-4 py-1.5 rounded-full border border-slate-300 hover:border-[#111111] hover:bg-[#111111] hover:text-white text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Store Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm relative overflow-hidden">
            {/* Background Gold Glare */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] mx-auto flex items-center justify-center text-[#111111] font-bold text-base">
              JS
            </div>
            <h3 className="font-sans text-xl font-bold text-[#111111] uppercase tracking-wide">
              JUGNU FLAGSHIP DOWNTOWN STORE
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              124 High Street, Luxury District • Open 7 Days A Week
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 rounded-full border border-slate-300 hover:border-[#111111] text-xs font-bold uppercase tracking-widest text-[#111111] hover:bg-[#111111] hover:text-white transition-all shadow-sm"
            >
              Click Here
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4 shadow-sm relative overflow-hidden">
            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] mx-auto flex items-center justify-center text-[#111111] font-bold text-base">
              JS
            </div>
            <h3 className="font-sans text-xl font-bold text-[#111111] uppercase tracking-wide">
              JUGNU UPTOWN BOUTIQUE STORE
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              58 Royal Avenue, West End • VIP Suites Available
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 rounded-full border border-slate-300 hover:border-[#111111] text-xs font-bold uppercase tracking-widest text-[#111111] hover:bg-[#111111] hover:text-white transition-all shadow-sm"
            >
              Click Here
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
