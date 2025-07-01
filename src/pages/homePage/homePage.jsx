import styles from "./homePage.module.css";

import HomeBanner from "../../components/homeBanner/homeBanner";
import PricingCard from "../../components/pricingCard/pricingCard";
import phoneIcon from "../../assets/images/astro-boy-phone.png";
import emailIcon from "../../assets/images/astro-boy-email.png";
import Icon from "../../components/icon/icon";
import Map from "../../components/map/map";
import { FaTiktok, FaInstagram } from "react-icons/fa";

const HomePage = () => {
  return (
    <>
      <div>
        <HomeBanner id="home" />
        <Plans />
        <AboutUs />
        <Info />
      </div>
    </>
  );
};

const Plans = () => {
  return (
    <div id="plans" className={styles.plansContainer}>
      <h1 className={styles.plansTitle}>Our packages</h1>
      <PricingCard minutes={15} image="basic-plan.png" />
      <PricingCard minutes={20} image="pro-plan.png" />
      <PricingCard minutes={30} image="business-plan.png" />
      <PricingCard minutes={40} image="enterprise-plan.png" />
    </div>
  );
};

const AboutUs = () => {
  return (
    <div id="aboutUs" className={styles.aboutUsContainer}>
      <div className={styles.aboutUsTitleContainer}>
        <h1 className={styles.aboutUsTitle}>About Us</h1>
      </div>
      <div className={styles.aboutUsTextContainer}>
        <p className={styles.aboutUsText}>
          We are the AstroBoys. Two friends with opposite minds but one shared
          dream — to bring our childhood imagination to life. One boy thinks
          with logic. The other with heart. Together, they balance — just like
          on a jet ski. That’s how AstroJets was born. In Nea Peramos, Kavala,
          we don’t just rent jet skis. We create memories.
        </p>
      </div>
    </div>
  );
};

const Info = () => {
  return (
    <div id="info" className={styles.infoContainer}>
      <div className={styles.infoTitleContainer}>
        <h1 className={styles.infoTitle}>Contact Us</h1>
      </div>
      <div className={styles.infoContentContainer}>
        <div className={styles.infoCard}>
          <Icon source={phoneIcon} />
          <a className={styles.infoLink} href="tel:6980083496">
            +30 6980083496
          </a>
          <a className={styles.infoLink} href="tel:6984785608">
            +30 6984785608
          </a>
          <Icon source={emailIcon} />
          <a className={styles.emailLink} href="mailto:astrojets.ws@gmail.com">
            astrojets.ws@gmail.com
          </a>

          <h1 className={styles.mapTitle}>Social media</h1>
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

export default HomePage;
