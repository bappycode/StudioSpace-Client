import type { Metadata } from 'next';
import Link from 'next/link';
import { BuildingIcon, DollarSignIcon, MessageSquareIcon, PlusIcon, StarIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import ListingRow from '@/components/studios/listing-row';
import { getMyListings } from '@/lib/studios';
import { requireUser } from '@/lib/session';

export const metadata: Metadata = { title: 'My Studio Listings | StudioSpace' };

type SummaryTileProps = {
    icon: typeof StarIcon;
    label: string;
    value: string;
};

const SummaryTile = ({ icon: Icon, label, value }: SummaryTileProps) => (
    <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-5" />
        </span>
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
        </div>
    </div>
);

const average = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;

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

    const ratings = studios.flatMap((studio) => (studio.rating ? [studio.rating] : []));
    const reviewCount = studios.reduce((sum, studio) => sum + (studio.reviews?.length ?? 0), 0);
    const summary = [
        { icon: BuildingIcon, label: 'Active listings', value: String(studios.length) },
        {
            icon: DollarSignIcon,
            label: 'Average rate',
            value: studios.length ? `$${Math.round(average(studios.map((studio) => studio.hourlyRate)))}/hr` : '—',
        },
        { icon: StarIcon, label: 'Average rating', value: ratings.length ? average(ratings).toFixed(1) : '—' },
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
                            <SummaryTile key={tile.label} {...tile} />
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
