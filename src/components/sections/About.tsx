import React from 'react';

export function About() {
  const team = [
    { name: "Gebremariam", role: "Co-Founder", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop", description: "Visionary leader with a passion for transformative digital experiences." },
    { name: "Barkot", role: "Co-Founder", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop", description: "Tech wizard obsessed with scalable architectures and clean code." },
    { name: "Halid", role: "Co-Founder", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop", description: "Creative genius responsible for turning complex problems into beautiful UI." },
    { name: "Leul", role: "Co-Founder", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop", description: "Full-stack powerhouse driving our most challenging technical implementations." }
  ];

  return (
    <section id="about" className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <div className="lg:w-1/2">
             <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[2.5rem] overflow-hidden premium-depth-card outline outline-1 outline-border outline-offset-8">
               <img 
                 src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                 alt="Founders of VeloLabs" 
                 className="absolute inset-0 w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
             </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">About Us</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 text-foreground">
              Passionate builders crafting <br/>
              <span className="italic text-mist font-serif">extraordinary</span> experiences.
            </h3>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded in the heart of Addis Ababa, VeloLabs is a premier web and digital product studio dedicated to transforming complex problems into elegant, scalable solutions.
              </p>
              <p>
                We believe that great design paired with cutting-edge technology can elevate brands and create lasting impact. Our team of designers, engineers, and strategists work closely with you to deliver products that don't just look good, but perform exceptionally.
              </p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-black text-white mb-2">15+</div>
                <div className="text-sm text-primary font-bold uppercase tracking-wider">Expert Team</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-2">10M+</div>
                <div className="text-sm text-primary font-bold uppercase tracking-wider">Lines of Code</div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Team Section */}
        <div>
          <div className="mb-12 text-center">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-4">The Talent</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-mist">Team</span>.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="group relative bg-card border border-border rounded-3xl overflow-hidden premium-depth-card">
                <div className="aspect-square w-full overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                  <p className="text-primary text-sm font-semibold mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
