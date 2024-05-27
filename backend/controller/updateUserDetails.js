const jwt = require("jsonwebtoken");
const User = require("../models/userSignUpModel");
const verificationCodeModel = require("../models/verificationCodeModel");

async function updateUserBasicDetailsController(req, res, next) {
  try {
    const { name, location, email, phoneNumber, gender } = req.body;
    const id = req.user.id;
    const preemail = req.user.email;
    if (!name) throw new Error("name is required");
    if (!email) throw new Error("Email is required");
    const codesend = await verificationCodeModel.findOne({ email });
    console.log(codesend)
    if (preemail != email && !codesend) {
      res.json({
        message: "Email is Unverified",
        codeSend: false,
        error: true,
        success: false,
      });
    } else{
        if(!codesend?.isvarified)
            throw new Error("verification code is unvarified")
      try {
        const updatedUser = await User.findByIdAndUpdate(
          id,
          {
            name,
            location,
            email,
            phoneNumber,
            gender,
          },
          { new: true }
        );
        if (!updatedUser) {
          throw new Error("User not found");
        }
        const token = jwt.sign(
          { id: updatedUser._id, email: updatedUser.email },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "7d" }
        );
        const tokenOptions = {
          httpOnly: true,
          secure: true,
        };
        res.cookie("token", token, tokenOptions).json({
          message: "User details updated successfully",
          data: updatedUser,
          error: false,
          success: true,
        });
      } catch (error) {
        throw new Error("something went wrong");
      }
    }
  } catch (error) {
    res.json({
      message: error.message || error,
      codeSend: false,
      error: true,
      success: false,
    });
  }
}

module.exports = updateUserBasicDetailsController;
