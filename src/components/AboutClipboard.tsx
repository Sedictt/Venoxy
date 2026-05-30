"use client";

import React from "react";

export default function AboutClipboard() {
  return (
    <section 
      id="about" 
      className="w-full relative transition-all duration-500 overflow-hidden"
    >
      {/* Decorative High-Fidelity Chalk Doodles in the margins */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-10 opacity-[0.24] sm:opacity-[0.32] mix-blend-multiply">
        {/* Left Margin Chalk Art */}
        <img 
          src="/assets/chalk/paperplane.png" 
          alt="" 
          loading="lazy"
          className="absolute top-[12%] left-[4%] w-16 sm:w-24 h-auto rotate-[-15deg]"
        />
        <img 
          src="/assets/chalk/threesparkle.png" 
          alt="" 
          loading="lazy"
          className="absolute top-[40%] left-[8%] w-10 sm:w-16 h-auto rotate-[15deg]"
        />
        <img 
          src="/assets/chalk/camera.png" 
          alt="" 
          loading="lazy"
          className="absolute bottom-[10%] left-[-3%] w-[180px] sm:w-[260px] md:w-[320px] h-auto rotate-[-12deg]"
        />

        {/* Right Margin Chalk Art */}
        <img 
          src="/assets/chalk/cloud.png" 
          alt="" 
          loading="lazy"
          className="absolute top-[10%] right-[-5%] w-[220px] sm:w-[320px] md:w-[400px] h-auto rotate-[-6deg]"
        />
        <img 
          src="/assets/chalk/frog.png" 
          alt="" 
          loading="lazy"
          className="absolute bottom-[15%] right-[-2%] w-[160px] sm:w-[220px] md:w-[260px] h-auto rotate-[10deg]"
        />
      </div>

      <div 
        className="w-full min-h-[450px] sm:min-h-[650px] md:min-h-[850px] lg:min-h-[1000px] xl:min-h-[1150px] relative z-0 overflow-hidden"
      >
        <img 
          src="/about_me.png" 
          alt="About Me" 
          loading="lazy"
          className="w-full h-full object-cover object-center absolute inset-0 transition-all duration-500"
        />
      </div>
    </section>
  );
}


