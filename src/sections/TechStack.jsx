import { lazy, Suspense } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import TitleHeader from "../components/TitleHeader";
import { techStackIcons, techStackImgs } from "../constants";
import useInViewOnce from "../hooks/useInViewOnce";
import useDeviceProfile from "../hooks/useDeviceProfile";

const TechIconCardExperience = lazy(
  () => import("../components/models/tech_logos/TechIconCardExperience")
);

const TechStack = () => {
  const [sectionRef, shouldRenderModels] = useInViewOnce({
    rootMargin: "180px 0px",
  });
  const { shouldUseTechCanvas, lowPowerMode } = useDeviceProfile();

  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.16,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
          once: true,
        },
      }
    );
  });

  return (
    <section ref={sectionRef} id="skills" className="flex-center section-padding">
      <div className="section-shell">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="🤝 What I Bring to the Table"
        />

        <div className="tech-grid">
          {techStackIcons.map((techStackIcon, index) => {
            const shouldRenderCanvas = shouldRenderModels && shouldUseTechCanvas;

            return (
              <div
                key={techStackIcon.name}
                className="card-border tech-card overflow-hidden group rounded-[28px]"
              >
                <div className="tech-card-animated-bg" />

                <div className="tech-card-content">
                  <div className="tech-icon-wrapper">
                    {shouldRenderCanvas ? (
                      <Suspense
                        fallback={
                          <div className="tech-icon-fallback">
                            <img
                              src={techStackImgs[index].imgPath}
                              alt={techStackImgs[index].name}
                              loading="lazy"
                            />
                          </div>
                        }
                      >
                        <TechIconCardExperience
                          model={techStackIcon}
                          lite={lowPowerMode}
                        />
                      </Suspense>
                    ) : (
                      <div className="tech-icon-fallback">
                        <img
                          src={techStackImgs[index].imgPath}
                          alt={techStackImgs[index].name}
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  <div className="padding-x w-full">
                    <p>{techStackIcon.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
