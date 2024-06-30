const User = require("../models/userSignUpModel");
const jwt = require("jsonwebtoken");


async function becomeSellerController(req, res) {
  try {
    const token = req.cookies?.token;
    if (!token) throw new Error("User need to login");

    const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    _id = userData.id;
    const updatedUser = await User.findByIdAndUpdate(
        _id,
      { role: 'seller' },
      { new: true } // To return the updated document
    );

    if (!updatedUser) {
      throw new Error('User not found or unable to update role');
    }

    res.json({
      message: 'Successfully updated role to seller',
      data: updatedUser,
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || 'Failed to update role to seller',
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = becomeSellerController;
