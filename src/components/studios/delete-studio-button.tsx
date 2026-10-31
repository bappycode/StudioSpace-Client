'use client';

import { Trash2Icon } from 'lucide-react';
import ConfirmDialog from '@/components/confirm-dialog';
import { deleteStudio, type Studio } from '@/lib/studios';

const DeleteStudioButton = ({ studio }: { studio: Pick<Studio, '_id' | 'title' | 'ownerEmail'> }) => (
    <ConfirmDialog
        trigger={
            <>
                <Trash2Icon /> Delete
            </>
        }
        title="Delete this studio?"
        description={`${studio.title} will be removed from StudioSpace and creators won't be able to find or book it. This can't be undone.`}
        cancelLabel="Keep Listing"
        confirmLabel="Yes, Delete"
        successMessage="Studio deleted."
        onConfirm={() => deleteStudio(studio._id, studio.ownerEmail)}
    />
);

export default DeleteStudioButton;
