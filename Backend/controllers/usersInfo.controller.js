import bcrypt from 'bcryptjs'
import userModel from '../models/user.model.js'
const getUserInfo = async(req,res) =>{
    const query = req.query
    try{
        const user = await userModel.findOne({userId: query.userId});
        if(user){
            return res.status(200).send(user)
        }
        return res.status(400).send({
            message : "The user Id is not valid"
           })
    }catch(err){
        console.log(err)
        return res.status(500).send({
            message : "Internal error while fetching user details"
        })
    }
}
const updatePassword = async(req,res) =>{
    const requestBody = req.body;
    const user = await userModel.findOne({userId : requestBody.userId})
    const isCorrectPW = bcrypt.compareSync(requestBody.password,user.password);
    if(!isCorrectPW){
        return res.status(400).send({
            message : "The password is not correct"
        })
    }
    try{
        const newPassword = bcrypt.hashSync(requestBody.newPassword,8)
        await userModel.updateOne({userId : requestBody.userId},{password : newPassword})
        return res.status(200).send({
            message : "Password updated"
        })
    }catch(err){
        return res.status(500).send({
            message : "Internal error while updating password"
        })
    }
    
}
const updateUserId = async(req,res) => {
    const requestBody = req.body
    try{
        await userModel.updateOne({userId : requestBody.userId},{userId : requestBody.newUserId})
        return res.status(200).send({
            message : "User ID is updated successfully"
        })
    }catch(err){
        return res.status(500).send({
            message : "Internal error occured while updating userID"
        })
    }
}
const updatUserDetails = async(req,res) =>{
    const requestBody = req.body
    try{
        if(requestBody.name){
            await userModel.updateOne({userId : requestBody.userId},{name : requestBody.name})
        }
        if(requestBody.email){
            await userModel.updateOne({userId : requestBody.userId},{email : requestBody.email})
        }
        if(requestBody.mobileNo){
            await userModel.updateOne({userId : requestBody.userId},{mobileNo:requestBody.mobileNo})
        }
        return res.status(200).send({
            name : requestBody.name,
            email : requestBody.email,
            mobileNo : requestBody.mobileNo,
            message : "User details updated successfully"
        })
    }catch(err){
        return res.status(500).send({
            message : "Internal error while updating user details"
        })
    }
    
}
export {getUserInfo,updatePassword,updateUserId,updatUserDetails};