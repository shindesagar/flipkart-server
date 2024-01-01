const UserModel = require('../models/userSchema.model');
const bcryptPassword = require('../utils/bcryptPassword')
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken')
// User model : register and login;
const RegisterUser = async (req, res) => {
    // registration logic 
    try {
        const { email, password, username } = req.body;
        const hashedPassword = await bcryptPassword(password);
        console.log(hashedPassword);
        const insertedData = await UserModel.create({
            email,
            password: hashedPassword,
            username
        })

        res.json({
            message: "data inserted successfully",
            insertedData
        })


    } catch (error) {
        console.log(error.message);
        res.json({
            message: error.message
        })
    }

}
//Authentication : Validate if user exist in the DB or not;
// Authorisation : token;
const LoginUser=async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        return res.json({
            message: "Please enter all your credentails"
        })
    }

    const ifUser = await UserModel.findOne({ email: email });
     if (!ifUser) {
        return res.json({
            message: `User with this ${email} is not found !`
        })
    }

    // if (ifUser.password == password) {
    //     return res.json({
    //         message: `User with ${email} has been logged in`
    //     })
    // }
    const ismatchedPassword = await bcrypt.compare(password, ifUser.password);
    if (ismatchedPassword) {
        const token = jwt.sign({
            data: ifUser._id
        }, process.env.JWT_SECRETKEY, { expiresIn: '1h' });
      return  res.json({
            message: `User is loggedin`,
            token
        })
    }

    res.json({
        message: `User is not able to login due to wrong password`
    })
}
//api endpoint to update  the username of user based on userid:
const userUpdateById = async(req,res)=>{
    //req.parems
    const {id} = req.params;
    const {username} = req.body
    const userUpdate = await UserModel.findByIdAndUpdate(id,{username:username},{new:true});
    res.json({
        message:"User Updated Successfully",
        userUpdate
    })
}
module.exports={
    LoginUser,
    RegisterUser,
    userUpdateById
};