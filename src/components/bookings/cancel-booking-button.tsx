'use client';

import { XCircleIcon } from 'lucide-react';
import ConfirmDialog from '@/components/confirm-dialog';
import { cancelBooking, type Booking } from '@/lib/bookings';

const CancelBookingButton = ({ booking }: { booking: Pick<Booking, '_id' | 'email' | 'studioTitle'> }) => (
    <ConfirmDialog
        trigger={
            <>
                <XCircleIcon /> Cancel Booking
            </>
        }
        title="Cancel this booking?"
        description={`Your request for ${booking.studioTitle} will be cancelled and the time slot released. This can't be undone.`}
        cancelLabel="Keep Booking"
        confirmLabel="Yes, Cancel"
        successMessage="Booking cancelled. The time slot is free again."
        onConfirm={() => cancelBooking(booking._id, booking.email)}
    />
);

export default CancelBookingButton;
