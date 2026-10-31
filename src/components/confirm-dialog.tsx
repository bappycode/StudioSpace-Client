'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
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

type ConfirmDialogProps = {
    trigger: React.ReactNode;
    title: string;
    description: React.ReactNode;
    confirmLabel: string;
    cancelLabel: string;
    successMessage: string;
    onConfirm: () => Promise<unknown>;
};

// Destructive actions go through this modal (no browser confirm()), then refresh the server-rendered list
const ConfirmDialog = ({
    trigger,
    title,
    description,
    confirmLabel,
    cancelLabel,
    successMessage,
    onConfirm,
}: ConfirmDialogProps) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);

    const handleConfirm = async () => {
        setPending(true);
        try {
            await onConfirm();
            toast.success(successMessage);
            setOpen(false);
            router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
        } finally {
            setPending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button variant="destructive" />}>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline" />}>{cancelLabel}</DialogClose>
                    <Button variant="destructive" onClick={handleConfirm} disabled={pending}>
                        {pending ? 'Working…' : confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialog;
