const mongoose = require('mongoose');
const dotenv = require('dotenv'); 
dotenv.config();

const connectDB = async ( )=>{
    try{
const conn = await mongoose.connect(process.env.URI,{
    useUnifiedTopology:true,
    useNewUrlParser: true
})
console.log('DB is connected');
    }
    catch(err){
        console.log('Error',err)
  process.exit();

    }
}


module.exports = connectDB;