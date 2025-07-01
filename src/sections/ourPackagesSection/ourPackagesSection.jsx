import PricingCard from "../../components/pricingCard/pricingCard";
import styles from "./ourPackagesSection.module.css";

const OurPackagesSection = () => {
  return (
    <div id="ourPackages" className={styles.container}>
      <h1 className={styles.title}>Our packages</h1>
      <div className={styles.cardsContainer}>
        <PricingCard minutes={15} image="basic-plan.png" />
        <PricingCard minutes={20} image="pro-plan.png" />
        <PricingCard minutes={30} image="business-plan.png" />
        <PricingCard minutes={40} image="enterprise-plan.png" />
      </div>
    </div>
  );
};

export default OurPackagesSection;
