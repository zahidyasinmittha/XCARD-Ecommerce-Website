const bcrypt = require("bcryptjs");
const User = require("../models/userSignUpModel");
const jwt = require("jsonwebtoken"); // Adjust path based on your project structure

async function updatePasswordController(req, res) {
  try {
    const token = req.cookies?.token;
    if (!token) throw new Error("User needs to login");
    const { currentPassword, newPassword } = req.body;

    // Verify the token and extract user email
    const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const email = userData.email;

    // Find the user by email in the database
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const check = await bcrypt.compare(currentPassword, user.password);
    if (!check) {
      throw new Error(
        "Your Current Password don't match"
      );
    }
    const check1 = await bcrypt.compare(newPassword, user.password);
    if (check1) {
      throw new Error(
        "Your new Password match with previous password"
      );
    }

    // Generate salt and hash the new password
    const salt = 10;
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;

    // Save updated user object
    const updateResult = await user.save();

    if (!updateResult) {
      throw new Error("Failed to update password");
    }

    // Respond with success message
    res.json({
      message: "Password updated successfully",
      data: updateResult,
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || "Password update failed",
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = updatePasswordController;
