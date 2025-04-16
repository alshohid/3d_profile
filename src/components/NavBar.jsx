import { useState, useEffect } from "react";

import { navLinks } from "../constants";


const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner bg-[#141414] rounded-md p-5">
        <a href="#hero" className="logo">
          AL SHOHID
        </a>

        <nav className="desktop">
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
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        <a href="#contact" className="hidden md:block contact-btn group">
          <div className="inner">
            <span>Contact me</span>
          </div>
        </a>
      </div>
      {menuOpen && (
        <nav className="md:hidden bg-[#2C2C2C] rounded-md p-4">
          <ul className="flex flex-col space-y-4 text-white">
            {navLinks.map(({ link, name }) => (
              <li key={name}>
                <a href={link} onClick={() => setMenuOpen(false)}>
                  {name}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact me
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default NavBar;
