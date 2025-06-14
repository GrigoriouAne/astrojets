import styles from "./pricingCard.module.css";

const PricingCard = ({ minutes, image }) => {
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url("${image}")` }}
    >
      <div className={styles.minutes}>{minutes} min</div>
    </div>
  );
};

export default PricingCard;
