// ── Slot locking storage ──────────────────────────────────────────────────────
const STORAGE_KEY   = 'turf_bookings';
const RECORDS_KEY   = 'turf_booking_records';
const SESSION_KEY   = 'turf_admin_session';

const getAllBookings = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
};

const makeKey = (venue, date) => `${venue}__${date}`;

export const getBookedSlots = (venue, date) => {
  const all = getAllBookings();
  return all[makeKey(venue, date)] || [];
};

export const saveBooking = (venue, date, slots, userDetails = {}) => {
  // 1. Lock the slots
  const all = getAllBookings();
  const key = makeKey(venue, date);
  all[key] = [...new Set([...(all[key] || []), ...slots])];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));

  // 2. Save full booking record for admin dashboard
  const records = getAllRecords();
  const record = {
    id:         `TRF-${Date.now().toString().slice(-6)}`,
    bookedAt:   new Date().toISOString(),
    venue,
    date,
    slots,
    startLabel: userDetails.startLabel || slots[0],
    endLabel:   userDetails.endLabel   || '',
    duration:   userDetails.duration   || slots.length,
    price:      userDetails.price      || 0,
    fullName:   userDetails.fullName   || '',
    email:      userDetails.email      || '',
    mobile:     userDetails.mobile     || '',
    place:      userDetails.place      || '',
  };
  records.push(record);
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
};

// ── Booking records (admin) ───────────────────────────────────────────────────
export const getAllRecords = () => {
  try { return JSON.parse(localStorage.getItem(RECORDS_KEY) || '[]'); }
  catch { return []; }
};

export const deleteRecord = (id) => {
  const records = getAllRecords().filter(r => r.id !== id);
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));

  // Also clean up the slot lock for that booking if needed
  // (optional — slots remain locked even after record deletion for safety)
};

// ── End-time helper ───────────────────────────────────────────────────────────
export const getEndSlotLabel = (lastSlot) => {
  if (!lastSlot) return '';
  const [time, modifier] = lastSlot.split(' ');
  let hours = parseInt(time);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  hours += 1;
  const endHour = hours % 24;
  const endMod  = endHour < 12 ? 'AM' : 'PM';
  const display = endHour === 0 ? 12 : endHour > 12 ? endHour - 12 : endHour;
  return `${display} ${endMod}`;
};

// ── Admin session ─────────────────────────────────────────────────────────────
export const setAdminSession = (user) => {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const getAdminSession = () => {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null'); }
  catch { return null; }
};

export const clearAdminSession = () => {
  sessionStorage.removeItem(SESSION_KEY);
};
