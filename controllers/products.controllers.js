const productModel = require('../models/productSchema.model');
const UserModel = require('../models/userSchema.model');
// Method of mongoose;
//save(),create(),findOne(),find(),findByIdAndUpdate();
//take info from body and params of request object;
const getProduct = async(req,res)=>{
    try{
        const data = await productModel.find();
        if(data.length >= 1){
            return res.json({count:data.length,data})
        }
        res.json({
            message:"No data Found",

        })
    }catch(err){
        res.json({
            message:err.message
        })
    }
}
//Adding new product
const createProduct = async(req,res)=>{
    try{
        const {productname,category,productdetails,price,rating,productImage,brand,discountPercentage} = req.body;
        const userid =req.userId;
        console.log(userid,"user id coming from req.userid of jwtoken");
        const isUser =await UserModel.findById(userid);
        if(isUser){
            const  insertProductProduct= await productModel.create({
                productname,
                category,
                productdetails,
                price,
                rating,
                productImage,
                brand,
                discountPercentage
            });
            res.status(200).json({
                message:"Product Added Successfully",
                insertProductProduct
            })
        }
        res.status(404).json({
            message:"User does not exist to add the the product"
        })
    }catch(error){
        res.status(404).json({
            message:error.message
        })
    }
}
//Update Product ById
const productUpdateById = async(req,res)=>{
    try{
        const {id} = req.params;
        console.log(req.params)
        const {productdetails,price,productImage} = req.body;
        const  updatedProductProduct= await productModel.findByIdAndUpdate(id,{$set :{
            productdetails:productdetails,
            price:price,
            productImage:productImage,
        }},{new:true});
        res.status(201).json({
            message:"Product Updated Successfully",
            updatedProductProduct
        })
    }catch(error){
        res.status(404).json({
            message:error.message
        })
    }
}
const productDeleteById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productModel.findOneAndDelete({ _id: id });

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.status(201).json({
            message: "Product Deleted Successfully",
            deletedProduct
        });

    } catch (error) {
        console.error(error.message);
        
    }
}
const filterProduct = async (req, res) => {
    try {
        const { minprice,maxprice } = req.query;
        // const filterProduct = await productModel.find({price:{$lte:price}})
        // const filterProduct = await productModel.find({price:{$gte:price}})
        const filterProduct = await productModel.find({price:{$gte:minprice,$lte:maxprice}})
        res.status(200).json({
            filterProduct
        });
    } catch (error) {
        console.error(error.message);
        res.status(404).json({
            message:error.message
        });
    }
}
module.exports={
    createProduct,
    productUpdateById,
    productDeleteById,
    filterProduct,
    getProduct
};