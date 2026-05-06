"use client";

import React, { memo, useMemo } from "react";
import { cn } from "@/lib/utils";

// Pure CSS grid with hover effects - no framer-motion overhead
const colors = [
  "rgb(125 211 252)", // sky-300
  "rgb(249 168 212)", // pink-300
  "rgb(134 239 172)", // green-300
  "rgb(253 224 71)",  // yellow-300
  "rgb(252 165 165)", // red-300
  "rgb(216 180 254)", // purple-300
  "rgb(147 197 253)", // blue-300
  "rgb(165 180 252)", // indigo-300
  "rgb(196 181 253)", // violet-300
];

const GRID_STYLES = `
.boxes-grid-cell {
  transition: background-color 0.15s ease;
  will-change: background-color;
}
.boxes-grid-cell:hover {
  background-color: var(--hover-color);
}
`;

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  // Much smaller grid: 30 rows × 20 cols = 600 elements (was 15,000)
  const rows = 30;
  const cols = 20;

  // Pre-compute random colors once
  const cellColors = useMemo(() => {
    const arr: string[] = [];
    for (let i = 0; i < rows * cols; i++) {
      arr.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return arr;
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GRID_STYLES }} />
      <div
        style={{
          transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
        }}
        className={cn(
          "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
          className
        )}
        {...rest}
      >
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="w-16 h-8 border-l border-slate-700 relative">
            {Array.from({ length: cols }, (_, j) => (
              <div
                key={j}
                className="boxes-grid-cell w-16 h-8 border-r border-t border-slate-700 relative"
                style={{ '--hover-color': cellColors[i * cols + j] } as React.CSSProperties}
              >
                {j % 2 === 0 && i % 2 === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700 stroke-[1px] pointer-events-none"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export const Boxes = React.memo(BoxesCore);
