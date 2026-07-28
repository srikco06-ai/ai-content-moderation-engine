import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),

  title: {
    default: "AI Content Moderation Engine",
    template: "%s | AI Content Moderation Engine",
  },

  description:
    "AI-powered content moderation dashboard built with Next.js and FastAPI for detecting toxic, abusive, hateful, and unsafe content.",

  keywords: [
    "AI",
    "Content Moderation",
    "FastAPI",
    "Next.js",
    "Machine Learning",
    "NLP",
    "Toxicity Detection",
    "Artificial Intelligence",
  ],

  authors: [
    {
      name: "Sri Krishna Chaitanya Ogirala",
    },
  ],

  applicationName: "AI Content Moderation Engine",

  openGraph: {
    title: "AI Content Moderation Engine",
    description:
      "AI-powered moderation dashboard using FastAPI and Next.js.",
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Content Moderation Engine",
    description:
      "AI-powered moderation dashboard using FastAPI and Next.js.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900">
        {children}
      </body>
    </html>
  );
}