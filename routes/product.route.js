const express =require('express');
const {createProduct,productUpdateById,productDeleteById,filterProduct,getProduct} =require('../controllers/products.controllers')

// creating cusotm route;
const productsRoute =express.Router();

productsRoute.post('/add',createProduct);
productsRoute.post('/update/:id',productUpdateById);
productsRoute.post('/delete/:id',productDeleteById);
productsRoute.post('/product/filter',filterProduct);
productsRoute.get('/getInfo',getProduct)

module.exports =productsRoute;