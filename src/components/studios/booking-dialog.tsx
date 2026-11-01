'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { CalendarCheckIcon } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { createBooking, getBookedHours, getToday, type BookingRequest } from '@/lib/bookings';
import type { Studio } from '@/lib/studios';

type BookingDialogProps = {
    studio: Pick<Studio, '_id' | 'title' | 'image' | 'location' | 'hourlyRate' | 'securityDeposit'>;
};

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between">
        <dt className="text-muted-foreground">{label}</dt>
        <dd className="font-medium">{value}</dd>
    </div>
);

const BookingDialog = ({ studio }: BookingDialogProps) => {
    const { data: session, isPending } = authClient.useSession();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const hours = Math.max(getBookedHours(startTime, endTime), 0);
    const rentalCost = hours * studio.hourlyRate;
    const hasInvalidRange = Boolean(startTime && endTime) && hours === 0;

    if (isPending) {
        return (
            <Button size="lg" className="h-11 w-full" disabled>
                Book Workspace Now
            </Button>
        );
    }

    if (!session) {
        return (
            <Link
                href={`/login?redirect=${encodeURIComponent(pathname)}`}
                className={buttonVariants({ size: 'lg', className: 'h-11 w-full' })}
            >
                Log in to Book
            </Link>
        );
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const booking: BookingRequest = {
            studioId: studio._id,
            studioTitle: studio.title,
            studioImage: studio.image,
            location: studio.location,
            email: session.user.email,
            userName: session.user.name,
            date: new FormData(e.currentTarget).get('date') as string,
            startTime,
            endTime,
            hours,
            totalPrice: rentalCost,
        };

        setSubmitting(true);
        try {
            await createBooking(booking);
            toast.success('Booking requested! It stays Pending until the host confirms.');
            setOpen(false);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Could not complete your booking');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button size="lg" className="h-11 w-full" />}>
                <CalendarCheckIcon /> Book Workspace Now
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Book {studio.title}</DialogTitle>
                    <DialogDescription>Pick a date and your shoot hours. The host confirms every request.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="booking-date">Date</Label>
                        <Input id="booking-date" name="date" type="date" min={getToday()} required className="h-10" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label htmlFor="booking-start">Start time</Label>
                            <Input
                                id="booking-start"
                                type="time"
                                required
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="booking-end">End time</Label>
                            <Input
                                id="booking-end"
                                type="time"
                                required
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                aria-invalid={hasInvalidRange}
                                className="h-10"
                            />
                        </div>
                    </div>
                    {hasInvalidRange && <p className="text-sm text-destructive">End time must be after start time.</p>}

                    <dl className="space-y-2 rounded-xl bg-muted/60 p-4 text-sm">
                        <SummaryRow label={`$${studio.hourlyRate} × ${hours} hr`} value={`$${rentalCost}`} />
                        <SummaryRow label="Security deposit (refundable)" value={`$${studio.securityDeposit}`} />
                        <div className="flex justify-between border-t pt-2 text-base font-semibold">
                            <dt>Estimated total</dt>
                            <dd>${rentalCost + studio.securityDeposit}</dd>
                        </div>
                    </dl>

                    <DialogFooter>
                        <Button type="submit" size="lg" className="h-10 w-full" disabled={submitting || hours === 0}>
                            {submitting ? 'Sending request…' : 'Confirm Booking Request'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BookingDialog;
