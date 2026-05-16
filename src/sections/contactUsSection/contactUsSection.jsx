import Icon from "../../components/icon/icon";
import Map from "../../components/map/map";
import styles from "./contactUsSection.module.css";
import phoneIcon from "../../assets/images/call_phone-Photoroom.png";
import emailIcon from "../../assets/images/mail-Photoroom.png";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";

const ContactForm = () => {
  const formRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [statusType, setStatusType] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  useEffect(() => {
    if (!statusMessage) return;

    const timer = setTimeout(() => {
      setStatusMessage("");
      setStatusType("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [statusMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const fromName = formData.get("from_name")?.toString().trim();
    const replyTo = formData.get("reply_to")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!fromName || !replyTo || !message) {
      setStatusType("error");
      setStatusMessage("Please fill in all fields before sending.");
      return;
    }

    try {
      setIsSending(true);
      setStatusType("");
      setStatusMessage("");

      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      formRef.current.reset();
      setStatusType("success");
      setStatusMessage("Your message was sent successfully.");
    } catch (error) {
      console.error("Contact form error:", error);
      setStatusType("error");
      setStatusMessage("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form
      ref={formRef}
      className={styles.contactForm}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="from_name"
        placeholder="Your name"
        className={styles.formInput}
        required
      />

      <input
        type="email"
        name="reply_to"
        placeholder="Your email"
        className={styles.formInput}
        required
      />

      <textarea
        name="message"
        placeholder="Your message"
        className={styles.formTextarea}
        rows="4"
        required
      />

      <button type="submit" className={styles.formButton} disabled={isSending}>
        {isSending ? "Sending..." : "Send Message"}
      </button>

      {statusMessage && (
        <div
          className={`${styles.formStatusBox} ${
            statusType === "success" ? styles.successBox : styles.errorBox
          }`}
        >
          {statusMessage}
        </div>
      )}
    </form>
  );
};

const ContactUsSection = () => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div id={"contactUs"} className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Contact Us</h1>
      </div>
      {(isMobile || isTablet) && <MobileOrTabletComponent />}
      {isDesktop && <DesktopComponent />}
    </div>
  );
};

const MobileOrTabletComponent = () => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.card}>
        <ContactForm />

        <Icon source={phoneIcon} />
        <a className={styles.link} href="tel:6980083496">
          +30 6980083496
        </a>
        <a className={styles.link} href="tel:6984785608">
          +30 6984785608
        </a>
        <Icon source={emailIcon} />
        <a className={styles.emailLink} href="mailto:astrojets.ws@gmail.com">
          astrojets.ws@gmail.com
        </a>

        <h1 className={styles.socialTitle}>Social media</h1>
        <div className={styles.socialMediaContainer}>
          <a
            href="https://www.tiktok.com/@astrojets.ws?_t=ZN-8xev9BwXssU&_r=1"
            className={styles.socialLink}
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.instagram.com/astrojets.ws?igsh=aW9zYngyeXU4cWJh"
            className={styles.socialLink}
          >
            <FaInstagram />
          </a>
        </div>
        <h1 className={styles.mapTitle}>Location</h1>
        <p className={styles.locationText}>
          Spot us across the road from Fellachidis Bakery
        </p>

        <div className={styles.mobileButtons}>
          <Link
            to="/ferry-routes"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ferryBox}
          >
            Ferry Routes
          </Link>

          <Link
            to="/explore-nea-peramos"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.exploreBox}
          >
            Explore Nea Peramos
          </Link>
        </div>

        <Map />
      </div>
    </div>
  );
};

const DesktopComponent = () => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.leftContainer}>
        <h1 className={styles.subTitle}>Information</h1>
        <div className={styles.phoneContainer}>
          <Icon source={phoneIcon} />
          <div className={styles.phoneLinksContainer}>
            <a className={styles.link} href="tel:6980083496">
              +30 6980083496
            </a>
            <a className={styles.link} href="tel:6984785608">
              +30 6984785608
            </a>
          </div>
        </div>
        <div className={styles.emailContainer}>
          <Icon source={emailIcon} />
          <a className={styles.emailLink} href="mailto:astrojets.ws@gmail.com">
            astrojets.ws@gmail.com
          </a>
        </div>
        <div className={styles.desktopButtons}>
        <Link
          to="/ferry-routes"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ferryBox}
        >
          Ferry Routes
        </Link>

        <Link
          to="/explore-nea-peramos"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.exploreBox}
        >
          Explore Nea Peramos
        </Link>
      </div>
      </div>
      <div className={styles.middleContainer}>
          <ContactForm />

          <h1 className={styles.subTitle}>Social media</h1>
          <div className={styles.socialMediaContainer}>
          <a
            href="https://www.tiktok.com/@astrojets.ws?_t=ZN-8xev9BwXssU&_r=1"
            className={styles.socialLink}
          >
            <FaTiktok />
          </a>
          <a
            href="https://www.instagram.com/astrojets.ws?igsh=aW9zYngyeXU4cWJh"
            className={styles.socialLink}
          >
            <FaInstagram />
          </a>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <h1 className={styles.subTitle}>Location</h1>
        <p className={styles.locationText}>
          Spot us across the road from Fellachidis Bakery
        </p>
        <Map />
      </div>
    </div>
  );
};

export default ContactUsSection;
