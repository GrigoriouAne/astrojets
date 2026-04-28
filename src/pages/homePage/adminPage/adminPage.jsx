import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./adminPage.module.css";
import logo from "../../../assets/images/ASTRO_JETS.png";
import waves from "../../../assets/images/waves.png";
import navbarStyles from "../../../components/navbar/navbar.module.css";
import { getRegisteredUser, isUserLoggedIn } from "../../../utils/auth";
import { getAllBookings, updateBookingStatus } from "../../../utils/booking";

const ADMIN_EMAIL = "astrojets.ws@gmail.com";

const AdminPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const loadBookings = () => {
    const storedBookings = getAllBookings();
    const sortedBookings = [...storedBookings].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setBookings(sortedBookings);
  };

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate("/sign-in");
      return;
    }

    const currentUser = getRegisteredUser();

    if (!currentUser || currentUser.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        navigate("/");
        return;
    }

    loadBookings();
  }, [navigate]);

  const handleApproveCancellation = (bookingId) => {
    updateBookingStatus(bookingId, "cancelled");
    loadBookings();
  };

  const handleRejectCancellation = (bookingId) => {
    updateBookingStatus(bookingId, "active");
    loadBookings();
  };

  const handleDirectCancellation = (bookingId) => {
    const confirmed = window.confirm(
        "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    updateBookingStatus(bookingId, "cancelled");
    loadBookings();
  };

  const getStatusLabel = (status) => {
    if (status === "cancel_pending") return "Cancellation Requested";
    if (status === "cancelled") return "Cancelled";
    return "Confirmed";
  };

  const getStatusClass = (status) => {
    if (status === "cancel_pending") return styles.pendingBadge;
    if (status === "cancelled") return styles.cancelledBadge;
    return styles.confirmedBadge;
  };

  const cancellationRequests = bookings.filter(
    (booking) => booking.status === "cancel_pending"
  );

  return (
    <div className={styles.page}>
      <Link to="/" className={`${navbarStyles.logoContainer} ${styles.pageLogo}`}>
        <img className={navbarStyles.logo} src={logo} alt="AstroJets logo" />
        <img
          className={navbarStyles.waves}
          src={waves}
          alt=""
          aria-hidden="true"
        />
      </Link>

      <div className={styles.pageContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>
            Manage bookings and review cancellation requests.
          </p>
        </div>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>Cancellation Requests</h2>

          {cancellationRequests.length === 0 ? (
            <p className={styles.emptyText}>No pending cancellation requests.</p>
          ) : (
            <div className={styles.cardsList}>
              {cancellationRequests.map((booking) => (
                <div key={booking.id} className={styles.bookingCard}>
                  <div className={styles.bookingTop}>
                    <h3 className={styles.bookingTitle}>{booking.duration}</h3>

                    <div className={styles.bookingTopRight}>
                        <div
                        className={`${styles.statusBadge} ${getStatusClass(
                            booking.status
                        )}`}
                        >
                        {getStatusLabel(booking.status)}
                        </div>

                        {booking.status === "active" && (
                        <button
                            type="button"
                            className={styles.directCancelButton}
                            onClick={() => handleDirectCancellation(booking.id)}
                        >
                            Cancel Booking
                        </button>
                        )}
                    </div>
                  </div>

                  <div className={styles.infoRow}>
                    <span>Email</span>
                    <strong>{booking.userEmail}</strong>
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

                  <div className={styles.actionButtons}>
                    <button
                      type="button"
                      className={styles.approveButton}
                      onClick={() => handleApproveCancellation(booking.id)}
                    >
                      Approve Cancellation
                    </button>

                    <button
                      type="button"
                      className={styles.rejectButton}
                      onClick={() => handleRejectCancellation(booking.id)}
                    >
                      Reject Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>All Bookings</h2>

          {bookings.length === 0 ? (
            <p className={styles.emptyText}>No bookings found.</p>
          ) : (
            <div className={styles.cardsList}>
              {bookings.map((booking) => (
                <div key={booking.id} className={styles.bookingCard}>
                  <div className={styles.bookingTop}>
                    <h3 className={styles.bookingTitle}>{booking.duration}</h3>

                    <div className={styles.bookingTopRight}>
                        <div
                        className={`${styles.statusBadge} ${getStatusClass(
                            booking.status
                        )}`}
                        >
                        {getStatusLabel(booking.status)}
                        </div>

                        {booking.status === "active" && (
                        <button
                            type="button"
                            className={styles.directCancelButton}
                            onClick={() => handleDirectCancellation(booking.id)}
                        >
                            Cancel Booking
                        </button>
                        )}
                    </div>
                  </div>

                  <div className={styles.infoRow}>
                    <span>Email</span>
                    <strong>{booking.userEmail}</strong>
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
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminPage;