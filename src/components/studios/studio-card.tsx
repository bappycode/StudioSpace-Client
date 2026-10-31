import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, MapPinIcon, StarIcon, UsersIcon } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getCategoryLabel, type Studio } from '@/lib/studios';

const StudioCard = ({ studio }: { studio: Studio }) => {
    const { _id, title, category, image, hourlyRate, rating, location, overview, maxCapacity, securityDeposit } =
        studio;

    return (
        <Card className="h-full gap-0 py-0 transition-shadow hover:shadow-lg">
            <div className="relative aspect-4/3">
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                />
                <span className="absolute top-3 left-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-medium text-primary backdrop-blur">
                    {getCategoryLabel(category)}
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-sm font-semibold text-white">
                    ${hourlyRate}
                    <span className="text-xs font-normal text-white/70"> / hr</span>
                </span>
                <span className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
                    <StarIcon className="size-3.5 fill-primary text-primary" />
                    {rating ? rating.toFixed(1) : 'New'}
                </span>
            </div>

            <CardContent className="flex flex-1 flex-col gap-3 py-4">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPinIcon className="size-3.5 shrink-0 text-primary" />
                    <span className="line-clamp-1">{location}</span>
                </p>
                <h3 className="line-clamp-1 text-lg font-semibold">{title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{overview}</p>
                <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                        <UsersIcon className="size-3.5" /> Up to {maxCapacity} creators
                    </span>
                    <span>Deposit: ${securityDeposit}</span>
                </div>
                <Link href={`/studios/${_id}`} className={buttonVariants({ size: 'lg', className: 'w-full' })}>
                    View Details <ArrowRightIcon />
                </Link>
            </CardContent>
        </Card>
    );
};

export default StudioCard;
