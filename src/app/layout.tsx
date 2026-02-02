
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Script from "next/script";
import { CursorGlow } from "@/components/cursor-glow";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { SpecialOfferProvider } from "@/components/special-offer-provider";
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget";

export const metadata: Metadata = {
  title: "Krishna Group",
  description: "Your future starts here. Comprehensive courses for personal and professional growth.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased"
        )}
      >
        <FirebaseClientProvider>
          <SpecialOfferProvider>
            <CursorGlow />
            <div className="relative flex min-h-dvh flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <ChatbotWidget />
          </SpecialOfferProvider>
        </FirebaseClientProvider>
        <Script async src="//www.instagram.com/embed.js" />
      </body>
    </html>
  );
}
