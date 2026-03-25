import Icon from "../../components/icon/icon";
import Map from "../../components/map/map";
import styles from "./contactUsSection.module.css";
import phoneIcon from "../../assets/images/call_phone-Photoroom.png";
import emailIcon from "../../assets/images/mail-Photoroom.png";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const ContactUsSection = () => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div id={"contactUs"} className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Contact Us</h1>
      </div>
      {(isMobile || isTablet) && <MobileOrTabletComponent />}
      {isDesktop && <DesktopComponent />}
    </div>
  );
};

const MobileOrTabletComponent = () => {
  return (
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
          <a
            href="https://www.tiktok.com/@astrojets.ws?_t=ZN-8xev9BwXssU&_r=1"
            className={styles.socialLink}
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.instagram.com/astrojets.ws?igsh=aW9zYngyeXU4cWJh"
            className={styles.socialLink}
          >
            <FaInstagram />
          </a>
        </div>
        <h1 className={styles.mapTitle}>Location</h1>
        <p className={styles.locationText}>
          Spot us across the road from Fellachidis Bakery
        </p>
        <Map />
        <Link
          to="/ferry-routes"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ferryBox}
        >
          Δρομολόγια Πλοίων
        </Link>
      </div>
    </div>
  );
};

const DesktopComponent = () => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.leftContainer}>
        <h1 className={styles.subTitle}>Information</h1>
        <div className={styles.phoneContainer}>
          <Icon source={phoneIcon} />
          <div className={styles.phoneLinksContainer}>
            <a className={styles.link} href="tel:6980083496">
              +30 6980083496
            </a>
            <a className={styles.link} href="tel:6984785608">
              +30 6984785608
            </a>
          </div>
        </div>
        <div className={styles.emailContainer}>
          <Icon source={emailIcon} />
          <a className={styles.emailLink} href="mailto:astrojets.ws@gmail.com">
            astrojets.ws@gmail.com
          </a>
        </div>
        <Link
          to="/ferry-routes"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ferryBox}
        >
          Δρομολόγια Πλοίων
        </Link>
      </div>
      <div className={styles.middleContainer}>
        <h1 className={styles.subTitle}>Social media</h1>
        <div className={styles.socialMediaContainer}>
          <a
            href="https://www.tiktok.com/@astrojets.ws?_t=ZN-8xev9BwXssU&_r=1"
            className={styles.socialLink}
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.instagram.com/astrojets.ws?igsh=aW9zYngyeXU4cWJh"
            className={styles.socialLink}
          >
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <h1 className={styles.subTitle}>Location</h1>
        <p className={styles.locationText}>
          Spot us across the road from Fellachidis Bakery
        </p>
        <Map />
      </div>
    </div>
  );
};

export default ContactUsSection;
