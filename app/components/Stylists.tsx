"use client";

import Image from "next/image";

interface StylistProps {
  onOpenBooking: (stylistName?: string) => void;
}

export default function Stylists({ onOpenBooking }: StylistProps) {
  const artists = [
    {
      name: "Ayesha Khan",
      role: "Lead HD Bridal & Glamour Makeup Artist",
      experience: "12+ Years Celebrity Makeup",
      image: "/images/bridal_makeup.png",
      bio: "Master of flawless HD airbrush bridal makeup, glowing complexion sculpting, and traditional draping.",
    },
    {
      name: "Elena Rostova",
      role: "Hair Styling & Balayage Director",
      experience: "10+ Years International Hair Care",
      image: "/images/hair_styling.png",
      bio: "Specialist in hand-painted balayage, red-carpet hair updos, and precision haircut architecture.",
    },
    {
      name: "Sophia Chen",
      role: "Aesthetician & Hydrafacial Expert",
      experience: "8+ Years Skincare & Spa Rituals",
      image: "/images/beauty_facial.png",
      bio: "Expert in 24K gold hydrafacials, organic skin radiance treatments, and lash extension artistry.",
    },
  ];

  return (
    <section id="stylists" className="py-24 bg-[#FFFFFF] border-t border-b border-slate-100 relative">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#111111] uppercase tracking-tight">
            MEET OUR BEAUTY & MAKEUP ARTISTS
          </h2>
          <p className="text-slate-600 text-sm font-normal">
            Our team of award-winning makeup artists and aestheticians bring world-class artistry to every appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artists.map((artist, idx) => (
            <div
              key={idx}
              className="bg-[#FAFAFA] rounded-2xl border border-slate-200 p-8 hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center space-y-4 group"
            >
              {/* Avatar Container */}
              <div className="relative w-36 h-36 rounded-full p-1 border-2 border-[#D4AF37] shadow-md group-hover:scale-105 transition-transform bg-white">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <div>
                <h3 className="font-sans text-xl font-bold text-[#111111] group-hover:text-[#996515] transition-colors">
                  {artist.name}
                </h3>
                <p className="text-xs uppercase font-bold text-[#996515] tracking-wider mt-1">
                  {artist.role}
                </p>
                <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                  {artist.experience}
                </p>
              </div>

              <p className="text-slate-600 text-xs font-normal leading-relaxed">
                {artist.bio}
              </p>

              <div className="pt-2 w-full">
                <button
                  onClick={() => onOpenBooking(`Appointment with ${artist.name}`)}
                  className="w-full py-3 rounded-full border border-slate-300 hover:border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-sm"
                >
                  Book With {artist.name.split(" ")[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
