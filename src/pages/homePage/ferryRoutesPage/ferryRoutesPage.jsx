import styles from "./ferryRoutesPage.module.css";
import ferryBanner from "../../../assets/images/ferry-banner.png";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/ASTRO_JETS.png";
import waves from "../../../assets/images/waves.png";
import navbarStyles from "../../../components/navbar/navbar.module.css";
import { useEffect, useState } from "react";

const FerryRoutesPage = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className={styles.page}>
      <Link
        to="/"
        className={`${navbarStyles.logoContainer} ${styles.pageLogo} ${
          hidden ? styles.hideLogo : ""
        }`}
      >
        <img className={navbarStyles.logo} src={logo} alt="AstroJets logo" />
        <img
          className={navbarStyles.waves}
          src={waves}
          alt=""
          aria-hidden="true"
        />
      </Link>

      <div className={styles.heroBanner}>
        <img
          src={ferryBanner}
          alt="Ferry routes banner"
          className={styles.heroImage}
        />
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Ferry Routes</h1>
        <p className={styles.subtitle}>
          View the main ferry routes to and from Thassos, Keramoti and Kavala.
        </p>
      </div>

      <div className={styles.routesGrid}>
        <section className={styles.routeCard}>
          <h2 className={styles.routeTitle}>Thassos ⇄ Keramoti</h2>

          <div className={styles.columns}>
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>From Thassos / Limenas</h3>
              <ul className={styles.timeList}>
                <li>05:00</li>
                <li>06:00</li>
                <li>07:00</li>
                <li>07:45</li>
                <li>08:30</li>
                <li>09:30</li>
                <li>10:15</li>
                <li>11:00</li>
                <li>12:00</li>
                <li>12:45</li>
                <li>13:30</li>
                <li>14:15</li>
                <li>15:00</li>
                <li>15:45</li>
                <li>16:30</li>
                <li>17:15</li>
                <li>18:00</li>
                <li>18:45</li>
                <li>19:30</li>
                <li>20:30</li>
              </ul>
            </div>

            <div className={styles.column}>
              <h3 className={styles.columnTitle}>From Keramoti</h3>
              <ul className={styles.timeList}>
                <li>05:00</li>
                <li>06:00</li>
                <li>06:30</li>
                <li>07:15</li>
                <li>08:15</li>
                <li>09:00</li>
                <li>09:45</li>
                <li>10:45</li>
                <li>11:30</li>
                <li>12:15</li>
                <li>13:15</li>
                <li>14:00</li>
                <li>14:45</li>
                <li>15:30</li>
                <li>16:15</li>
                <li>17:00</li>
                <li>17:45</li>
                <li>18:30</li>
                <li>19:30</li>
                <li>20:30</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.routeCard}>
          <h2 className={styles.routeTitle}>Thassos ⇄ Kavala</h2>

          <div className={styles.columns}>
            <div className={styles.column}>
              <h3 className={styles.columnTitle}>From Thassos / Skala Prinos</h3>
              <ul className={styles.timeList}>
                <li>07:15</li>
                <li>12:00</li>
                <li>15:45</li>
              </ul>
            </div>

            <div className={styles.column}>
              <h3 className={styles.columnTitle}>From Kavala</h3>
              <ul className={styles.timeList}>
                <li>09:15</li>
                <li>14:00</li>
                <li>17:30</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className={styles.noteBox}>
        <p className={styles.note}>
          Routes may change. We recommend confirming schedules before departure.
        </p>

        <a
          className={styles.sourceLink}
          href="https://www.go-thassos.gr/gr/thassos-ferry-schedules-prices"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source
        </a>
      </div>
    </div>
  );
};

export default FerryRoutesPage;