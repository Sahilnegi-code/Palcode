const mongoose = require('mongoose');

const layoutSchema = new mongoose.Schema(
{
    email:{
        type:String,
        require:true
    },
    structure:{
        type:String,
        require:true
    }

},
    {
        timestamps:true
    }
    );
 
  const LayoutSchema = mongoose.model("LayoutSchema", layoutSchema);
  module.exports = LayoutSchema;
  