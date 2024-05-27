const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true
  },
  verificationCode: {
    type: String,
    required: true
  },
  isvarified : {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 400 // Code expires after 5 minutes
  }
});

const verificationCodeModel = mongoose.model('Verification', verificationSchema);
module.exports = verificationCodeModel
