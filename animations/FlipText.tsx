'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export interface FlipTextProps {
  text: string;
  className?: string;
  duration?: number;
  stagger?: number;
  ease?: string;
}

export const FlipText: React.FC<FlipTextProps> = ({
  text,
  className = '',
  duration = 0.25,
  stagger = 0.025,
  ease = 'easeInOut',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topLettersRef = useRef<HTMLSpanElement[]>([]);
  const bottomLettersRef = useRef<HTMLSpanElement[]>([]);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe(() => {
    gsap.to(topLettersRef.current, {
      yPercent: -150,
      duration,
      ease,
      stagger,
    });
    gsap.to(bottomLettersRef.current, {
      yPercent: 0,
      duration,
      ease,
      stagger,
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(topLettersRef.current, {
      yPercent: 0,
      duration,
      ease,
      stagger,
    });
    gsap.to(bottomLettersRef.current, {
      yPercent: 150,
      duration,
      ease,
      stagger,
    });
  });

  return (
    <div
      ref={containerRef}
      className={`relative block overflow-hidden whitespace-nowrap cursor-pointer ${className}`}
      style={{ lineHeight: 1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top row — visible by default */}
      <div>
        {text.split('').map((letter, i) => (
          <span
            key={`top-${i}`}
            ref={(el) => { if (el) topLettersRef.current[i] = el }}
            className='inline-block'
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>

      {/* Bottom row — hidden by default, slides up on hover */}
      <div className='absolute inset-0'>
        {text.split('').map((letter, i) => (
          <span
            key={`bottom-${i}`}
            ref={(el) => {
              if (el) {
                bottomLettersRef.current[i] = el;
                gsap.set(el, { yPercent: 150 });
              }
            }}
            className='inline-block'
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
    </div>
  );
};