import { useEffect } from "react";
import Lenis from "lenis";

const SmoothScrollProvider = ({ children }) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.05,
      wheelMultiplier: 0.9,
      lerp: 0.085,
      anchors: true,
    });

    let frameId = 0;

    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return children;
};

export default SmoothScrollProvider;
