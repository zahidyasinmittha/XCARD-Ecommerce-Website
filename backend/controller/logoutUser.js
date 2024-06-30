const User = require('../models/userSignUpModel')
const jwt = require("jsonwebtoken");

async function logoutUserControllser(req, res){
    try{
        const token = req.cookies?.token;
        if (!token) throw new Error("User need to login");
        const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { email } = userData;
        const updateResult = await User.updateOne({ email: email },
            { $set: { isLogedIn: false } })
            res.cookie('isLogedIn', false)
        if (!updateResult.acknowledged) throw new Error("something went wrong");
        res.clearCookie('token');
        res.status(200).json({
            message: `User has Loged out successfully`,
            error: false,
            success: true,
          });
    }catch(error){
        res.json({
            message: error.message || error,
            error: true,
            success: false,
          });
    }
}
module.exports = logoutUserControllser;