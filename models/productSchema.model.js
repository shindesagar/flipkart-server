
const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductSchema = new Schema({
    productname: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    productdetails: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    productQuantity: {
      type: Number,
      require: true,
      default: 10,
    },
    productImage: {
      type: String,
    },
    rating: {
      type: Number,
    },
    productImage:{
        type:String
    },
    brand: {
        type: String
    },
    discountPercentage:{
        type: Number
    }
  },{
      timestamps:true
  });
  const productModel = mongoose.model("FlipkartProducts", ProductSchema);
  module.exports = productModel;