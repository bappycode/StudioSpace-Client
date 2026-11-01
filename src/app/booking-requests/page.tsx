import type { Metadata } from 'next';
import Link from 'next/link';
import { InboxIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import BookingCard from '@/components/bookings/booking-card';
import StatusTabs from '@/components/bookings/status-tabs';
import {
    filterByStatus,
    getListingBookings,
    isBookingStatus,
    withCompletedStatus,
    type BookingStatus,
} from '@/lib/bookings';
import { getServerToken, requireUser } from '@/lib/session';

export const metadata: Metadata = { title: 'Booking Requests' };

const EmptyState = ({ status }: { status?: BookingStatus }) => (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <InboxIcon className="size-7" />
        </span>
        <div className="space-y-1">
            <h2 className="text-lg font-semibold">
                {status ? `No ${status.toLowerCase()} requests` : 'No booking requests yet'}
            </h2>
            <p className="text-sm text-muted-foreground">
                When creators book one of your studios, their requests show up here for you to confirm.
            </p>
        </div>
        <Link href="/my-listings" className={buttonVariants({ size: 'lg' })}>
            View My Listings
        </Link>
    </div>
);

const BookingRequestsPage = async ({ searchParams }: PageProps<'/booking-requests'>) => {
    const user = await requireUser('/booking-requests');
    const { status } = await searchParams;
    const activeStatus = isBookingStatus(status) ? status : undefined;

    const bookings = withCompletedStatus(await getListingBookings(user.email, await getServerToken()));
    const visibleBookings = filterByStatus(bookings, activeStatus);

    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-12">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Booking Requests</h1>
                <p className="mt-2 text-muted-foreground">
                    Review who booked your studios and confirm pending requests.
                </p>
            </header>

            <StatusTabs basePath="/booking-requests" bookings={bookings} activeStatus={activeStatus} />

            {visibleBookings.length > 0 ? (
                <ul className="space-y-4">
                    {visibleBookings.map((booking) => (
                        <BookingCard key={booking._id} booking={booking} view="host" />
                    ))}
                </ul>
            ) : (
                <EmptyState status={activeStatus} />
            )}
        </main>
    );
};

export default BookingRequestsPage;
