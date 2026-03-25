'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export interface FlipLoaderProps {
  text: string;
  className?: string;
  duration?: number;
  stagger?: number;
  ease?: string;
  repeatDelay?: number;
}

export const FlipLoader: React.FC<FlipLoaderProps> = ({
  text,
  className = '',
  duration = 0.5,
  stagger = 0.05,
  ease = 'easeInOut',
  repeatDelay = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topLettersRef = useRef<HTMLSpanElement[]>([]);
  const bottomLettersRef = useRef<HTMLSpanElement[]>([]);

  useGSAP(() => {
    // Set bottom letters offscreen initially
    gsap.set(bottomLettersRef.current, { yPercent: 100 });

    const tl = gsap.timeline({ repeat: -1, repeatDelay });

    // Top letters flip up
    tl.to(topLettersRef.current, {
      yPercent: -100,
      duration,
      ease,
      stagger,
    })
    // Bottom letters come up simultaneously
    .to(bottomLettersRef.current, {
      yPercent: 0,
      duration,
      ease,
      stagger,
    }, '<')
    // Pause at full visibility
    .to({}, { duration: repeatDelay })
    // Top letters come back down
    .to(topLettersRef.current, {
      yPercent: 0,
      duration,
      ease,
      stagger,
    })
    // Bottom letters go back down simultaneously
    .to(bottomLettersRef.current, {
      yPercent: 100,
      duration,
      ease,
      stagger,
    }, '<');

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`relative block overflow-hidden whitespace-nowrap ${className}`}
      style={{ lineHeight: 0.75 }}
    >
      {/* Top row */}
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

      {/* Bottom row */}
      <div className='absolute inset-0'>
        {text.split('').map((letter, i) => (
          <span
            key={`bottom-${i}`}
            ref={(el) => { if (el) bottomLettersRef.current[i] = el }}
            className='inline-block'
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </div>
    </div>
  );
};