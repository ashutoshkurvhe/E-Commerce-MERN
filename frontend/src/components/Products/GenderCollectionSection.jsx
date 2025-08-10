import mensCollectionImage from "../../assets/register.webp";
import womensCollectionImage from "../../assets/login.webp";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useFadeIn } from "../../hooks/useFadeIn";

const GenderCollectionSection = () => {
   const sectionRef = useRef(null);
   useFadeIn (sectionRef, { delay: 0.3 });
  return (
    <section className="py-20 px-4 lg:px-0 bg-gradient-to-br from-slate-50 to-gray-100">
      <div ref={sectionRef} className="container mx-auto">
        {/* Main Heading */}
        <div ref={sectionRef} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
            Discover Your Style
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections designed for the modern individual
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Women's Collection */}
          <div className="relative flex-1 group overflow-hidden rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500">
            <img
              src={womensCollectionImage}
              alt="Women's Collection"
              className="w-full h-[700px] object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-3xl font-bold mb-3 text-white">
                  Women's Collection
                </h2>

                {/* Description - appears on hover */}
                <p className="text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Elegant designs that celebrate femininity with contemporary
                  flair. From casual chic to sophisticated evening wear.
                </p>

                <NavLink
                  to="/collections/all?gender=women"
                  className="inline-flex items-center px-6 py-3 bg-red-300 text-white font-semibold rounded-full hover:from-pink-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/25"
                >
                  Shop Women's
                  <svg
                    className="ml-2 w-4 h-4 btn-anim"
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
                </NavLink>
              </div>
            </div>
          </div>

          {/* Men's Collection */}
          <div className="relative flex-1 group overflow-hidden rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500">
            <img
              src={mensCollectionImage}
              alt="Men's Collection"
              className="w-full h-[700px] object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-3xl font-bold mb-3 text-white">
                  Men's Collection
                </h2>

                {/* Description - appears on hover */}
                <p className="text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  Sharp, sophisticated styles for the modern gentleman. From
                  business essentials to weekend casual wear.
                </p>

                <NavLink
                  to="/collections/all?gender=men"
                  className="inline-flex items-center px-6 py-3 bg-blue-300 font-semibold rounded-full hover:from-blue-600 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  Shop Men's
                  <svg
                    className="ml-2 w-4 h-4 btn-anim"
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
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
