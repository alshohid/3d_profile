import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray(".experience-row");

      rows.forEach((row) => {
        const cardPanel = row.querySelector(".experience-card-panel");
        const detailPanel = row.querySelector(".experience-detail-panel");
        const logo = row.querySelector(".timeline-logo");
        const progress = row.querySelector(".experience-rail-progress");
        const isReverse = row.dataset.direction === "reverse";

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 78%",
            once: true,
          },
        });

        tl.fromTo(
          cardPanel,
          {
            autoAlpha: 0,
            x: isReverse ? 56 : -56,
            y: 16,
            rotateX: 8,
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: "power3.out",
          }
        )
          .fromTo(
            detailPanel,
            {
              autoAlpha: 0,
              x: isReverse ? -28 : 28,
              y: 24,
            },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            0.12
          )
          .fromTo(
            logo,
            {
              autoAlpha: 0,
              scale: 0.7,
            },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.8)",
            },
            0.12
          )
          .to(
            progress,
            {
              height: "100%",
              duration: 1,
              ease: "power2.out",
            },
            0
          );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="section-shell">
        <TitleHeader
          title="Professional Work Experience"
          sub="💼 My Career Overview"
        />

        <div className="experience-stack">
          {expCards.map((card, index) => {
            const isReverse = index % 2 === 1;

            return (
              <article
                key={card.title}
                data-direction={isReverse ? "reverse" : "forward"}
                className="experience-row"
              >
                <div className="experience-rail" aria-hidden="true">
                  <span className="experience-rail-track" />
                  <span className="experience-rail-progress" />
                  <div className="timeline-logo">
                    <img
                      src={card.logoPath}
                      alt={card.title}
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="experience-content">
                  <div
                    className={`experience-card-panel xl:row-start-1 ${isReverse ? "xl:col-start-3" : "xl:col-start-1"}`}
                  >
                    <GlowCard card={card} className="mb-0 h-full">
                      <div>
                        <img
                          src={card.imgPath}
                          alt={card.title}
                          loading="lazy"
                        />
                      </div>
                    </GlowCard>
                  </div>

                  <div
                    className={`experience-detail-panel xl:row-start-1 ${isReverse ? "xl:col-start-1" : "xl:col-start-3"}`}
                  >
                    <p className="experience-kicker">Role and impact</p>
                    <h3 className="experience-title">{card.title}</h3>
                    <p className="experience-date">🗓️ {card.date}</p>
                    <p className="experience-subtitle">Responsibilities</p>

                    <ul className="experience-list">
                      {card.responsibilities.map((responsibility) => (
                        <li key={responsibility}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
