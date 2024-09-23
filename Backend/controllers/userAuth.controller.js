import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'
import authConfig from '../configs/auth.config.js'
const userRegController = async (req,res)=>{
    //read data from the request body
    const requestBody = req.body
    const userToRegister = {
        name : requestBody.name,
        userId : requestBody.userId,
        password : bcrypt.hashSync(requestBody.password,8),
        email : requestBody.email,
        mobileNo : requestBody.mobileNo
    }
    if(requestBody.userType){
        userToRegister.userType = requestBody.userType
    }

    try{
        //now registering the user
        const user = await userModel.create(userToRegister)
        const resUser = {
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType
        }
        return res.status(201).send({
            message : "Account created successfully"
        });
    }
    catch(err){
        return res.status(500).send({
            message : "Internal Error occured"
        })
    }
}

const loginController = async(req,res) =>{
    const requestBody = req.body
    const user = await userModel.findOne({userId : requestBody.userId})
    if(!user){
        return res.status(400).send({
            message : "The user Id is not valid"
        })
    }
    const isCorrectPW = bcrypt.compareSync(requestBody.password,user.password)
    if(!isCorrectPW){
        return res.status(400).send({
            message : "The password is incorrect"
        })
    }
    const token = jwt.sign({id : user.userId},authConfig.SECRET,{expiresIn : '1h'})
    res.status(200).send({
        token : token,
        userType : user.userType,
        userId : user.userId,
        name : user.name,
        mobileNo : user.mobileNo,
        email : user.email
    })
}

export {userRegController,loginController};