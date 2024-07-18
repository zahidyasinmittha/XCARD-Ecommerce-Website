const Product = require("../models/productSchema");
const jwt = require("jsonwebtoken");

const getAllProductsOfStoreController = async (req, res) => {
  try {
    const token = req.cookies?.token; // Assuming token is sent via cookies
    if (!token) {
      throw new Error("User needs to be logged in");
    }

    // Verify JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.id;

    // Find the store by ID
    const Products = await Product.find({ userId });

    if (!Products) throw new Error("No products found for this store");

    res.json({
      message: "Products fetched successfully",
      data: Products,
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || "Failed to fetch products",
      data: [],
      error: true,
      success: false,
    });
  }
};

module.exports = getAllProductsOfStoreController;
