import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createProduct } from "../../redux/slices/adminProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AddProductPage = () => {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(
          `${VITE_BACKEND_URL}/api/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );

        return {
          url: response.data.imageUrl,
          altText: file.name,
        };
      });

      const uploadedImages = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...uploadedImages]);
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Format the data before submission
      if (
        !formData.name ||
        !formData.description ||
        !formData.price ||
        !formData.category ||
        !formData.sku
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (images.length === 0) {
        toast.error("Please upload at least one image");
        return;
      }

      const formattedData = {
        ...formData,
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice
          ? parseFloat(formData.discountPrice)
          : undefined,
        countInStock: parseInt(formData.countInStock) || 0,
        sizes: formData.sizes
          ? formData.sizes.split(",").map((item) => item.trim())
          : [],
        colors: formData.colors
          ? formData.colors.split(",").map((item) => item.trim())
          : [],
        collections: formData.collections,
        tags: formData.tags
          ? formData.tags.split(",").map((item) => item.trim())
          : [],
        images: images,
        dimensions: formData.dimensions
          ? {
              length: parseFloat(formData.dimensions.length) || 0,
              width: parseFloat(formData.dimensions.width) || 0,
              height: parseFloat(formData.dimensions.height) || 0,
            }
          : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
      };

      const result = await dispatch(createProduct(formattedData)).unwrap();
      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error details:", err);
      toast.error(err.message || "Failed to add product");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-4 mb-10">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="border bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700"
        >
          ← Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Basic Information */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold md:col-span-2">
            Basic Information
          </h2>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">SKU *</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded h-24"
              required
            />
          </div>
        </div>

        {/* Pricing and Inventory */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Pricing & Inventory</h2>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Price *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border p-2 rounded"
              step="0.01"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              className="border p-2 rounded"
              step="0.01"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Count in Stock *</label>
            <input
              type="number"
              name="countInStock"
              value={formData.countInStock}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>
        </div>

        {/* Categories and Attributes */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Categories & Attributes</h2>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Category *</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Collections *</label>
            <input
              type="text"
              name="collections"
              value={formData.collections}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>

        {/* Variants */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Variants</h2>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Sizes *</label>
            <input
              type="text"
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="e.g., S, M, L, XL"
              required
            />
            <span className="text-sm text-gray-500 mt-1">
              Enter sizes separated by commas
            </span>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Colors *</label>
            <input
              type="text"
              name="colors"
              value={formData.colors}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="e.g., Red, Blue, Green"
              required
            />
            <span className="text-sm text-gray-500 mt-1">
              Enter colors separated by commas
            </span>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Material</label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </div>

        {/* Images */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Images</h2>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Product Images *</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="border p-2 rounded"
              disabled={uploading}
            />
            {uploading && <p className="text-blue-500">Uploading...</p>}
          </div>

          {/* Image Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.url}
                  alt={image.altText}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Additional Information</h2>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="e.g., summer, casual, trendy"
            />
            <span className="text-sm text-gray-500 mt-1">
              Enter tags separated by commas
            </span>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              Featured
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleChange}
              />
              Published
            </label>
          </div>
        </div>

        {/* Dimensions and Weight */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Shipping Information</h2>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="border p-2 rounded"
              step="0.01"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Dimensions</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                name="dimensions.length"
                placeholder="Length"
                value={formData.dimensions?.length || ""}
                onChange={handleChange}
                className="border p-2 rounded"
                step="0.01"
              />
              <input
                type="number"
                name="dimensions.width"
                placeholder="Width"
                value={formData.dimensions?.width || ""}
                onChange={handleChange}
                className="border p-2 rounded"
                step="0.01"
              />
              <input
                type="number"
                name="dimensions.height"
                placeholder="Height"
                value={formData.dimensions?.height || ""}
                onChange={handleChange}
                className="border p-2 rounded"
                step="0.01"
              />
            </div>
          </div>
        </div>

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
