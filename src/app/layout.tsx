import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { PageTransitionProvider } from "@/components/transitions/PageTransitionProvider";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Venoxy Arts — Creative Web Developer Portfolio",
  description: "Independent creative web developer crafting premium, high-fidelity digital experiences with precision, modern frontend technologies, and beautiful physics-based animations.",
  keywords: ["Venoxy", "Venoxy Arts", "Creative Web Developer", "Frontend Developer", "Next.js", "Tailwind CSS", "GSAP Animations", "Framer Motion"],
  authors: [{ name: "Venoxy" }],
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Venoxy Arts — Creative Web Developer Portfolio",
    description: "Independent creative web developer crafting premium, high-fidelity digital experiences.",
    type: "website",
    locale: "en_US",
  },
};

import { ThemeProvider } from "../components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col font-sans bg-milky text-olive-primary selection:bg-matcha selection:text-milky-surface transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
