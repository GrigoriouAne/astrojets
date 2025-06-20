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

const Info = () => {
  return (
    <div id="info" className={styles.infoContainer}>
      <h1 className={styles.infoTitle}>Contact Us</h1>
      <div className={styles.infoCard}>
        <Icon source={phoneIcon} />
        <a className={styles.infoLink} href="tel:6980083496">
          6980083496
        </a>
        <a className={styles.infoLink} href="tel:6984785608">
          6984785608
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
        <Map />
      </div>
    </div>
  );
};

export default HomePage;
