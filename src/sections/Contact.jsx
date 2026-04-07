import { lazy, Suspense, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";
import { contactHighlights } from "../constants";
import useInViewOnce from "../hooks/useInViewOnce";
import useDeviceProfile from "../hooks/useDeviceProfile";

const ContactExperience = lazy(
  () => import("../components/models/contact/ContactExperience")
);

const initialFormState = {
  name: "",
  email: "",
  company: "",
  projectType: "Portfolio Website",
  budget: "Not defined yet",
  timeline: "Flexible",
  message: "",
};

const ContactVisualFallback = () => {
  return (
    <div className="contact-fallback">
      <div className="contact-fallback-card">
        <p className="contact-kicker">Premium collaboration flow</p>
        <h3>Responsive, clear, and scoped around delivery goals.</h3>
        <p>
          The mobile version stays lightweight and polished, while larger
          screens can unlock richer visual presentation.
        </p>

        <div className="contact-fallback-metrics">
          <div>
            <span>01</span>
            <p>Clear project scoping</p>
          </div>
          <div>
            <span>02</span>
            <p>Fast communication cycle</p>
          </div>
          <div>
            <span>03</span>
            <p>Premium frontend polish</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const formRef = useRef(null);
  const [sectionRef, shouldRenderExperience] = useInViewOnce({
    rootMargin: "180px 0px",
  });
  const { shouldUseContactCanvas, lowPowerMode } = useDeviceProfile();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setForm(initialFormState);
      setStatus("success");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const shouldRenderCanvas = shouldRenderExperience && shouldUseContactCanvas;

  return (
    <section ref={sectionRef} id="contact" className="flex-center section-padding">
      <div className="section-shell">
        <TitleHeader
          title="Get in Touch for a More Premium Build"
          sub="💬 Let’s plan the next project"
        />

        <div className="grid-12-cols mt-16 contact-grid">
          <div className="xl:col-span-6">
            <div className="card-border rounded-[32px] p-6 md:p-10 h-full">
              <div className="contact-copy">
                <p className="contact-kicker">Project inquiry</p>
                <h3>Tell me what you want to build</h3>
                <p>
                  Share the idea, scope, and timeline. I&apos;ll use that to
                  understand the build properly before replying.
                </p>
              </div>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7 mt-8"
              >
                <div className="contact-form-grid">
                  <div>
                    <label htmlFor="name">Your name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="What should I call you?"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email">Your email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Where should I reply?"
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-grid">
                  <div>
                    <label htmlFor="company">Company or brand</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Optional"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType">Project type</label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={form.projectType}
                      onChange={handleChange}
                    >
                      <option>Portfolio Website</option>
                      <option>Product Frontend</option>
                      <option>SaaS Dashboard</option>
                      <option>Interactive 3D Experience</option>
                    </select>
                  </div>
                </div>

                <div className="contact-form-grid">
                  <div>
                    <label htmlFor="budget">Budget range</label>
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                    >
                      <option>Not defined yet</option>
                      <option>Under $500</option>
                      <option>$500 - $1,500</option>
                      <option>$1,500 - $3,000</option>
                      <option>$3,000+</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline">Timeline</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                    >
                      <option>Flexible</option>
                      <option>As soon as possible</option>
                      <option>Within 2 weeks</option>
                      <option>Within 1 month</option>
                      <option>More than 1 month</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message">Project details</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the experience, goals, or features you want to ship."
                    rows="6"
                    required
                  />
                </div>

                <button type="submit" disabled={loading}>
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Project Brief"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>

                {status === "success" && (
                  <p className="status-note success">
                    Your project brief was sent successfully.
                  </p>
                )}

                {status === "error" && (
                  <p className="status-note error">
                    The message could not be sent right now. Please check the
                    EmailJS keys and try again.
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="xl:col-span-6 min-h-96">
            <div className="contact-showcase card-border rounded-[32px] overflow-hidden h-full">
              <div className="contact-side-panel">
                <p className="contact-kicker">Why teams reach out</p>
                <h3>Premium execution with a cleaner delivery flow</h3>

                <div className="contact-highlights">
                  {contactHighlights.map((item) => (
                    <div key={item.title} className="contact-highlight-item">
                      <div className="contact-highlight-dot" />
                      <div>
                        <p className="contact-highlight-title">{item.title}</p>
                        <p className="contact-highlight-text">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="contact-canvas-shell">
                {shouldRenderCanvas ? (
                  <Suspense fallback={<ContactVisualFallback />}>
                    <ContactExperience lite={lowPowerMode} />
                  </Suspense>
                ) : (
                  <ContactVisualFallback />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
