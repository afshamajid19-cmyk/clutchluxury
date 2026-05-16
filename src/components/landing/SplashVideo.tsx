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
        {/* Dark Overlay & Vignette */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <span className="text-white/80 uppercase tracking-[0.3em] text-xs md:text-sm mb-4 animate-fade-in">
          Welcome To
        </span>
        
        <h1 className="text-white text-5xl md:text-8xl font-light tracking-[0.2em] mb-6 animate-scale-up uppercase font-display">
          CLUTCH LUXURY
        </h1>

        <div className="w-24 h-[1px] bg-white/30 mb-8 animate-width-grow" />

        <p className="text-white/90 italic text-lg md:text-2xl font-light tracking-widest mb-20 animate-fade-up font-serif">
          Attaining the Unattainable
        </p>

        <div className="absolute bottom-12 md:bottom-20 left-0 right-0 flex flex-col items-center">
          <div className="w-[1px] h-12 bg-white/20 mb-4" />
          <span className="text-white/60 uppercase tracking-[0.4em] text-[10px] md:text-xs animate-pulse">
            Tap Anywhere To Enter
          </span>
        </div>
      </div>
    </div>
  );
}
