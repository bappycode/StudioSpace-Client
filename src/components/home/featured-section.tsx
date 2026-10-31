import SectionHeader from '@/components/home/section-header';
import StudioCard from '@/components/studios/studio-card';
import { getFeaturedStudios } from '@/lib/studios';

const FeaturedSection = async () => {
    const studios = await getFeaturedStudios();
    if (studios.length === 0) return null;

    return (
        <section className="mx-auto w-full max-w-7xl px-4 pt-20">
            <SectionHeader
                eyebrow="Featured studios"
                title="Top-rated spaces creators love"
                description="The highest-rated studios on StudioSpace, reviewed by the photographers, filmmakers and musicians who shot there."
                action={{ href: '/studios?sort=rating', label: 'See all top-rated' }}
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {studios.map((studio) => (
                    <StudioCard key={studio._id} studio={studio} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedSection;
