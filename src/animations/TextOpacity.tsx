'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface TextOpacityProps {
  text: string;
  className?: string;
  letterClassName?: string;
  wordClassName?: string;
  stagger?: number;
  fromOpacity?: number;
  toOpacity?: number;
  ease?: string;
  scrub?: number;
  start?: string;
  end?: string;
}

export const TextOpacity: React.FC<TextOpacityProps> = ({
  text,
  className = '',
  letterClassName = '',
  wordClassName = '',
  stagger = 0.03,
  fromOpacity = 0.2,
  toOpacity = 1,
  ease = 'none',
  scrub = 1,
  start = 'top 75%',
  end,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const computedEnd = end ?? `+=${window.innerHeight / 1.5}`;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        letterRefs.current,
        { opacity: fromOpacity },
        {
          opacity: toOpacity,
          ease,
          stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            scrub,
            start,
            end: computedEnd,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [stagger, fromOpacity, toOpacity, ease, scrub, start, end]);

  const splitLetters = (word: string, wordIndex: number) => {
    return word.split('').map((letter, i) => (
      <span
        key={`${wordIndex}-${i}`}
        ref={(el) => {
          if (el) letterRefs.current.push(el);
        }}
        className={letterClassName}
      >
        {letter}
      </span>
    ));
  };

  const splitWords = () => {
    letterRefs.current = [];
    return text.split(' ').map((word, i) => (
      <p key={`${word}-${i}`} className={wordClassName}>
        {splitLetters(word, i)}
      </p>
    ));
  };

  const Component = 'main' as React.ElementType;

  return (
    <Component ref={containerRef} className={className}>
      <div ref={bodyRef} className="flex flex-wrap">
        {splitWords()}
      </div>
    </Component>
  );
};