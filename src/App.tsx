/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { TechStack } from './components/sections/TechStack';
import { Process } from './components/sections/Process';
import { Portfolio } from './components/sections/Portfolio';
import { About } from './components/sections/About';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/sections/Footer';
import { useEffect } from 'react';
import { AllProjects } from './pages/AllProjects';

function MainLayout() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);

  return (
    <main>
      <Hero />
      <Services />
      <TechStack />
      <Process />
      <Portfolio />
      <About />
      <Testimonials />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/projects" element={<AllProjects />} />
      </Routes>
      <Footer />
    </div>
  );
}
