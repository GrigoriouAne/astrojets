import Lottie from "lottie-react";
import styles from "./pricingCard.module.css";
import flameAnimation from "./FlameAnimation.json";
import { IoLogoEuro } from "react-icons/io5";

const PricingCard = ({ minutes, image, price, flame }) => {
  return (
    <div className={styles.cardWrapper}>
      <div
        className={styles.flameBadge}
        style={{ visibility: flame ? "visible" : "hidden" }}
      >
        <Lottie animationData={flameAnimation} loop={true} />
      </div>

      <div
        className={styles.container}
        style={{ backgroundImage: `url("${image}")` }}
      >
        <div className={styles.minutes}>{minutes} min</div>

        <div className={styles.priceContainer}>
          <div className={styles.price}>
            {price}
            <IoLogoEuro className={styles.euro} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
