import styles from "./Navbar.module.css";
import logo from "../../assets/ASTRO_JETS.png";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} />
      </div>

      <button
        className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
        <li>
          <a href="#home" onClick={() => setIsOpen(false)}>
            Home
          </a>
        </li>
        <li>
          <a href="#about" onClick={() => setIsOpen(false)}>
            About
          </a>
        </li>
        <li>
          <a href="#services" onClick={() => setIsOpen(false)}>
            Services
          </a>
        </li>
        <li>
          <a href="#contact" onClick={() => setIsOpen(false)}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
