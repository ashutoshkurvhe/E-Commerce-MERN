import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    countInStock: "",
    category: "",
    brand: "",
    sizes: "",
    colors: "",
    collections: "",
    material: "",
    gender: "",
    images: "",
    isFeatured: false,
    isPublished: true,
    tags: "",
    dimensions: "",
    weight: "",
    sku: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert comma-separated strings to arrays
      const payload = {
        ...formData,
        sizes: formData.sizes.split(",").map((s) => s.trim()),
        colors: formData.colors.split(",").map((c) => c.trim()),
        tags: formData.tags.split(",").map((t) => t.trim()),
        images: formData.images.split(",").map((img) => img.trim()),
      };

      await axios.post("/api/admin/products", payload, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      toast.success("Product added successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {Object.keys(formData).map((key) => {
          if (key === "isFeatured" || key === "isPublished") {
            return (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={key}
                  checked={formData[key]}
                  onChange={handleChange}
                />
                {key}
              </label>
            );
          }

          return (
            <div key={key} className="flex flex-col">
              <label className="font-semibold mb-1 capitalize">{key}</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder={`Enter ${key}`}
              />
            </div>
          );
        })}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Add Product
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
