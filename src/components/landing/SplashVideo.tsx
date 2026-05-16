"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function SplashVideo() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 800); // Match this with the transition duration
  };

  useEffect(() => {
    // Prevent scrolling while splash is visible
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      onClick={handleEnter}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-1000 cursor-pointer ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={handleEnter}
          className="w-full h-full object-cover"
        >
          <source src="/HomePage.mp4" type="video/mp4" />
        </video>
        {/* Subtle gradient at the bottom for text readability if needed, otherwise clean */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <span className="text-white/70 uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 animate-fade-in font-sans">
          Welcome To
        </span>
        
        <h1 className="text-white text-5xl md:text-8xl font-light tracking-[0.25em] mb-10 animate-scale-up uppercase font-display leading-tight">
          CLUTCH LUXURY
        </h1>

        <div className="w-24 h-[1px] bg-white/20 mb-10 animate-width-grow" />

        <p className="text-white/90 italic text-xl md:text-3xl font-light tracking-widest mb-16 animate-fade-up font-serif">
          Attaining the Unattainable
        </p>

        {/* Vertical line and Enter text */}
        <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: "1.5s" }}>
          <div className="w-[1px] h-20 md:h-32 bg-gradient-to-b from-white/40 to-transparent mb-8 animate-grow-v" />
          
          <span className="text-white/50 uppercase tracking-[0.5em] text-[9px] md:text-[11px] animate-pulse font-sans">
            Tap Anywhere To Enter
          </span>
        </div>
      </div>
    </div>
  );
}
