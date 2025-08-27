// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/modules/navbar";
import Footer from "@/components/modules/footer";
import { Providers } from "@/components/providers"; // client wrapper

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Clothify',
  icons: {
    icon: '', // Path inside public folder
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navbar />
          <div className="min-h-screen w-full relative">
            {/* Background */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(125%_125%_at_50%_10%,#ffffff_40%,#e0e0ff_100%)] dark:bg-[radial-gradient(125%_125%_at_50%_10%,#000000_40%,#010133_100%)]" />
            {/* Content */}
            <div className="relative z-10 min-h-[calc(100vh-150px)]">{children}</div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
