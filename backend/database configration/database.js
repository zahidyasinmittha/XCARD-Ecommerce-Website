const mongoose = require("mongoose");

async function DatabaseConnection(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
    }
    catch(err){
        console.log(err)
    }
}
module.exports = DatabaseConnection