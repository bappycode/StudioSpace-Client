'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const links = [
    { href: '/', label: 'Home' },
    { href: '/studios', label: 'Explore Studios' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/about', label: 'About Us' },
];

const Logo = () => (
    <Link href="/" className="flex items-center gap-2" aria-label="StudioSpace home page">
        <Image src="/assets/studiospace-icon.svg" alt="StudioSpace" width={36} height={36} />
        <span className="text-xl font-bold tracking-tight">
            <span>Studio</span>
            <span className="text-primary">Space</span>
        </span>
    </Link>
);

const NavBar = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    const linkClass = (href: string) =>
        cn(
            'text-sm font-medium transition-colors hover:text-foreground',
            isActive(href) ? 'text-primary' : 'text-muted-foreground'
        );

    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                <Logo />

                <ul className="hidden h-full items-center gap-8 md:flex">
                    {links.map(({ href, label }) => (
                        <li
                            key={href}
                            className={cn(
                                'flex h-full items-center border-b-2',
                                isActive(href) ? 'border-primary' : 'border-transparent'
                            )}
                        >
                            <Link href={href} className={linkClass(href)}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="hidden items-center gap-2 md:flex">
                    <Link href="/login" className={buttonVariants({ variant: 'ghost', size: 'lg' })}>
                        Login
                    </Link>
                    <Link href="/register" className={buttonVariants({ size: 'lg' })}>
                        Register
                    </Link>
                </div>

                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger
                        className={cn(buttonVariants({ variant: 'ghost', size: 'icon-lg' }), 'md:hidden')}
                        aria-label="Open menu"
                    >
                        <MenuIcon />
                    </SheetTrigger>
                    <SheetContent side="right">
                        <SheetHeader>
                            <SheetTitle>
                                <Logo />
                            </SheetTitle>
                        </SheetHeader>
                        <ul className="flex flex-col gap-5 px-4">
                            {links.map(({ href, label }) => (
                                <li key={href}>
                                    <Link href={href} onClick={() => setOpen(false)} className={linkClass(href)}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-auto flex flex-col gap-2 p-4">
                            <Link href="/login" onClick={() => setOpen(false)} className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                                Login
                            </Link>
                            <Link href="/register" onClick={() => setOpen(false)} className={buttonVariants({ size: 'lg' })}>
                                Register
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
};

export default NavBar;
