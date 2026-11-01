const StudioDetailsLoading = () => (
    <main className="mx-auto w-full max-w-7xl px-4 py-10">
        <div className="mb-6 h-4 w-64 animate-pulse rounded bg-muted" />
        <div className="mb-8 space-y-3">
            <div className="h-6 w-28 animate-pulse rounded-full bg-muted" />
            <div className="h-10 w-96 max-w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-72 max-w-full animate-pulse rounded bg-muted" />
        </div>
        <div className="aspect-video animate-pulse rounded-3xl bg-muted" />
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
            <div className="space-y-6">
                <div className="grid gap-3 sm:grid-cols-2">
                    {Array.from({ length: 4 }, (_, i) => (
                        <div key={i} className="h-18 animate-pulse rounded-2xl bg-muted" />
                    ))}
                </div>
                <div className="h-40 animate-pulse rounded-2xl bg-muted" />
            </div>
            <div className="h-64 animate-pulse rounded-3xl bg-muted" />
        </div>
    </main>
);

export default StudioDetailsLoading;
