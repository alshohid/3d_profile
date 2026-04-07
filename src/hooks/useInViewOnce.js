import { useEffect, useRef, useState } from "react";

const useInViewOnce = (options = {}) => {
  const elementRef = useRef(null);
  const [hasIntersected, setHasIntersected] = useState(false);
  const { root = null, rootMargin = "0px", threshold = 0 } = options;

  useEffect(() => {
    if (hasIntersected) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setHasIntersected(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasIntersected(true);
        observer.disconnect();
      }
    }, { root, rootMargin, threshold });

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasIntersected, root, rootMargin, threshold]);

  return [elementRef, hasIntersected];
};

export default useInViewOnce;
