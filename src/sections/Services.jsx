import TitleHeader from "../components/TitleHeader";
import { servicePackages } from "../constants";

const Services = () => {
  return (
    <section id="services" className="flex-center section-padding">
      <div className="section-shell">
        <TitleHeader
          title="Premium Services for High-Impact Web Experiences"
          sub="⚡ What I can build for you"
        />

        <div className="services-grid">
          {servicePackages.map((service) => (
            <article key={service.title} className="service-card card-border">
              <div className="service-card-copy">
                <p className="service-card-kicker">Best fit for premium work</p>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>

              <ul className="service-list">
                {service.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
