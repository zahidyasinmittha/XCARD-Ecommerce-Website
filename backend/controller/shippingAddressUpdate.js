const User = require("../models/userSignUpModel");
const jwt = require("jsonwebtoken");

async function shippingAddressUpdateController(req, res) {
    try {
        const token = req.cookies?.token;
        if (!token) throw new Error("User needs to login");
        
        // Extract shipping address fields from request body
        const { address, city, state, zipCode, country } = req.body;
        if (!address) throw new Error("Address is required");
        if (!city) throw new Error("City is required");
        if (!state) throw new Error("State is required");
        if (!zipCode) throw new Error("Zip code is required");
        if (!country) throw new Error("Country is required");
        
        // Verify the token and extract user email
        const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const email = userData.email;

        // Find the user by email in the database
        const user = await User.findOne({ email });
        if (!user) throw new Error("User not found");

        // Update shipping address information
        user.shippingAddress = {
            address: address,
            city: city,
            state: state,
            zipCode: zipCode,
            country: country,
        };

        // Save the updated user document
        const updateResult = await user.save();
        if (!updateResult) throw new Error("Failed to update shipping address");

        // Respond with success message and updated user data
        res.json({
            message: "Shipping address updated successfully!",
            data: updateResult,
            error: false,
            success: true,
        });
        
    } catch (error) {
        // Handle errors and respond accordingly
        res.status(500).json({
            message: error.message || "Internal server error",
            data: [],
            error: true,
            success: false,
        });
    }
}

module.exports = shippingAddressUpdateController;
