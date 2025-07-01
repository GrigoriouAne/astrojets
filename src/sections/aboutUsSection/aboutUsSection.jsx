import styles from "./aboutUsSection.module.css";

const AboutUsSection = () => {
  return (
    <div id={"aboutUs"} className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>About Us</h1>
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.text}>
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

export default AboutUsSection;
