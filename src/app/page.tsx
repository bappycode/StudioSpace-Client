import CategorySection from '@/components/home/category-section';
import FeaturedSection from '@/components/home/featured-section';
import GuaranteeSection from '@/components/home/guarantee-section';
import HeroSlider from '@/components/home/hero-slider';
import HowItWorksSection from '@/components/home/how-it-works-section';

export const revalidate = 60;

const HomePage = () => (
    <main className="pb-20">
        <HeroSlider />
        <FeaturedSection />
        <CategorySection />
        <HowItWorksSection />
        <GuaranteeSection />
    </main>
);

export default HomePage;
