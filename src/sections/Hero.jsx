import { lazy, Suspense, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import useDeviceProfile from "../hooks/useDeviceProfile";

const HeroExperience = lazy(
  () => import("../components/models/hero_models/HeroExperience")
);

const heroSignals = [
  "Mobile-first responsive layout",
  "Performance-aware 3D direction",
  "Conversion-focused project storytelling",
];

const HeroVisualFallback = () => {
  return (
    <div className="hero-fallback">
      <div className="hero-fallback-window">
        <div className="hero-fallback-topbar">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-fallback-body">
          <div className="hero-fallback-copy">
            <p className="hero-fallback-kicker">Premium portfolio preview</p>
            <h3>Designed to feel fast, intentional, and high-trust.</h3>
            <p>
              Lightweight on smaller devices and visually richer on capable
              screens.
            </p>
          </div>

          <div className="hero-fallback-media">
            <img
              src="/images/project1.png"
              alt="Premium portfolio preview"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const sectionRef = useRef(null);
  const { shouldUseHeroCanvas, lowPowerMode } = useDeviceProfile();

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-animate",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="hero" className="hero-section">
      <div className="hero-backdrop-glow" aria-hidden="true" />

      <div className="hero-layout">
        <header className="hero-copy">
          <div className="hero-badge hero-animate">
            <p>Open to premium freelance and product collaborations</p>
          </div>

          <p className="hero-kicker hero-animate">
            Frontend systems, polished motion, and high-conversion portfolio
            design
          </p>

          <div className="hero-text hero-animate">
            <h1>Building</h1>

            <div className="hero-word-window">
              <span className="wrapper">
                {words.map((word, index) => (
                  <span
                    key={`${word.text}-${index}`}
                    className="hero-word-chip"
                  >
                    <img
                      src={word.imgPath}
                      alt={word.text}
                      loading="lazy"
                      className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                    />
                    <span>{word.text}</span>
                  </span>
                ))}
              </span>
            </div>

            <h1>into premium</h1>
            <h1>digital experiences</h1>
          </div>

          <p className="hero-lead hero-animate">
            I help portfolios, products, and brands feel sharper on desktop,
            smoother on mobile, and more trustworthy from the very first scroll.
          </p>

          <div className="hero-cta-row hero-animate">
            <Button
              text="Explore Case Studies"
              className="md:w-80 md:h-16 w-full sm:w-72 h-14"
              id="work"
            />
            <Button
              text="Start a Project"
              className="md:w-72 md:h-16 w-full sm:w-64 h-14"
              id="contact"
              variant="secondary"
            />
          </div>

          <div className="hero-signal-grid hero-animate">
            {heroSignals.map((signal) => (
              <div key={signal} className="hero-signal-card">
                {signal}
              </div>
            ))}
          </div>
        </header>

        <figure className="hero-visual-column hero-animate">
          <div className="hero-visual-shell card-border">
            {shouldUseHeroCanvas ? (
              <Suspense fallback={<HeroVisualFallback />}>
                <HeroExperience lite={lowPowerMode} />
              </Suspense>
            ) : (
              <HeroVisualFallback />
            )}
          </div>
        </figure>
      </div>

      <AnimatedCounter />
    </section>
  );
};

export default Hero;
