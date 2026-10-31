import Link from 'next/link';
import { SearchXIcon, SparklesIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import StudioCard from '@/components/studios/studio-card';
import StudioFilters from '@/components/studios/studio-filters';
import { buildStudiosHref, filterStudios, getStudios, parseStudioQuery } from '@/lib/studios';

const EmptyState = () => (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <SearchXIcon className="size-7" />
        </span>
        <div className="space-y-1">
            <h2 className="text-lg font-semibold">No studios match your filters</h2>
            <p className="text-sm text-muted-foreground">Try a different search term, category or rate range.</p>
        </div>
        <Link href="/studios" className={buttonVariants({ size: 'lg' })}>
            Clear Filters
        </Link>
    </div>
);

const StudiosPage = async ({ searchParams }: PageProps<'/studios'>) => {
    const query = parseStudioQuery(await searchParams);
    const studios = filterStudios(await getStudios(query.category), query);

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-12">
            <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
                        <SparklesIcon className="size-3.5" /> Full Marketplace Catalog
                    </span>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Explore Creative Studios</h1>
                    <p className="mt-2 text-muted-foreground">
                        Discover sound stages, photography cycloramas, podcast hubs and mixing rooms.
                    </p>
                </div>
                <p className="text-sm text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">{studios.length}</span> creative spaces
                </p>
            </header>

            {/* Remount on every query change so the uncontrolled inputs pick up the new URL values */}
            <StudioFilters key={buildStudiosHref(query)} query={query} />

            {studios.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {studios.map((studio) => (
                        <StudioCard key={studio._id} studio={studio} />
                    ))}
                </div>
            ) : (
                <EmptyState />
            )}
        </main>
    );
};

export default StudiosPage;
