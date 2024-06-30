const User = require('../models/userSignUpModel');
const jwt = require('jsonwebtoken');

async function deleteUserController(req, res) {
  try {
    const token = req.cookies?.token; // Assuming token is sent via cookies
    if (!token) {
      throw new Error('User needs to be logged in');
    }

    // Verify JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decodedToken.id;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Delete user
    await User.findByIdAndDelete(userId);

    res.json({
      message: 'User deleted successfully',
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || 'Internal server error',
      error: true,
      success: false,
    });
  }
}

module.exports = deleteUserController;
