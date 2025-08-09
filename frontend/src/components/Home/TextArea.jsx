import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TextArea = ({ currentTheme }) => {
  const navigate = useNavigate();
  const headings = {
    men: "Urban Fashion for Men",
    women: "Chic Designs for Women",
  };

  const [displayText, setDisplayText] = useState("");
  const fullText = currentTheme === "men" ? headings.men : headings.women;

  useEffect(() => {
    setDisplayText(""); // Reset when theme changes
    let index = -1;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + fullText.charAt(index));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 70); // Typing speed
    return () => clearInterval(interval);
  }, [currentTheme]);

    
    const handleShopNow = () => {
        // Navigate to products page
        navigate("/collections/all");
      
  };

  return (
    <div className="text-center lg:text-left max-w-lg mx-auto lg:mx-0">
      {/* Animated heading */}
      <div className="overflow-hidden mb-6">
        <h1
          className={`fade-in text-4xl lg:text-6xl font-bold whitespace-wrap h-[120px] text-white
            `}
        >
          {displayText}
          <span className="blinking-cursor">|</span>
        </h1>
      </div>

      {/* Catchy line */}
      <h2
        className={`fade-in text-2xl text-white lg:text-3xl font-medium mb-6 transition-all ease-in-out duration-1000 delay-200 ${
          currentTheme === "men" ? "text-men-accent" : "text-women-accent"
        }`}
      >
        Redefining Modern Fashion.
      </h2>

      {/* Description */}
      <p
        className={`fade-in font-inter text-gray-100 text-lg lg:text-xl leading-relaxed mb-8 transition-all ease-in-out duration-1000 delay-300 ${
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
        className={`fade-in group font-inter font-medium bg-black text-white text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-luxury focus:outline-none focus:ring-4 ${
          currentTheme === "men"
            ? "bg-men-foreground text-men-background hover:bg-men-accent focus:ring-men-accent/30"
            : "bg-women-foreground text-women-background hover:bg-women-accent focus:ring-women-accent/30"
        }`}
      >
        <span className="flex items-center space-x-2">
          <span>Shop Now</span>
          <svg
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200 btn-anim"
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
