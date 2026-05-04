import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import LiveTicker from "@/components/LiveTicker";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { LanguageProvider } from "@/lib/LanguageContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import { BookingProvider } from "@/lib/BookingContext";
import { AuthProvider } from "@/lib/AuthContext";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#00C4CC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Cirql — ningalkku chuttum",
  description: "Hyperlocal service booking platform for Kerala.",
  manifest: "/manifest.json",
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <ThemeProvider>
            <BookingProvider>
              <LanguageProvider>
                <Header />
                <LiveTicker />
                <main className="flex-1 pb-32">{children}</main>
                <WhatsAppFAB />
                <BottomNav />
              </LanguageProvider>
            </BookingProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

