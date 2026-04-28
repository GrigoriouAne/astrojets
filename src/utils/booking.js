export const BOOKING_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
];

export const PRICING = {
  "15 min": {
    1: 50,
    2: 60,
  },
  "20 min": {
    1: 60,
    2: 70,
  },
  "30 min": {
    1: 80,
    2: 90,
  },
};

export const getBookings = () => {
  const bookings = localStorage.getItem("astrojets_bookings");
  return bookings ? JSON.parse(bookings) : [];
};

export const saveBookings = (bookings) => {
  localStorage.setItem("astrojets_bookings", JSON.stringify(bookings));
};

export const getBlockedSlots = () => {
  const blocked = localStorage.getItem("astrojets_blocked_slots");
  return blocked ? JSON.parse(blocked) : [];
};

export const saveBlockedSlots = (blockedSlots) => {
  localStorage.setItem("astrojets_blocked_slots", JSON.stringify(blockedSlots));
};

export const calculateJetPrice = (duration, riders) => {
  return PRICING[duration]?.[riders] || 0;
};

export const calculateTotalPrice = (duration, ridersPerJet) => {
  return ridersPerJet.reduce(
    (sum, riders) => sum + calculateJetPrice(duration, riders),
    0
  );
};

export const getUsedJetSkisForSlot = (date, time) => {
  const bookings = getBookings();
  const blockedSlots = getBlockedSlots();

  const bookedCount = bookings
    .filter(
        (booking) =>
        booking.date === date &&
        booking.time === time &&
        (booking.status === "active" || booking.status === "cancel_pending")
    )
    .reduce((sum, booking) => sum + booking.jetSkiCount, 0);

  const blockedCount = blockedSlots
    .filter((slot) => slot.date === date)
    .reduce((sum, slot) => {
      if (slot.fullDay === true) return sum + 2;
      if (slot.time === time) return sum + (slot.blockedJetSkis || 1);
      return sum;
    }, 0);

  return Math.min(2, bookedCount + blockedCount);
};

export const getAvailableJetSkisForSlot = (date, time) => {
  return Math.max(0, 2 - getUsedJetSkisForSlot(date, time));
};

export const getSlotStatus = (date, time) => {
  const availableJetSkis = getAvailableJetSkisForSlot(date, time);

  if (availableJetSkis === 2) return "full-available";
  if (availableJetSkis === 1) return "partial-available";
  return "fully-booked";
};

export const getSlotsWithAvailability = (date) => {
  return BOOKING_SLOTS.map((slot) => ({
    time: slot,
    availableJetSkis: getAvailableJetSkisForSlot(date, slot),
    status: getSlotStatus(date, slot),
  }));
};

export const createBooking = ({
  userEmail,
  duration,
  date,
  time,
  ridersPerJet,
}) => {
  const jetSkiCount = ridersPerJet.length;
  const totalPrice = calculateTotalPrice(duration, ridersPerJet);

  const bookings = getBookings();

  const newBooking = {
    id: Date.now().toString(),
    userEmail,
    duration,
    date,
    time,
    ridersPerJet,
    jetSkiCount,
    totalPrice,
    status: "active",
    createdAt: new Date().toISOString(),
  };

  bookings.push(newBooking);
  saveBookings(bookings);

  return newBooking;
};
export const getBookingsForUser = (userEmail) => {
  const bookings = getBookings();
  return bookings.filter((booking) => booking.userEmail === userEmail);
};

export const requestBookingCancellation = (bookingId) => {
  const bookings = getBookings();

  const updatedBookings = bookings.map((booking) =>
    booking.id === bookingId
      ? { ...booking, status: "cancel_pending" }
      : booking
  );

  saveBookings(updatedBookings);
};

export const updateBookingStatus = (bookingId, newStatus) => {
  const bookings = getBookings();

  const updatedBookings = bookings.map((booking) =>
    booking.id === bookingId ? { ...booking, status: newStatus } : booking
  );

  saveBookings(updatedBookings);
};
export const getAllBookings = () => {
  return getBookings();
};