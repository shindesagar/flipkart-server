const UserModel = require('../models/userSchema.model');
// User model : register and login;
const RegisterUser = async (req, res) => {
    // registration logic 
    try {
        const { email, password, username } = req.body;
        const insertedData = await UserModel.create({
            email,
            password,
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
    // login logic
    // step 1 : take all the credential from req.body from the user.
    // Step 2 : use email , to check if that user with this email is there in db;
    // step 3 : if user is there , check his password if it matching with the stored password;;
    // step 4 : if email is there and password also matches : user is logged in.
    // Step 5 : if user is not there; "no user found !","Please register with us"
    // const ifUser = await UserModel.find({ email: email });
    // console.log(ifUser);
    // if (ifUser.length < 1) {
    //   return res.json({
    //     message: `User with this ${email} is not found !`,
    //   });
    // }
    // if (ifUser[0].password === password) {
    //   return res.json({
    //     message: `User with  ${email} has been logged in`,
    //   });
    // }
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

    if (ifUser.password == password) {
        return res.json({
            message: `User with ${email} has been logged in`
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