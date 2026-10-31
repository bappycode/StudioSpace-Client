import Link from 'next/link';
import { ArrowRightIcon, CalendarCheckIcon, ClapperboardIcon, ClockIcon, SearchIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import SectionHeader from '@/components/home/section-header';

const steps = [
    {
        icon: SearchIcon,
        title: 'Discover Spaces',
        text: 'Search by name, gear or city, filter by category and hourly rate, and compare capacity, amenities and reviews.',
    },
    {
        icon: ClockIcon,
        title: 'Select Shoot Hours',
        text: 'Pick a date with a start and end time. The rental cost and deposit add up as you choose.',
    },
    {
        icon: CalendarCheckIcon,
        title: 'Book Instantly',
        text: 'Send your request in one click. Overlapping slots are blocked, so a time you book is never double-booked.',
    },
    {
        icon: ClapperboardIcon,
        title: 'Create & Produce',
        text: 'Arrive to a ready set and focus on the work. Every request and its status lives in My Bookings.',
    },
];

const HowItWorksSection = () => (
    <section id="how-it-works" className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 pt-20">
        <SectionHeader
            eyebrow="How booking works"
            title="From idea to set in four steps"
            description="No back-and-forth emails or surprise fees. Find a space, choose your hours and get to work."
        />

        <div className="rounded-3xl bg-zinc-950 p-6 text-white ring-1 ring-foreground/10 sm:p-10">
            <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {steps.map(({ icon: Icon, title, text }, index) => (
                    <li key={title} className="relative">
                        {/* Connector to the next step, only when steps sit in one row */}
                        {index < steps.length - 1 && (
                            <span className="absolute top-6 left-16 hidden h-px w-[calc(100%-3.5rem)] border-t border-dashed border-white/20 lg:block" />
                        )}
                        <span className="relative flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                            <Icon className="size-6" />
                        </span>
                        <p className="mt-6 font-mono text-xs text-white/50">Step 0{index + 1}</p>
                        <h3 className="mt-1 text-lg font-semibold">{title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-white/65">{text}</p>
                    </li>
                ))}
            </ol>

            <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-white/75">Ready to find your next set?</p>
                <Link href="/studios" className={buttonVariants({ size: 'lg', className: 'h-11 px-6' })}>
                    Start Exploring <ArrowRightIcon />
                </Link>
            </div>
        </div>
    </section>
);

export default HowItWorksSection;
