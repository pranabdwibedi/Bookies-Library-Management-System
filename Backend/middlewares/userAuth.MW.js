import userModel from '../models/user.model.js'
import authConfig from '../configs/auth.config.js'
const userRegisterMW = async(req,res,next) =>{
    //reading the data from the request body
    const requestBody = req.body
    try{
        if(!requestBody){
            return res.status(400).send({
                message : "Request body is missing"
            })
        }
        if(!requestBody.name){
            return res.status(400).send({
                message : "Name is mendatory"
            })
        }
        if(!requestBody.userId){
            return res.status(400).send({
                message : "user ID is mendatory"
            })
        }
        if(!requestBody.email){
            return res.status(400).send({
                message : "Email is mendatory"
            })
        }
        if(!requestBody.mobileNo){
            return res.status(400).send({
                message : "Mobile number is mendatory"
            })
        }
        if(!requestBody.password){
            return res.status(400).send({
                message : "Password is mendatory"
            })
        }
        if(requestBody.password.length < 5 || requestBody.password.length > 20){
            return res.status(400).send({
                message : "The password length should be between 4 to 20"
            })
        }
        if(requestBody.password.includes(' ')){
            return res.status(400).send({
                message : "Space is not allowed in the password"
            })
        }
        const splChars = ['%','^','&','<','>','(',')','{','}','[',']','|',';',':',',','.','/','\\']
        const checkArray = splChars.map(char=>{
            if(requestBody.password.includes(char)){
                return true
            }
            return false
        })
        if(checkArray.includes(true)){
            return res.status(400).send({
                message : "The password contains some invalid characters"
            })
        }
        if((requestBody.userId).indexOf(' ') !== -1){
            return res.status(400).send({
                message : "space is not allowed in user ID"
            })
        }
        const specialChar = ["!", "`", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "=", "<", ",", "?", "/", ">", "?", "[", "]", "}", "{", "|", "\\", '"', "'", ":", ";", "~","-"];
        const numbers = ['1','2','3','4','5','6','7','8','9','0'];
        const isContainsChar = specialChar.map(char=>{
            if((requestBody.userId).indexOf(char) !== -1){
                return true
            }
            return false
        })
        const isContainsNumber = numbers.map(number=>{
            if(requestBody.userId.charAt(0) === number){
                return true
            }
            return false
        })
        if(isContainsNumber.includes(true)){
            return res.status(400).send({
                message : "The starting character should be a character"
            })
        }
        if(requestBody.userId.charAt(0) === '_'){
            return res.status(400).send({
                message : "The starting letter should be a character"
            })
        }
        if(isContainsChar.includes(true)){
            return res.status(400).send({
                message : "You have added a invalid character in the user ID"
            })
        }

        if(requestBody.mobileNo){
            const mobNo = String(requestBody.mobileNo)
            const regEx = /^[6-9]\d{9}$/
            if(!regEx.test(mobNo)){
                res.status(400).send({
                    message : "Enter a valid moile number"
                })
            }
        }

        if(requestBody.userType){
            if(requestBody.adminSecret !== authConfig.ADMIN_SECRET){
                res.status(400).send({
                    message : "The Secret code is invalid"
                })
            }
        }

        let user =await userModel.findOne({userId : requestBody.userId})
        if(user){
            return res.status(400).send({
                message : "User Id is already present"
            })
        }
        user =await userModel.findOne({email : requestBody.email})
        if(user){
            return res.status(400).send({
                message : "email Id is already present"
            })
        }
        user =await userModel.findOne({mobileNo : requestBody.mobileNo})
        if(user){
            return res.status(400).send({
                message : "Mobile number is already present"
            })
        }
        next();
    }catch(err){
        return res.status(500).send({
            message : "Error while validating user"
        })
    }
}

const userLoginMW = async(req,res,next)=>{
    const requestBody = req.body
    if(!requestBody.userId){
        return res.status(400).send({
            message : "The userId is mendatory"
        })
    }
    if(!requestBody.password){
        return res.status(400).send({
            message : "The password is mendatory"
        })
    }
    next()
}
export {userRegisterMW,userLoginMW}