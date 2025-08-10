import ProductDetails from "./ProductDetails";
import ProductGrid from "./ProductGrid";
import { fetchProductsByFilters } from "../../../redux/slices/productsSlice";
import { useState, useEffect,useRef, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFadeIn } from "../../hooks/useFadeIn";
import axios from "axios";
const BestSeller = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  const sectionRef = useRef(null);
  useFadeIn(sectionRef, { delay: 0.3 });

  // Fetch products by filters on component mount and also fetch best seller products
  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Top Wear",
        limit: 8,
      })
    );

    //Fetch Best Seller Products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div ref={sectionRef} className="w-[100%] mt-[100px]">
      {/* Best Seller */}
      <h2
        className="text-5xl md:text-6xl font-bold text-center mb-4"
      >
        Best Seller
      </h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center  ">Loading best seller product...</p>
      )}

      <div ref={sectionRef} className="container mx-auto ">
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default BestSeller;
