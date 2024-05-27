const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'  // Default role could be 'user' or whatever you prefer
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true  // Assuming phone number should be required
    },
    ProfileImage: {
        type: String,
        default: ''  // Default can be an empty string or a placeholder image URL
    },
    location: {
        type: String,
        default: ''  // Default can be an empty string or provide a more specific default value
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],  // Define possible values for gender
        default: 'Other'
    },
    shippingAddress: {
        address: {
            type: String,
            default: ''  // Default can be an empty string or provide a more specific default value
        },
        city: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        zipCode: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        }
    },
    paymentInfo: {
        cardNumber: {
            type: String,
            default: ''
        },
        expiryDate: {
            type: String,
            default: ''
        },
        cvv: {
            type: String,
            default: ''
        },
        cardType: {
            type: String,
            default: ''  // This could be 'Visa', 'MasterCard', etc.
        }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', signUpSchema);

module.exports = User;
