import {updatePassword,updateUserId,updatUserDetails,getUserInfo,getBorrowedBooks} from '../controllers/usersInfo.controller.js'
import {updatePasswordMW,updateUserIdMW,updateUserDetailsMW} from '../middlewares/userInfo.MW.js'
import { verifyToken, verifyAdmin} from "../middlewares/verify.MD.js";
const userRouter = (app) =>{
    app.get('/LMS/api/v1/user/userInfo', [verifyToken], getUserInfo);
    app.get('/LMS/api/v1/user/books/borrowed',[verifyToken],getBorrowedBooks)
    app.put('/LMS/api/v1/user/updatePW',[verifyToken,updatePasswordMW],updatePassword);
    app.put('/LMS/api/v1/user/updateUserID',[verifyToken,updateUserIdMW],updateUserId);
    app.put('/LMS/api/v1/user/updateDetails',[verifyToken,updateUserDetailsMW], updatUserDetails);
}
export default userRouter