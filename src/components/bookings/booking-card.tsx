import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon } from 'lucide-react';
import { cn } from 'cn';
import BookingStatusBadge from '@/components/bookings/booking-status-badge';
import CancelBookingButton from '@/components/bookings/cancel-booking-button';
import ConfirmBookingButton from '@/components/bookings/confirm-booking-button';
import DownloadReceiptButton from '@/components/bookings/download-receipt-button';
import { formatBookingDate, formatBookingTime, type Booking, type BookingView } from '@/lib/bookings';

const DetailChip = ({ icon: Icon, children }: { icon: typeof CalendarIcon; children: React.ReactNode }) => (
    <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
        <Icon className="size-4 text-primary" />
        {children}
    </span>
);

const getCancelledNote = (cancelledBy: Booking['cancelledBy'], view: BookingView) => {
    if (!cancelledBy) return null;

    const myRole = view === 'host' ? 'Owner' : 'Client';
    if (cancelledBy === myRole) return 'You cancelled this booking';

    return cancelledBy === 'Owner' ? 'The owner has cancelled the booking' : 'The client has cancelled the booking';
};

type BookingCardProps = {
    booking: Booking;
    view?: BookingView;
};

const BookingCard = ({ booking, view = 'guest' }: BookingCardProps) => {
    const {
        _id,
        studioId,
        studioTitle,
        studioImage,
        location,
        userName,
        email,
        date,
        startTime,
        endTime,
        hours,
        totalPrice,
        status,
        cancelledBy,
    } = booking;
    const isPending = status === 'Pending';
    const hasReceipt = status === 'Confirmed' || status === 'Completed';
    const cancelledNote = status === 'Cancelled' ? getCancelledNote(cancelledBy, view) : null;

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
                    {cancelledNote && <p className="text-sm font-medium text-muted-foreground">{cancelledNote}</p>}
                    <h2 className="text-lg font-semibold">
                        <Link href={`/studios/${studioId}`} className="hover:text-primary">
                            {studioTitle}
                        </Link>
                    </h2>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPinIcon className="size-4 shrink-0" /> {location}
                    </p>
                    {view === 'host' && (
                        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <UserIcon className="size-4 shrink-0" />
                            Booked by <span className="font-medium text-foreground">{userName}</span>
                            <a href={`mailto:${email}`} className="truncate hover:text-primary">
                                ({email})
                            </a>
                        </p>
                    )}
                </div>
                <div className="mt-auto flex flex-wrap gap-2 text-sm">
                    <DetailChip icon={CalendarIcon}>{formatBookingDate(date)}</DetailChip>
                    <DetailChip icon={ClockIcon}>
                        {formatBookingTime(startTime)} – {formatBookingTime(endTime)} · {hours} hr
                    </DetailChip>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-dashed p-5 sm:w-52 sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:border-l sm:p-6">
                <div className="sm:text-right">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Total</p>
                    <p className="text-2xl font-bold tracking-tight">${totalPrice}</p>
                </div>
                {isPending && view === 'guest' && <CancelBookingButton booking={booking} />}
                {hasReceipt && view === 'guest' && <DownloadReceiptButton booking={booking} />}
                {isPending && view === 'host' && (
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                        <ConfirmBookingButton bookingId={_id} />
                        <CancelBookingButton booking={booking} view="host" />
                    </div>
                )}
            </div>
        </li>
    );
};

export default BookingCard;
