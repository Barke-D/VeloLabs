"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

// We update it to have Ethiopian/Addis Ababa context as requested
const testimonials = [
  {
    tempId: 0,
    testimonial: "My favorite solution in the market. We are reaching 5x more clients in Bole with VeloLabs.",
    by: "Alemayehu, CEO at EthioTech",
    imgSrc: "https://i.pravatar.cc/150?img=11"
  },
  {
    tempId: 1,
    testimonial: "I'm confident our digital products are safe with VeloLabs. Best agency in Kazanchis by far.",
    by: "Dawit, CTO at SecureNet ET",
    imgSrc: "https://i.pravatar.cc/150?img=12"
  },
  {
    tempId: 2,
    testimonial: "I know it's a cliche, but we were lost before we found VeloLabs. Can't thank you guys enough!",
    by: "Selamawit, COO at InnovateAddis",
    imgSrc: "https://i.pravatar.cc/150?img=5"
  },
  {
    tempId: 3,
    testimonial: "VeloLabs' web designs make planning our online future seamless. Highly recommended!",
    by: "Meron, Head of Marketing at PiassaHub",
    imgSrc: "https://i.pravatar.cc/150?img=9"
  },
  {
    tempId: 4,
    testimonial: "If I could give 11 stars, I'd give 12. Exceptional UI/UX work.",
    by: "Ephrem, Head of Design at CreativeAB",
    imgSrc: "https://i.pravatar.cc/150?img=15"
  },
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-[55%] cursor-pointer border-2 p-8 will-change-transform",
        "transition-[transform,box-shadow,background-color,border-color] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
        isCenter
          ? "z-20 bg-primary text-primary-foreground border-primary"
          : "z-10 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-border"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-14 rounded-full bg-muted object-cover object-top border-2 border-background"
        style={{
          boxShadow: "3px 3px 0px var(--color-background)"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium",
        isCenter ? "text-primary-foreground" : "text-foreground"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-primary-foreground/80" : "text-muted-foreground"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];

    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }

    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width >= 640) setCardSize(365);
      else if (width >= 380) setCardSize(290);
      else setCardSize(250);
    };
    
    updateSize();
    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateSize, 150);
    };
    window.addEventListener("resize", debouncedResize);
    return () => { window.removeEventListener("resize", debouncedResize); clearTimeout(resizeTimer); };
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-muted/30 py-28 my-10 border-y border-border flex flex-col"
      style={{ height: 750 }}
    >
      <div className="absolute top-12 left-0 w-full text-center z-30 pb-4">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-foreground">
          Happy <span className="text-primary italic">Customers</span>
        </h2>
      </div>
      
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length - 1) / 2
          : index - testimonialsList.length / 2;
          
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors rounded-full",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors rounded-full",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
