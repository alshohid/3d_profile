import TitleHeader from "../components/TitleHeader";
import { processHighlights } from "../constants";

const Testimonials = () => {
  return (
    <section id="process" className="flex-center section-padding">
      <div className="section-shell">
        <TitleHeader
          title="A Premium Site Needs a Premium Build Process"
          sub="🧭 How I approach delivery"
        />

        <div className="process-grid">
          {processHighlights.map((item) => (
            <article key={item.title} className="process-card card-border">
              <div className="process-icon">
                <img src={item.imgPath} alt={item.title} loading="lazy" />
              </div>

              <div className="process-copy">
                <p className="process-label">{item.label}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
