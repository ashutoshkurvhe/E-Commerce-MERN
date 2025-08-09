import React, { useState, useEffect } from "react";

const ParallaxCarousel = ({ womenImages, menImages }) => {
  const [currentSection, setCurrentSection] = useState("women");
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImages = currentSection === "women" ? womenImages : menImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImages.length]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [currentSection]);

  const getParallaxStyle = (index) => {
    const position =
      (index - currentIndex + currentImages.length) % currentImages.length;

    if (position === 0) {
      return {
        transform: "translateX(0px) scale(1)",
        opacity: 1,
        zIndex: 30,
      };
    } else if (position === 1) {
      return {
        transform: "translateX(150px) scale(0.8)",
        opacity: 0.6,
        zIndex: 20,
      };
    } else if (position === 2) {
      return {
        transform: "translateX(250px) scale(0.6)",
        opacity: 0.3,
        zIndex: 10,
      };
    } else if (position === currentImages.length - 1) {
      return {
        transform: "translateX(-150px) scale(0.8)",
        opacity: 0.6,
        zIndex: 20,
      };
    } else {
      return {
        transform: "translateX(-250px) scale(0.6)",
        opacity: 0.3,
        zIndex: 10,
      };
    }
  };

  return (
    <div className="fade-in relative w-full h-full flex flex-col items-center justify-center overflow-hidden to-slate-900">
      {/* Section Title */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white tracking-wider text-center md:text-left">
          {currentSection === "women"
            ? "WOMEN'S COLLECTION"
            : "MEN'S COLLECTION"}
        </h2>
      </div>

      {/* Carousel Container */}
      <div className="relative w-80 h-96 mb-12">
        {currentImages.map((image, index) => (
          <img
            key={`${currentSection}-${index}`}
            src={image}
            alt={`${currentSection === "women" ? "Women" : "Men"} Fashion ${
              index + 1
            }`}
            className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl transition-all duration-1200 cursor-pointer hover:shadow-purple-500/25"
            style={getParallaxStyle(index)}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Image Navigation Dots */}
      <div className="flex space-x-2 mb-6">
        {currentImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-125 shadow-lg"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Section Toggle Dots */}
      <div className="flex space-x-4">
        <button
          onClick={() => setCurrentSection("women")}
          className={`px-6 py-1 rounded-full transition-all duration-300 font-semibold ${
            currentSection === "women"
              ? "bg-red-300 text-white shadow-lg shadow-pink-500/25 scale-105"
              : "bg-white/20 text-white/70 hover:bg-white/30 hover:text-white"
          }`}
        >
        </button>
        <button
          onClick={() => setCurrentSection("men")}
          className={`px-6 py-1 rounded-full transition-all duration-300 font-semibold ${
            currentSection === "men"
              ? "bg-blue-300 text-white shadow-lg shadow-blue-500/25 scale-105"
              : "bg-white/20 text-white/70 hover:bg-white/30 hover:text-white"
          }`}
        >
        </button>
      </div>
    </div>
  );
};

export default ParallaxCarousel;
