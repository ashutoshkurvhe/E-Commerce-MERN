import React, { useState, useEffect } from 'react';

const ImageCarousel = ({ images, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-switch images every 3 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 200);
    }, 3000);

    return () => clearInterval(imageInterval);
  }, [images.length]);

  // Reset to first image when theme changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [theme]);

  const getImageIndex = (offset) => {
    return (currentIndex + offset + images.length) % images.length;
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background images */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={images[getImageIndex(-2)]}
          alt="Fashion background"
          className={`absolute w-64 h-80 object-cover rounded-lg opacity-20 blur-sm transform scale-75 transition-all duration-700 ${
            theme === 'men' ? '-translate-x-32' : 'translate-x-32'
          }`}
        />
        <img
          src={images[getImageIndex(2)]}
          alt="Fashion background"
          className={`absolute w-64 h-80 object-cover rounded-lg opacity-20 blur-sm transform scale-75 transition-all duration-700 ${
            theme === 'men' ? 'translate-x-32' : '-translate-x-32'
          }`}
        />
      </div>

      {/* Side images */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={images[getImageIndex(-1)]}
          alt="Fashion side"
          className={`absolute w-72 h-96 object-cover rounded-lg shadow-soft transform transition-all duration-500 hover:scale-105 ${
            theme === 'men'
              ? '-translate-x-40 scale-90 opacity-70 blur-[1px]'
              : '-translate-x-40 scale-90 opacity-70 blur-[1px]'
          } ${isTransitioning ? 'opacity-50' : ''}`}
        />
        <img
          src={images[getImageIndex(1)]}
          alt="Fashion side"
          className={`absolute w-72 h-96 object-cover rounded-lg shadow-soft transform transition-all duration-500 hover:scale-105 ${
            theme === 'men'
              ? 'translate-x-40 scale-90 opacity-70 blur-[1px]'
              : 'translate-x-40 scale-90 opacity-70 blur-[1px]'
          } ${isTransitioning ? 'opacity-50' : ''}`}
        />
      </div>

      {/* Main center image */}
      <div className="relative z-10">
        <img
          src={images[currentIndex]}
          alt="Fashion main"
          className={`w-80 h-[28rem] object-cover rounded-xl shadow-luxury transform transition-all duration-500 hover:scale-105 ${
            isTransitioning ? 'opacity-80 scale-95' : 'opacity-100 scale-100'
          }`}
        />
        <div
          className={`absolute inset-0 rounded-xl transition-all duration-500 ${
            theme === 'men'
              ? 'bg-gradient-to-t from-men-background/30 to-transparent'
              : 'bg-gradient-to-t from-women-background/30 to-transparent'
          }`}
        />
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? theme === 'men'
                  ? 'bg-men-foreground scale-125'
                  : 'bg-women-foreground scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
