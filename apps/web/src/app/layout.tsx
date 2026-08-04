import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quboolnikahapp.com"),
  title: {
    default: "Qubool Nikah App",
    template: "%s | Qubool Nikah App",
  },
  description: "A privacy-first matrimonial platform designed for meaningful Muslim marriages.",
  keywords: ["nikah", "matrimonial", "Muslim marriage", "matchmaking", "privacy"],
  openGraph: {
    title: "Qubool Nikah App",
    description: "A privacy-first matrimonial platform designed for meaningful Muslim marriages.",
    url: "https://quboolnikahapp.com",
    siteName: "Qubool Nikah App",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Qubool Nikah App" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qubool Nikah App",
    description: "A privacy-first matrimonial platform designed for meaningful Muslim marriages.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
