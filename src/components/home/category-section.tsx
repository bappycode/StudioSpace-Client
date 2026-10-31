import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon, CameraIcon, ClapperboardIcon, MicIcon, MusicIcon, PaletteIcon } from 'lucide-react';
import { cn } from 'cn';
import SectionHeader from '@/components/home/section-header';
import { buildStudiosHref, getStudios, studioCategories, type CategorySlug } from '@/lib/studios';

const categoryVisuals: Record<CategorySlug, { icon: typeof CameraIcon; image: string }> = {
    'photo-studio': {
        icon: CameraIcon,
        image: 'https://images.unsplash.com/photo-1519183071298-a2962feb14f4?w=1200&q=80',
    },
    'film-stage': {
        icon: ClapperboardIcon,
        image: 'https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=800&q=80',
    },
    'podcast-room': {
        icon: MicIcon,
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
    },
    'music-suite': {
        icon: MusicIcon,
        image: 'https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?w=800&q=80',
    },
    'art-workshop': {
        icon: PaletteIcon,
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    },
};

const CategorySection = async () => {
    const studios = await getStudios();
    const countFor = (slug: CategorySlug) => studios.filter((studio) => studio.category === slug).length;

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-20">
            <SectionHeader
                eyebrow="Browse by category"
                title="Find the right room for the job"
                description="From daylight cyc walls to treated vocal booths, every space is built for a different kind of creative work."
                action={{ href: '/studios', label: 'View all studios' }}
            />

            {/* The first category takes a 2×2 tile; the other four fill the remaining 2×2 block */}
            <div className="grid auto-rows-[200px] gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[220px]">
                {studioCategories.map(({ slug, pluralLabel }, index) => {
                    const { icon: Icon, image } = categoryVisuals[slug];
                    const count = countFor(slug);
                    const isFeatured = index === 0;

                    return (
                        <Link
                            key={slug}
                            href={buildStudiosHref({ category: slug })}
                            className={cn(
                                'group relative overflow-hidden rounded-3xl bg-muted',
                                isFeatured && 'sm:col-span-2 sm:row-span-2'
                            )}
                        >
                            <Image
                                src={image}
                                alt=""
                                fill
                                sizes={isFeatured ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

                            <span className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
                                <Icon className="size-5" />
                            </span>

                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                                <div>
                                    <h3 className={cn('font-semibold', isFeatured ? 'text-2xl sm:text-3xl' : 'text-lg')}>
                                        {pluralLabel}
                                    </h3>
                                    <p className="text-sm text-white/70">
                                        {count} {count === 1 ? 'space' : 'spaces'} available
                                    </p>
                                </div>
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <ArrowUpRightIcon className="size-5 transition-transform group-hover:rotate-45" />
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default CategorySection;
