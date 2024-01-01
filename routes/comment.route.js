const express =require('express');
const {createComment,readComment,updateComment} =require('../controllers/createComment');

// creating cusotm route;
const commentRoute =express.Router();

commentRoute.post('/create',createComment);
commentRoute.post('/read',readComment);
commentRoute.post('/update',updateComment);

module.exports =commentRoute;

