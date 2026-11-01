import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export const requireUser = async (currentPath: string) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect(`/login?redirect=${encodeURIComponent(currentPath)}`);
    return session.user;
};

export const getServerToken = async () => {
    const { token } = await auth.api.getToken({ headers: await headers() });
    return token;
};
