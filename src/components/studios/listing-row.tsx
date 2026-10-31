import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, PencilIcon, StarIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import DeleteStudioButton from '@/components/studios/delete-studio-button';
import { getCategoryLabel, type Studio } from '@/lib/studios';

const Stat = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
        <dt className="text-xs text-muted-foreground">{label}</dt>
        <dd className="mt-0.5 flex items-center gap-1 font-semibold">{children}</dd>
    </div>
);

const ListingRow = ({ studio }: { studio: Studio }) => {
    const { _id, title, category, image, location, hourlyRate, maxCapacity, rating, reviews } = studio;

    return (
        <li className="flex flex-col gap-5 rounded-3xl border bg-card p-4 md:flex-row md:items-center">
            <Link
                href={`/studios/${_id}`}
                className="relative aspect-video shrink-0 overflow-hidden rounded-2xl md:aspect-4/3 md:w-40"
            >
                <Image src={image} alt={title} fill sizes="(min-width: 768px) 160px, 100vw" className="object-cover" />
            </Link>

            <div className="min-w-0 flex-1 space-y-1.5">
                <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {getCategoryLabel(category)}
                </span>
                <h2 className="truncate text-lg font-semibold">
                    <Link href={`/studios/${_id}`} className="hover:text-primary">
                        {title}
                    </Link>
                </h2>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPinIcon className="size-4 shrink-0" />
                    <span className="truncate">{location}</span>
                </p>
            </div>

            <dl className="grid grid-cols-3 gap-6 text-sm md:w-64">
                <Stat label="Rate">${hourlyRate}/hr</Stat>
                <Stat label="Rating">
                    <StarIcon className="size-3.5 fill-primary text-primary" />
                    {rating ? `${rating.toFixed(1)} (${reviews?.length ?? 0})` : 'New'}
                </Stat>
                <Stat label="Capacity">{maxCapacity}</Stat>
            </dl>

            <div className="flex gap-2 md:flex-col lg:flex-row">
                <Link
                    href={`/studios/edit/${_id}`}
                    className={buttonVariants({ variant: 'outline', className: 'flex-1' })}
                >
                    <PencilIcon /> Update
                </Link>
                <DeleteStudioButton studio={studio} />
            </div>
        </li>
    );
};

export default ListingRow;
