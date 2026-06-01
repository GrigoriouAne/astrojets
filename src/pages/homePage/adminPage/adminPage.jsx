import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./adminPage.module.css";
import logo from "../../../assets/images/ASTRO_JETS.png";
import waves from "../../../assets/images/waves.png";
import navbarStyles from "../../../components/navbar/navbar.module.css";
import { getRegisteredUser, isUserLoggedIn } from "../../../utils/auth";
import {
  addBlockedSlot,
  getAllBlockedSlots,
  getAllBookings,
  getSlotsWithAvailability,
  removeBlockedSlot,
  updateBookingStatus,
} from "../../../utils/booking";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ADMIN_EMAIL = "astrojets.ws@gmail.com";

const AdminPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [blockedSlots, setBlockedSlots] = useState([]);
  const [blockDate, setBlockDate] = useState("");
  const [blockJetSkis, setBlockJetSkis] = useState(1);
  const [selectedBlockSlot, setSelectedBlockSlot] = useState("");
  const [adminSlots, setAdminSlots] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date());

  const loadBookings = async () => {
    const storedBookings = await getAllBookings();
    const sortedBookings = [...storedBookings].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setBookings(sortedBookings);

    const storedBlockedSlots = await getAllBlockedSlots();
    const sortedBlockedSlots = [...storedBlockedSlots].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setBlockedSlots(sortedBlockedSlots);

    if (blockDate) {
      await loadAdminSlots(blockDate);
    }
  };

  const loadAdminSlots = async (date) => {
    if (!date) {
      setAdminSlots([]);
      return;
    }

    const slots = await getSlotsWithAvailability(date);
    setAdminSlots(slots);
  };

  useEffect(() => {
    const checkAdminAccess = async () => {
      const loggedIn = await isUserLoggedIn();

      if (!loggedIn) {
        navigate("/sign-in");
        return;
      }

      const currentUser = await getRegisteredUser();

      if (!currentUser || currentUser.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        navigate("/");
        return;
      }

      await loadBookings();
    };

    checkAdminAccess();
  }, [navigate]);

  useEffect(() => {
    const loadSlotsForAdmin = async () => {
      await loadAdminSlots(blockDate);
    };

    loadSlotsForAdmin();
  }, [blockDate, refreshKey]);

  const handleApproveCancellation = async (bookingId) => {
    await updateBookingStatus(bookingId, "cancelled");
    await loadBookings();
    setRefreshKey((prev) => prev + 1);
  };

  const handleRejectCancellation = async (bookingId) => {
    await updateBookingStatus(bookingId, "active");
    await loadBookings();
    setRefreshKey((prev) => prev + 1);
  };

  const handleDirectCancellation = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    await updateBookingStatus(bookingId, "cancelled");
    await loadBookings();
    setRefreshKey((prev) => prev + 1);
  };

  const handleAddBlockedSlot = async (e) => {
    e.preventDefault();

    if (!blockDate || !selectedBlockSlot) return;

    const selectedSlotData = adminSlots.find(
      (slot) => slot.time === selectedBlockSlot
    );

    if (!selectedSlotData) return;
    if (selectedSlotData.availableJetSkis < blockJetSkis) return;

    await addBlockedSlot({
      date: blockDate,
      time: selectedBlockSlot,
      blockedJetSkis: Number(blockJetSkis),
      fullDay: false,
    });

    setSelectedBlockSlot("");
    setBlockJetSkis(1);
    await loadBookings();
    setRefreshKey((prev) => prev + 1);
  };

  const handleRemoveBlockedSlot = async (blockedSlotId) => {
    await removeBlockedSlot(blockedSlotId);
    await loadBookings();
    setRefreshKey((prev) => prev + 1);
  };

  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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

  const selectedDateString = formatDateToYYYYMMDD(selectedCalendarDate);

  const bookingsForSelectedDate = bookings
    .filter((booking) => booking.date === selectedDateString)
    .sort((a, b) => {
      if (a.status === "cancelled" && b.status !== "cancelled") return 1;
      if (a.status !== "cancelled" && b.status === "cancelled") return -1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });


  const blockedSlotsForSelectedDate = blockedSlots.filter(
    (slot) => slot.date === selectedDateString
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
          <h2 className={styles.sectionTitle}>Booking Calendar</h2>

          <div className={styles.calendarSection}>
            <div className={styles.calendarWrapper}>
              <Calendar
                onChange={(date) => {
                  setSelectedCalendarDate(date);
                  setBlockDate(formatDateToYYYYMMDD(date));
                  setSelectedBlockSlot("");
                }}
                value={selectedCalendarDate}
                className={styles.adminCalendar}
                tileContent={({ date, view }) => {
                  if (view !== "month") return null;

                  const formattedDate = formatDateToYYYYMMDD(date);
                  const count = bookings.filter(
                    (booking) =>
                      booking.date === formattedDate &&
                      (booking.status === "active" || booking.status === "cancel_pending")
                  ).length;

                  if (count === 0) return null;

                  return <div className={styles.calendarBookingBadge}>{count}</div>;
                }}
              />
            </div>

            <div className={styles.calendarSummary}>
              <h3 className={styles.calendarSummaryTitle}>
                <span className={styles.calendarSummaryDate}>{selectedDateString}</span>
              </h3>

              <div className={styles.calendarSummaryRow}>
                <span>Bookings</span>
                <strong>{bookingsForSelectedDate.length}</strong>
              </div>

              <div className={styles.calendarSummaryRow}>
                <span>Blocked Slots</span>
                <strong>{blockedSlotsForSelectedDate.length}</strong>
              </div>
            </div>
          </div>
        </section>
        

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            Selected Day Bookings{" "}
            <span className={styles.sectionTitleCount}>
              ({bookingsForSelectedDate.length})
            </span>
          </h2>

          {bookingsForSelectedDate.length === 0 ? (
            <p className={styles.emptyText}>No bookings found for this date.</p>
          ) : (
            <div className={styles.cardsList}>
              {bookingsForSelectedDate.map((booking) => (
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
                          onClick={async () => await handleDirectCancellation(booking.id)}
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

        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>
            All Cancellation Requests{" "}
            <span className={styles.sectionTitleCount}>
              ({cancellationRequests.length})
            </span>
          </h2>

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
                      onClick={async () => await handleApproveCancellation(booking.id)}
                    >
                      Approve Cancellation
                    </button>

                    <button
                      type="button"
                      className={styles.rejectButton}
                      onClick={async () => await handleRejectCancellation(booking.id)}
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
          <h2 className={styles.sectionTitle}>Block Availability</h2>

          <form className={styles.blockForm} onSubmit={handleAddBlockedSlot}>
            <div className={styles.blockTopControls}>
              <div className={styles.blockField}>
                <label className={styles.blockLabel}>Date</label>
                <input
                  type="date"
                  className={styles.blockInput}
                  value={blockDate}
                  onChange={(e) => {
                    setBlockDate(e.target.value);
                    setSelectedBlockSlot("");
                  }}
                  required
                />
              </div>

              <div className={styles.blockField}>
                <label className={styles.blockLabel}>Jet Skis to Block</label>
                <select
                  className={styles.blockInput}
                  value={blockJetSkis}
                  onChange={(e) => setBlockJetSkis(Number(e.target.value))}
                >
                  <option value={1}>1 Jet Ski</option>
                  <option value={2}>2 Jet Skis</option>
                </select>
              </div>
            </div>

            <div className={styles.adminSlotsGrid}>
              {adminSlots.length > 0 ? (
                adminSlots.map((slot) => {
                  const disabled = slot.availableJetSkis === 0;

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      className={`${styles.adminSlotButton} ${
                        selectedBlockSlot === slot.time ? styles.activeAdminSlot : ""
                      } ${
                        slot.status === "full-available"
                          ? styles.fullAvailable
                          : slot.status === "partial-available"
                          ? styles.partialAvailable
                          : styles.fullyBooked
                      }`}
                      onClick={() => !disabled && setSelectedBlockSlot(slot.time)}
                      disabled={disabled}
                    >
                      <span>{slot.time}</span>
                      <small>
                        {slot.availableJetSkis === 0
                          ? "Fully booked"
                          : `${slot.availableJetSkis} available`}
                      </small>
                    </button>
                  );
                })
              ) : (
                <p className={styles.emptyText}>Select a date to see slot availability.</p>
              )}
            </div>

            <button
              type="submit"
              className={styles.blockSubmitButton}
              disabled={!blockDate || !selectedBlockSlot}
            >
              Add Block
            </button>
          </form>

          <div className={styles.blockedList}>
            {blockedSlotsForSelectedDate.length === 0 ? (
              <p className={styles.emptyText}>No blocked slots for this selected date.</p>
            ) : (
              blockedSlotsForSelectedDate.map((slot) => (
                <div key={slot.id} className={styles.blockedCard}>
                  <div className={styles.blockedInfo}>
                    <strong>{slot.date}</strong>
                    <span>
                      {slot.fullDay
                        ? "Full day blocked"
                        : `${slot.time} • ${slot.blockedJetSkis} jet ski${
                            slot.blockedJetSkis === 1 ? "" : "s"
                          } blocked`}
                    </span>
                  </div>

                  <button
                    type="button"
                    className={styles.unblockButton}
                    onClick={async () => await handleRemoveBlockedSlot(slot.id)}
                  >
                    Remove Block
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;