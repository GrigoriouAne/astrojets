import styles from "./icon.module.css";

const Icon = ({ source }) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={source} />
    </div>
  );
};

export default Icon;
