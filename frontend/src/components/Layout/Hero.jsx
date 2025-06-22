import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Empower Your Business",
    description: "We deliver solutions that help you grow.",
    image: "https://source.unsplash.com/random/1600x900?business",
  },
  {
    id: 2,
    title: "Innovate with Us",
    description: "Join the tech revolution with our cutting-edge tools.",
    image: "https://source.unsplash.com/random/1600x900?technology",
  },
  {
    id: 3,
    title: "Your Vision, Our Creation",
    description: "We bring your ideas to life with stunning precision.",
    image: "https://source.unsplash.com/random/1600x900?creative",
  },
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${slides[index].image})` }}
        >
          <div className="bg-black bg-opacity-50 p-8 rounded-xl text-white text-center max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {slides[index].title}
            </h1>
            <p className="text-lg md:text-xl">{slides[index].description}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={handlePrev}
          className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70"
        >
          ▶
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 w-3 rounded-full ${
              i === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;

