import MainBanner from '../components/MainBanner';
import BestSellerSlide from '../components/BestSellerSlider';
import RecommendedBooksSlider from '../components/RecommendedBooksSlider';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="w-full">
      <MainBanner />
      <BestSellerSlide />
      <RecommendedBooksSlider /> 
      <Footer />
      {/* You can add more homepage content below if needed */}
    </div>
  );
}