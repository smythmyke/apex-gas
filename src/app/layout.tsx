import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apex Image Gas - Medical Equipment Blog",
  description: "Expert insights on medical gas systems, X-ray equipment, and healthcare facility services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/apex_logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
        style={{ backgroundColor: '#ffffff', color: '#111827' }}
        suppressHydrationWarning
      >
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="footer-contact space-y-4">
                <h4 className="text-xl font-semibold">About Us</h4>
                <p className="text-gray-300">
                  Expert insights and updates from Apex Image Gas - your trusted source for medical-grade gas mixtures and X-ray equipment.
                </p>
              </div>
              <div className="footer-legal space-y-4">
                <p className="text-gray-300">&copy; 2024 Apex Image Gas. All rights reserved.</p>
                <ul className="flex space-x-4">
                  <li>
                    <Link href="https://apeximagegas.net/terms.html" className="text-blue-400 hover:text-blue-300">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="https://apeximagegas.net/privacy.html" className="text-blue-400 hover:text-blue-300">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
