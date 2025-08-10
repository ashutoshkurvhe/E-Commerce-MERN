import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeatureSection";
import BestSeller from "../components/Products/BestSeller";
import Services from "../components/Products/Services";
import React, { useRef } from "react";
import { useFadeIn } from "../hooks/useFadeIn";


const Home = () => {
  const heroRef = useRef(null);

  // Apply animation
  useFadeIn(heroRef, { duration: 1.2, delay: 0.2 });
  return (
    <div className="bg-white" ref={heroRef}>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      <BestSeller />
      <FeaturedCollection />
      <Services />
      <FeaturesSection />
    </div>
  );
};

export default Home;
