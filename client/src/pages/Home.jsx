import MainBanner from '../components/MainBanner';
import BestSellerSlide from '../components/BestSellerSlider';
import RecommendedBooksSlider from '../components/RecommendedBooksSlider';

export default function Home() {
  return (
    <>
      <MainBanner />
      <BestSellerSlide />
      <RecommendedBooksSlider /> 
      {/* You can add more homepage content below if needed */}
    </>
  );
}