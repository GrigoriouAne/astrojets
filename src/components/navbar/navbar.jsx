import styles from "./navbar.module.css";
import logo from "../../assets/images/ASTRO_JETS.png";
import waves from "../../assets/images/waves.png";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [waveAnimating, setWaveAnimating] = useState(false);
  const waveTimeoutRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true); // scroll down
      } else {
        setHidden(false); // scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogoTap = () => {
    if (window.innerWidth > 991) return;

    setWaveAnimating(true);

    if (waveTimeoutRef.current) {
      clearTimeout(waveTimeoutRef.current);
    }

    waveTimeoutRef.current = setTimeout(() => {
      setWaveAnimating(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (waveTimeoutRef.current) {
        clearTimeout(waveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""} ${
        hidden ? styles.hide : ""
      }`}
    >
      <a
        href="#home"
        className={styles.logoContainer}
        onTouchStart={handleLogoTap}
        onClick={handleLogoTap}
      >
        <img className={styles.logo} src={logo} alt="AstroJets logo" />
        <img
          className={`${styles.waves} ${waveAnimating ? styles.waveActive : ""}`}
          src={waves}
          alt=""
          aria-hidden="true"
        />
      </a>

      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
        <li>
          <a href="#ourPackages" onClick={() => setIsOpen(false)}>
            Our Packages
          </a>
        </li>
        <li>
          <a href="#aboutUs" onClick={() => setIsOpen(false)}>
            About
          </a>
        </li>
        <li>
          <a href="#contactUs" onClick={() => setIsOpen(false)}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
