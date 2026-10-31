import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

// For private server pages: reads the session from the request cookies, so reloading never bounces a logged-in user
export const requireUser = async (currentPath: string) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect(`/login?redirect=${encodeURIComponent(currentPath)}`);
    return session.user;
};
