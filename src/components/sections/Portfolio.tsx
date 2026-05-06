import React from 'react';
import { Boxes } from '../ui/boxes-core';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export function Portfolio() {
  const projects = [
    { title: "Fintech Dashboard", category: "Web App", span: "md:col-span-2 md:row-span-2", height: "h-[500px]", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", description: "A comprehensive financial dashboard with real-time analytics, user portfolio management, and secure transaction workflows.", link: "#" },
    { title: "E-Commerce Mobile", category: "Mobile App", span: "md:col-span-1 md:row-span-1", height: "h-[240px]", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop", description: "A sleek, fast mobile shopping experience featuring AR product previews and seamless checkout.", link: "#" },
    { title: "AI Content Platform", category: "SaaS", span: "md:col-span-1 md:row-span-1", height: "h-[240px]", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop", description: "Enterprise SaaS platform for automated AI content generation, workflow approval, and publishing.", link: "#" }
  ];

  return (
    <section id="portfolio" className="py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Selected Work</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-mist">Projects</span>.
            </h3>
          </div>
          <Link to="/projects" className="btn-modern-dark px-6 py-3 rounded-full font-bold text-sm text-center">
            View All Work
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min md:auto-rows-[240px]">
          {projects.map((p, i) => (
            <a 
              key={i} 
              href={p.link}
              className={cn(
                "relative group overflow-hidden rounded-3xl premium-depth-card z-10 w-full block cursor-pointer",
                p.span, 
                i === 0 ? "h-[350px] md:h-full" : "h-[240px]"
              )}
            >
              {/* Project Image */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-[#060b08]">
                 {p.image ? (
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover opacity-60 scale-100 transition-transform duration-1000 group-hover:scale-110" 
                      referrerPolicy="no-referrer"
                    />
                 ) : (
                    <Boxes className="opacity-30 scale-150 origin-center transition-transform duration-1000 group-hover:scale-[1.6]" />
                 )}
                 <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent z-10" />
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex flex-col justify-end h-full">
                <div className="translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
                    {p.category}
                  </span>
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">{p.title}</h4>
                  
                  <div className="overflow-hidden">
                    <p className="text-sm md:text-base text-gray-300 opacity-0 max-h-0 translate-y-4 group-hover:opacity-100 group-hover:max-h-32 group-hover:translate-y-0 transition-all duration-500 delay-100 ease-out">
                      {p.description}
                    </p>
                  </div>
                  
                  <div className="w-12 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 mt-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
