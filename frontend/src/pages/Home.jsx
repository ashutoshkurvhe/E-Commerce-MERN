import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeatureSection";
import BestSeller from "../components/Products/BestSeller";
import Services from "../components/Products/Services";


const Home = () => {
  return (
    <div className="bg-white">
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      <BestSeller/>
      <FeaturedCollection />
      <Services />
      <FeaturesSection />
    </div>
  );
};

export default Home;
