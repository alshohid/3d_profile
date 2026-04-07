import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import TitleHeader from "../components/TitleHeader";
import { featuredProjects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
  const sectionRef = useRef(null);
  const [featuredProject, ...supportingProjects] = featuredProjects;

  useGSAP(
    () => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: "power2.out" }
      );

      gsap.utils.toArray(".project-showcase-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.15 * index,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              once: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full max-w-[1280px] mx-auto">
        <TitleHeader
          title="Selected Work That Feels Clear, Fast, and Premium"
          sub="🚀 Featured case studies"
        />

        <div className="showcaselayout">
          <article className="first-project-wrapper project-showcase-card">
            <div className="project-status-row">
              <span className="project-status-pill">
                {featuredProject.eyebrow}
              </span>
              <span className="project-status-note">
                Built for real-world delivery
              </span>
            </div>

            <div className="image-wrapper">
              <img
                src={featuredProject.imgPath}
                alt={featuredProject.title}
                loading="eager"
              />
            </div>

            <div className="text-content">
              <h2>{featuredProject.title}</h2>
              <p className="project-summary">{featuredProject.description}</p>
              <p className="text-white-50 md:text-lg">{featuredProject.summary}</p>

              <div className="project-pill-row">
                {featuredProject.tags.map((tag) => (
                  <span key={tag} className="project-pill">
                    {tag}
                  </span>
                ))}
              </div>

              <ul className="project-highlights">
                {featuredProject.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="project-actions">
                <a
                  href={featuredProject.href}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                >
                  {featuredProject.cta}
                </a>
                <a href="#contact" className="project-link subtle">
                  Build something similar
                </a>
              </div>

              <p className="project-note">{featuredProject.note}</p>
            </div>
          </article>

          <div className="project-list-wrapper overflow-hidden">
            {supportingProjects.map((project) => (
              <article
                key={project.title}
                className="project compact-project project-showcase-card"
              >
                <div className="image-wrapper bg-[#111827]">
                  <img
                    src={project.imgPath}
                    alt={project.title}
                    loading="lazy"
                  />
                </div>

                <div className="compact-project-copy">
                  <span className="project-status-pill">{project.eyebrow}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="project-pill-row">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="project-link subtle"
                  >
                    {project.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
