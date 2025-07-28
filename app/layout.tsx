import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DJI Drone Control Dashboard | Professional Flight Control System",
  description:
    "Advanced drone control dashboard with real-time telemetry, live video streaming, and professional flight controls. Compatible with DJI Mavic Pro and other professional drones.",
  keywords: [
    "drone control",
    "DJI Mavic Pro",
    "flight control system",
    "drone telemetry",
    "live video streaming",
    "UAV control",
    "drone dashboard",
    "aerial photography",
    "professional drone",
  ],
  authors: [{ name: "Jawji Drone Systems" }],
  creator: "Jawji",
  publisher: "Jawji Drone Systems",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://drone-control.jawji.com",
    title: "DJI Drone Control Dashboard | Professional Flight Control",
    description:
      "Professional drone control dashboard with real-time telemetry and live video streaming.",
    siteName: "Jawji Drone Control",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Drone Control Dashboard Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Drone Control Dashboard",
    description: "Advanced flight control system with real-time telemetry.",
    images: ["/twitter-image.jpg"],
    creator: "@jawji_drones",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://drone-control.jawji.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={inter.className}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "DJI Drone Control Dashboard",
              description:
                "Professional drone control system with real-time telemetry and live video streaming.",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "150",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
