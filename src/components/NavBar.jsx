import { useEffect, useState } from "react";
import { navLinks } from "../constants";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <div className="nav-topbar">
          <div className="nav-brand">
            <img
              src="/images/myimage.jpg"
              alt="Shohid portrait"
              loading="eager"
              className="size-10 rounded-full object-cover ring-2 ring-white/10"
            />
            <a href="#hero" className="logo truncate">
              AL SHOHID
            </a>
          </div>

          <div className="nav-meta">
            <span className="nav-status">Responsive. Premium. Fast.</span>

            <a href="#contact" className="contact-btn group">
              <div className="inner">
                <span>Contact me</span>
              </div>
            </a>
          </div>

          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        <div className="nav-desktop-shell">
          <nav className="desktop" aria-label="Primary">
            <ul>
              {navLinks.map(({ link, name }) => (
                <li key={name} className="group">
                  <a href={link}>
                    <span>{name}</span>
                    <span className="underline" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-nav-shell md:hidden">
          <button
            type="button"
            className="mobile-nav-backdrop"
            aria-label="Close Menu"
            onClick={closeMenu}
          />

          <nav className="mobile-nav-panel">
            <p className="mobile-nav-kicker">Navigate the portfolio</p>

            <ul className="mobile-nav-list">
              {navLinks.map(({ link, name }) => (
                <li key={name}>
                  <a href={link} onClick={closeMenu}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>

            <a href="#contact" className="mobile-nav-cta" onClick={closeMenu}>
              Start a project
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
