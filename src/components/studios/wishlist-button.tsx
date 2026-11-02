'use client';

import { HeartIcon } from 'lucide-react';
import { cn } from 'cn';
import { useWishlist } from '@/components/wishlist-provider';

const WishlistButton = ({ studioId }: { studioId: string }) => {
    const { savedIds, toggle } = useWishlist();
    const isSaved = savedIds.includes(studioId);

    return (
        <button
            type="button"
            onClick={() => toggle(studioId)}
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-pressed={isSaved}
            className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-background/90 backdrop-blur transition-colors hover:text-primary"
        >
            <HeartIcon className={cn('size-4.5', isSaved && 'fill-primary text-primary')} />
        </button>
    );
};

export default WishlistButton;
