import CategorySection from '@/components/home/category-section';
import FeaturedSection from '@/components/home/featured-section';
import HeroSlider from '@/components/home/hero-slider';

// Rebuild the page at most once a minute so new studios and ratings show up after deploy
export const revalidate = 60;

const HomePage = () => (
    <main>
        <HeroSlider />
        <FeaturedSection />
        <CategorySection />
    </main>
);

export default HomePage;
