import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';

const stripeOffsets = [64, 100, 136, 172, 208, 244];

const ClapperboardIllustration = () => (
    <svg viewBox="0 0 320 250" className="w-full max-w-sm" role="img" aria-labelledby="not-found-art">
        <title id="not-found-art">A film clapperboard under a spotlight, marked scene 404</title>
        <path d="M160 0 L52 236 H268 Z" className="fill-primary/10" />
        <ellipse cx="160" cy="232" rx="118" ry="10" className="fill-foreground/10" />

        <rect x="66" y="98" width="188" height="122" rx="12" className="fill-foreground" />
        <text x="84" y="128" className="fill-background/60 font-mono text-[11px] tracking-[0.2em]">
            SCENE
        </text>
        <text x="160" y="188" textAnchor="middle" className="fill-primary text-[64px] font-bold">
            404
        </text>
        <line x1="84" y1="200" x2="236" y2="200" className="stroke-background/20" strokeWidth="2" />
        <text x="236" y="128" textAnchor="end" className="fill-background/60 font-mono text-[11px] tracking-[0.2em]">
            TAKE 1
        </text>

        <g transform="rotate(-14 70 92)">
            <clipPath id="clapper-stick">
                <rect x="66" y="66" width="188" height="26" rx="6" />
            </clipPath>
            <rect x="66" y="66" width="188" height="26" rx="6" className="fill-foreground" />
            <g clipPath="url(#clapper-stick)">
                {stripeOffsets.map((x) => (
                    <path key={x} d={`M${x} 92 L${x + 14} 66 H${x + 32} L${x + 18} 92 Z`} className="fill-primary" />
                ))}
            </g>
        </g>
        <circle cx="72" cy="94" r="5" className="fill-primary" />
    </svg>
);

const NotFound = () => (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 px-4 py-16 text-center">
        <ClapperboardIllustration />
        <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wider text-primary uppercase">Error 404</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Cut! This scene isn&apos;t in the script</h1>
            <p className="mx-auto max-w-md text-muted-foreground">
                The page you&apos;re looking for was moved, deleted or never made it past the edit. Let&apos;s get you
                back on set.
            </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className={buttonVariants({ size: 'lg', className: 'h-11 px-6' })}>
                <ArrowLeftIcon /> Return to Home
            </Link>
            <Link href="/studios" className={buttonVariants({ variant: 'outline', size: 'lg', className: 'h-11 px-6' })}>
                Explore Studios
            </Link>
        </div>
    </main>
);

export default NotFound;
