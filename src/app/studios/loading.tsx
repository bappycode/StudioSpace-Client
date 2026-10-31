const StudioCardSkeleton = () => (
    <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
        <div className="aspect-4/3 animate-pulse bg-muted" />
        <div className="space-y-3 p-4">
            <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-10 animate-pulse rounded bg-muted" />
            <div className="h-9 animate-pulse rounded-lg bg-muted" />
        </div>
    </div>
);

const StudiosLoading = () => (
    <main className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="mb-8 space-y-3">
            <div className="h-6 w-48 animate-pulse rounded-full bg-muted" />
            <div className="h-10 w-80 max-w-full animate-pulse rounded bg-muted" />
        </div>
        <div className="mb-10 h-32 animate-pulse rounded-2xl bg-muted" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
                <StudioCardSkeleton key={i} />
            ))}
        </div>
    </main>
);

export default StudiosLoading;
