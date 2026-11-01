import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { bookingStatuses, filterByStatus, type Booking, type BookingStatus } from '@/lib/bookings';

type StatusTabsProps = {
    basePath: string;
    bookings: Booking[];
    activeStatus?: BookingStatus;
};

const tabs = [undefined, ...bookingStatuses];

const StatusTabs = ({ basePath, bookings, activeStatus }: StatusTabsProps) => (
    <nav aria-label="Filter by status" className="mb-8 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
            <Link
                key={tab ?? 'All'}
                href={tab ? `${basePath}?status=${tab}` : basePath}
                aria-current={tab === activeStatus ? 'page' : undefined}
                className={buttonVariants({
                    variant: tab === activeStatus ? 'default' : 'secondary',
                    className: 'rounded-full',
                })}
            >
                {tab ?? 'All'}
                <span className="text-xs opacity-70">{filterByStatus(bookings, tab).length}</span>
            </Link>
        ))}
    </nav>
);

export default StatusTabs;
