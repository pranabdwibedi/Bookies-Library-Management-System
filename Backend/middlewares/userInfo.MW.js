import userModel from '../models/user.model.js'
const updatePasswordMW = (req,res,next) =>{
    const requestBody = req.body;
    if(!requestBody){
        return res.status(400).send({
            message : "The request body is not present"
        })
    }
    if(!requestBody.userId){
        return res.status(400).send({
            message : "The user ID is not present"
        })
    }
    if(!requestBody.password){
        return res.status(400).send({
            message : "The password is not present"
        })
    }
    if(!requestBody.newPassword){
        return res.status(400).send({
            message : "New password is not present in request"
        })
    }
    if(requestBody.newPassword.length < 5 || requestBody.newPassword.length > 20){
        return res.status(400).send({
            message : "The password length should be between 4 to 20"
        })
    }
    if(requestBody.newPassword.includes(' ')){
        return res.status(400).send({
            message : "Space is not allowed in the password"
        })
    }
    const splChars = ['%','^','&','<','>','(',')','{','}','[',']','|',';',':',',','.','/','\\']
    const checkArray = splChars.map(char=>{
        if(requestBody.newPassword.includes(char)){
            return true
        }
        return false
    })
    if(checkArray.includes(true)){
        return res.status(400).send({
            message : "The password contains some invalid characters"
        })
    }
    next()
}
const updateUserIdMW = async(req,res,next) =>{
    const requestBody = req.body;
    if(!requestBody){
        return res.status(400).send({
            message : "The request body is not present"
        })
    }
    if(!requestBody.userId){
        return res.status(400).send({
            message : "The user ID is not present"
        })
    }
    if(!requestBody.newUserId){
        
    }
    if(requestBody.newUserId.length < 5 || requestBody.newUserId.length > 40){
        return res.status(400).send({
            message : "The leangth of user Id should between 5 to 40"
        })
    }

    if((requestBody.newUserId).includes(' ')){
        return res.status(400).send({
            message : "Space is not valid in the user name please use '_' instead"
        })
    }
    const specialChar = ["!", "`", "@", "#", "$", "%", "^", "&", "*", "(", ")", "+", "=", "<", ",", "?", "/", ">", "?", "[", "]", "}", "{", "|", "\\", '"', "'", ":", ";", "~","-"];
    const numbers = ['1','2','3','4','5','6','7','8','9','0'];
    const isContainsChar = specialChar.map(char=>{
        if((requestBody.newUserId).indexOf(char) !== -1){
            return true
        }
        return false
    })
    const isContainsNumber = numbers.map(number=>{
        if(requestBody.newUserId.charAt(0) === number){
            return true
        }
        return false
    })
    if(isContainsNumber.includes(true)){
        return res.status(400).send({
            message : "The starting character should be a character"
        })
    }
    if(requestBody.newUserId.charAt(0) === '_'){
        return res.status(400).send({
            message : "The starting letter should be a character"
        })
    }
    if(isContainsChar.includes(true)){
        return res.status(400).send({
            message : "You have added a invalid character in the user ID"
        })
    }
    const user = await userModel.findOne({userId : requestBody.newUserId})
    if(user){
        return res.status(400).send({
            message : "The user Id is already present"
        })
    }
    next();
}
const updateUserDetailsMW = async (req,res,next) =>{
    const requestBody = req.body
    if(!requestBody){
        return res.status(400).send({
            message : "Request body is not present"
        })
    }
    if(!requestBody.userId){
        return res.status(400).send({
            message : "User ID is mendatory for updating user data"
        })
    }
    if(!requestBody.name && !requestBody.email && !requestBody.mobileNo){
        return res.status(400).send({
            message : "please mention what you want to update"
        })
    }
    next();
}
export {updatePasswordMW,updateUserIdMW,updateUserDetailsMW}