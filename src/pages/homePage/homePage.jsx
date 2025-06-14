import styles from "./homePage.module.css";

import HomeBanner from "../../components/homeBanner/homeBanner";
import PricingCard from "../../components/pricingCard/pricingCard";
const HomePage = () => {
  return (
    <>
      <div>
        <HomeBanner id="home" />
        <Pricing />
      </div>
    </>
  );
};

const Pricing = () => {
  return (
    <div id="plans" className={styles.pricintContainer}>
      <h1 className={styles.pricingTitle}>Our packages</h1>
      <PricingCard minutes={15} image="basic-plan.png" />
      <PricingCard minutes={20} image="pro-plan.png" />
      <PricingCard minutes={30} image="business-plan.png" />
      <PricingCard minutes={40} image="enterprise-plan.png" />
    </div>
  );
};

export default HomePage;
