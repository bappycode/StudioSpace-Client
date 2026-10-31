'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { XCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { cancelBooking, type Booking } from '@/lib/bookings';

const CancelBookingButton = ({ booking }: { booking: Pick<Booking, '_id' | 'email' | 'studioTitle'> }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [cancelling, setCancelling] = useState(false);

    const handleCancel = async () => {
        setCancelling(true);
        try {
            await cancelBooking(booking._id, booking.email);
            toast.success('Booking cancelled. The time slot is free again.');
            setOpen(false);
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Could not cancel this booking');
        } finally {
            setCancelling(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant="destructive" />}>
                <XCircleIcon /> Cancel Booking
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cancel this booking?</DialogTitle>
                    <DialogDescription>
                        Your request for {booking.studioTitle} will be cancelled and the time slot released. This
                        can&apos;t be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline" />}>Keep Booking</DialogClose>
                    <Button variant="destructive" onClick={handleCancel} disabled={cancelling}>
                        {cancelling ? 'Cancelling…' : 'Yes, Cancel'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CancelBookingButton;
