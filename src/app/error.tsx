'use client';

import Link from 'next/link';
import { RotateCcwIcon, ServerCrashIcon } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';

// Catches failed server fetches (e.g. the API is down) so a route shows this instead of crashing
const ErrorPage = ({ retry }: { error: unknown; retry: () => void }) => (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <ServerCrashIcon className="size-8" />
        </span>
        <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">We lost the signal</h1>
            <p className="text-muted-foreground">
                Something went wrong while loading this page. It&apos;s usually temporary, so give it another try.
            </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="h-11 px-6" onClick={retry}>
                <RotateCcwIcon /> Try Again
            </Button>
            <Link href="/" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'h-11 px-6' })}>
                Return to Home
            </Link>
        </div>
    </main>
);

export default ErrorPage;
