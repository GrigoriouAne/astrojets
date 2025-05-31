import styles from "./mobileNavbar.module.css";
import jetSkiImg from "../../assets/images/jetskiastro.png";
import aboutUsImg from "../../assets/images/aboutusastro.png";
import infoImg from "../../assets/images/infoastro.png";

const MobileNavBar = () => {
  return (
    <div className={styles.container}>
      <a href="#about" className={styles.leftLink}>
        <img className={styles.leftImg} src={aboutUsImg} alt="About Us" />
      </a>
      <a href="#home" className={styles.centerLink}>
        <img className={styles.centerImg} src={jetSkiImg} alt="Home" />
      </a>
      <a href="#info" className={styles.rightLink}>
        <img className={styles.rightImg} src={infoImg} alt="Info" />
      </a>
    </div>
  );
};

export default MobileNavBar;
