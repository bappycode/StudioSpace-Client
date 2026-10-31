import { requestServer, sendJson } from '@/lib/api';

export const bookingStatuses =['Pending', 'Confirmed', 'Completed', 'Cancelled'] as const;

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

// en-CA formats as YYYY-MM-DD, the same shape as booking dates and <input type="date"> values
export const getToday = () => new Date().toLocaleDateString('en-CA');

export const isUpcoming = (booking: Booking) =>
    (booking.status === 'Pending' || booking.status === 'Confirmed') && booking.date >= getToday();

export const sortByStartTime = (bookings: Booking[]) =>
    [...bookings].sort((a, b) => `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`));

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

export const getMyBookings = (email: string): Promise<Booking[]> =>
    requestServer(`/my-bookings/${encodeURIComponent(email)}`);

// A 409 here is the server's double-booking check; its message is shown to the user as-is
export const createBooking = (booking: BookingRequest) => sendJson('/my-bookings', 'POST', booking);

export const cancelBooking = (id: string, email: string) =>
    requestServer(`/my-bookings/${id}/cancel?email=${encodeURIComponent(email)}`, { method: 'PATCH' });
