import { useEffect, useState } from "react";
import styles from "./HomeBanner.module.css";
import bannerImg from "../../assets/images/astrobanner.png";
import bgVideo from "../../assets/video/astroBoy.mp4";
const HomeBanner = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
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
  const videoUrl = isMobile
    ? bgVideo
    : "https://www.youtube-nocookie.com/embed/HSYBZ2MC9GU?autoplay=1&mute=1&loop=1&playlist=HSYBZ2MC9GU&controls=0&showinfo=0&modestbranding=1&rel=0&playsinline=1";

  return (
    <div id="home" className={styles.banner}>
      <div className={styles.videoWrapper}>
        {isMobile ? (
          <video
            className={styles.video}
            src={bgVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img className={styles.video} src={bannerImg} />
          // <iframe
          //   className={styles.video}
          //   src={videoUrl}
          //   allow="autoplay; fullscreen"
          //   allowFullScreen
          //   title="Background Video"
          // />
        )}
      </div>

      <h1 className={styles.title}>ASTRO JETS</h1>
    </div>
  );
};

export default HomeBanner;
