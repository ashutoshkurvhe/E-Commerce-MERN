import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeatureSection";
import BestSeller from "../components/Products/BestSeller";


const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      <BestSeller/>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
