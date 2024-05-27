
async function logoutUserControllser(req, res){
    try{
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