const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  Productimage: {
    type: String, // Storing the image as a base64 string or URL
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
