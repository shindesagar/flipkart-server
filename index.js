// Importing necessary modules
const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
// We need tp parse  req body in json format
app.use(express.json());
app.get("/", function (req, res) {
  res.send(
    "This is CRUD Operations and Authentication in Express using MongoDB : Course 12: Express and MongoDB"
  );
});
async function connectToDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://sagarshinde9109:Shaarvi%40210923@hatch.i6rxvdn.mongodb.net/flipcartDB"
    );
  } catch (error) {
    console.log(error.message);
  }
}
connectToDB();




//Update
// app.post('/product/update/:id',)
//Delete
// app.post('/product/delete/:id', );

//Make endpoint to filter the data of product based on price;
// see product price less than qual to 35000
// see product price less than qual to what user is providing the price;
// how to work with req.query

//$lte = less than equal to
//$gte = greater than equal to
//$eq: equal to 
// app.post('/product/filter', async (req, res) => {
//     try {
//         const { price } = req.query;
//         // const filterProduct = await productModel.find({price:{$lte:price}})
//         // const filterProduct = await productModel.find({price:{$gte:price}})
//         const filterProduct = await productModel.find({price:{$eq:price}})
//         res.status(200).json({
//             filterProduct
//         });
//     } catch (error) {
//         console.error(error.message);
//         res.status(404).json({
//             message:error.message
//         });
//     }
// });
//minPrice and maxPrice
// app.post('/product/filter', );

//api endpoint creating comment
// app.post('/comment/create', async(req,res)=>{
//     try{
//         const {commentMsg,userId,productId} = req.body;
//         const createComment =  await commentModel.create({
//             commentMsg,
//             userId,
//             productId 
//         })
//         res.status(200).json({
//             message:"Comment added successfully",
//             createComment
//         })
//     }catch(error){
//         res.status(404).json({
//             message:error.message
//         })
//     }
    
// })

app.get('/comment/read', async(req,res)=>{
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
    
})
app.post('/comment/update', async(req,res)=>{
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
    
})
app.listen(port, () => {
  console.log("Server is running port number", port);
});


//Model, View, and controller structure;
//MVCR : routes
// Model: Schema and model defination in DB;
//Controller: callback function which handles req and res object for apartivular
//View: Rendering HTML /UI template from your server.

//main pointer:
// Modularity and folder structure and more readable codes.


const UserRoute =require('./routes/user.route');
const productsRoute =require('./routes/product.route');
app.use('/user',UserRoute);
app.use('/product',productsRoute);
app.use('/comment',productsRoute);

//Index.js -> routes -> controllers -> models


//count:10,
//data:[{},{}]

