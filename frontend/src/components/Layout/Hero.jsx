import React, { useState, useEffect } from "react";
import TextArea from "../../components/Home/TextArea";
import ImageCarousel from "../../components/Home/ImageCarousel";

// Import fashion images
import menFashion1 from "../../assets/men-fashion-1.jpeg";
import menFashion2 from "../../assets/men-fashion-2.jpeg";
import menFashion3 from "../../assets/men-fashion-3.jpeg";
import menFashion4 from "../../assets/men-fashion-4.jpeg";
import menFashion5 from "../../assets/men-fashion-5.jpeg";
import womenFashion1 from "../../assets/women-fashion-1.jpeg";
import womenFashion2 from "../../assets/women-fashion-2.jpeg";
import womenFashion3 from "../../assets/women-fashion-3.jpeg";
import womenFashion4 from "../../assets/women-fashion-4.jpeg";
import womenFashion5 from "../../assets/women-fashion-5.jpeg";


const menImages = [menFashion1, menFashion2, menFashion3, menFashion4, menFashion5];
const womenImages = [womenFashion1, womenFashion2, womenFashion3, womenFashion4, womenFashion5];

const Hero = () => {
  const [currentTheme, setCurrentTheme] = useState("men"); // 'men' or 'women'

  // Switch between men's and women's themes every 5 seconds
  useEffect(() => {
    const themeInterval = setInterval(() => {
      setCurrentTheme((prev) => (prev === "men" ? "women" : "men"));
    }, 5000);

    return () => clearInterval(themeInterval);
  }, []);

  return (
    <section className="w-full h-[calc(100vh-100px)] flex overflow-hidden relative">
      {/* Dynamic background gradient based on theme */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
          currentTheme === "men" ? "bg-gradient-men" : "bg-gradient-women"
        }`}
      />

      {/* Content container */}
      <div className="relative z-10 w-full h-full flex">
        {/* Left Text Area - 50% */}
        <div className="w-1/2 flex items-center justify-center p-8 lg:p-16">
          <TextArea currentTheme={currentTheme} />
        </div>

        {/* Right Image Carousel - 50% */}
        <div className="w-1/2 flex items-center justify-center relative">
          <ImageCarousel
            images={currentTheme === "men" ? menImages : womenImages}
            theme={currentTheme}
          />
        </div>
      </div>

      {/* Theme indicator dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        <div
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentTheme === "men" ? "bg-men-foreground" : "bg-black/50"
          }`}
        />
        <div
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentTheme === "women" ? "bg-women-foreground" : "bg-black/50"
          }`}
        />
      </div>
    </section>
  );
};

export default Hero;
