"use client";

import React from "react";

export default function AboutClipboard() {
  return (
    <section 
      id="about" 
      className="w-full relative transition-all duration-500 overflow-hidden"
    >
      <div 
        className="w-full min-h-[450px] sm:min-h-[650px] md:min-h-[850px] lg:min-h-[1000px] xl:min-h-[1150px] bg-cover bg-center bg-no-repeat transition-all duration-500"
        style={{ backgroundImage: "url('/about_me.png')" }}
      />
    </section>
  );
}


