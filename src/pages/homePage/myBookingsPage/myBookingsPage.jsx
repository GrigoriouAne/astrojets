import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./myBookingsPage.module.css";
import logo from "../../../assets/images/ASTRO_JETS.png";
import waves from "../../../assets/images/waves.png";
import navbarStyles from "../../../components/navbar/navbar.module.css";
import { getRegisteredUser, isUserLoggedIn } from "../../../utils/auth";
import {
  getBookingsForUser,
  requestBookingCancellation,
  updateBookingStatus,
} from "../../../utils/booking";

const MyBookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  const loadBookings = async () => {
    const user = await getRegisteredUser();

    if (!user) {
      navigate("/sign-in");
      return;
    }

    const userBookings = await getBookingsForUser(user.email);
    setBookings(userBookings);
  };

  useEffect(() => {
    const checkAuthAndLoadBookings = async () => {
      const loggedIn = await isUserLoggedIn();

      if (!loggedIn) {
        navigate("/sign-in");
        return;
      }

      await loadBookings();
    };

    checkAuthAndLoadBookings();
  }, [navigate]);

  const getBookingTitle = (duration) => {
    if (duration === "15 min") return "15 MINUTE RIDE";
    if (duration === "20 min") return "20 MINUTE RIDE";
    if (duration === "30 min") return "30 MINUTE RIDE";
    return duration;
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

  const upcomingBookings = bookings.filter(
    (booking) => booking.status !== "cancelled" && booking.date >= today
  );

  const pastBookings = bookings.filter(
    (booking) => booking.status !== "cancelled" && booking.date < today
  );

  const handleCancellationRequest = async (bookingId) => {
    await requestBookingCancellation(bookingId);
    await loadBookings();
  };

  const handleUndoCancellationRequest = async (bookingId) => {
    await updateBookingStatus(bookingId, "active");
    await loadBookings();
  };

  return (
    <div className={styles.page}>
      <Link to="/" className={`${navbarStyles.logoContainer} ${styles.pageLogo}`}>
        <img className={navbarStyles.logo} src={logo} alt="AstroJets logo" />
        <img className={navbarStyles.waves} src={waves} alt="" aria-hidden="true" />
      </Link>

      <div className={styles.card}>
        <h1 className={styles.title}>My Bookings</h1>
        <p className={styles.subtitle}>
          Here you can see all your reservation details.
        </p>

        {upcomingBookings.length === 0 && pastBookings.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>
              No bookings yet. Your reservations will appear here.
            </p>

            <Link to="/booking" className={styles.bookNowButton}>
              Book Now
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>Upcoming Bookings</h2>

              {upcomingBookings.length === 0 ? (
                <p className={styles.sectionEmptyText}>
                  You have no upcoming bookings.
                </p>
              ) : (
                <div className={styles.bookingsList}>
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className={styles.bookingCard}>
                      <h2 className={styles.bookingTitle}>
                        {getBookingTitle(booking.duration)}
                      </h2>

                      <div className={styles.bookingRow}>
                        <span>Date</span>
                        <strong>{booking.date}</strong>
                      </div>

                      <div className={styles.bookingRow}>
                        <span>Time</span>
                        <strong>{booking.time}</strong>
                      </div>

                      <div className={styles.bookingRow}>
                        <span>Jet Skis</span>
                        <strong>{booking.jetSkiCount}</strong>
                      </div>

                      {booking.ridersPerJet?.map((riders, index) => (
                        <div key={index} className={styles.bookingRow}>
                          <span>Jet Ski {index + 1}</span>
                          <strong>
                            {riders} {riders === 1 ? "rider" : "riders"}
                          </strong>
                        </div>
                      ))}

                      <div className={styles.totalRow}>
                        <span>Total Price</span>
                        <strong>€{booking.totalPrice}</strong>
                      </div>

                      <div className={styles.bookingActionsRow}>
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
                            className={styles.cancelRequestButton}
                            onClick={async () => {
                              const confirmed = window.confirm(
                                "Are you sure you want to request cancellation for this booking?"
                              );

                              if (confirmed) {
                                await handleCancellationRequest(booking.id);
                              }
                            }}
                          >
                            Request Cancellation
                          </button>
                        )}

                        {booking.status === "cancel_pending" && (
                          <button
                            type="button"
                            className={styles.cancelRequestButton}
                            onClick={async () => {
                              const confirmed = window.confirm(
                                "Do you want to cancel your cancellation request and keep this booking active?"
                              );

                              if (confirmed) {
                                await handleUndoCancellationRequest(booking.id);
                              }
                            }}
                          >
                            Undo Cancellation Request
                          </button>
                        )}
                      </div>

                      {booking.status === "cancel_pending" && (
                        <p className={styles.infoText}>
                          Your cancellation request is waiting for admin approval.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>Past Bookings</h2>

              {pastBookings.length === 0 ? (
                <p className={styles.sectionEmptyText}>
                  You have no past bookings yet.
                </p>
              ) : (
                <div className={styles.bookingsList}>
                  {pastBookings.map((booking) => (
                    <div key={booking.id} className={styles.bookingCard}>
                      <h2 className={styles.bookingTitle}>
                        {getBookingTitle(booking.duration)}
                      </h2>

                      <div className={styles.bookingRow}>
                        <span>Date</span>
                        <strong>{booking.date}</strong>
                      </div>

                      <div className={styles.bookingRow}>
                        <span>Time</span>
                        <strong>{booking.time}</strong>
                      </div>

                      <div className={styles.bookingRow}>
                        <span>Jet Skis</span>
                        <strong>{booking.jetSkiCount}</strong>
                      </div>

                      {booking.ridersPerJet?.map((riders, index) => (
                        <div key={index} className={styles.bookingRow}>
                          <span>Jet Ski {index + 1}</span>
                          <strong>
                            {riders} {riders === 1 ? "rider" : "riders"}
                          </strong>
                        </div>
                      ))}

                      <div className={styles.totalRow}>
                        <span>Total Price</span>
                        <strong>€{booking.totalPrice}</strong>
                      </div>

                      <div className={styles.bookingActionsRow}>
                        <div
                          className={`${styles.statusBadge} ${getStatusClass(
                            booking.status
                          )}`}
                        >
                          {getStatusLabel(booking.status)}
                        </div>

                        {booking.status === "cancel_pending" && (
                          <button
                            type="button"
                            className={styles.cancelRequestButton}
                            onClick={async () => {
                              const confirmed = window.confirm(
                                "Do you want to cancel your cancellation request and keep this booking active?"
                              );

                              if (confirmed) {
                                await handleUndoCancellationRequest(booking.id);
                              }
                            }}
                          >
                            Undo Cancellation Request
                          </button>
                        )}
                      </div>

                      {booking.status === "cancel_pending" && (
                        <p className={styles.infoText}>
                          Your cancellation request was submitted before this booking date passed
                          and is still waiting for admin approval.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;