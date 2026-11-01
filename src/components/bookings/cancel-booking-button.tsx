'use client';

import { XCircleIcon } from 'lucide-react';
import ConfirmDialog from '@/components/confirm-dialog';
import { cancelBooking, type Booking, type BookingView } from '@/lib/bookings';

type CancelBookingButtonProps = {
    booking: Pick<Booking, '_id' | 'studioTitle' | 'userName'>;
    view?: BookingView;
};

const CancelBookingButton = ({ booking, view = 'guest' }: CancelBookingButtonProps) => (
    <ConfirmDialog
        trigger={
            <>
                <XCircleIcon /> {view === 'host' ? 'Cancel' : 'Cancel Booking'}
            </>
        }
        title="Cancel this booking?"
        description={
            view === 'host'
                ? `${booking.userName}'s request for ${booking.studioTitle} will be cancelled and the time slot released. They will see that you cancelled it. This can't be undone.`
                : `Your request for ${booking.studioTitle} will be cancelled and the time slot released. This can't be undone.`
        }
        cancelLabel="Keep Booking"
        confirmLabel="Yes, Cancel"
        successMessage="Booking cancelled. The time slot is free again."
        onConfirm={() => cancelBooking(booking._id, view)}
    />
);

export default CancelBookingButton;
