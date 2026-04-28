import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./bookingPage.module.css";
import logo from "../../../assets/images/ASTRO_JETS.png";
import waves from "../../../assets/images/waves.png";
import navbarStyles from "../../../components/navbar/navbar.module.css";
import { getRegisteredUser, isUserLoggedIn } from "../../../utils/auth";
import {
  calculateJetPrice,
  calculateTotalPrice,
  createBooking,
  getSlotsWithAvailability,
} from "../../../utils/booking";

const durationOptions = ["15 min", "20 min", "30 min"];

const BookingPage = () => {
  const navigate = useNavigate();

  const [selectedDuration, setSelectedDuration] = useState("15 min");
  const [jetSkiCount, setJetSkiCount] = useState(1);
  const [ridersPerJet, setRidersPerJet] = useState([1]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate("/sign-in");
    }
  }, [navigate]);

  useEffect(() => {
    if (jetSkiCount === 1) {
      setRidersPerJet((prev) => [prev[0] || 1]);
    } else {
      setRidersPerJet((prev) => [prev[0] || 1, prev[1] || 1]);
    }
    setSelectedTime("");
  }, [jetSkiCount]);

  const slots = useMemo(() => {
    if (!selectedDate) return [];
    return getSlotsWithAvailability(selectedDate);
  }, [selectedDate, refreshKey]);

  const totalPrice = calculateTotalPrice(selectedDuration, ridersPerJet);

  const handleRiderChange = (index, riders) => {
    const updated = [...ridersPerJet];
    updated[index] = riders;
    setRidersPerJet(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = getRegisteredUser();

    if (!user) {
      setMessage("No signed-in user found.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      setMessage("Please select a date and time.");
      return;
    }

    const chosenSlot = slots.find((slot) => slot.time === selectedTime);

    if (!chosenSlot || chosenSlot.availableJetSkis < jetSkiCount) {
      setMessage("This time slot does not have enough available jet skis.");
      return;
    }

    createBooking({
      userEmail: user.email,
      duration: selectedDuration,
      date: selectedDate,
      time: selectedTime,
      ridersPerJet,
    });

    setMessage("Your booking has been created successfully.");
    setSelectedTime("");
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className={styles.page}>
      <Link to="/" className={`${navbarStyles.logoContainer} ${styles.pageLogo}`}>
        <img className={navbarStyles.logo} src={logo} alt="AstroJets logo" />
        <img className={navbarStyles.waves} src={waves} alt="" aria-hidden="true" />
      </Link>

      <div className={styles.card}>
        <h1 className={styles.title}>Book Your Ride</h1>
        <p className={styles.subtitle}>
          Build your ride, check the live price, and choose your preferred slot.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.mainGrid}>
            <div className={styles.leftColumn}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Choose Duration</label>
                <div className={styles.optionGrid}>
                  {durationOptions.map((duration) => (
                    <button
                      key={duration}
                      type="button"
                      className={`${styles.optionButton} ${
                        selectedDuration === duration ? styles.activeOption : ""
                      }`}
                      onClick={() => setSelectedDuration(duration)}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>How Many Jet Skis?</label>
                <div className={styles.optionGrid}>
                  <button
                    type="button"
                    className={`${styles.optionButton} ${
                      jetSkiCount === 1 ? styles.activeOption : ""
                    }`}
                    onClick={() => setJetSkiCount(1)}
                  >
                    1 Jet Ski
                  </button>

                  <button
                    type="button"
                    className={`${styles.optionButton} ${
                      jetSkiCount === 2 ? styles.activeOption : ""
                    }`}
                    onClick={() => setJetSkiCount(2)}
                  >
                    2 Jet Skis
                  </button>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Choose Riders Per Jet Ski</label>

                <div className={styles.jetConfigList}>
                  {ridersPerJet.map((riders, index) => (
                    <div key={index} className={styles.jetConfigCard}>
                      <h3 className={styles.jetTitle}>Jet Ski {index + 1}</h3>

                      <div className={styles.optionGrid}>
                        <button
                          type="button"
                          className={`${styles.optionButton} ${
                            riders === 1 ? styles.activeOption : ""
                          }`}
                          onClick={() => handleRiderChange(index, 1)}
                        >
                          1 Rider • €{calculateJetPrice(selectedDuration, 1)}
                        </button>

                        <button
                          type="button"
                          className={`${styles.optionButton} ${
                            riders === 2 ? styles.activeOption : ""
                          }`}
                          onClick={() => handleRiderChange(index, 2)}
                        >
                          2 Riders • €{calculateJetPrice(selectedDuration, 2)}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Choose Date</label>
                <input
                  type="date"
                  className={styles.input}
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime("");
                  }}
                  required
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Choose Time Slot</label>
                <div className={styles.slotsGrid}>
                  {slots.length > 0 ? (
                    slots.map((slot) => {
                      const disabled = slot.availableJetSkis < jetSkiCount;

                      return (
                        <button
                          key={slot.time}
                          type="button"
                          className={`${styles.slotButton} ${
                            selectedTime === slot.time ? styles.activeSlot : ""
                          } ${
                            slot.status === "full-available"
                              ? styles.fullAvailable
                              : slot.status === "partial-available"
                              ? styles.partialAvailable
                              : styles.fullyBooked
                          }`}
                          onClick={() => !disabled && setSelectedTime(slot.time)}
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
                    <p className={styles.noSlots}>
                      Please select a date first.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.rightColumn}>
              <div className={styles.summaryCard}>
                <h2 className={styles.summaryTitle}>Booking Summary</h2>

                <div className={styles.summaryRow}>
                  <span>Duration</span>
                  <strong>{selectedDuration}</strong>
                </div>

                <div className={styles.summaryRow}>
                  <span>Jet Skis</span>
                  <strong>{jetSkiCount}</strong>
                </div>

                {ridersPerJet.map((riders, index) => (
                  <div key={index} className={styles.summaryRow}>
                    <span>Jet Ski {index + 1}</span>
                    <strong>
                      {riders} {riders === 1 ? "rider" : "riders"} • €
                      {calculateJetPrice(selectedDuration, riders)}
                    </strong>
                  </div>
                ))}

                <div className={styles.summaryRow}>
                  <span>Date</span>
                  <strong>{selectedDate || "-"}</strong>
                </div>

                <div className={styles.summaryRow}>
                  <span>Time</span>
                  <strong>{selectedTime || "-"}</strong>
                </div>

                <div className={styles.totalRow}>
                  <span>Total</span>
                  <strong>€{totalPrice}</strong>
                </div>

                {message && <p className={styles.message}>{message}</p>}

                <button type="submit" className={styles.confirmButton}>
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;