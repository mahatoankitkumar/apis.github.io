const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const productSchema = new mongoose.Schema({
  product_name : {
    type : String,
    unique : true,
    uniqueCaseInsensitive : true,
    required : true,
  },
  description : {
    type : String,
    required : true,
  },
  price : {
    type : Number,
    required : true
  },
  created_at : {
    type : Date,
    default : Date.now(),
  },
  updated_at : {
    type : Date,
    default : Date.now(),
  },
  updated_by : {
    type : String,
    required : true,
  },
  rating : {
    type : Number
  },
});

productSchema.plugin(uniqueValidator,{message :` {VALUE} already exists.`});

module.exports = mongoose.model("Product", productSchema);