const mongoose = require('mongoose');
const { Schema } = mongoose;

const StoreSchema = new Schema({
  UserSchemaId: { type: String, required: true, unique: true },
  storeName: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  storeLogo: { type: String, required: true }, // Store logo as Base64 string
  bannerImage: { type: String, required: true }, // Banner image as Base64 string
  createdAt: { type: Date, default: Date.now }
});

const Store = mongoose.model('SignUp', StoreSchema);

module.exports = Store;
