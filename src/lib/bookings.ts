export const bookingStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'] as const;

export type BookingStatus = (typeof bookingStatuses)[number];

export type BookingRequest = {
    studioId: string;
    studioTitle: string;
    studioImage: string;
    location: string;
    email: string;
    userName: string;
    // YYYY-MM-DD — the server's overlap check compares dates as plain strings
    date: string;
    startTime: string;
    endTime: string;
    hours: number;
    totalPrice: number;
};

export type Booking = BookingRequest & {
    _id: string;
    status: BookingStatus;
};

const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

export const getBookedHours = (startTime: string, endTime: string) =>
    startTime && endTime ? (toMinutes(endTime) - toMinutes(startTime)) / 60 : 0;

// Booking dates and times have no timezone, so format them in UTC to keep the day and hour unchanged
export const formatBookingDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    });

export const formatBookingTime = (time: string) =>
    new Date(`1970-01-01T${time}:00Z`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'UTC',
    });

// Throws with the server's message (e.g. the 409 double-booking error) so callers can toast it
const requestServer = async (path: string, init?: RequestInit) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}${path}`, init);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message ?? `Request failed (${res.status})`);
    return data;
};

export const getMyBookings = (email: string): Promise<Booking[]> =>
    requestServer(`/my-bookings/${encodeURIComponent(email)}`);

export const createBooking = (booking: BookingRequest) =>
    requestServer('/my-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
    });

export const cancelBooking = (id: string, email: string) =>
    requestServer(`/my-bookings/${id}/cancel?email=${encodeURIComponent(email)}`, { method: 'PATCH' });
