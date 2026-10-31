import Link from 'next/link';
import { BadgeCheckIcon, HeadsetIcon, ShieldCheckIcon, WrenchIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import SectionHeader from '@/components/home/section-header';

const guarantees = [
    {
        icon: ShieldCheckIcon,
        title: 'Liability Protection',
        text: 'Every confirmed booking is backed by liability cover, so accidental damage during a session never turns into a dispute.',
    },
    {
        icon: BadgeCheckIcon,
        title: 'Verified Profiles',
        text: 'Hosts and creators sign in with a verified email or a Google or GitHub account before they can list or book.',
    },
    {
        icon: WrenchIcon,
        title: 'Equipment Safety',
        text: 'Listed gear, from strobes to mixing desks, is described in detail, and the refundable deposit keeps it protected.',
    },
    {
        icon: HeadsetIcon,
        title: '24/7 Host Support',
        text: 'Early call time or a late wrap? Our support team is available around the clock for hosts and creators alike.',
    },
];

// Doubles as the "About Us" anchor in the navbar
const GuaranteeSection = () => (
    <section id="about" className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 pt-20">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:self-start">
                <SectionHeader
                    eyebrow="Host guarantee & creator support"
                    title="A marketplace built on trust"
                    description="StudioSpace connects people who make things with the spaces they need. Hosts list with confidence, creators book without worry, and both sides are covered from first click to final wrap."
                />
                <div className="flex flex-wrap gap-3">
                    <Link href="/add-studio" className={buttonVariants({ size: 'lg', className: 'h-11 px-6' })}>
                        Become a Host
                    </Link>
                    <Link
                        href="/studios"
                        className={buttonVariants({ variant: 'outline', size: 'lg', className: 'h-11 px-6' })}
                    >
                        Browse Studios
                    </Link>
                </div>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
                {guarantees.map(({ icon: Icon, title, text }) => (
                    <li key={title} className="rounded-3xl border bg-card p-6 transition-colors hover:border-primary/50">
                        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Icon className="size-6" />
                        </span>
                        <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default GuaranteeSection;
