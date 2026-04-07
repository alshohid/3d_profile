import { useEffect, useState } from "react";

const getDeviceProfile = () => {
  if (typeof window === "undefined") {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      prefersReducedMotion: false,
      lowPowerMode: false,
      shouldUseHeroCanvas: true,
      shouldUseTechCanvas: true,
      shouldUseContactCanvas: true,
    };
  }

  const width = window.innerWidth;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const memory = navigator.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1280;
  const isDesktop = width >= 1280;
  const lowPowerMode = prefersReducedMotion || memory <= 4 || cores <= 4;

  return {
    isMobile,
    isTablet,
    isDesktop,
    prefersReducedMotion,
    lowPowerMode,
    shouldUseHeroCanvas: isDesktop && !lowPowerMode,
    shouldUseTechCanvas: isDesktop && !lowPowerMode,
    shouldUseContactCanvas: width >= 1024 && !lowPowerMode,
  };
};

const useDeviceProfile = () => {
  const [profile, setProfile] = useState(getDeviceProfile);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleUpdate = () => {
      setProfile(getDeviceProfile());
    };

    window.addEventListener("resize", handleUpdate, { passive: true });

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleUpdate);
    } else {
      mediaQuery.addListener(handleUpdate);
    }

    return () => {
      window.removeEventListener("resize", handleUpdate);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleUpdate);
      } else {
        mediaQuery.removeListener(handleUpdate);
      }
    };
  }, []);

  return profile;
};

export default useDeviceProfile;
