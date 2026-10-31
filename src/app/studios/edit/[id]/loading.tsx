const EditStudioLoading = () => (
    <main className="mx-auto w-full max-w-7xl px-4 py-12">
        <div className="mb-8 space-y-3">
            <div className="h-4 w-28 animate-pulse rounded bg-muted" />
            <div className="h-10 w-96 max-w-full animate-pulse rounded bg-muted" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">
                {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="h-56 animate-pulse rounded-3xl bg-muted" />
                ))}
            </div>
            <div className="hidden aspect-3/4 animate-pulse rounded-xl bg-muted lg:block" />
        </div>
    </main>
);

export default EditStudioLoading;
