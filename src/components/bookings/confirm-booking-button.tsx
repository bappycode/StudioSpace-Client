'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { confirmBooking } from '@/lib/bookings';

const ConfirmBookingButton = ({ bookingId }: { bookingId: string }) => {
    const router = useRouter();
    const [confirming, setConfirming] = useState(false);

    const handleConfirm = async () => {
        setConfirming(true);
        try {
            await confirmBooking(bookingId);
            toast.success('Booking confirmed. The creator will see it as Confirmed.');
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Could not confirm this booking');
        } finally {
            setConfirming(false);
        }
    };

    return (
        <Button onClick={handleConfirm} disabled={confirming}>
            <CheckCircle2Icon /> {confirming ? 'Confirming…' : 'Confirm'}
        </Button>
    );
};

export default ConfirmBookingButton;
