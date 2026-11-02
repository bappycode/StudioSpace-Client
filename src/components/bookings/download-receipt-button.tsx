'use client';

import { DownloadIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { formatBookingDate, formatBookingTime, getToday, type Booking } from '@/lib/bookings';

const DownloadReceiptButton = ({ booking }: { booking: Booking }) => {
    const handleDownload = async () => {
        try {
            const { jsPDF } = await import('jspdf');
            const doc = new jsPDF();

            const rows = [
                ['Receipt No.', booking._id],
                ['Issued', formatBookingDate(getToday())],
                ['Booked by', `${booking.userName} (${booking.email})`],
                ['Studio', booking.studioTitle],
                ['Location', booking.location],
                ['Date', formatBookingDate(booking.date)],
                ['Time', `${formatBookingTime(booking.startTime)} - ${formatBookingTime(booking.endTime)} (${booking.hours} hr)`],
                ['Status', booking.status],
            ];

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(22);
            doc.text('StudioSpace', 20, 25);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.text('Booking Receipt', 20, 33);

            let y = 50;
            rows.forEach(([label, value]) => {
                const lines = doc.splitTextToSize(value, 115);
                doc.setFont('helvetica', 'bold');
                doc.text(label, 20, y);
                doc.setFont('helvetica', 'normal');
                doc.text(lines, 70, y);
                y += lines.length * 6 + 4;
            });

            doc.line(20, y, 190, y);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.text('Total', 20, y + 12);
            doc.text(`$${booking.totalPrice}`, 190, y + 12, { align: 'right' });

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text('Thank you for booking with StudioSpace.', 20, y + 30);

            doc.save(`studiospace-receipt-${booking._id}.pdf`);
            toast.success('Receipt downloaded');
        } catch {
            toast.error('Could not create the receipt');
        }
    };

    return (
        <Button variant="outline" onClick={handleDownload}>
            <DownloadIcon /> Receipt
        </Button>
    );
};

export default DownloadReceiptButton;
