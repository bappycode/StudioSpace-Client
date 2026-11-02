'use client';

import { HeartIcon } from 'lucide-react';
import { cn } from 'cn';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/components/wishlist-provider';

type WishlistButtonProps = {
    studioId: string;
    showLabel?: boolean;
};

const WishlistButton = ({ studioId, showLabel = false }: WishlistButtonProps) => {
    const { savedIds, toggle } = useWishlist();
    const isSaved = savedIds.includes(studioId);
    const heartClass = cn(isSaved && 'fill-primary text-primary');

    if (showLabel) {
        return (
            <Button variant="outline" size="lg" onClick={() => toggle(studioId)} aria-pressed={isSaved}>
                <HeartIcon className={heartClass} /> {isSaved ? 'Saved' : 'Save'}
            </Button>
        );
    }

    return (
        <button
            type="button"
            onClick={() => toggle(studioId)}
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-pressed={isSaved}
            className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur transition-colors hover:text-primary"
        >
            <HeartIcon className={cn('size-4.5', heartClass)} />
        </button>
    );
};

export default WishlistButton;
