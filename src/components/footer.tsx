'use client';

import Link from 'next/link';
import { toast } from 'sonner';
import { MailIcon, MapPinIcon } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/navbar';
import { buildStudiosHref, studioCategories } from '@/lib/studios';

const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/studios', label: 'Explore Studios' },
    { href: '/#how-it-works', label: 'How It Works' },
    { href: '/#about', label: 'About Us' },
    { href: '/add-studio', label: 'Host Your Space' },
];


const socials = [
    { href: 'https://x.com', label: 'X', icon: FaXTwitter },
    { href: 'https://instagram.com', label: 'Instagram', icon: FaInstagram },
    { href: 'https://youtube.com', label: 'YouTube', icon: FaYoutube },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: FaLinkedinIn },
];

const FooterHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">{children}</h3>
);

const footerLinkClass = 'text-sm text-muted-foreground transition-colors hover:text-primary';

const Footer = () => {
    const handleSubscribe = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.success('Thanks for subscribing! Studio drops are coming your way.');
        e.currentTarget.reset();
    };

    return (
        <footer className="mt-auto border-t bg-muted/40">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
                <div className="space-y-4">
                    <Logo />
                    <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                        StudioSpace connects creators with the spaces they need — from cyc walls and sound
                        stages to podcast lounges and recording suites. Book by the hour, create without limits.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                            <MapPinIcon className="size-4 text-primary" /> Dhaka, Bangladesh
                        </li>
                        <li className="flex items-center gap-2">
                            <MailIcon className="size-4 text-primary" /> hello@studiospace.com
                        </li>
                    </ul>
                    <div className="flex gap-2">
                        {socials.map(({ href, label, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                            >
                                <Icon className="size-4" />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <FooterHeading>Quick Links</FooterHeading>
                    <ul className="space-y-3">
                        {quickLinks.map(({ href, label }) => (
                            <li key={href}>
                                <Link href={href} className={footerLinkClass}>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <FooterHeading>Popular Studios</FooterHeading>
                    <ul className="space-y-3">
                        {studioCategories.map(({ slug, pluralLabel }) => (
                            <li key={slug}>
                                <Link href={buildStudiosHref({ category: slug })} className={footerLinkClass}>
                                    {pluralLabel}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <FooterHeading>Stay in the Loop</FooterHeading>
                    <p className="mb-4 text-sm text-muted-foreground">
                        Get new studio listings, host tips and exclusive booking deals in your inbox.
                    </p>
                    <form onSubmit={handleSubscribe} className="flex gap-2">
                        <Input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                            aria-label="Email address"
                            className="bg-background"
                        />
                        <Button type="submit">Subscribe</Button>
                    </form>
                </div>
            </div>

            <div className="border-t">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
                    <p>© {new Date().getFullYear()} StudioSpace. All rights reserved.</p>
                    <p>
                        By using StudioSpace you agree to our{' '}
                        <span className="font-medium text-foreground">Terms of Service</span> and{' '}
                        <span className="font-medium text-foreground">Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
