// Importing necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
const app = express();
app.use(express.json()); //Mounting middleware (app.use is mount function to load middleware)
const port = 5000;


app.use(cors());
// We need tp parse  req body in json format

app.get("/", function (req, res) {
  res.send(
    "This is CRUD Operations and Authentication in Express using MongoDB : Course 12: Express and MongoDB"
  );
});
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error.message);
  }
}
connectToDB();



const UserRoute =require('./routes/user.route');
const productsRoute =require('./routes/product.route');

app.use('/user',UserRoute);
app.use('/product',productsRoute);
app.use('/comment',productsRoute);

app.use('*',(req,res,next)=>{
  const error = new Error('The route does not exit')
  next(error)
})
app.use((err,req,res,next)=>{
  res.status(404).json({
    message: err.message
  })
})
app.listen(port, () => {
  console.log("Server is running port number", port);
});


//Index.js -> routes -> controllers -> models


