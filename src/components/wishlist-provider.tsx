'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getClientToken } from '@/lib/api';
import { authClient } from '@/lib/auth-client';
import { addToWishlist, getWishlist, removeFromWishlist } from '@/lib/wishlist';

type WishlistContextValue = {
    savedIds: string[];
    toggle: (studioId: string) => Promise<void>;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session } = authClient.useSession();
    const email = session?.user.email;
    const [savedIds, setSavedIds] = useState<string[]>([]);

    useEffect(() => {
        if (!email) return;
        getClientToken()
            .then((token) => getWishlist(email, token))
            .then((studios) => setSavedIds(studios.map((studio) => studio._id)))
            .catch(() => setSavedIds([]));
    }, [email]);

    const toggle = async (studioId: string) => {
        if (!email) {
            toast.info('Log in to save studios to your wishlist');
            router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
            return;
        }

        const isSaved = savedIds.includes(studioId);
        try {
            if (isSaved) {
                await removeFromWishlist(studioId);
                setSavedIds((ids) => ids.filter((id) => id !== studioId));
                toast.success('Removed from your wishlist');
            } else {
                await addToWishlist(studioId);
                setSavedIds((ids) => [...ids, studioId]);
                toast.success('Saved to your wishlist');
            }
            if (pathname === '/wishlist') router.refresh();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Could not update your wishlist');
        }
    };

    return (
        <WishlistContext.Provider value={{ savedIds: email ? savedIds : [], toggle }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) throw new Error('useWishlist must be used inside WishlistProvider');
    return context;
};
