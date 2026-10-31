import { cn } from 'cn';
import type { BookingStatus } from '@/lib/bookings';

const statusStyles: Record<BookingStatus, string> = {
    Pending: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
    Confirmed: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
    Completed: 'bg-sky-500/15 text-sky-700 dark:text-sky-400',
    Cancelled: 'bg-muted text-muted-foreground',
};

const BookingStatusBadge = ({ status }: { status: BookingStatus }) => (
    <span className={cn('inline-flex rounded-full px-2.5 py-1 text-xs font-semibold', statusStyles[status])}>
        {status}
    </span>
);

export default BookingStatusBadge;
