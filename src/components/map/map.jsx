import styles from "./map.module.css";

const Map = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d2497.6700373099816!2d24.30523935748146!3d40.840540061502566!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDUwJzI2LjAiTiAyNMKwMTgnMjIuMCJF!5e1!3m2!1sen!2sgr!4v1751355419829!5m2!1sen!2sgr"
      //   width="600"
      //   height="450"
      //   style="border:0;"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={styles.container}
    ></iframe>
  );
};

export default Map;
