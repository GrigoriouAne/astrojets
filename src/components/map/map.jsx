import styles from "./map.module.css";

const Map = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3018.4264710533766!2d24.303536176418525!3d40.840559629734805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDUwJzI2LjAiTiAyNMKwMTgnMjIuMCJF!5e0!3m2!1sen!2sgr!4v1750000559850!5m2!1sen!2sgr"
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
