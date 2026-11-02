import { getClientToken, requestServer } from '@/lib/api';

export const bookingStatuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled'] as const;

export type BookingStatus = (typeof bookingStatuses)[number];

export type BookingView = 'guest' | 'host';

export type BookingRequest = {
    studioId: string;
    studioTitle: string;
    studioImage: string;
    location: string;
    userName: string;
    date: string;
    startTime: string;
    endTime: string;
    hours: number;
    totalPrice: number;
};

export type Booking = BookingRequest & {
    _id: string;
    email: string;
    status: BookingStatus;
    cancelledBy?: 'Client' | 'Owner';
};

export const getMyBookings = (email: string, token: string) =>
    requestServer<Booking[]>(`/my-bookings/${encodeURIComponent(email)}`, { token });

export const getListingBookings = (email: string, token: string) =>
    requestServer<Booking[]>(`/listing-bookings/${encodeURIComponent(email)}`, { token });

export const createBooking = async (booking: BookingRequest) =>
    requestServer('/my-bookings', { method: 'POST', body: booking, token: await getClientToken() });

export const confirmBooking = async (id: string) =>
    requestServer(`/my-bookings/${id}/confirm`, { method: 'PATCH', token: await getClientToken() });

export const cancelBooking = async (id: string, view: BookingView) =>
    requestServer(`/${view === 'host' ? 'listing-bookings' : 'my-bookings'}/${id}/cancel`, {
        method: 'PATCH',
        token: await getClientToken(),
    });

export const isBookingStatus =(value: unknown): value is BookingStatus =>
    bookingStatuses.includes(value as BookingStatus);

export const filterByStatus = (bookings: Booking[], status?: BookingStatus) =>
    status ? bookings.filter((booking) => booking.status === status) : bookings;

const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

export const getBookedHours = (startTime: string, endTime: string) =>
    startTime && endTime ? (toMinutes(endTime) - toMinutes(startTime)) / 60 : 0;

export const getToday = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Dhaka' });

const hasEnded = (booking: Booking) => new Date(`${booking.date}T${booking.endTime}+06:00`) <= new Date();

export const withCompletedStatus = (bookings: Booking[]): Booking[] =>
    bookings.map((booking) =>
        booking.status === 'Confirmed' && hasEnded(booking) ? { ...booking, status: 'Completed' } : booking
    );

export const isUpcoming = (booking: Booking) =>
    (booking.status === 'Pending' || booking.status === 'Confirmed') && booking.date >= getToday();

export const sortByStartTime = (bookings: Booking[]) =>
    [...bookings].sort((a, b) => `${a.date} ${a.startTime}`.localeCompare(`${b.date} ${b.startTime}`));

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
