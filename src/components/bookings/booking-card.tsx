import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { cn } from 'cn';
import BookingStatusBadge from '@/components/bookings/booking-status-badge';
import CancelBookingButton from '@/components/bookings/cancel-booking-button';
import { formatBookingDate, formatBookingTime, type Booking } from '@/lib/bookings';

const DetailChip = ({ icon: Icon, children }: { icon: typeof CalendarIcon; children: React.ReactNode }) => (
    <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
        <Icon className="size-4 text-primary" />
        {children}
    </span>
);

const BookingCard = ({ booking }: { booking: Booking }) => {
    const { studioId, studioTitle, studioImage, location, date, startTime, endTime, hours, totalPrice, status } =
        booking;

    return (
        <li
            className={cn(
                'flex flex-col overflow-hidden rounded-3xl border bg-card sm:flex-row',
                status === 'Cancelled' && 'opacity-70'
            )}
        >
            <Link href={`/studios/${studioId}`} className="relative aspect-video shrink-0 sm:aspect-auto sm:w-60">
                <Image src={studioImage} alt={studioTitle} fill sizes="(min-width: 640px) 240px, 100vw" className="object-cover" />
            </Link>

            <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                <div className="space-y-2">
                    <BookingStatusBadge status={status} />
                    <h2 className="text-lg font-semibold">
                        <Link href={`/studios/${studioId}`} className="hover:text-primary">
                            {studioTitle}
                        </Link>
                    </h2>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPinIcon className="size-4 shrink-0" /> {location}
                    </p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2 text-sm">
                    <DetailChip icon={CalendarIcon}>{formatBookingDate(date)}</DetailChip>
                    <DetailChip icon={ClockIcon}>
                        {formatBookingTime(startTime)} – {formatBookingTime(endTime)} · {hours} hr
                    </DetailChip>
                </div>
            </div>

            {/* Dashed divider gives the card a ticket-stub look */}
            <div className="flex items-center justify-between gap-4 border-t border-dashed p-5 sm:w-52 sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:border-l sm:p-6">
                <div className="sm:text-right">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Total</p>
                    <p className="text-2xl font-bold tracking-tight">${totalPrice}</p>
                </div>
                {status === 'Pending' && <CancelBookingButton booking={booking} />}
            </div>
        </li>
    );
};

export default BookingCard;
