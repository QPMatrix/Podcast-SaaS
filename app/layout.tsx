import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "@/provider/convex-clerk-client";
import AudioProvider from "@/provider/audio-provider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AetherCastr",
  description: "Generated your podcast using AI",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <AudioProvider>
          <body className={` ${manrope.className}`}>{children}</body>
        </AudioProvider>
      </html>
    </ConvexClerkProvider>
  );
}
