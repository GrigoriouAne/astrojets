import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./exploreNeaPeramosPage.module.css";
import logo from "../../../assets/images/ASTRO_JETS.png";
import waves from "../../../assets/images/waves.png";
import navbarStyles from "../../../components/navbar/navbar.module.css";

import vrasidas1 from "../../../assets/images/explore/vrasidas-1.jpg";
import vrasidas2 from "../../../assets/images/explore/vrasidas-2.jpg";
import vrasidas3 from "../../../assets/images/explore/vrasidas-3.jpg";
import castle1 from "../../../assets/images/explore/castle-1.jpg";
import castle2 from "../../../assets/images/explore/castle-2.jpg";
import castle3 from "../../../assets/images/explore/castle-3.jpg";
import philippi1 from "../../../assets/images/explore/philippi-1.jpg";
import philippi2 from "../../../assets/images/explore/philippi-2.jpg";
import philippi3 from "../../../assets/images/explore/philippi-3.jpg";
import savvas1 from "../../../assets/images/explore/savvas-1.jpg";
import savvas2 from "../../../assets/images/explore/savvas-2.jpg";
import savvas3 from "../../../assets/images/explore/savvas-3.jpg";
import ammolofoi1 from "../../../assets/images/explore/ammolofoi-1.jpg";
import ammolofoi2 from "../../../assets/images/explore/ammolofoi-2.jpg";
import ammolofoi3 from "../../../assets/images/explore/ammolofoi-3.jpg";
import apomero1 from "../../../assets/images/explore/apomero-1.jpg";
import apomero2 from "../../../assets/images/explore/apomero-2.jpg";
import apomero3 from "../../../assets/images/explore/apomero-3.jpg";
import plage1 from "../../../assets/images/explore/plage-1.jpg";
import plage2 from "../../../assets/images/explore/plage-2.jpg";
import plage3 from "../../../assets/images/explore/plage-3.jpg";
import blue1 from "../../../assets/images/explore/blue-1.jpg";
import blue2 from "../../../assets/images/explore/blue-2.jpg";
import blue3 from "../../../assets/images/explore/blue-3.jpg";

const ImageCarousel = ({ images, altBase }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.carousel}>
      <button className={styles.arrowButton} onClick={prevSlide}>
        ‹
      </button>

      <div className={styles.imageFrame}>
        <img
          src={images[currentIndex]}
          alt={`${altBase} ${currentIndex + 1}`}
          className={styles.carouselImage}
        />
      </div>

      <button className={styles.arrowButton} onClick={nextSlide}>
        ›
      </button>

      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const ExploreNeaPeramosPage = () => {
  const [activeTab, setActiveTab] = useState("beaches");
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

  const pageThemeClass =
    activeTab === "beaches"
      ? styles.beachesTheme
      : activeTab === "history"
      ? styles.historyTheme
      : activeTab === "food"
      ? styles.foodTheme
      : styles.stayTheme;

  const renderContent = () => {
    if (activeTab === "beaches") {
        return (
            <div className={styles.multiSpotGroup}>
            <section className={styles.spotSection}>
                <div className={styles.textContent}>
                <h2 className={styles.spotTitle}>Vrasidas Beach</h2>
                <p className={styles.spotText}>
                    Cape Vrasidas is one of the most beautiful natural spots in the
                    area, located between Ammolofoi and Nea Peramos. It stands out for
                    its unique scenery, small coves, and the quieter atmosphere it
                    offers compared to busier locations nearby.
                </p>
                <p className={styles.spotText}>
                    It is an ideal choice for those who want to explore a more special
                    coastal route, enjoy crystal-clear waters, and combine their visit
                    with the nearby historical site of Anaktoroupoli and the castle.
                </p>
                <a
                    href="https://www.visitkavala.gr/sightseeing/akrotiri-brasida/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sourceButton}
                >
                    Learn more
                </a>
                </div>

                <div className={styles.visualContent}>
                <ImageCarousel
                    images={[vrasidas1, vrasidas2, vrasidas3]}
                    altBase="Vrasidas Beach"
                />
                </div>
            </section>

            <section className={styles.spotSection}>
                <div className={styles.textContent}>
                <h2 className={styles.spotTitle}>Ammolofoi Beach</h2>
                <p className={styles.spotText}>
                    Ammolofoi is one of the best-known beach destinations in the wider
                    Kavala area and a very popular choice for visitors staying near Nea
                    Peramos. It is known for its long sandy coastline, bright waters,
                    and strong summer atmosphere.
                </p>
                <p className={styles.spotText}>
                    It is a great option for those looking for a more lively beach
                    experience, whether for swimming, sunbathing, or spending a full day
                    by the sea close to the area.
                </p>
                <a
                    href="https://www.visitkavala.gr/sightseeing/ammolofoi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sourceButton}
                >
                    Learn more
                </a>
                </div>

                <div className={styles.visualContent}>
                <ImageCarousel
                    images={[ammolofoi1, ammolofoi2, ammolofoi3]}
                    altBase="Ammolofoi Beach"
                />
                </div>
            </section>
            </div>
        );
    }

    if (activeTab === "history") {
        return (
            <div className={styles.multiSpotGroup}>
            <section className={styles.spotSection}>
                <div className={styles.textContent}>
                <h2 className={styles.spotTitle}>Castle of Nea Peramos</h2>
                <p className={styles.spotText}>
                    The Castle of Nea Peramos is one of the most important historical
                    landmarks in the area and is connected to the Byzantine site of
                    Anaktoroupoli. It stands in a privileged location by the sea and
                    offers impressive views of the surrounding landscape.
                </p>
                <p className={styles.spotText}>
                    This site gives Nea Peramos a distinctive character, combining
                    history, natural beauty, and easy access from the village. It is a
                    perfect stop for visitors who want to discover the deeper identity
                    and heritage of the area.
                </p>
                <a
                    href="https://www.kastra.eu/castlegr.php?kastro=peramos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sourceButton}
                >
                    Learn more
                </a>
                </div>

                <div className={styles.visualContent}>
                <ImageCarousel
                    images={[castle1, castle2, castle3]}
                    altBase="Castle of Nea Peramos"
                />
                </div>
            </section>

            <section className={styles.spotSection}>
                <div className={styles.textContent}>
                <h2 className={styles.spotTitle}>Ancient Theatre of Philippi</h2>
                <p className={styles.spotText}>
                    The Ancient Theatre of Philippi is one of the most important
                    archaeological landmarks in the wider Kavala area. It belongs to the
                    ancient city of Philippi and dates back to the 4th century BC, with
                    later Roman interventions that expanded and transformed the monument.
                </p>
                <p className={styles.spotText}>
                    Built at the foot of the acropolis, the theatre combines historical
                    importance with an impressive setting. It is a great destination for
                    visitors who want to connect their summer experience with the rich
                    cultural heritage of Eastern Macedonia.
                </p>
                <a
                    href="https://el.wikipedia.org/wiki/%CE%91%CF%81%CF%87%CE%B1%CE%AF%CE%BF_%CE%B8%CE%AD%CE%B1%CF%84%CF%81%CE%BF_%CE%A6%CE%B9%CE%BB%CE%AF%CF%80%CF%80%CF%89%CE%BD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sourceButton}
                >
                    Learn more
                </a>
                </div>

                <div className={styles.visualContent}>
                <ImageCarousel
                    images={[philippi1, philippi2, philippi3]}
                    altBase="Ancient Theatre of Philippi"
                />
                </div>
            </section>
            </div>
        );
    }

    if (activeTab === "food") {
        return (
            <div className={styles.multiSpotGroup}>
            <section className={styles.spotSection}>
                <div className={styles.textContent}>
                <h2 className={styles.spotTitle}>Savvas Fish Tavern</h2>
                <p className={styles.spotText}>
                    Savvas Fish Tavern in Kavala is a well-known seafood dining option
                    for visitors who want a classic local tavern experience near the
                    sea. It is located at Thassou 29 Street in the Sfagia area of
                    Kavala.
                </p>
                <p className={styles.spotText}>
                    According to the listed information, the tavern offers Wi-Fi,
                    parking, air conditioning, POS payment, take away, and TV, while
                    its opening hours are shown as 09:00 to 03:00 every day.
                </p>
                <p className={styles.spotText}>
                    It can be a very good stop for food either before or after
                    exploring the wider Kavala and Nea Peramos area.
                </p>
                <a
                    href="https://greece-bg.com/el/%CE%9F%CE%B4%CE%B7%CE%B3%CF%8C%CF%82/%CE%BF-%CF%83%CE%AC%CE%B2%CE%B2%CE%B1%CF%82-%CF%88%CE%B1%CF%81%CE%BF%CF%84%CE%B1%CE%B2%CE%AD%CF%81%CE%BD%CE%B1-%CE%BA%CE%B1%CE%B2%CE%AC%CE%BB%CE%B1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sourceButton}
                >
                    Learn more
                </a>
                </div>

                <div className={styles.visualContent}>
                <ImageCarousel
                    images={[savvas1, savvas2, savvas3]}
                    altBase="Savvas Fish Tavern"
                />
                </div>
            </section>

            <section className={styles.spotSection}>
                <div className={styles.textContent}>
                <h2 className={styles.spotTitle}>Apomero Restaurant</h2>
                <p className={styles.spotText}>
                    Apomero is a seafood restaurant in Nea Peramos that focuses on local
                    seafood, Greek cuisine, and a dining experience with a strong sea
                    breeze atmosphere. It presents itself as a place where tradition and
                    creative Mediterranean cooking come together.
                </p>
                <p className={styles.spotText}>
                    The restaurant highlights fresh fish, seafood dishes, and a seaside
                    setting, while also presenting itself as a warm and welcoming choice
                    for families, relaxed meals, and memorable evenings by the water.
                </p>
                <p className={styles.spotText}>
                    According to the official site, it is located at Aigaiou 3, Nea
                    Peramos, Kavala, and lists daily opening hours from 12:00 to 12:00.
                </p>
                <a
                    href="https://www.apomero-restaurant.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sourceButton}
                >
                    Learn more
                </a>
                </div>

                <div className={styles.visualContent}>
                <ImageCarousel
                    images={[apomero1, apomero2, apomero3]}
                    altBase="Apomero Restaurant"
                />
                </div>
            </section>
            </div>
        );
    }

    return (
        <div className={styles.multiSpotGroup}>
            <section className={styles.spotSection}>
            <div className={styles.textContent}>
                <h2 className={styles.spotTitle}>Plage Hotel</h2>
                <p className={styles.spotText}>
                Plage Hotel is a convenient accommodation option in Nea Peramos,
                located close to the center and near the beach. According to the
                available listing information, it offers free Wi-Fi, an on-site bar,
                limited private parking, and a 24-hour front desk.
                </p>
                <p className={styles.spotText}>
                It is a practical choice for visitors who want to stay in a central
                location and have easy access to the beach, local shops, and the
                wider area around Nea Peramos and Kavala.
                </p>
                <p className={styles.spotText}>
                Address information listed online includes 28th Oktovriou 4, Nea
                Peramos, 64007.
                </p>
                <a
                href="https://www.booking.com/hotel/gr/plage.en-gb.html"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sourceButton}
                >
                Learn more
                </a>
            </div>

            <div className={styles.visualContent}>
                <ImageCarousel
                images={[plage1, plage2, plage3]}
                altBase="Plage Hotel"
                />
            </div>
            </section>

            <section className={styles.spotSection}>
            <div className={styles.textContent}>
                <h2 className={styles.spotTitle}>The Blue Apartments</h2>
                <p className={styles.spotText}>
                The Blue Apartments is a stay option in Nea Peramos that presents
                itself as a place connected with comfort, calmness, rest, and the
                relaxed atmosphere of the area.
                </p>
                <p className={styles.spotText}>
                According to the official website, it is located at Eleftheriou
                Venizelou 6, Nea Peramos, and provides direct contact information
                for visitors planning their stay.
                </p>
                <p className={styles.spotText}>
                It is a fitting option for guests looking for accommodation close to
                the center of Nea Peramos while staying near the beach and the local
                summer spots.
                </p>
                <a
                href="https://theblue.gr/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sourceButton}
                >
                Learn more
                </a>
            </div>

            <div className={styles.visualContent}>
                <ImageCarousel
                images={[blue1, blue2, blue3]}
                altBase="The Blue Apartments"
                />
            </div>
            </section>
        </div>
    );
  };

  return (
    <div className={`${styles.page} ${pageThemeClass}`}>
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

      <div className={styles.hero}>
        <h1 className={styles.title}>Explore Nea Peramos</h1>
        <p className={styles.subtitle}>
          Discover beaches, local history, food spots, and places to stay.
        </p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "beaches" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("beaches")}
        >
          Beaches
        </button>

        <button
          className={`${styles.tabButton} ${
            activeTab === "history" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>

        <button
          className={`${styles.tabButton} ${
            activeTab === "food" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("food")}
        >
          Food
        </button>

        <button
          className={`${styles.tabButton} ${
            activeTab === "stay" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("stay")}
        >
          Stay
        </button>
      </div>

      <div className={styles.contentArea}>{renderContent()}</div>
    </div>
  );
};

export default ExploreNeaPeramosPage;