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
      <h1 className={styles.aboutUsTitle}>About Us</h1>
      <p className={styles.aboutUsText}>
        👊 AstroJets – Two friends, one dream, endless rides We are the
        AstroBoys. Two childhood friends who grew up on cartoons, endless
        summers, and the feeling that life’s better when you have someone next
        to you who balances you out. The first boy is the voice of reason —
        responsible, grounded, always thinking ahead. The second boy is the
        spark — a dreamer, spontaneous, full of "let's go now!" energy. They may
        seem like opposites. But that’s exactly what makes it work. Where one
        hits the brakes, the other pushes the throttle. And somewhere between
        logic and imagination, AstroJets was born — inspired by childhood
        cartoons, driven by a shared dream, and fueled by real friendship.
        Today, in Nea Peramos, Kavala, we don’t just rent out jet skis. We offer
        experiences. Memories. Stories you’ll tell at the end of the summer.
        AstroJets When imagination meets responsibility… and becomes a wave. 🌊
      </p>
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
