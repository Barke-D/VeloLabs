import React from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#050806] pt-20 pb-10 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="lg:col-span-2">
            <div className="font-black text-3xl tracking-tighter text-white mb-6">
              VeloLabs<span className="text-primary">.</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-8">
              A premier Web & digital product studio creating exceptional experiences for ambitious brands globally, right from Addis Ababa.
            </p>
            <div className="flex gap-4">
              {[
                { name: 'LinkedIn', icon: Linkedin, href: '#' },
                { name: 'GitHub', icon: Github, href: '#' },
                { name: 'Instagram', icon: Instagram, href: '#' }
              ].map((social) => (
                <a key={social.name} href={social.href} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-black transition-colors">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Services</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mobile Applications</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Brand Identity</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#portfolio" className="hover:text-primary transition-colors">Our Work</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Contact</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>Bole Sub-city,<br/>Addis Ababa, Ethiopia</li>
              <li><a href="mailto:velolabsdigital@gmail.com" className="hover:text-primary transition-colors">velolabsdigital@gmail.com</a></li>
              <li>+251 905 760 00</li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VeloLabs Digital Studio. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
