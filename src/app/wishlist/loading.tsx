const WishlistLoading = () => (
    <main className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="mb-8 space-y-3">
            <div className="h-10 w-64 max-w-full animate-pulse rounded bg-muted" />
            <div className="h-5 w-56 max-w-full animate-pulse rounded bg-muted" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="h-90 animate-pulse rounded-xl bg-muted" />
            ))}
        </div>
    </main>
);

export default WishlistLoading;
