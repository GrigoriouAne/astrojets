import { useEffect } from "react";
import styles from "./HomeBanner.module.css";

const HomeBanner = () => {
  useEffect(() => {
    // Fix iOS 100vh issue
    const setHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setHeight();
    window.addEventListener("resize", setHeight);
    return () => window.removeEventListener("resize", setHeight);
  }, []);

  return (
    <div className={styles.banner}>
      <div className={styles.videoWrapper}>
        <iframe
          className={styles.video}
          src="https://www.youtube-nocookie.com/embed/HSYBZ2MC9GU?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1&loop=1&playlist=HSYBZ2MC9GU&enablejsapi=1"
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Background Video"
        />
      </div>
      <h1 className={styles.title}>Your Title Here</h1>
    </div>
  );
};

export default HomeBanner;
