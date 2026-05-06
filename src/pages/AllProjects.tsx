import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function AllProjects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    { title: "Fintech Dashboard", category: "Web App", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop", description: "A comprehensive financial dashboard with real-time analytics, user portfolio management, and secure transaction workflows.", link: "#" },
    { title: "E-Commerce Mobile", category: "Mobile App", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop", description: "A sleek, fast mobile shopping experience featuring AR product previews and seamless checkout.", link: "#" },
    { title: "AI Content Platform", category: "SaaS", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop", description: "Enterprise SaaS platform for automated AI content generation, workflow approval, and publishing.", link: "#" },
    { title: "Healthcare Portal", category: "Web Platform", image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=2071&auto=format&fit=crop", description: "Secure patient portal for booking appointments, viewing test results, and telemedicine consultations.", link: "#" },
    { title: "Logistics Tracker", category: "Mobile App", image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=2065&auto=format&fit=crop", description: "Real-time fleet tracking and delivery optimization routing app for logistics companies.", link: "#" },
    { title: "Crypto Exchange", category: "Web3", image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?q=80&w=1974&auto=format&fit=crop", description: "Decentralized exchange interface with ultra-low latency price feeds and deep liquidity aggregators.", link: "#" }
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/#portfolio" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            All <span className="text-primary">Projects</span>.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            A comprehensive look at our recent work across web, mobile, and emerging technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <a 
              key={i} 
              href={p.link}
              className="group relative rounded-3xl overflow-hidden premium-depth-card aspect-[4/3] block"
            >
              <div className="absolute inset-0 z-0 bg-[#060b08] overflow-hidden">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover opacity-60 scale-100 transition-transform duration-1000 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent z-10" />
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
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
