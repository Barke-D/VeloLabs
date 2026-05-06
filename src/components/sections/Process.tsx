import React from 'react';

export function Process() {
  const steps = [
    { num: "01", title: "Discover", desc: "We learn about your business, goals, and target audience to build a solid foundation." },
    { num: "02", title: "Design", desc: "Creating wireframes and beautiful UI designs that align with your brand." },
    { num: "03", title: "Develop", desc: "Building the solution with modern technologies for speed and reliability." },
    { num: "04", title: "Launch", desc: "Deploying your product and ensuring everything runs smoothly post-launch." }
  ];

  return (
    <section id="process" className="py-24 bg-[#0a0f0c] relative overflow-hidden text-foreground border-y border-border">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">Our Process</h2>
          <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
            From idea to <span className="italic text-primary font-serif">reality</span>.
          </h3>
        </div>
        
        <div className="relative">
          {/* Horizontal line for desktop */}
          <div className="hidden md:block absolute top-[40px] left-0 w-full h-px bg-border z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-start">
                <div className="w-20 h-20 rounded-full bg-background border-4 border-border flex items-center justify-center mb-6 shadow-xl text-2xl font-black text-primary">
                  {step.num}
                </div>
                <h4 className="text-2xl font-bold mb-3">{step.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
