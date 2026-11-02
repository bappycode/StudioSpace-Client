import { getClientToken, requestServer } from '@/lib/api';
import type { Studio } from '@/lib/studios';

export const getWishlist = (email: string, token: string) =>
    requestServer<Studio[]>(`/wishlist/${encodeURIComponent(email)}`, { token });

export const addToWishlist = async (studioId: string) =>
    requestServer('/wishlist', { method: 'POST', body: { studioId }, token: await getClientToken() });

export const removeFromWishlist = async (studioId: string) =>
    requestServer(`/wishlist/${studioId}`, { method: 'DELETE', token: await getClientToken() });
