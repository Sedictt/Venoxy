import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Love from "@/components/Love";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Custom Mouse Cursor element */}
      <CustomCursor />

      {/* Floating Header Navbar */}
      <Navbar />

      {/* Semantic Main Content Grid */}
      <main className="flex-grow w-full flex flex-col items-center relative z-10">
        <Hero />
        <Love />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Structured Site Footer */}
      <Footer />
    </SmoothScroll>
  );
}
