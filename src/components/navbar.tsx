'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { CalendarCheckIcon, LayoutDashboardIcon, ListIcon, LogOutIcon, MenuIcon, PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { authClient } from '@/lib/auth-client';

const links = [
    { href: '/', label: 'Home' },
    { href: '/studios', label: 'Explore Studios' },
    { href: '/#how-it-works', label: 'How It Works' },
    { href: '/#about', label: 'About Us' },
];

const userLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboardIcon },
    { href: '/add-studio', label: 'Add New Studio', icon: PlusIcon },
    { href: '/my-listings', label: 'My Studio Listings', icon: ListIcon },
    { href: '/my-bookings', label: 'My Bookings', icon: CalendarCheckIcon },
];

export const Logo = () => (
    <Link href="/" className="flex items-center gap-2" aria-label="StudioSpace home page">
        <Image src="/assets/studiospace-icon.svg" alt="StudioSpace" width={36} height={36} />
        <span className="text-xl font-bold tracking-tight">
            <span>Studio</span>
            <span className="text-primary">Space</span>
        </span>
    </Link>
);

const UserAvatar = ({ name, image }: { name: string; image?: string | null }) => (
    <Avatar>
        <AvatarImage src={image ?? undefined} alt={name} />
        <AvatarFallback className="bg-primary text-primary-foreground">
            {name.charAt(0).toUpperCase()}
        </AvatarFallback>
    </Avatar>
);

const NavBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    const linkClass = (href: string) =>
        cn(
            'text-sm font-medium transition-colors hover:text-foreground',
            isActive(href) ? 'text-primary' : 'text-muted-foreground'
        );

    const handleLogout = async () => {
        await authClient.signOut();
        setOpen(false);
        toast.success('Logged out successfully');
        router.push('/');
    };

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

                {isPending ? (
                    <div className="hidden size-9 rounded-full bg-muted md:block" />
                ) : user ? (
                    <div className="hidden md:flex">
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={<Button variant="ghost" size="icon-lg" className="rounded-full" />}
                                aria-label="Open user menu"
                            >
                                <UserAvatar name={user.name} image={user.image} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>
                                        <p className="font-medium text-foreground">{user.name}</p>
                                        <p className="truncate text-xs font-normal">{user.email}</p>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                {userLinks.map(({ href, label, icon: Icon }) => (
                                    <DropdownMenuItem key={href} render={<Link href={href} />}>
                                        <Icon />
                                        {label}
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                                    <LogOutIcon />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <div className="hidden items-center gap-2 md:flex">
                        <Link href="/login" className={buttonVariants({ variant: 'ghost', size: 'lg' })}>
                            Login
                        </Link>
                        <Link href="/register" className={buttonVariants({ size: 'lg' })}>
                            Register
                        </Link>
                    </div>
                )}

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

                        {user ? (
                            <div className="mt-auto flex flex-col gap-4 border-t p-4">
                                <div className="flex items-center gap-3">
                                    <UserAvatar name={user.name} image={user.image} />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium">{user.name}</p>
                                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                                    </div>
                                </div>
                                <ul className="flex flex-col gap-4">
                                    {userLinks.map(({ href, label }) => (
                                        <li key={href}>
                                            <Link href={href} onClick={() => setOpen(false)} className={linkClass(href)}>
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <Button variant="destructive" size="lg" onClick={handleLogout}>
                                    <LogOutIcon />
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="mt-auto flex flex-col gap-2 p-4">
                                <Link href="/login" onClick={() => setOpen(false)} className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                                    Login
                                </Link>
                                <Link href="/register" onClick={() => setOpen(false)} className={buttonVariants({ size: 'lg' })}>
                                    Register
                                </Link>
                            </div>
                        )}
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    );
};

export default NavBar;
