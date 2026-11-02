import type { Metadata } from 'next';
import Link from 'next/link';
import { HeartIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import StudioCard from '@/components/studios/studio-card';
import { getServerToken, requireUser } from '@/lib/session';
import { getWishlist } from '@/lib/wishlist';

export const metadata: Metadata = { title: 'My Wishlist' };

const EmptyState = () => (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed px-6 py-16 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <HeartIcon className="size-7" />
        </span>
        <div className="space-y-1">
            <h2 className="text-lg font-semibold">Your wishlist is empty</h2>
            <p className="text-sm text-muted-foreground">
                Tap the heart on any studio to save it here for your next shoot.
            </p>
        </div>
        <Link href="/studios" className={buttonVariants({ size: 'lg' })}>
            Explore Studios
        </Link>
    </div>
);

const WishlistPage = async () => {
    const user = await requireUser('/wishlist');
    const studios = await getWishlist(user.email, await getServerToken());

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-12">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My Wishlist</h1>
                <p className="mt-2 text-muted-foreground">Studios you&apos;ve saved for later.</p>
            </header>

            {studios.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

export default WishlistPage;
