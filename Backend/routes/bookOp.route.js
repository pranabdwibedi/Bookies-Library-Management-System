
//controllers
import {
    addBookController,
    removeBookController,
    updateBookController,
    readBookInfoController,
    getBookCategories,
    getBookByType,
    getBookByName,
    getAllBookCategories,
} from "../controllers/book.controller.js";

//middlewares
import {
    addBookMW,
    deleteBookMW,
    updateBookMW,
    bookInfoMW,
    bookInfoByTypeMW,
    getByNameMW,
} from "../middlewares/bookOP.MW.js";
import { verifyToken, verifyAdmin } from "../middlewares/verify.MD.js";
const bookRouter = (app) => {
    app.post(
        "/LMS/api/v1/books/add",
        [verifyToken, addBookMW],
        addBookController
    );
    app.post(
        "/LMS/api/v1/books/remove",
        [verifyToken, verifyAdmin, deleteBookMW],
        removeBookController
    );
    app.post(
        "/LMS/api/v1/books/update",
        [verifyToken, verifyAdmin, updateBookMW],
        updateBookController
    );
    app.get(
        "/LMS/api/v1/books/bookInfo",
        [verifyToken, bookInfoMW],
        readBookInfoController
    );
    app.get("/LMS/api/v1/books/categories", [verifyToken], getBookCategories);
    app.get(
        "/LMS/api/v1/books/bookInfo/type",
        [verifyToken, bookInfoByTypeMW],
        getBookByType
    );
    app.get(
        "/LMS/api/v1/books/bookInfo/name",
        [verifyToken, getByNameMW],
        getBookByName
    );
    app.get(
        "/LMS/api/v1/books/bookCategories",
        [verifyToken, verifyAdmin],
        getAllBookCategories
    );
};
export default bookRouter;
