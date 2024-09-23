import {updatePassword,updateUserId,updatUserDetails,getUserInfo} from '../controllers/usersInfo.controller.js'
import {updatePasswordMW,updateUserIdMW,updateUserDetailsMW} from '../middlewares/userInfo.MW.js'
import { verifyToken, verifyAdmin} from "../middlewares/verify.MD.js";
const userRouter = (app) =>{
    app.get('/LMS/api/v1/user/userInfo', [verifyToken], getUserInfo);
    app.post('/LMS/api/v1/user/updatePW',[verifyToken,updatePasswordMW],updatePassword);
    app.post('/LMS/api/v1/user/updateUserID',[verifyToken,updateUserIdMW],updateUserId);
    app.post('/LMS/api/v1/user/updateDetails',[verifyToken,updateUserDetailsMW], updatUserDetails);
}
export default userRouter