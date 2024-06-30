const jwt = require("jsonwebtoken");
const User = require("../models/userSignUpModel");

async function authenticationToken(req, res, next) {
  let email;
  try {
    const token = req.cookies?.token;
    if (!token) throw new Error("User need to login");
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      email = userData.email;
      const user = await User.findOne({ email });
      if (!user) throw new Error("User need to login");
      if (!user.isLogedIn) throw new Error("User need to login");
      req.user = userData;
    } catch (error) {
      const updateResult = await User.updateOne(
        { email: email },
        { $set: { isLogedIn: false } }
      );
      res.cookie('isLogedIn', false)
      if (!updateResult.acknowledged) throw new Error("something went wrong");
      throw new Error("user need to login session expired");
    }
    next();
  } catch (error) {
    res.json({
      message: error.message || error,
      data: [],
      error: true,
      success: false,
    });
  }
}
module.exports = authenticationToken;

