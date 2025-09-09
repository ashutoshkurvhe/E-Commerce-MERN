const express = require("express");
const Product = require("../Models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

//@route GET /api/admin/products
//@desc Get all products (Admin only)
//@access Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@route POST /api/admin/products
//@desc Create a new product (Admin only)
//@access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes = [],
      colors = [],
      collections,
      material,
      gender,
      images = [],
      isFeatured,
      isPublished,
      tags = [],
      dimensions,
      weight,
      sku,
    } = req.body;

    // Validation
    if (!name || !description || !price || !category || !sku) {
      return res.status(400).json({
        message: "Missing required fields",
        required: "name, description, price, category, and sku are required",
      });
    }

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku });
    if (existingProduct) {
      return res.status(400).json({
        message: "Product with this SKU already exists",
        sku,
      });
    }

    // Validate images structure
    const validatedImages = images.map((img) => ({
      url: img.url || img, // Handle both object and string formats
      altText: img.altText || "",
    }));

    // Create product with validated data
    const product = new Product({
      name,
      description,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      countInStock: Number(countInStock) || 0,
      category,
      brand,
      sizes: Array.isArray(sizes) ? sizes : [sizes].filter(Boolean),
      colors: Array.isArray(colors) ? colors : [colors].filter(Boolean),
      collections,
      material,
      gender,
      images: validatedImages,
      isFeatured: Boolean(isFeatured),
      isPublished: isPublished !== false,
      tags: Array.isArray(tags) ? tags : [tags].filter(Boolean),
      dimensions: dimensions || {},
      weight: weight ? Number(weight) : undefined,
      sku,
      user: req.user._id,
    });

    console.log(
      "Attempting to save product:",
      JSON.stringify(product, null, 2)
    );
    const createdProduct = await product.save();
    console.log("Product saved successfully:", createdProduct._id);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.keys(error.errors).reduce((acc, key) => {
          acc[key] = error.errors[key].message;
          return acc;
        }, {}),
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate key error",
        field: Object.keys(error.keyPattern)[0],
      });
    }

    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
});

module.exports = router;
