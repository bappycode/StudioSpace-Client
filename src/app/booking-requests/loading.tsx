const BookingRequestsLoading = () => (
    <main className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="mb-8 space-y-3">
            <div className="h-10 w-56 animate-pulse rounded bg-muted" />
            <div className="h-5 w-80 max-w-full animate-pulse rounded bg-muted" />
        </div>
        <div className="mb-8 flex gap-2">
            {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-muted" />
            ))}
        </div>
        <div className="space-y-4">
            {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="h-44 animate-pulse rounded-3xl bg-muted" />
            ))}
        </div>
    </main>
);

export default BookingRequestsLoading;
