import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { Figtree } from "next/font/google";
import Footer from "@/components/shared/Footer";
import NextTopLoader from "nextjs-toploader";
import Providers from "@/lib/providers/Providers";
import { Toaster } from "sonner";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chez Tati ",
    template: "%s | Chez Tati",
  },
  description: "This is Official Application for Chez Tati",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.className} antialiased`}>
        <Providers>
          <Navbar></Navbar>

          <div className="min-h-[calc(100vh-121px)] pb-24">{children}</div>
          <Footer></Footer>

          {/* sonner toaster */}
          <Toaster />

          <NextTopLoader
            color="#232323"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #232323,0 0 5px #EA5326"
            zIndex={1600}
            showAtBottom={false}
          />
        </Providers>
      </body>
    </html>
  );
}
