import {addTransactionController,deleteTransactionController, getAllorrowersController, getTransactionInfo} from "../controllers/transaction.controller.js"
import { verifyAdmin, verifyToken } from "../middlewares/verify.MD.js";
import { addTransactionMW, getTransactionMW, removeTransactionMW} from "../middlewares/transaction.MW.js";
const transactionRoutes = (app)=>{
    app.post('/LMS/api/v1/transaction/new',[verifyToken,verifyAdmin,addTransactionMW],addTransactionController);
    app.delete('/LMS/api/v1/transaction/remove',[verifyToken,verifyAdmin, removeTransactionMW],deleteTransactionController);
    app.get('/LMS/api/v1/transaction/getInfo',[verifyToken,verifyAdmin,getTransactionMW],getTransactionInfo)
    app.get('/LMS/api/v1/transaction/all',[verifyToken, verifyAdmin], getAllorrowersController)
}
export default transactionRoutes;