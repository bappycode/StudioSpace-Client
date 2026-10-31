const MyListingsLoading = () => (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
        <div className="mb-8 space-y-3">
            <div className="h-10 w-72 max-w-full animate-pulse rounded bg-muted" />
            <div className="h-5 w-64 max-w-full animate-pulse rounded bg-muted" />
        </div>
        <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="h-18 animate-pulse rounded-2xl bg-muted" />
            ))}
        </div>
        <div className="space-y-4">
            {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="h-36 animate-pulse rounded-3xl bg-muted" />
            ))}
        </div>
    </main>
);

export default MyListingsLoading;
