const Store = require('../models/storeSchema');
const jwt = require('jsonwebtoken');

let createOrUpdateStoreController = async (req, res) => {
  const { storeName, tagline, description, storeLogo, bannerImage } = req.body;  // Assuming req.userId is set by your authentication middleware

  try {
    const token = req.cookies?.token; // Assuming token is sent via cookies
    if (!token) {
      throw new Error('User needs to be logged in');
    }

    // Verify JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const UserSchemaId = decodedToken.id;
    let store = await Store.findOne({ UserSchemaId });

    if (store) {
      // Update existing store
      store.UserSchemaId = UserSchemaId;
      store.storeName = storeName;
      store.tagline = tagline;
      store.description = description;
      store.storeLogo = storeLogo;
      store.bannerImage = bannerImage;
      store = await store.save();
      return res.json({
        message: 'Store updated successfully',
        data: store,
        error: false,
        success: true,
      });
    } else {
      // Create new store
      store = new Store({
        UserSchemaId,
        storeName,
        tagline,
        description,
        storeLogo,
        bannerImage
      });
      await store.save();
      return res.json({
        message: 'Store created successfully',
        data: store,
        error: false,
        success: true,
      });
    }
  } catch (err) {
    res.json({
      message: err.message || 'Failed to create or update store',
      data: [],
      error: true,
      success: false,
    });
  }
};
module.exports = createOrUpdateStoreController
