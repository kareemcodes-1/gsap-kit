import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GsapSplitText from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(GsapSplitText);
}

export interface SplitTextProps {
  /** HTML tag to render: "h1", "h2", "h3", "h4", "h5", "h6", "p", "span" */
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  /** The text content to animate. */
  text?: string;
  /** Additional class names to style the component. */
  className?: string;
  /** Delay between animations for each letter/word (in ms). */
  delay?: number;
  /** Duration of each letter animation (in seconds). */
  duration?: number;
  /** GSAP easing function for the animation. */
  ease?: string;
  /** Split type: "chars", "words", "lines", or "words, chars". */
  splitType?: "chars" | "words" | "lines" | "words, chars";
  /** Initial GSAP properties for each letter/word. */
  from?: gsap.TweenVars;
  /** Target GSAP properties for each letter/word. */
  to?: gsap.TweenVars;
  /** Intersection threshold to trigger the animation (0-1). */
  threshold?: number;
  /** Intersection Observer rootMargin. */
  rootMargin?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({
  tag: Tag = "p",
  text = "",
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const animated = useRef(false); // Prevents re-running if scrolled past multiple times

  useGSAP(
    () => {
      if (!containerRef.current || animated.current) return;

      // 1. Split the text
      const split = new GsapSplitText(containerRef.current, { type: splitType });

      // 2. Determine what to animate based on splitType
      const targets = splitType.includes("chars")
        ? split.chars
        : splitType.includes("words")
        ? split.words
        : split.lines;

      // 3. Set the initial state immediately to prevent Flash of Unstyled Content (FOUC)
      gsap.set(targets, from);

      // 4. Set up Intersection Observer to trigger when scrolled into view
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animated.current = true;

            gsap.to(targets, {
              ...to,
              duration: duration,
              stagger: delay / 1000, // Convert ms delay to GSAP seconds stagger
              ease: ease,
            });

            observer.disconnect(); // Stop observing once animated
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(containerRef.current);

      // Cleanup
      return () => observer.disconnect();
    },
    { scope: containerRef }
  );

  return (
    <Tag ref={containerRef as any} className={className}>
      {text}
    </Tag>
  );
};