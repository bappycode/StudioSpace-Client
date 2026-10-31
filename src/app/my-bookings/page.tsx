import type { Metadata } from 'next';
import Link from 'next/link';
import { CalendarXIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import BookingCard from '@/components/bookings/booking-card';
import { bookingStatuses, getMyBookings, sortByStartTime, type BookingStatus } from '@/lib/bookings';
import { requireUser } from '@/lib/session';

export const metadata: Metadata = { title: 'My Bookings' };

const isBookingStatus = (value: unknown): value is BookingStatus => bookingStatuses.includes(value as BookingStatus);

const filterTabs = [undefined, ...bookingStatuses];

const EmptyState = ({ status }: { status?: BookingStatus }) => (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CalendarXIcon className="size-7" />
        </span>
        <div className="space-y-1">
            <h2 className="text-lg font-semibold">{status ? `No ${status.toLowerCase()} bookings` : 'No bookings yet'}</h2>
            <p className="text-sm text-muted-foreground">
                Find a space that fits your next shoot, session or workshop and book it in minutes.
            </p>
        </div>
        <Link href="/studios" className={buttonVariants({ size: 'lg' })}>
            Explore Studios
        </Link>
    </div>
);

const MyBookingsPage = async ({ searchParams }: PageProps<'/my-bookings'>) => {
    const user = await requireUser('/my-bookings');
    const { status } = await searchParams;
    const activeStatus = isBookingStatus(status) ? status : undefined;

    const bookings = sortByStartTime(await getMyBookings(user.email));
    const visibleBookings = activeStatus ? bookings.filter((booking) => booking.status === activeStatus) : bookings;
    const countFor = (tab?: BookingStatus) =>
        tab ? bookings.filter((booking) => booking.status === tab).length : bookings.length;

    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-12">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My Bookings</h1>
                <p className="mt-2 text-muted-foreground">
                    Track your studio requests, upcoming sessions and booking history.
                </p>
            </header>

            <nav aria-label="Filter by status" className="mb-8 flex gap-2 overflow-x-auto pb-1">
                {filterTabs.map((tab) => (
                    <Link
                        key={tab ?? 'All'}
                        href={tab ? `/my-bookings?status=${tab}` : '/my-bookings'}
                        aria-current={tab === activeStatus ? 'page' : undefined}
                        className={buttonVariants({
                            variant: tab === activeStatus ? 'default' : 'secondary',
                            className: 'rounded-full',
                        })}
                    >
                        {tab ?? 'All'}
                        <span className="text-xs opacity-70">{countFor(tab)}</span>
                    </Link>
                ))}
            </nav>

            {visibleBookings.length > 0 ? (
                <ul className="space-y-4">
                    {visibleBookings.map((booking) => (
                        <BookingCard key={booking._id} booking={booking} />
                    ))}
                </ul>
            ) : (
                <EmptyState status={activeStatus} />
            )}
        </main>
    );
};

export default MyBookingsPage;
