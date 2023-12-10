const express =require('express');
const {RegisterUser,LoginUser,userUpdateById} =require('../controllers/user.controllers')

// creating cusotm route;
const UserRoute =express.Router();

UserRoute.post('/register',RegisterUser);
UserRoute.post('/login',LoginUser);
UserRoute.post('/user/:id',userUpdateById);


module.exports =UserRoute;