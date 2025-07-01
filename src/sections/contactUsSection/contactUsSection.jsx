import Icon from "../../components/icon/icon";
import Map from "../../components/map/map";
import styles from "./contactUsSection.module.css";
import phoneIcon from "../../assets/images/astro-boy-phone.png";
import emailIcon from "../../assets/images/astro-boy-email.png";
import { FaTiktok, FaInstagram } from "react-icons/fa";

const ContactUsSection = () => {
  return (
    <div id={"contactUs"} className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Contact Us</h1>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.card}>
          <Icon source={phoneIcon} />
          <a className={styles.link} href="tel:6980083496">
            +30 6980083496
          </a>
          <a className={styles.link} href="tel:6984785608">
            +30 6984785608
          </a>
          <Icon source={emailIcon} />
          <a className={styles.emailLink} href="mailto:astrojets.ws@gmail.com">
            astrojets.ws@gmail.com
          </a>

          <h1 className={styles.socialTitle}>Social media</h1>
          <div className={styles.socialMediaContainer}>
            <a>
              <FaTiktok />
            </a>
            <a>
              <FaInstagram />
            </a>
          </div>
          <h1 className={styles.mapTitle}>Location</h1>
          <p className={styles.locationText}>
            Spot us across the road from Fellachidis Bakery
          </p>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
