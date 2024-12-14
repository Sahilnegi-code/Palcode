const mongoose = require('mongoose');
const bcrypt =  require('bcryptjs')

const userSchema = new mongoose.Schema(
{
    
    name : {
        type : String,
        required:true
    },
    
    email : {
        type : String,
        required:true,
        unique:true
    },
    pic:{
    type:String,
    required: true,
    default: "https://wallpaperaccess.com/full/2213426.jpg"
}
     
    },
    {
        timestamps:true
    }
    );
 
  const user = mongoose.model("social-logins", userSchema);
  module.exports = user;
  