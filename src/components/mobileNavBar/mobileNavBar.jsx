import styles from "./mobileNavBar.module.css";
import jetSkiImg from "../../assets/images/jetskiastro.png";
import aboutUsImg from "../../assets/images/aboutusastro.png";
import infoImg from "../../assets/images/infoastro.png";
import { useEffect, useState } from "react";
import useSmoothScroll from "../../hooks/useSmoothScroll";
const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
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

  useSmoothScroll(0);
  return (
    <div
      className={`${styles.container} ${scrolled ? styles.scrolled : ""} ${
        hidden ? styles.hide : ""
      }`}
    >
      <a href="#aboutUs" className={styles.leftLink}>
        <img className={styles.leftImg} src={aboutUsImg} alt="About Us" />
      </a>
      <a href="#ourPackages" className={styles.centerLink}>
        <img className={styles.centerImg} src={jetSkiImg} alt="Our Packages" />
      </a>
      <a href="#contactUs" className={styles.rightLink}>
        <img className={styles.rightImg} src={infoImg} alt="Contact Us" />
      </a>
    </div>
  );
};

export default MobileNavBar;
