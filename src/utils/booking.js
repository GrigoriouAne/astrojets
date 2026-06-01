import { supabase } from "./supabase";

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

const mapBookingRow = (row) => ({
  id: String(row.id),
  userId: row.user_id,
  userEmail: row.user_email,
  duration: row.duration,
  date: row.date,
  time: row.time,
  ridersPerJet: row.riders_per_jet || [],
  jetSkiCount: row.jet_ski_count,
  subtotalPrice: row.subtotal_price,
  discountAmount: row.discount_amount,
  totalPrice: row.total_price,
  status: row.status,
  createdAt: row.created_at,
});

const mapBlockedSlotRow = (row) => ({
  id: String(row.id),
  date: row.date,
  time: row.time,
  blockedJetSkis: row.blocked_jet_skis,
  fullDay: row.full_day,
  createdAt: row.created_at,
});

export const calculateJetPrice = (duration, riders) => {
  return PRICING[duration]?.[riders] || 0;
};

export const calculateTotalPrice = (duration, ridersPerJet) => {
  return ridersPerJet.reduce(
    (sum, riders) => sum + calculateJetPrice(duration, riders),
    0
  );
};

export const getBookings = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }

  return (data || []).map(mapBookingRow);
};

export const getBlockedSlots = async () => {
  const { data, error } = await supabase
    .from("blocked_slots")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blocked slots:", error);
    return [];
  }

  return (data || []).map(mapBlockedSlotRow);
};

export const getUsedJetSkisForSlot = async (date, time) => {
  const bookings = await getBookings();
  const blockedSlots = await getBlockedSlots();

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

export const getAvailableJetSkisForSlot = async (date, time) => {
  return Math.max(0, 2 - (await getUsedJetSkisForSlot(date, time)));
};

export const getSlotStatus = async (date, time) => {
  const availableJetSkis = await getAvailableJetSkisForSlot(date, time);

  if (availableJetSkis === 2) return "full-available";
  if (availableJetSkis === 1) return "partial-available";
  return "fully-booked";
};

export const getSlotsWithAvailability = async (date) => {
  const results = await Promise.all(
    BOOKING_SLOTS.map(async (slot) => ({
      time: slot,
      availableJetSkis: await getAvailableJetSkisForSlot(date, slot),
      status: await getSlotStatus(date, slot),
    }))
  );

  return results;
};

export const createBooking = async ({
  userId,
  userEmail,
  duration,
  date,
  time,
  ridersPerJet,
  discountAmount = 0,
  totalPrice,
}) => {
  const jetSkiCount = ridersPerJet.length;
  const calculatedTotalPrice = calculateTotalPrice(duration, ridersPerJet);

  const payload = {
    user_id: userId,
    user_email: userEmail,
    duration,
    date,
    time,
    riders_per_jet: ridersPerJet,
    jet_ski_count: jetSkiCount,
    subtotal_price: calculatedTotalPrice,
    discount_amount: discountAmount,
    total_price: totalPrice ?? calculatedTotalPrice,
    status: "active",
  };

  const { data, error } = await supabase
    .from("bookings")
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error("Error creating booking:", error);
    return null;
  }

  return mapBookingRow(data);
};

export const getBookingsForUser = async (userEmail) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("user_email", userEmail)
    .neq("status", "cancelled")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user bookings:", error);
    return [];
  }

  return (data || []).map(mapBookingRow);
};

export const requestBookingCancellation = async (bookingId) => {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status: "cancel_pending" })
    .eq("id", Number(bookingId))
    .select();

  if (error) {
    console.error("Error requesting cancellation:", error);
    return { success: false, error };
  }

  return { success: true, data };
};

export const updateBookingStatus = async (bookingId, newStatus) => {
  const { error } = await supabase
    .from("bookings")
    .update({ status: newStatus })
    .eq("id", Number(bookingId));

  if (error) {
    console.error("Error updating booking status:", error);
  }
};

export const getAllBookings = async () => {
  return await getBookings();
};

export const addBlockedSlot = async ({
  date,
  time,
  blockedJetSkis,
  fullDay = false,
}) => {
  const payload = {
    date,
    time,
    blocked_jet_skis: blockedJetSkis,
    full_day: fullDay,
  };

  const { data, error } = await supabase
    .from("blocked_slots")
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error("Error adding blocked slot:", error);
    return null;
  }

  return mapBlockedSlotRow(data);
};

export const removeBlockedSlot = async (blockedSlotId) => {
  const { error } = await supabase
    .from("blocked_slots")
    .delete()
    .eq("id", Number(blockedSlotId));

  if (error) {
    console.error("Error removing blocked slot:", error);
  }
};

export const getAllBlockedSlots = async () => {
  return await getBlockedSlots();
};

export const getBookingsCountByDate = async (date) => {
  const bookings = await getBookings();

  return bookings.filter(
    (booking) =>
      booking.date === date &&
      (booking.status === "active" || booking.status === "cancel_pending")
  ).length;
};

export const getCompletedBookingsCountForUser = async (userEmail) => {
  const bookings = await getBookings();
  const today = new Date().toISOString().split("T")[0];

  return bookings
    .filter(
      (booking) =>
        booking.userEmail === userEmail &&
        booking.status === "active" &&
        booking.date < today
    )
    .reduce((sum, booking) => sum + (booking.jetSkiCount || 1), 0);
};