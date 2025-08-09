import { motion } from "framer-motion";
import {
  Badge,
  Truck,
  Shield,
  Headphones,
  Award,
  CreditCard,
} from "lucide-react";

const features = [
  { icon: Truck, text: "Free Shipping" },
  { icon: Shield, text: "Secure Payment" },
  { icon: Headphones, text: "24/7 Support" },
  { icon: Award, text: "Quality Assured" },
  { icon: CreditCard, text: "Easy Returns" },
  { icon: Badge, text: "Best Prices" },
];

const clothingCategories = [
  "T-Shirts",
  "Shirts",
  "Dresses",
  "Hoodies",
  "Jackets",
  "Jeans",
  "Pants",
  "Skirts",
  "Sweaters",
  "Blazers",
  "Shorts",
  "Activewear",
  "Loungewear",
  "Underwear",
];

const Services = () => {
  return (
    <div className="w-full space-y-4 ">
      {/* Features Carousel */}
      <div className="overflow-hidden p-4">
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4 text-center">
          Why Shop With Us
        </h2>
        <div className="relative text-black">
          <motion.div
            className="flex gap-6 items-center"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...features, ...features].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={`${feature.text}-${index}`}
                  className="flex items-center gap-3 bg-white text-black rounded-full shadow-lg px-4 py-2 whitespace-nowrap"
                >
                  <Icon className="w-6 h-6 text-primary-foreground" />
                  <span className="font-medium text-primary-foreground">
                    {feature.text}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="bg-card rounded-2xl p-6 shadow-medium overflow-hidden">
        <h2 className="text-xl md:text-2xl font-bold text-card-foreground mb-4 text-center">
          Shop by Category
        </h2>
        <div className="relative">
          <motion.div
            className="flex gap-4 items-center"
            animate={{ x: [-800, 0] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...clothingCategories, ...clothingCategories].map(
              (category, index) => (
                <motion.div
                  key={`${category}-${index}`}
                  className=" bg-white text-black rounded-full shadow-lg px-6 py-2 whitespace-nowrap font-medium"
                >
                  {category}
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Services;
