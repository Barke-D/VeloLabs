"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Waves } from "./waves";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
/* Initial state handled by JS to prevent invisible content if JS fails */
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  className?: string;
}

export function CinematicHero({
  brandName = "VeloLabs",
  tagline1 = "Your next website",
  tagline2 = "done right.",
  cardHeading = "Everything your business needs online.",
  cardDescription = <><span className="text-white font-semibold">VeloLabs</span> handles design, development, and strategy so you can focus on what you do best.</>,
  metricValue = 15,
  metricLabel = "Projects",
  ctaHeading = "Start a Project.",
  ctaDescription = "Let's build something remarkable together.",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // 1. High-Performance Mouse Interaction Logic
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    // Skip mouse tracking entirely on mobile/tablet — touch devices don't need it
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          
          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
          
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          
          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Cinematic Scroll Timeline with mobile optimizations
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    const ctx = gsap.context(() => {
      // 1. Initial State: Hide elements via JS instead of CSS
      // This ensures if JS fails to load or execute, content remains visible.
      gsap.set(".gsap-reveal", { visibility: "visible" }); // Reset the class if it was hidden by CSS (just in case)
      
      if (isMobile) {
        gsap.set(".text-track", { autoAlpha: 0, y: 40, scale: 0.9 });
        gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      } else {
        gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(8px)", rotationX: -20 });
        gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      }
      
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8 });
      gsap.set(".gsap-reveal", { visibility: "visible" });
      
      // Intro animation
      const introTl = gsap.timeline({ delay: 0.5 });
      if (isMobile) {
        introTl
          .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, ease: "expo.out" })
          .to(".text-days", { duration: 1.5, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.2");
      } else {
        introTl
          .to(".text-track", { duration: 2.5, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
          .to(".text-days", { duration: 2.0, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.5");
      }
        
      // Scroll timeline — shorter on mobile for faster passage
      const scrollDistance = isMobile ? 1200 : isTablet ? 1700 : 2000;
      const scrubAmount = isMobile ? true : 1.5; // true = instant, smoother on mobile
      
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: scrubAmount,
          anticipatePin: 1,
        },
      });
      
      // Simplified fade-out on mobile (no filter blur)
      if (isMobile) {
        scrollTl
          .to([".hero-text-wrapper", ".dotted-surface"], { scale: 1.05, opacity: 0, ease: "power2.inOut", duration: 1 }, 0)
          .to(".main-card", { y: 0, ease: "power3.inOut", duration: 1.5 }, 0)
          .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1 })
          .fromTo(".mockup-scroll-wrapper",
            { y: 200, autoAlpha: 0, scale: 0.7 },
            { y: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "-=0.5"
          )
          .fromTo(".phone-widget", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, ease: "back.out(1.2)", duration: 0.8 }, "-=1")
          .to(".progress-ring", { strokeDashoffset: 60, duration: 1, ease: "power3.inOut" }, "-=0.8")
          .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 1, ease: "expo.out" }, "-=1.0")
          .fromTo(".floating-badge", { y: 60, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "back.out(1.5)", duration: 0.8, stagger: 0.08 }, "-=1.0")
          .fromTo(".card-left-text", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power4.out", duration: 0.8 }, "-=1.0")
          .fromTo(".card-right-text", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "expo.out", duration: 0.8 }, "<")
          .to({}, { duration: 0.3 })
          .set(".hero-text-wrapper", { autoAlpha: 0 })
          .set(".cta-wrapper", { autoAlpha: 1 })
          .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
            y: -30, autoAlpha: 0, ease: "power3.in", duration: 0.6, stagger: 0.03,
          })
          .to(".main-card", {
            width: "92vw", height: "92vh", borderRadius: "32px",
            ease: "expo.inOut", duration: 1
          }, "pullback")
          .to(".cta-wrapper", { scale: 1, ease: "expo.inOut", duration: 1 }, "pullback")
          .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1 });
      } else {
        scrollTl
          .to([".hero-text-wrapper", ".dotted-surface"], { scale: 1.15, filter: "blur(10px)", opacity: 0.2, ease: "power2.inOut", duration: 1 }, 0)
          .to(".main-card", { y: 0, ease: "power3.inOut", duration: 1.5 }, 0)
          .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1 })
          .fromTo(".mockup-scroll-wrapper",
            { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
            { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "-=0.5"
          )
          .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.1, ease: "back.out(1.2)", duration: 1 }, "-=1")
          .to(".progress-ring", { strokeDashoffset: 60, duration: 1, ease: "power3.inOut" }, "-=0.8")
          .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 1, ease: "expo.out" }, "-=1.0")
          .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1, stagger: 0.1 }, "-=1.0")
          .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1 }, "-=1.0")
          .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1 }, "<")
          .to({}, { duration: 0.5 })
          .set(".hero-text-wrapper", { autoAlpha: 0 })
          .set(".cta-wrapper", { autoAlpha: 1 })
          .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
            scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 0.8, stagger: 0.05,
          })
          .to(".main-card", {
            width: isTablet ? "90vw" : "85vw",
            height: isTablet ? "90vh" : "85vh",
            borderRadius: isTablet ? "36px" : "40px",
            ease: "expo.inOut",
            duration: 1
          }, "pullback")
          .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1 }, "pullback")
          .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1 });
      }
        
    }, containerRef);
    
    // Force refresh ScrollTrigger after a short delay to ensure correct height on mobile
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      ctx.revert();
      clearTimeout(timeout);
    };
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-screen flex items-center justify-center text-foreground font-sans antialiased touch-pan-y", className)}
      style={{ perspective: "1500px", overflow: "clip" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <Waves className="dotted-surface absolute inset-0 z-0 h-full w-full opacity-60 pointer-events-none" strokeColor="rgba(255, 255, 255, 0.3)" />
      <div className="film-grain" aria-hidden="true" />
      
      {/* BACKGROUND LAYER: Hero Texts */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight mb-2">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter">
          {tagline2}
        </h1>
      </div>
      
      {/* BACKGROUND LAYER 2: Tactile CTA Buttons */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-silver-matte">
          {ctaHeading}
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <a 
            href="/#contact" 
            onClick={(e) => {
              const element = document.getElementById('contact');
              if (element) {
                e.preventDefault();
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            aria-label="Let's build something" 
            className="btn-modern-light flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase mb-[-2px]">Start your project</div>
              <div className="text-xl font-bold leading-none tracking-tight">Contact Us</div>
            </div>
          </a>
        </div>
      </div>
      
      {/* FOREGROUND LAYER: The Physical Deep Blue Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[85vh] md:h-[85vh] rounded-[32px] md:rounded-[40px] will-change-transform"
        >
          <div className="card-sheen" aria-hidden="true" />
          
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">
            {/* 1. TOP (Mobile) / RIGHT (Desktop): BRAND NAME */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2 className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0">
                {brandName}
              </h2>
            </div>
            
            {/* 2. MIDDLE (Mobile) / CENTER (Desktop): IPHONE MOCKUP */}
            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10 will-change-transform" style={{ perspective: "1000px" }}>
              <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-between p-4 md:p-12 lg:p-20 transform scale-[0.65] md:scale-85 lg:scale-100">
                {/* The iPhone Bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />
                  
                  {/* Inner Screen Container */}
                  <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,1)] text-white z-10">
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />
                    
                    {/* Dynamic Island Notch */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                    </div>
                    
                    {/* App Interface */}
                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">
                      <div className="phone-widget flex justify-between items-center mb-8">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-1">Success Rate</span>
                          <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">97%</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/5 text-neutral-200 flex items-center justify-center font-bold text-sm border border-white/10 shadow-lg shadow-black/50">★</div>
                      </div>
                      
                      <div className="phone-widget relative w-40 h-40 mx-auto flex items-center justify-center mb-6">
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                          <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#6EBF8B" strokeWidth="12" />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">0</span>
                          <span className="text-[8px] text-primary/80 uppercase tracking-[0.1em] font-bold mt-0.5">{metricLabel}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sage-500/20 to-sage-600/5 flex items-center justify-center mr-3 border border-sage-400/20 shadow-inner">
                            <span className="text-sage-400 drop-shadow-md">★</span>
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-20 bg-neutral-300 rounded-full mb-2 shadow-inner" />
                            <div className="h-1.5 w-12 bg-neutral-600 rounded-full shadow-inner" />
                          </div>
                        </div>
                        
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 flex items-center justify-center mr-3 border border-emerald-400/20 shadow-inner">
                            <svg className="w-4 h-4 text-emerald-400 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-16 bg-neutral-300 rounded-full mb-2 shadow-inner" />
                            <div className="h-1.5 w-24 bg-neutral-600 rounded-full shadow-inner" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>
                </div>
                
                {/* Floating Glass Badges */}
                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-sage-500/20 to-sage-900/10 flex items-center justify-center border border-sage-400/30 shadow-inner">
                    <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">🎯</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Strategy</p>
                    <p className="text-sage-200/50 text-[10px] lg:text-xs font-medium">Digital Planning</p>
                  </div>
                </div>
                
                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-indigo-500/20 to-indigo-900/10 flex items-center justify-center border border-indigo-400/30 shadow-inner">
                    <span className="text-base lg:text-lg drop-shadow-lg" aria-hidden="true">✨</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Design</p>
                    <p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Pixel Perfect</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 3. BOTTOM (Mobile) / LEFT (Desktop): ACCOUNTABILITY TEXT */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0 pb-4 md:pb-0">
              <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-slate-300 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
