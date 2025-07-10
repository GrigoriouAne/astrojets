import PricingCard from "../../components/pricingCard/pricingCard";
import styles from "./ourPackagesSection.module.css";

const OurPackagesSection = () => {
  return (
    <div id="ourPackages" className={styles.container}>
      <h1 className={styles.title}>Our packages</h1>
      <div className={styles.cardsContainer}>
        <PricingCard minutes={15} image="basic-plan.png" price={40} />
        <PricingCard minutes={20} image="pro-plan.png" price={50} flame />
        <PricingCard minutes={30} image="business-plan.png" price={60} />
        <PricingCard minutes={40} image="enterprise-plan.png" price={80} />
      </div>
    </div>
  );
};

export default OurPackagesSection;
