import React from 'react';
import { motion } from 'framer-motion';
import { GlowCard } from '../ui/glow-card';

const technologies = [
  { 
    name: 'React', 
    icon: () => (
      <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ), 
    color: 'blue' as const 
  },
  { 
    name: 'Next.js', 
    icon: () => (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <circle cx="64" cy="64" r="64" fill="white"/>
        <path d="M107.039 104.938L52.8122 36.4251V94.1373H41.5644V33.8624H52.2039L98.5492 92.518V33.8624H109.797V104.938H107.039Z" fill="black"/>
        <rect x="94.635" y="33.8624" width="11.4589" height="71.076" fill="black"/>
      </svg>
    ), 
    color: 'blue' as const 
  },
  { 
    name: 'TypeScript', 
    icon: () => (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 rounded-sm">
        <path d="M1.5 1.5h125v125H1.5z" fill="#3178c6"/>
        <path d="M117.84 86.8h-11.83v29.2c-3.79 3.01-11.41 5.39-17.7 5.39-15.6 0-23.36-9.04-23.36-23.82 0-16.14 10.66-24.87 25.13-24.87 6.45 0 13.01 1.63 17.03 4.14l4.52-10.03c-5.14-2.88-13.3-5.02-21.82-5.02-26.63 0-41.27 16.14-41.27 36.14 0 24.37 14.15 35.8 38.38 35.8 7.9 0 16.03-1.63 19.94-3.76V128h10.97V86.8zm-116.34 0v10.91h15.05v30.29h12.16V97.71h15.05V86.8H1.5z" fill="#fff"/>
      </svg>
    ), 
    color: 'blue' as const 
  },
  { 
    name: 'Node.js', 
    icon: () => (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M64 4.5l51.5 29.7v59.6L64 123.5l-51.5-29.7V34.2L64 4.5z" fill="#339933" opacity=".1"/>
        <path d="M64 10.5L14.5 39.1v57.2L64 124.9l49.5-28.6V39.1L64 10.5zm39.6 80l-39.6 22.9-39.6-22.9V44.9l39.6-22.9 39.6 22.9V90.5z" fill="#339933"/>
      </svg>
    ), 
    color: 'green' as const 
  },
  { 
    name: 'Python', 
    icon: () => (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M64.15 2.1c-16.2 0-15.18 7.02-15.18 7.02l.06 7.24h15.54v2.18h-21.7c-7.9 0-13.84 5.3-13.84 13.56v10c0 8.26 6.8 12.3 6.8 12.3h6.66v-9.36c0-10.45 8.5-19.33 19.33-19.33h19.16c8.26 0 15 6.46 15 14.72V63c0 8.26-6.4 15.14-14.66 15.14H40c-11.23 0-21.1 9.38-21.1 20.6v12.24s1.24 10 17.5 10c16.26 0 27.24-7.05 27.24-7.05v-10.1s0-11.83 11.52-11.83h18.27s17.13-.1 17.13-17.2V58s.5-16.66-16.3-16.66h-1.57V31.98s1.1-15.04-14.8-15.04l-13.6-.04V9.82s.06-7.72-15-7.72z" fill="#3776AB"/>
        <path d="M109.13 102s-1.8 12.15-16.14 12.15c-14.34 0-24.1-7.14-24.1-7.14v-10.28c0-11.83-9.5-21.33-21.33-21.33h-18.1c-11.82 0-21.33-9.5-21.33-21.33V37s.05-18.2 18.22-18.2h3.5v7.26c0 10.45 8.52 19.33 19.35 19.33h19.16c8.26 0 15 6.74 15 15v16.1c0 8.26-6.74 15-15 15h-35c-11.2 0-21.1 9.38-21.1 20.61V124s5.4 3 22 2.5c16.63-.52 23.3-7.5 23.3-7.5l.04-11h15.54v2.16h-2.16c-7.9 0-13.83 5.3-13.83 13.56v10" fill="#FFD43B" transform="rotate(180 64 64)"/>
      </svg>
    ), 
    color: 'blue' as const 
  },
  { 
    name: 'Tailwind', 
    icon: () => (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M64 34.2c-12.8 0-20.8 6.4-24 19.2 4.8-6.4 10.4-8.8 16.8-7.2 3.652.913 6.26 3.56 9.152 6.496C70.664 57.472 76.108 63 88 63c12.8 0 20.8-6.4 24-19.2-4.8 6.4-10.4 8.8-16.8 7.2-3.652-.913-6.26-3.56-9.152-6.496C81.336 39.728 75.892 34.2 64 34.2zM40 63c-12.8 0-20.8 6.4-24 19.2 4.8-6.4 10.4-8.8 16.8-7.2 3.652.913 6.26 3.56 9.152 6.496C46.664 86.272 52.108 91.8 64 91.8c12.8 0 20.8-6.4 24-19.2-4.8 6.4-10.4 8.8-16.8 7.2-3.652-.913-6.26-3.56-9.152-6.496C57.336 68.528 51.892 63 40 63z" fill="#06B6D4"/>
      </svg>
    ), 
    color: 'blue' as const 
  },
  { 
    name: 'Docker', 
    icon: () => (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M125.7 63.6c-1.4-.4-4.2-.7-6.2-.7-3.9 0-7.3 1.2-10 3.3-2.6-1.5-6-2.4-9.7-2.4-1.2 0-2.4.1-3.6.3-1.6-10.7-10.3-19.4-21.7-19.4H47.1v15.7h11.9c.4 0 .7.3.7.7v11.9c0 .4-.3.7-.7.7H47.1v15.7h11.9c.4 0 .7.3.7.7v11.9c0 .4-.3.7-.7.7H47.1v1.9c.1 8 5.7 14.5 13.9 14.5h20c15 0 27.2-12.2 27.2-27.2v-.8c1-.4 1.9-1.1 2.7-1.9 2-2.1 3-5 2.8-8.1 0-.1 0-.3-.3-.4z" fill="#2496ED" opacity=".1"/>
        <path d="M1.3 67.8h21.1c.4 0 .7-.3.7-.7V55.2c0-.4-.3-.7-.7-.7H1.3c-.4 0-.7.3-.7.7v11.9c0 .4.3.7.7.7zm25.3 0h21.1c.4 0 .7-.3.7-.7V55.2c0-.4-.3-.7-.7-.7H26.6c-.4 0-.7.3-.7.7v11.9c0 .4.3.7.7.7zm25.3 0h21.1c.4 0 .7-.3.7-.7V55.2c0-.4-.3-.7-.7-.7H51.9c-.4 0-.7.3-.7.7v11.9c0 .4.3.7.7.7zm25.3 0h21.1c.4 0 .7-.3.7-.7V55.2c0-.4-.3-.7-.7-.7H77.2c-.4 0-.7.3-.7.7v11.9c0 .4.3.7.7.7zm0-25.3h21.1c.4 0 .7-.3.7-.7V29.9c0-.4-.3-.7-.7-.7H77.2c-.4 0-.7.3-.7.7v11.9c0 .4.3.7.7.7zm25.3 0H123.6c.4 0 .7-.3.7-.7V29.9c0-.4-.3-.7-.7-.7h-21.1c-.4 0-.7.3-.7.7v11.9c0 .4.3.7.7.7zm0-25.3h21.1c.4 0 .7-.3.7-.7V4.6c0-.4-.3-.7-.7-.7h-21.1c-.4 0-.7.3-.7.7v11.9c0 .4.3.7.7.7z" fill="#2496ED"/>
      </svg>
    ), 
    color: 'blue' as const 
  },
  { 
    name: 'MongoDB', 
    icon: () => (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M88.2 56.4c-1.1-17.7-10.9-38.5-22.9-49.9-1.2-1.1-1.7-1.1-2.9 0-12 11.4-21.8 32.2-22.9 49.9-1.1 17.7.3 34.3 5.9 46.6-11 3.3-19 9.2-19 12.4 0 2.1 3.4 4.6 10.1 7-6.7 2.4-10.1 4.9-10.1 7 0 3.2 11.5 8 35.8 7.6 24.3.4 35.8-4.4 35.8-7.6 0-2.1-3.4-4.6-10.1-7 6.7-2.4 10.1-4.9 10.1-7 0-3.2-8-9.1-19-12.4 5.6-12.3 7.1-28.9 6-46.6z" fill="#47A248"/>
      </svg>
    ), 
    color: 'green' as const 
  },
];

// CSS-based marquee is vastly smoother than Framer Motion animate
const MARQUEE_STYLES = `
@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.marquee-track {
  animation: marqueeScroll 40s linear infinite;
  will-change: transform;
}
.marquee-track:hover,
.marquee-container:hover .marquee-track {
  animation-play-state: paused;
}
`;

export function TechStack() {
  return (
    <section className="py-32 bg-[#050806] overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_STYLES }} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block"
            >
              Our Arsenal
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-white leading-none italic"
            >
              CRAFTED WITH THE <span className="text-primary">LATEST TECH.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg max-w-sm"
          >
            We use industry-leading technologies to build scalable, high-performance digital products for our clients.
          </motion.p>
        </div>
      </div>

      {/* CSS-based infinite marquee — GPU-composited, no JS animation loop */}
      <div className="relative mt-8">
        {/* Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#050806] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#050806] to-transparent z-20 pointer-events-none" />
        
        <div className="marquee-container flex overflow-hidden">
          <div className="marquee-track flex gap-8 whitespace-nowrap shrink-0">
            {/* Two copies for seamless loop */}
            {[...technologies, ...technologies].map((tech, i) => (
              <div key={`${tech.name}-${i}`} className="shrink-0">
                <GlowCard 
                  glowColor={tech.color}
                  customSize
                  className="w-44 h-44 flex flex-col items-center justify-center gap-5 group/card hover:-translate-y-2 transition-transform duration-500"
                >
                  <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center p-3.5 text-white group-hover/card:scale-110 transition-transform duration-500 shadow-inner">
                    <tech.icon />
                  </div>
                  <span className="text-white/40 font-medium tracking-widest text-[11px] uppercase group-hover/card:text-white group-hover/card:opacity-100 transition-all duration-300 font-sans">
                    {tech.name}
                  </span>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
