const jwt = require("jsonwebtoken");

async function authenticationToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) throw new Error("User need to login");
    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = userData;
    } catch (error) {
        throw new Error("user need to login session expired")
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
