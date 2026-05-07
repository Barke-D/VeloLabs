import React from 'react';
import { motion } from 'framer-motion';
import { GlowCard } from '../ui/glow-card';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiNodedotjs, 
  SiPython, 
  SiTailwindcss, 
  SiDocker, 
  SiMongodb 
} from 'react-icons/si';

const technologies = [
  { 
    name: 'React', 
    icon: () => <SiReact size={32} className="text-[#61DAFB]" />, 
    color: 'blue' as const 
  },
  { 
    name: 'Next.js', 
    icon: () => <SiNextdotjs size={32} className="text-white" />, 
    color: 'blue' as const 
  },
  { 
    name: 'TypeScript', 
    icon: () => <SiTypescript size={32} className="text-[#3178C6]" />, 
    color: 'blue' as const 
  },
  { 
    name: 'Node.js', 
    icon: () => <SiNodedotjs size={32} className="text-[#339933]" />, 
    color: 'green' as const 
  },
  { 
    name: 'Python', 
    icon: () => <SiPython size={32} className="text-[#3776AB]" />, 
    color: 'blue' as const 
  },
  { 
    name: 'Tailwind', 
    icon: () => <SiTailwindcss size={32} className="text-[#06B6D4]" />, 
    color: 'blue' as const 
  },
  { 
    name: 'Docker', 
    icon: () => <SiDocker size={32} className="text-[#2496ED]" />, 
    color: 'blue' as const 
  },
  { 
    name: 'MongoDB', 
    icon: () => <SiMongodb size={32} className="text-[#47A248]" />, 
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
