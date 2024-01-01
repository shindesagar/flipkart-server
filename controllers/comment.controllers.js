const commentModel = require('../models/commentSchema.model');

//api endpoint creating comment
const createComment= async(req,res)=>{
    try{
        const {commentMsg,userId,productId} = req.body;
        const createComment =  await commentModel.create({
            commentMsg,
            userId,
            productId 
        })
        res.status(200).json({
            message:"Comment added successfully",
            createComment
        })
    }catch(error){
        res.status(404).json({
            message:error.message
        })
    }
    
}

const readComment = async(req,res)=>{
    try{
        
        const allcomment =  await commentModel.find().populate('userId').populate('productId')
        res.status(200).json({
            message:"All product",
            allcomment
        })
    }catch(error){
        res.status(404).json({
            message:error.message
        })
    }
    
}

const updateComment = async(req,res)=>{
    try{
        const {commentMsg,productId,userId} = req.body
        const updateComment = await commentModel.updateOne({
            commentMsg,
            productId,
            userId
        });
        res.status(200).json({
          message:"Comment Update successfully",
          updateComment
        })
    }catch(error){
        res.status(404).json({
            message:error.message
        })
    }
    
}

module.exports={
    createComment,
    readComment,
    updateComment
};