import {userRegController,loginController} from '../controllers/userAuth.controller.js'
import {userRegisterMW,userLoginMW} from '../middlewares/userAuth.MW.js'
const authRouter = (app)=>{
    app.post('/LMS/api/v1/users/signup', [userRegisterMW],userRegController)
    app.post('/LMS/api/v1/users/login',[userLoginMW],loginController)
}
export default authRouter;