import React from "react";
import { useNavigate } from "react-router-dom";

const TextArea = ({ currentTheme }) => {
    
    const handleShopNow = () => {
        // Navigate to products page
        const navigate = useNavigate();
        navigate("/products");
      
  };

  return (
    <div className="text-center lg:text-left max-w-lg mx-auto lg:mx-0">
      {/* Animated heading */}
      <div className="overflow-hidden mb-6">
        <h1
          className={`font-playfair text-4xl lg:text-6xl font-bold transform transition-all duration-1000 ease-out ${
            currentTheme === "men"
              ? "text-men-foreground translate-y-0"
              : "text-women-foreground translate-y-0"
          }`}
          key={currentTheme}
        >
          For {currentTheme === "men" ? "Men" : "Women"}
        </h1>
      </div>

      {/* Catchy line */}
      <h2
        className={`font-playfair text-2xl lg:text-3xl font-medium mb-6 transition-all duration-1000 delay-200 ${
          currentTheme === "men" ? "text-men-accent" : "text-women-accent"
        }`}
      >
        Redefining Modern Fashion.
      </h2>

      {/* Description */}
      <p
        className={`font-inter text-lg lg:text-xl leading-relaxed mb-8 transition-all duration-1000 delay-300 ${
          currentTheme === "men"
            ? "text-men-foreground/80"
            : "text-women-foreground/80"
        }`}
      >
        Explore the finest collections tailored for your unique style.
      </p>

      {/* CTA Button */}
      <button
        onClick={handleShopNow}
        className={`group font-inter font-medium bg-black text-white text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-luxury focus:outline-none focus:ring-4 ${
          currentTheme === "men"
            ? "bg-men-foreground text-men-background hover:bg-men-accent focus:ring-men-accent/30"
            : "bg-women-foreground text-women-background hover:bg-women-accent focus:ring-women-accent/30"
        }`}
      >
        <span className="flex items-center space-x-2">
          <span>Shop Now</span>
          <svg
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default TextArea;
