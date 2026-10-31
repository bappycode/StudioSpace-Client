import type { Metadata } from 'next';
import StudioForm from '@/components/studios/studio-form';
import { requireUser } from '@/lib/session';

export const metadata: Metadata = { title: 'Add New Studio' };

const AddStudioPage = async () => {
    const user = await requireUser('/add-studio');

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-12">
            <header className="mb-8">
                <p className="text-xs font-semibold tracking-wider text-primary uppercase">Host your space</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">List a new studio</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Tell creators what makes your space great. You can edit everything later from My Studio Listings.
                </p>
            </header>
            <StudioForm host={{ name: user.name, email: user.email }} />
        </main>
    );
};

export default AddStudioPage;
