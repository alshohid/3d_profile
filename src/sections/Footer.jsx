const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container footer-premium card-border">
        <div>
          <p className="footer-brand">AL SHOHID</p>
          <p className="footer-copy">
            Premium React, motion, and interactive web experiences built with a
            focus on clarity and frontend polish.
          </p>
        </div>

        <div className="footer-links">
          <a href="#work" className="footer-link">
            View projects
          </a>
          <a href="#contact" className="footer-link">
            Start a project
          </a>
        </div>

        <div>
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Shohid. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
