import { useEffect, useState } from "react";
import styles from "./homeBanner.module.css";
import bannerImg from "../../assets/images/astrobanner.png";
const HomeBanner = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 991 : false
  );

  useEffect(() => {
    // Fix iOS 100vh issue
    const setHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    setHeight();
    setHeight();
    window.addEventListener("resize", setHeight);
    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", setHeight);
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  return (
    <div id="home" className={styles.banner}>
      <div className={styles.videoWrapper}>
        {isMobile ? (
          <>
            <div className={styles.video_container}></div>
            <video
              className={styles.video}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
            >
              <source src="/astroboy.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </>
        ) : (
          <img className={styles.video} src={bannerImg} />
        )}
      </div>

      <h1 className={styles.title}>ASTRO JETS</h1>
    </div>
  );
};

export default HomeBanner;
