import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";

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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
