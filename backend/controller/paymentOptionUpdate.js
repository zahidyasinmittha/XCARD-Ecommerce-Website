const User = require("../models/userSignUpModel");
const jwt = require("jsonwebtoken");

async function paymentOptionUpdateController(req, res) {
    try {
        const token = req.cookies?.token;
        if (!token) throw new Error("User need to login");
        const { cardNumber, expiryDate, cvv, cardType } = req.body;
        if (!cardNumber) throw new Error("card number is required");
        if (!expiryDate) throw new Error("expiry date is required");
        if (!cvv) throw new Error("cvv is required");
        if (!cardType) throw new Error("card type is required");
        const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        email = userData.email;
        const user = await User.findOne({ email });
        if (!user) throw new Error("Something went wrong");

        user.paymentInfo = {
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
            cardType: cardType,
        };
        const updateResult = await user.save();
        if (!updateResult) throw new Error("Something went wrong");
        res.json({
            message: "Payment information updated successfully!",
            data: updateResult,
            error: false,
            success: true,
        });
    } catch (error) {
        res.json({
            message: error.message || error,
            data: [],
            error: true,
            success: false,
        });
    }
}

module.exports = paymentOptionUpdateController;
