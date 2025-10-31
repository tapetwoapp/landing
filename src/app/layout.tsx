import "./globals.css";

import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TapeTwo - Track what you watch. Build collections.",
  description:
    "With TapeTwo you can build collections, track what you've seen, and keep everything structured.",
  keywords: ["movies", "tracking", "collections", "film library", "watch list"],
  authors: [{ name: "TapeTwo" }],
  openGraph: {
    title: "TapeTwo - Your Personal Film Library",
    description: "Track movies and build collections your way",
    url: "https://tapetwo.com",
    siteName: "TapeTwo",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TapeTwo App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TapeTwo",
    description: "Track what you watch. Build collections.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
