const Product = require('../models/productSchema');
const jwt = require('jsonwebtoken');

// Controller function to create a new product
let createProductController = async (req, res) => {
  const { title, price, Productimage } = req.body;
  try {
    const token = req.cookies?.token; // Assuming token is sent via cookies
    if (!token) {
      throw new Error('User needs to be logged in');
    }

    // Verify JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.id;
    const newProduct = new Product({
      userId,
      title,
      price,
      Productimage
    });

    const savedProduct = await newProduct.save();

    res.json({
      message: 'Product created successfully',
      data: savedProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || 'Failed to create product',
      data: [],
      error: true,
      success: false,
    });
  }
};

module.exports = createProductController