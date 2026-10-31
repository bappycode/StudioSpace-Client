'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ListFilterIcon, RotateCcwIcon, SearchIcon } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    buildStudiosHref,
    sortOptions,
    studioCategories,
    toRate,
    type SortOption,
    type StudioQuery,
} from '@/lib/studios';

type CategoryChipProps = {
    href: string;
    active: boolean;
    children: React.ReactNode;
};

const CategoryChip = ({ href, active, children }: CategoryChipProps) => (
    <Link
        href={href}
        scroll={false}
        aria-current={active ? 'page' : undefined}
        className={buttonVariants({ variant: active ? 'default' : 'secondary', size: 'sm', className: 'rounded-full' })}
    >
        {children}
    </Link>
);

const StudioFilters = ({ query }: { query: StudioQuery }) => {
    const router = useRouter();

    const navigate = (changes: Partial<StudioQuery>) =>
        router.push(buildStudiosHref({ ...query, ...changes }), { scroll: false });

    const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const search = new FormData(e.currentTarget).get('q')?.toString().trim();
        navigate({ search: search || undefined });
    };

    const handleRateFilter = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        navigate({ minRate: toRate(data.get('min')?.toString()), maxRate: toRate(data.get('max')?.toString()) });
    };

    return (
        <section className="mb-10 space-y-4 rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row">
                <form onSubmit={handleSearch} className="flex flex-1 gap-2">
                    <div className="relative flex-1">
                        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            name="q"
                            defaultValue={query.search}
                            placeholder="Search studios by title, equipment, city..."
                            aria-label="Search studios"
                            className="h-10 pl-9"
                        />
                    </div>
                    <Button type="submit" className="h-10 px-5">
                        Search
                    </Button>
                </form>

                <select
                    defaultValue={query.sort}
                    onChange={(e) => navigate({ sort: e.target.value as SortOption })}
                    aria-label="Sort studios"
                    className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                    {sortOptions.map(({ value, label }) => (
                        <option key={value} value={value}>
                            Sort: {label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <ListFilterIcon className="size-4" /> Category:
                    </span>
                    <CategoryChip href={buildStudiosHref({ ...query, category: undefined })} active={!query.category}>
                        All
                    </CategoryChip>
                    {studioCategories.map(({ slug, label }) => (
                        <CategoryChip
                            key={slug}
                            href={buildStudiosHref({ ...query, category: slug })}
                            active={query.category === slug}
                        >
                            {label}
                        </CategoryChip>
                    ))}
                </div>

                <form onSubmit={handleRateFilter} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Rate:</span>
                    <Input
                        type="number"
                        name="min"
                        min={0}
                        defaultValue={query.minRate}
                        placeholder="Min $"
                        aria-label="Minimum hourly rate"
                        className="w-20"
                    />
                    <span>-</span>
                    <Input
                        type="number"
                        name="max"
                        min={0}
                        defaultValue={query.maxRate}
                        placeholder="Max $"
                        aria-label="Maximum hourly rate"
                        className="w-20"
                    />
                    <Button type="submit" variant="secondary">
                        Apply
                    </Button>
                    <Link
                        href="/studios"
                        scroll={false}
                        aria-label="Reset all filters"
                        className={buttonVariants({ variant: 'ghost', size: 'icon' })}
                    >
                        <RotateCcwIcon />
                    </Link>
                </form>
            </div>
        </section>
    );
};

export default StudioFilters;
