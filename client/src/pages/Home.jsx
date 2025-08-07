import MainBanner from '../components/MainBanner';
import BestSellerSlide from '../components/BestSellerSlider';
import RecommendedBooksSlider from '../components/RecommendedBooksSlider';
import StorySection from '../components/StorySection';
import Events from '../components/Events';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="w-full">
      <MainBanner />
      <BestSellerSlide />
      <RecommendedBooksSlider /> 
      <StorySection />
      <Events />
      <Footer />
      {/* You can add more homepage content below if needed */}
    </div>
  );
}