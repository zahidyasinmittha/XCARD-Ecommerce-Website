const bcrypt = require("bcryptjs");
const User = require("../models/userSignUpModel");

async function userSignUpController(req, res) {
  try {
    const { name, email, password  } = req.body;
    if (!name) throw new Error("name is required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("password is required");

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User Already Exist')

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    if (!hashedPassword) throw new Error("Something Went Wrong");
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    newUser.save();
    res.status(201).json({
      message: "User Created Successfully",
      status: 201,
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      status: 500,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
