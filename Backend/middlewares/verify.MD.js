
import jwt from 'jsonwebtoken'
import authConfig from '../configs/auth.config.js'
import userModel from '../models/user.model.js'
const verifyToken = (req,res,next)=>{
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(400).send({
            message : "Token is not present in the request"
        })
    }
    jwt.verify(token,authConfig.SECRET, async(err,decoded)=>{
        if(err){
            return res.status(400).send({
                message : "The token is not valid"
            })
        }
        const user = await userModel.findOne({userId : decoded.id})
        if(!user){
            return res.status(400).send({
                message : "The user is not a valid user"
            })
        }
        
        next()
    })
}

const verifyAdmin = (req,res,next) =>{
    const token = req.headers['x-access-token']
    jwt.verify(token,authConfig.SECRET,async (err,decodded)=>{
    const user = await userModel.findOne({userId : decodded.id})
        if(user.userType !== "ADMIN"){
            return res.status(400).send({
                message : "Only Admins allowed operation"
            })
        } 
        next()   
    })
}
const verifyCustomer = (req,res,next) =>{
    const token = req.headers['x-access-token']
    jwt.verify(token,authConfig.SECRET,async (err,decodded)=>{
    const user = await userModel.findOne({userId : decodded.id})
        if(user.userType !== "CUSTOMER"){
            return res.status(400).send({
                message : "Only customer allowed operation"
            })
        } 
        next()   
    })
}


export {verifyToken,verifyAdmin,verifyCustomer}