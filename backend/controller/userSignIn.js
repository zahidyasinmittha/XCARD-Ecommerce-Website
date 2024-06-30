const User = require('../models/userSignUpModel')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');


async function userSignInController(req,res){
    try{
        const {email,password} = req.body;
        if(!email) throw new Error("Email is required");
        if(!password) throw new Error("Password is required");
        const existingUser = await User.findOne({email});
        if(!existingUser) throw new Error('User does not exist');
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect) throw new Error('Invalid Password');
        
        const userData = {
            id: existingUser._id,
            email: existingUser.email,
        }
        const token = jwt.sign(userData , process.env.JWT_SECRET_KEY,{expiresIn:'7d'});
        const tokenOptions = {
            httpOnly: true,
            secure: true
        }

        const updateResult = await User.updateOne({ email: email },
            { $set: { isLogedIn: true } })
        if (!updateResult.acknowledged) throw new Error("something went wrong");
        
        res.cookie('isLogedIn', true)
        
        res.cookie("token", token, tokenOptions).status(200).json({
            message: `${existingUser.name} has Loged in successfully`,
            data : token,
            success: true,
            error: false,
        });
    }catch(error){
        res.json({
            message: error.message || error,
            status: 500,
            error: true,
            success: false,
          });
    }
}
module.exports = userSignInController;