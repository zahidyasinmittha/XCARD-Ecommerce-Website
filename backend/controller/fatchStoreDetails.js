const Store = require('../models/storeSchema');
const jwt = require('jsonwebtoken');

let fatchStoreDetailsController = async (req, res) => {
  try {
    const token = req.cookies?.token; // Assuming token is sent via cookies
    if (!token) {
      throw new Error('User needs to be logged in');
    }

    // Verify JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const UserSchemaId = decodedToken.id;
    let store = await Store.findOne({ UserSchemaId });
    if (!store) {
        throw new Error('Store not found');
    }
      return res.json({
        message: 'Store Data get successfully',
        data: store,
        error: false,
        success: true,
      });
    } catch (err) {
    res.json({
      message: err.message || 'Failed to create or update store',
      data: [],
      error: true,
      success: false,
    });
  }
};
module.exports = fatchStoreDetailsController
