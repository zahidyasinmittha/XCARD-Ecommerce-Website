const User = require("../models/userSignUpModel")
async function userDetailController(req,res){
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user) throw new Error("Something went wrong")
        res.status(200).json({
            message: `${user.name} has Loged in successfully`,
            data: user,
            error: false,
            success: true,
          });
    }catch(error){
        res.json({
            message: error.message || error,
            data: [],
            error: true,
            success: false,
          });
    }
}
module.exports = userDetailController;