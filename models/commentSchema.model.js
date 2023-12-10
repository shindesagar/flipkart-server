const mongoose = require("mongoose");
const { Schema } = mongoose;
const commentSchema = new Schema({
    commentMsg:{
        type:String,
        required:true
    },
    userId:{
        //referencing
        type: mongoose.Schema.Types.ObjectId,
        ref:'FlipkartUser',
        require: true,
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'FlipkartProducts',
        require: true,
    }
})
const commentModel = mongoose.model("flipkartProductComment", commentSchema);
module.exports = commentModel;