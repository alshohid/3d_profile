import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Services from "./sections/Services";
import Navbar from "./components/NavBar";

const App = () => (
  <div className="page-shell">
    <div className="page-orb page-orb-one" aria-hidden="true" />
    <div className="page-orb page-orb-two" aria-hidden="true" />
    <div className="page-grid" aria-hidden="true" />
    <Navbar />
    <main className="page-content">
      <Hero />
      <ShowcaseSection />
      <LogoShowcase />
      <FeatureCards />
      <Services />
      <Experience />
      <TechStack />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  </div>
);

export default App;
