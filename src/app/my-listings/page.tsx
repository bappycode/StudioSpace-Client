import type { Metadata } from 'next';
import Link from 'next/link';
import { BuildingIcon, DollarSignIcon, MessageSquareIcon, PlusIcon, StarIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import StatTile from '@/components/stat-tile';
import ListingRow from '@/components/studios/listing-row';
import { formatAverageRating, getMyListings } from '@/lib/studios';
import { requireUser } from '@/lib/session';

export const metadata: Metadata = { title: 'My Studio Listings | StudioSpace' };

const EmptyState = () => (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BuildingIcon className="size-7" />
        </span>
        <div className="space-y-1">
            <h2 className="text-lg font-semibold">You haven&apos;t listed a studio yet</h2>
            <p className="text-sm text-muted-foreground">
                Turn your empty hours into bookings. Listing a space takes about five minutes.
            </p>
        </div>
        <Link href="/add-studio" className={buttonVariants({ size: 'lg' })}>
            <PlusIcon /> List Your First Studio
        </Link>
    </div>
);

const MyListingsPage = async () => {
    const user = await requireUser('/my-listings');
    const studios = await getMyListings(user.email);

    const reviewCount = studios.reduce((sum, studio) => sum + (studio.reviews?.length ?? 0), 0);
    const averageRate = studios.reduce((sum, studio) => sum + studio.hourlyRate, 0) / studios.length;
    const summary = [
        { icon: BuildingIcon, label: 'Active listings', value: String(studios.length) },
        { icon: DollarSignIcon, label: 'Average rate', value: studios.length ? `$${Math.round(averageRate)}/hr` : '—' },
        { icon: StarIcon, label: 'Average rating', value: formatAverageRating(studios) },
        { icon: MessageSquareIcon, label: 'Reviews received', value: String(reviewCount) },
    ];

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-12">
            <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My Studio Listings</h1>
                    <p className="mt-2 text-muted-foreground">Manage the spaces you host on StudioSpace.</p>
                </div>
                <Link href="/add-studio" className={buttonVariants({ size: 'lg', className: 'h-11 px-6' })}>
                    <PlusIcon /> Add New Studio
                </Link>
            </header>

            {studios.length > 0 ? (
                <>
                    <section className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {summary.map((tile) => (
                            <StatTile key={tile.label} {...tile} />
                        ))}
                    </section>
                    <ul className="space-y-4">
                        {studios.map((studio) => (
                            <ListingRow key={studio._id} studio={studio} />
                        ))}
                    </ul>
                </>
            ) : (
                <EmptyState />
            )}
        </main>
    );
};

export default MyListingsPage;
