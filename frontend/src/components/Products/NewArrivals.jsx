import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto text-center mb-12 relative">
        <div className="mb-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Explore New Arrivals
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the latest styles straight off the runway, freshly added to
            keep your wardrobe on the cutting edge of fashion.
          </p>
        </div>

        {/* Scroll Buttons */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-10">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`group p-3 rounded-full border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
              canScrollLeft
                ? "bg-white text-gray-800 border-gray-200 hover:border-gray-400 hover:bg-gray-50 hover:scale-110"
                : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="text-xl transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`group p-3 rounded-full border-2 transition-all duration-300 shadow-lg hover:shadow-xl ${
              canScrollRight
                ? "bg-white text-gray-800 border-gray-200 hover:border-gray-400 hover:bg-gray-50 hover:scale-110"
                : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="text-xl transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Scrollable Product List */}
        <div
          ref={scrollRef}
          className={`flex space-x-6 overflow-x-auto pb-8 pt-4
            scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 
            hover:scrollbar-thumb-gray-400 scrollbar-thumb-rounded-full
            ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {newArrivals.map((product) => (
            <div
              key={product._id}
              className="group min-w-[280px] sm:min-w-[320px] lg:min-w-[350px] relative flex-shrink-0"
            >
              <Link to={`/product/${product._id}`} className="block">
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                  <div className="relative h-[400px] lg:h-[500px]">
                    <img
                      src={product.images[0]?.url || "/placeholder.svg"}
                      alt={product.images[0]?.altText || product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      draggable="false"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      NEW
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 flex flex-col p-6 text-white transform translate-y-2 group-hover:translate-y-0 hover:backdrop-blur-md transition-transform duration-300">
                      <h4 className="text-left font-bold text-xl mb-2 transition-colors duration-300">
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold">${product.price}</p>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                          <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-yellow-200 transition-colors duration-200">
                            View Details
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
