import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LimelightNav } from '../ui/limelight-nav';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<number>(0);
  // 'full' = at top (logo + nav + phone), 'pill' = scrolled up (nav only), 'hidden' = scrolled down
  const [navState, setNavState] = useState<'full' | 'pill' | 'hidden'>('full');
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    if (id === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    navigate(`/#${id}`);
    if (location.pathname === '/') {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 10);
    }
  };

  const navItems = [
    { id: 'home', icon: <span>Home</span>, label: 'Home', onClick: () => handleNavClick('home') },
    { id: 'services', icon: <span>Services</span>, label: 'Services', onClick: () => handleNavClick('services') },
    { id: 'process', icon: <span>Process</span>, label: 'Process', onClick: () => handleNavClick('process') },
    { id: 'portfolio', icon: <span>Work</span>, label: 'Work', onClick: () => handleNavClick('portfolio') },
    { id: 'about', icon: <span>About us</span>, label: 'About us', onClick: () => handleNavClick('about') },
    { id: 'contact', icon: <span>Contact</span>, label: 'Contact', onClick: () => handleNavClick('contact') },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    // ── Navbar show/hide on scroll direction ──────────────────────────────
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollingUp = scrollY < lastScrollY;

      if (scrollY < 50) {
        setNavState('full');
      } else if (scrollingUp) {
        setNavState('pill');
      } else {
        setNavState('hidden');
        setIsMobileMenuOpen(false);
      }

      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ── Scroll-spy: explicit ID → navItem index map ───────────────────────
    // Physical page order doesn't matter — each section ID is mapped
    // directly to its nav position, so they can never get out of sync.
    const sectionNavIndex: Record<string, number> = {
      home: 0, services: 1, process: 2, portfolio: 3, about: 4, contact: 5,
    };
    // Physical page order (for iteration)
    const pageOrder = ['home', 'services', 'process', 'portfolio', 'about', 'contact'];

    const updateActiveSection = () => {
      const threshold = window.innerHeight * 0.45; // section top must be above 45% of screen
      let activeSectionId = 'home';
      let bestTop = -Infinity;

      pageOrder.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        // Pick the section whose top has scrolled past the threshold but is highest (least negative)
        if (top <= threshold && top > bestTop) {
          bestTop = top;
          activeSectionId = id;
        }
      });

      const idx = sectionNavIndex[activeSectionId] ?? 0;
      setActiveSection(idx);
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', updateActiveSection);
    };
  }, []);

  const isHidden = navState === 'hidden';
  const isFull = navState === 'full';

  return (
    <>
      {/* ─── DESKTOP NAV ─── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 pointer-events-none
          transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
          ${isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        {/* Full bar — only visible at top */}
        <div
          className={`hidden md:flex items-center justify-between px-6 py-4 pointer-events-auto
            transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            ${isFull ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none absolute'}`}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="font-black text-2xl tracking-tighter text-foreground"
          >
            VeloLabs<span className="text-primary">.</span>
          </Link>

          {/* Centered nav pill */}
          <LimelightNav
            activeIndex={activeSection}
            iconClassName="text-base font-semibold tracking-wide flex items-center gap-2 px-2"
            items={navItems}
          />

          {/* Right actions */}
          <div className="flex items-center gap-6">
            {/* Phone number */}
            <a
              href="tel:+251905760000"
              className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              +251 905 760 00
            </a>

            {/* CTA Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-primary text-black font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(29,185,84,0.2)]"
            >
              Start Your Project
            </button>
          </div>
        </div>

        {/* Pill only — visible when scrolled up (not at top) */}
        <div
          className={`hidden md:flex justify-center px-6 pt-4 pointer-events-auto
            transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
            ${!isFull && !isHidden ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none absolute'}`}
        >
          <LimelightNav
            activeIndex={activeSection}
            iconClassName="text-base font-semibold tracking-wide flex items-center gap-2 px-2"
            items={navItems}
          />
        </div>

        {/* Mobile: hamburger */}
        <div
          className={`md:hidden flex justify-end px-4 py-4 pointer-events-auto
            transition-all duration-300 ${isFull ? 'justify-between' : 'justify-end'}`}
        >
          {isFull && (
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="font-black text-xl tracking-tighter text-foreground"
            >
              VeloLabs<span className="text-primary">.</span>
            </Link>
          )}
          <button
            className="flex flex-col justify-center items-center w-10 h-10 bg-card border border-border rounded-lg z-50 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[3px]' : '-translate-y-1'}`} />
            <span className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[3px]' : 'translate-y-1'}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <nav className="flex flex-col items-center gap-8 text-2xl font-bold">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.onClick}
              className="text-foreground hover:text-primary transition-colors tracking-tight"
            >
              {item.label}
            </button>
          ))}
          <a
            href="tel:+251905760000"
            className="flex items-center gap-3 text-lg font-bold text-foreground mt-4"
          >
            <span className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            +251 905 760 00
          </a>
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full max-w-[280px] bg-primary text-black font-black py-4 rounded-2xl mt-8 shadow-[0_0_30px_rgba(29,185,84,0.3)] hover:scale-105 transition-transform"
          >
            Start Your Project
          </button>
        </nav>
      </div>
    </>
  );
}
