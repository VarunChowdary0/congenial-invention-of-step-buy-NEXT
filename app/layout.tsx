import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Step Buy",
  description: "Your one-stop shop for everything",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/images/logo/favicon.ico", sizes: "any" },
      { url: "/images/logo/icon.png", type: "image/png" }
    ],
    apple: [
      { url: "/images/logo/apple-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}