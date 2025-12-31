import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BOTAK Studio | VFX & SFX Portfolio",
  description: "Professional Video Editor specializing in Visual Effects (VFX) and Sound Effects (SFX). Bringing your creative vision to life.",
  keywords: ["VFX", "SFX", "Video Editing", "Motion Graphics", "Visual Effects", "Portfolio"],
  authors: [{ name: "BOTAK Studio" }],
  icons: {
    icon: "/Botak.webp",
    shortcut: "/Botak.webp",
    apple: "/Botak.webp",
  },
  openGraph: {
    title: "BOTAK Studio | VFX & SFX Portfolio",
    description: "Professional Video Editor specializing in Visual Effects (VFX) and Sound Effects (SFX).",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
