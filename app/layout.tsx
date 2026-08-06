import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jugnu's Saloon | Full Luxury Beauty, Bridal & Hair Saloon",
  description:
    "Jugnu's Saloon is a full-service luxury beauty lounge offering HD Bridal Makeup, Party Glam, Hydrafacials, Hair Styling & Color, Nail Extensions, and Spa rituals. Book your appointment online today.",
  keywords: [
    "Jugnu's Saloon",
    "Beauty Saloon",
    "Bridal Makeup",
    "HD Makeup",
    "Party Glam",
    "Hydrafacial",
    "Hair Styling",
    "Nail Art",
    "Beauty Lounge",
    "Book Online",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans antialiased selection:bg-[#D4AF37] selection:text-black">
        {children}
      </body>
    </html>
  );
}
