
const mongoose = require("mongoose");
// Problem statement for E-commerce(Flipkart)
// Product, Userdetails, Order, Wishlist
const { Schema } = mongoose;
const UserdetailSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
    minlength: 5,
    maxlength: 10,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    // pattern: include @ : regular expression;
    validate: {
      validator: function (value) {
        //logic
        return;
      },
      message: "Password should be greater than 7 characters",
    },
    trim: true, // remove space
    lowercase: true,
  },
  password: {
    type: String,
    // minlength: 8,
    // maxlength: 12,
    require: true,
    // pattern: custom validation
    //we want to check whether password length is greater than 8
    validate: {
      validator: function (value) {
        return value.length > 7;
      },
      message: "Password should be greater than 7 characters",
    },
  },
});
const UserModel = mongoose.model("FlipkartUser", UserdetailSchema);
module.exports = UserModel;