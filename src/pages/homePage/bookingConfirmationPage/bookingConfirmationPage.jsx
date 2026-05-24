import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styles from "./bookingConfirmationPage.module.css";
import logo from "../../../assets/images/ASTRO_JETS.png";
import waves from "../../../assets/images/waves.png";
import navbarStyles from "../../../components/navbar/navbar.module.css";

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state?.booking;

  useEffect(() => {
    if (!booking) {
      navigate("/booking");
    }
  }, [booking, navigate]);

  if (!booking) return null;

  return (
    <div className={styles.page}>
      <Link to="/" className={`${navbarStyles.logoContainer} ${styles.pageLogo}`}>
        <img className={navbarStyles.logo} src={logo} alt="AstroJets logo" />
        <img className={navbarStyles.waves} src={waves} alt="" aria-hidden="true" />
      </Link>

      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Booking Confirmed</h1>
          <p className={styles.subtitle}>
            Your AstroJets booking has been successfully submitted.
          </p>
        </div>

        <div className={styles.confirmBadge}>Confirmed</div>

        <div className={styles.infoRow}>
          <span>Duration</span>
          <strong>{booking.duration}</strong>
        </div>

        <div className={styles.infoRow}>
          <span>Date</span>
          <strong>{booking.date}</strong>
        </div>

        <div className={styles.infoRow}>
          <span>Time</span>
          <strong>{booking.time}</strong>
        </div>

        <div className={styles.infoRow}>
          <span>Jet Skis</span>
          <strong>{booking.jetSkiCount}</strong>
        </div>

        {booking.ridersPerJet?.map((riders, index) => (
          <div key={index} className={styles.infoRow}>
            <span>Jet Ski {index + 1}</span>
            <strong>
              {riders} {riders === 1 ? "rider" : "riders"}
            </strong>
          </div>
        ))}

        <div className={styles.infoRow}>
          <span>Total Price</span>
          <strong>€{booking.totalPrice}</strong>
        </div>

        <div className={styles.noteBox}>
          Please arrive 10–15 minutes before your scheduled ride. If you need any
          help, contact the AstroJets team.
        </div>

        <div className={styles.actions}>
          <Link to="/my-bookings" className={styles.primaryButton}>
            View My Bookings
          </Link>

          <Link to="/" className={styles.secondaryButton}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;