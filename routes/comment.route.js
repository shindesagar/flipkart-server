const express =require('express');
const {createComment} =require('../controllers/createComment');

// creating cusotm route;
const commentRoute =express.Router();

commentRoute.post('/create',createComment);
commentRoute.post('/read',createComment);

module.exports =commentRoute;

