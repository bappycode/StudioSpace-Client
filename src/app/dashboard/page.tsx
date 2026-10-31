import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowRightIcon,
    BuildingIcon,
    CalendarCheckIcon,
    CalendarClockIcon,
    ClockIcon,
    CompassIcon,
    ListIcon,
    PlusIcon,
    StarIcon,
    type LucideIcon,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import StatTile from '@/components/stat-tile';
import BookingStatusBadge from '@/components/bookings/booking-status-badge';
import { formatBookingTime, getMyBookings, isUpcoming, sortByStartTime, type Booking } from '@/lib/bookings';
import { formatAverageRating, getMyListings, type Studio } from '@/lib/studios';
import { requireUser } from '@/lib/session';

export const metadata: Metadata = { title: 'Dashboard' };

const quickActions = [
    { href: '/studios', label: 'Explore Studios', description: 'Find a space for your next shoot', icon: CompassIcon },
    { href: '/add-studio', label: 'Add New Studio', description: 'List a space and start earning', icon: PlusIcon },
    { href: '/my-bookings', label: 'My Bookings', description: 'Track requests and sessions', icon: CalendarCheckIcon },
    { href: '/my-listings', label: 'My Studio Listings', description: 'Update or remove your spaces', icon: ListIcon },
];

type PanelProps = {
    title: string;
    href: string;
    children: React.ReactNode;
};

const Panel = ({ title, href, children }: PanelProps) => (
    <section className="rounded-3xl border bg-card p-6">
        <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Link href={href} className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                View all <ArrowRightIcon className="size-4" />
            </Link>
        </div>
        {children}
    </section>
);

type PanelEmptyProps = {
    icon: LucideIcon;
    message: string;
    action: { href: string; label: string };
};

const PanelEmpty = ({ icon: Icon, message, action }: PanelEmptyProps) => (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed px-4 py-10 text-center">
        <Icon className="size-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{message}</p>
        <Link href={action.href} className={buttonVariants({ variant: 'outline' })}>
            {action.label}
        </Link>
    </div>
);

// Calendar-style date block; booking dates are plain YYYY-MM-DD, so read them in UTC
const DateBlock = ({ date }: { date: string }) => {
    const day = new Date(date);
    const format = (options: Intl.DateTimeFormatOptions) =>
        day.toLocaleDateString('en-US', { ...options, timeZone: 'UTC' });

    return (
        <span className="flex size-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <span className="text-xs font-semibold uppercase">{format({ month: 'short' })}</span>
            <span className="text-xl leading-none font-bold">{format({ day: 'numeric' })}</span>
        </span>
    );
};

const UpcomingBookingItem = ({ booking }: { booking: Booking }) => (
    <li className="flex items-center gap-4">
        <DateBlock date={booking.date} />
        <div className="min-w-0 flex-1">
            <Link href={`/studios/${booking.studioId}`} className="block truncate font-medium hover:text-primary">
                {booking.studioTitle}
            </Link>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <ClockIcon className="size-3.5" />
                {formatBookingTime(booking.startTime)} – {formatBookingTime(booking.endTime)}
            </p>
        </div>
        <BookingStatusBadge status={booking.status} />
    </li>
);

const ListingItem = ({ studio }: { studio: Studio }) => (
    <li className="flex items-center gap-4">
        <span className="relative size-14 shrink-0 overflow-hidden rounded-2xl">
            <Image src={studio.image} alt={studio.title} fill sizes="56px" className="object-cover" />
        </span>
        <div className="min-w-0 flex-1">
            <Link href={`/studios/${studio._id}`} className="block truncate font-medium hover:text-primary">
                {studio.title}
            </Link>
            <p className="text-sm text-muted-foreground">${studio.hourlyRate}/hr</p>
        </div>
        <span className="flex items-center gap-1 text-sm font-semibold">
            <StarIcon className="size-4 fill-primary text-primary" />
            {studio.rating ? studio.rating.toFixed(1) : 'New'}
        </span>
    </li>
);

const DashboardPage = async () => {
    const user = await requireUser('/dashboard');
    const [bookings, listings] = await Promise.all([getMyBookings(user.email), getMyListings(user.email)]);

    const upcoming = sortByStartTime(bookings.filter(isUpcoming));
    const bookedHours = bookings
        .filter((booking) => booking.status !== 'Cancelled')
        .reduce((sum, booking) => sum + booking.hours, 0);
    const topListings = [...listings].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 3);

    const stats = [
        { icon: CalendarClockIcon, label: 'Upcoming bookings', value: String(upcoming.length) },
        { icon: ClockIcon, label: 'Hours booked', value: String(bookedHours) },
        { icon: BuildingIcon, label: 'Studios listed', value: String(listings.length) },
        { icon: StarIcon, label: 'Average rating', value: formatAverageRating(listings) },
    ];

    return (
        <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-12">
            <header>
                <p className="text-xs font-semibold tracking-wider text-primary uppercase">Dashboard</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                    Welcome back, {user.name.split(' ')[0]}
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Your bookings and studios at a glance.
                </p>
            </header>

            <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {stats.map((stat) => (
                    <StatTile key={stat.label} {...stat} />
                ))}
            </section>

            <div className="grid gap-6 lg:grid-cols-2">
                <Panel title="Upcoming bookings" href="/my-bookings">
                    {upcoming.length > 0 ? (
                        <ul className="space-y-4">
                            {upcoming.slice(0, 4).map((booking) => (
                                <UpcomingBookingItem key={booking._id} booking={booking} />
                            ))}
                        </ul>
                    ) : (
                        <PanelEmpty
                            icon={CalendarClockIcon}
                            message="No upcoming sessions. Your next shoot is a few clicks away."
                            action={{ href: '/studios', label: 'Find a Studio' }}
                        />
                    )}
                </Panel>

                <Panel title="Your top studios" href="/my-listings">
                    {topListings.length > 0 ? (
                        <ul className="space-y-4">
                            {topListings.map((studio) => (
                                <ListingItem key={studio._id} studio={studio} />
                            ))}
                        </ul>
                    ) : (
                        <PanelEmpty
                            icon={BuildingIcon}
                            message="You're not hosting any spaces yet."
                            action={{ href: '/add-studio', label: 'List a Studio' }}
                        />
                    )}
                </Panel>
            </div>

            <section>
                <h2 className="mb-4 text-lg font-semibold">Quick actions</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {quickActions.map(({ href, label, description, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className="group flex items-start gap-3 rounded-2xl border bg-card p-4 transition-colors hover:border-primary"
                        >
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <Icon className="size-5" />
                            </span>
                            <span>
                                <span className="block font-medium">{label}</span>
                                <span className="text-sm text-muted-foreground">{description}</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default DashboardPage;
