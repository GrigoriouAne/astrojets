import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./homeBanner.module.css";
import bannerImg from "../../assets/images/astrobanner.png";
import { isUserLoggedIn, logoutUser } from "../../utils/auth";

const HomeBanner = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 991 : false
  );
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
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
    checkScreen();
    setLoggedIn(isUserLoggedIn());

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
          <img className={styles.video} src={bannerImg} alt="AstroJets banner" />
        )}
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.title}>ASTRO JETS</h1>

        <div className={styles.heroButtons}>
          <Link
            to={loggedIn ? "/booking" : "/sign-in"}
            className={styles.heroButton}
          >
            {loggedIn ? "BOOK NOW" : "SIGN IN"}
          </Link>

          {loggedIn && (
            <Link to="/my-bookings" className={styles.myBookingsButton}>
              MY BOOKINGS
            </Link>
          )}

          {loggedIn && (
            <button
              type="button"
              className={styles.logoutButton}
              onClick={() => {
                logoutUser();
                window.location.href = "/";
              }}
            >
              LOG OUT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;