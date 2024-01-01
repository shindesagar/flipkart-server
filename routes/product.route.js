const express =require('express');
const {createProduct,productUpdateById,productDeleteById,filterProduct,getProduct} =require('../controllers/products.controllers')
const jwtHandler =require('../utils/jwthandler')
// creating cusotm route;
const productsRoute =express.Router();

productsRoute.post('/add',jwtHandler,createProduct);
productsRoute.post('/update/:id',jwtHandler,productUpdateById);
productsRoute.post('/delete/:id',jwtHandler,productDeleteById);
productsRoute.post('/product/filter',jwtHandler,filterProduct);
productsRoute.get('/getInfo',jwtHandler,getProduct)

module.exports =productsRoute;