import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
    CheckCircle2Icon,
    ChevronRightIcon,
    DollarSignIcon,
    LayersIcon,
    MailIcon,
    MapPinIcon,
    ShieldCheckIcon,
    StarIcon,
    UsersIcon,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import BookingDialog from '@/components/studios/booking-dialog';
import StudioGallery from '@/components/studios/studio-gallery';
import StudioReviews from '@/components/studios/studio-reviews';
import { buildStudiosHref, getCategoryLabel, getStudio } from '@/lib/studios';

export const generateMetadata = async ({ params }: PageProps<'/studios/[id]'>): Promise<Metadata> => {
    const studio = await getStudio((await params).id);
    return { title: studio ? studio.title : 'Studio not found' };
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mb-5 text-xl font-semibold tracking-tight">{children}</h2>
);

type SpecTileProps = {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
};

const SpecTile = ({ icon: Icon, label, value }: SpecTileProps) => (
    <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-5" />
        </span>
        <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
            <p className="font-semibold">{value}</p>
        </div>
    </div>
);

const formatHostSince = (createdAt: string) =>
    new Date(createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

const StudioDetailsPage = async ({ params }: PageProps<'/studios/[id]'>) => {
    const studio = await getStudio((await params).id);
    if (!studio) notFound();

    const {
        title,
        category,
        image,
        gallery,
        hourlyRate,
        securityDeposit,
        maxCapacity,
        location,
        amenities,
        overview,
        ownerName,
        ownerEmail,
        createdAt,
        rating,
        reviews,
    } = studio;
    const categoryLabel = getCategoryLabel(category);
    const images = [...new Set([image, ...gallery])];

    const specs = [
        { icon: DollarSignIcon, label: 'Hourly rate', value: `$${hourlyRate} / hr` },
        { icon: ShieldCheckIcon, label: 'Security deposit', value: `$${securityDeposit}` },
        { icon: UsersIcon, label: 'Capacity', value: `Up to ${maxCapacity} people` },
        { icon: LayersIcon, label: 'Space type', value: categoryLabel },
    ];

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-10">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Link href="/studios" className="hover:text-primary">
                    Studios
                </Link>
                <ChevronRightIcon className="size-4" />
                <Link href={buildStudiosHref({ category })} className="hover:text-primary">
                    {categoryLabel}
                </Link>
                <ChevronRightIcon className="size-4" />
                <span className="truncate text-foreground">{title}</span>
            </nav>

            <header className="mb-8 space-y-3">
                <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
                    {categoryLabel}
                </span>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <StarIcon className="size-4 fill-primary text-primary" />
                        {rating ? (
                            <span>
                                <span className="font-semibold text-foreground">{rating.toFixed(1)}</span> ·{' '}
                                {reviews?.length ?? 0} reviews
                            </span>
                        ) : (
                            'New listing'
                        )}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MapPinIcon className="size-4 text-primary" /> {location}
                    </span>
                </div>
            </header>

            <StudioGallery images={images} title={title} />

            <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
                <div className="space-y-12">
                    <section className="grid gap-3 sm:grid-cols-2">
                        {specs.map((spec) => (
                            <SpecTile key={spec.label} {...spec} />
                        ))}
                    </section>

                    <section>
                        <SectionHeading>About this space</SectionHeading>
                        <p className="leading-relaxed whitespace-pre-line text-muted-foreground">{overview}</p>
                    </section>

                    <section>
                        <SectionHeading>What this space offers</SectionHeading>
                        <ul className="grid gap-3 sm:grid-cols-2">
                            {amenities.map((amenity) => (
                                <li key={amenity} className="flex items-center gap-3 text-sm">
                                    <CheckCircle2Icon className="size-5 shrink-0 text-primary" />
                                    {amenity}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <SectionHeading>Creator reviews</SectionHeading>
                        <StudioReviews reviews={reviews} rating={rating} />
                    </section>
                </div>

                {/* Booking card comes first on mobile so the main action is visible without scrolling */}
                <aside className="order-first space-y-4 self-start lg:sticky lg:top-24 lg:order-none">
                    <div className="rounded-3xl border bg-card p-6 shadow-sm">
                        <p className="mb-5">
                            <span className="text-3xl font-bold tracking-tight">${hourlyRate}</span>
                            <span className="text-muted-foreground"> / hour</span>
                        </p>
                        <dl className="mb-6 space-y-3 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Security deposit</dt>
                                <dd className="font-medium">${securityDeposit} (refundable)</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-muted-foreground">Capacity</dt>
                                <dd className="font-medium">Up to {maxCapacity} people</dd>
                            </div>
                        </dl>
                        <BookingDialog studio={studio} />
                        <p className="mt-3 text-center text-xs text-muted-foreground">
                            Requests stay Pending until the host confirms them.
                        </p>
                    </div>

                    <div className="rounded-3xl border bg-card p-6">
                        <p className="mb-4 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Hosted by
                        </p>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                                {ownerName.charAt(0).toUpperCase()}
                            </span>
                            <div>
                                <p className="font-semibold">{ownerName}</p>
                                <p className="text-sm text-muted-foreground">Listed {formatHostSince(createdAt)}</p>
                            </div>
                        </div>
                        <a
                            href={`mailto:${ownerEmail}`}
                            className={buttonVariants({ variant: 'outline', size: 'lg', className: 'w-full' })}
                        >
                            <MailIcon /> Contact Host
                        </a>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default StudioDetailsPage;
