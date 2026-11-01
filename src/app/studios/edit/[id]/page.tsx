import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StudioForm from '@/components/studios/studio-form';
import { getStudio } from '@/lib/studios';
import { requireUser } from '@/lib/session';

export const metadata: Metadata = { title: 'Update Studio' };

const EditStudioPage = async ({ params }: PageProps<'/studios/edit/[id]'>) => {
    const { id } = await params;
    const user = await requireUser(`/studios/edit/${id}`);
    const studio = await getStudio(id);

    if (!studio || studio.ownerEmail !== user.email) notFound();

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-12">
            <header className="mb-8">
                <p className="text-xs font-semibold tracking-wider text-primary uppercase">Update listing</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{studio.title}</h1>
                <p className="mt-2 max-w-2xl text-muted-foreground">
                    Changes go live as soon as you save. Ratings and reviews stay with the listing.
                </p>
            </header>
            <StudioForm host={{ name: user.name, email: user.email }} studio={studio} />
        </main>
    );
};

export default EditStudioPage;
