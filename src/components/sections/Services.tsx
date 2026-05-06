import React from 'react';
import OrbitingSkills from '../ui/orbiting-skills';

export function Services() {
  const services = [
    { title: "Web Dev", desc: "High-performance React & Next.js apps." },
    { title: "Mobile Apps", desc: "Native-feeling apps for iOS and Android." },
    { title: "UI/UX Design", desc: "Intuitive, engaging, and beautiful interfaces." },
    { title: "Brand Identity", desc: "Stand out with a memorable brand." },
    { title: "AI Integrations", desc: "Smart features powered by modern AI." },
    { title: "Digital Marketing & SEO", desc: "Growth strategies that deliver." }
  ];

  return (
    <section id="services" className="relative py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">What We Do</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 text-foreground">
              Services tailored for <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-mist">digital success.</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <div key={i} className="p-6 rounded-2xl widget-depth bg-card border border-border">
                  <h4 className="text-xl font-bold mb-2 text-foreground">{s.title}</h4>
                  <p className="text-muted-foreground text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full h-[600px] relative rounded-3xl overflow-hidden bg-[#0a0f0c] border border-border">
             <OrbitingSkills />
          </div>
        </div>
      </div>
    </section>
  );
}
