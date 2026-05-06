import React, { useEffect, useRef, ReactNode, useMemo } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean;
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 }
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

// Single global style injection flag
let glowStylesInjected = false;

const GLOW_STYLES = `
.glow-card[data-glow]::before,
.glow-card[data-glow]::after {
  pointer-events: none;
  content: "";
  position: absolute;
  inset: calc(var(--border-size) * -1);
  border: var(--border-size) solid transparent;
  border-radius: calc(var(--radius) * 1px);
  background-attachment: fixed;
  background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
  background-repeat: no-repeat;
  background-position: 50% 50%;
  mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
  mask-clip: padding-box, border-box;
  mask-composite: intersect;
  z-index: 2;
}

.glow-card[data-glow]::before {
  background-image: radial-gradient(
    calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
    calc(var(--x, 0) * 1px)
    calc(var(--y, 0) * 1px),
    hsl(var(--hue, 210) 100% 50% / 1), transparent 100%
  );
  filter: brightness(1.5);
}

.glow-card[data-glow]::after {
  background-image: radial-gradient(
    calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
    calc(var(--x, 0) * 1px)
    calc(var(--y, 0) * 1px),
    hsl(0 100% 100% / 0.5), transparent 100%
  );
}

.glow-card[data-glow] .glow-blur {
  position: absolute;
  inset: 0;
  will-change: filter;
  opacity: var(--outer, 1);
  border-radius: calc(var(--radius) * 1px);
  filter: blur(20px);
  background: none;
  pointer-events: none;
  z-index: -1;
}

.glow-card[data-glow] .glow-blur::before {
  content: "";
  position: absolute;
  inset: -20px;
  background-image: radial-gradient(
    calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
    calc(var(--x, 0) * 1px)
    calc(var(--y, 0) * 1px),
    hsl(var(--hue, 210) 100% 50% / 0.3), transparent 100%
  );
  background-attachment: fixed;
}
`;

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'blue',
  size = 'md',
  width,
  height,
  customSize = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Inject styles once globally instead of per-card
  useEffect(() => {
    if (!glowStylesInjected) {
      const styleEl = document.createElement('style');
      styleEl.setAttribute('data-glow-styles', '');
      styleEl.textContent = GLOW_STYLES;
      document.head.appendChild(styleEl);
      glowStylesInjected = true;
    }
  }, []);

  // Single shared pointermove handler with throttling
  useEffect(() => {
    let ticking = false;
    const syncPointer = (e: PointerEvent) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const { clientX: x, clientY: y } = e;
        if (cardRef.current) {
          cardRef.current.style.setProperty('--x', x.toFixed(0));
          cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
          cardRef.current.style.setProperty('--y', y.toFixed(0));
          cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
        }
        ticking = false;
      });
    };

    document.addEventListener('pointermove', syncPointer, { passive: true });
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getSizeClasses = () => {
    if (customSize) return '';
    return sizeMap[size];
  };

  const inlineStyles = useMemo(() => {
    const baseStyles: any = {
      '--base': base,
      '--spread': spread,
      '--radius': '14',
      '--border': '1',
      '--backdrop': 'rgba(10, 15, 12, 0.5)',
      '--backup-border': 'rgba(255, 255, 255, 0.05)',
      '--size': '400',
      '--outer': '1',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) 100% 70% / 0.05), transparent
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      backgroundAttachment: 'fixed',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative' as const,
      touchAction: 'none' as const,
    };

    if (width !== undefined) {
      baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === 'number' ? `${height}px` : height;
    }

    return baseStyles;
  }, [base, spread, width, height]);

  return (
    <div
      ref={cardRef}
      data-glow
      style={inlineStyles}
      className={`
        glow-card
        ${getSizeClasses()}
        rounded-2xl 
        relative 
        flex flex-col
        shadow-2xl 
        p-6
        backdrop-blur-sm
        ${className}
      `}
    >
      <div className="glow-blur"></div>
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export { GlowCard };
