"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Love from "@/components/Love";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import IntroLoader from "@/components/IntroLoader";
import { ProjectData } from "@/lib/projects";

interface HomeClientProps {
  initialProjects: ProjectData[];
}

export default function HomeClient({ initialProjects }: HomeClientProps) {
  const [loaderCompleted, setLoaderCompleted] = useState(false);

  return (
    <>
      {/* Premium introductory preloader */}
      <IntroLoader onComplete={() => setLoaderCompleted(true)} />
      
      <SmoothScroll>
        {/* Custom Mouse Cursor element */}
        <CustomCursor />

        {/* Floating Header Navbar */}
        <Navbar />

        {/* Semantic Main Content Grid */}
        <main className="flex-grow w-full flex flex-col items-center relative z-10">
          {/* We pass the loading state to Hero so its internal entry animations wait for the loader to finish */}
          <Hero loaderCompleted={loaderCompleted} />
          <Love />
          <Skills />
          <Projects initialProjects={initialProjects} />
          <Contact />
        </main>

        {/* Structured Site Footer */}
        <Footer />
      </SmoothScroll>
    </>
  );
}
