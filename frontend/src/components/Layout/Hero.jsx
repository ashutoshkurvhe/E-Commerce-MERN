import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import product1 from "../../assets/product-1.jpeg";
import product2 from "../../assets/product-2.jpeg";
import product3 from "../../assets/product-3.jpeg";
import product4 from "../../assets/product-4.jpeg";

const products = [
  {
    id: 1,
    name: "MAN Fashion",
    price: "$299",
    originalPrice: "$399",
    description:
      "Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life.",
    features: [
      "Heart Rate Monitor",
      "GPS Tracking",
      "7-Day Battery",
      "Water Resistant",
    ],
    rating: 4.8,
    reviews: 2451,
    image: product1,
    color: "from-primary to-primary-glow",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: "$199",
    originalPrice: "$249",
    description:
      "Premium noise-canceling headphones with crystal-clear sound and 30-hour battery.",
    features: [
      "Noise Canceling",
      "30hr Battery",
      "Quick Charge",
      "Premium Sound",
    ],
    rating: 4.9,
    reviews: 1832,
    image: product2,
    color: "from-warning to-warning/80",
  },
  {
    id: 3,
    name: "Athletic Sneakers",
    price: "$129",
    originalPrice: "$179",
    description:
      "Lightweight running shoes with advanced cushioning and breathable mesh design.",
    features: [
      "Lightweight",
      "Breathable Mesh",
      "Advanced Cushioning",
      "Durable Sole",
    ],
    rating: 4.7,
    reviews: 3241,
    image: product3,
    color: "from-success to-success/80",
  },
  {
    id: 4,
    name: "Athletic Sneakers",
    price: "$129",
    originalPrice: "$179",
    description:
      "Lightweight running shoes with advanced cushioning and breathable mesh design.",
    features: [
      "Lightweight",
      "Breathable Mesh",
      "Advanced Cushioning",
      "Durable Sole",
    ],
    rating: 4.7,
    reviews: 3241,
    image: product4,
    color: "from-success to-success/80",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentProduct = products[currentIndex];

  return (
    <div className="w-full h-[calc(100vh-100px)] px-2 bg-background rounded-2xl overflow-hidden shadow-strong">
      <div className="grid md:grid-cols-2 h-full">
        {/* Left Side - Content */}
        <div className="bg-gradient-card p-8 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <motion.h1
                  className="text-3xl font-bold text-foreground mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentProduct.name}
                </motion.h1>

                <motion.div
                  className="flex items-center gap-2 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(currentProduct.rating)
                            ? "text-warning fill-current"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {currentProduct.rating} ({currentProduct.reviews} reviews)
                  </span>
                </motion.div>
              </div>

              <motion.p
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentProduct.description}
              </motion.p>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="font-semibold text-foreground mb-2">
                  Key Features:
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {currentProduct.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div>
                  <span className="text-3xl font-bold text-primary">
                    {currentProduct.price}
                  </span>
                  <span className="text-lg text-muted-foreground line-through ml-2">
                    {currentProduct.originalPrice}
                  </span>
                </div>
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                  Buy Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side - Image */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              className={`absolute inset-0 bg-gradient-to-br ${currentProduct.color}`}
            >
              <div className="absolute inset-0 bg-black/20" />
              <motion.img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-8 flex gap-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
