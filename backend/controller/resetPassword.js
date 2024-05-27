const verificationCodeModel = require("../models/verificationCodeModel");
const User = require("../models/userSignUpModel");
const bcrypt = require("bcryptjs");

async function resetPasswordController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    const verificationCode = await verificationCodeModel.findOne({ email });
    if (!verificationCode)
      throw new Error("Verification code expired or not sent");

    if (verificationCode.isVerified) {
      throw new Error("Verification code is not verified");
    }

    const deleteResponse = await verificationCodeModel.deleteOne({
      email: email,
    });

    if (!deleteResponse.acknowledged) throw new Error("something went wrong");
    if (deleteResponse.deletedCount === 0) {
      throw new Error("Failed to delete verification code record");
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new Error("User does not exist");
    console.log(password)
    const check = await bcrypt.compare(password, existingUser.password);
    if (check) {
      throw new Error(
        "Entered the Previous Password! Try again after sometime"
      );
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (!hashedPassword) throw new Error("Something went wrong");

    const updatePassword = await User.updateOne(
      { email: email },
      { $set: { password: hashedPassword } }
    );

    if (!updatePassword.acknowledged) throw new Error("something went wrong");

    res.status(200).json({
      message: "Password reset successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message:
        error.message || "An error occurred while resetting the password",
      error: true,
      success: false,
    });
  }
}

module.exports = resetPasswordController;
