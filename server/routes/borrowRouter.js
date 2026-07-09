import express from "express"
import {
    borrowedBooks,
    getBorrowedBooksForAdmin,
    recordBorrowedBook,
    returnBorrowBook,
    payFine,
} from "../controllers/borrowControllers.js"

import{
    isAuthenticated,
    isAuthorized,
} from "../middlewares/authMiddleware.js"




const router = express.Router();

router.post("/record-borrow-book/:bookId",isAuthenticated,isAuthorized("Admin", "User"),recordBorrowedBook);

router.get("/borrowed-books-by-users",isAuthenticated,isAuthorized("Admin"),getBorrowedBooksForAdmin)

router.get("/my-borrowed-books",isAuthenticated,borrowedBooks);

router.put("/return-borrowed-book/:bookId",
    isAuthenticated,
    isAuthorized("Admin", "User"),
    returnBorrowBook
)

router.post("/pay-fine/:bookId",
    isAuthenticated,
    isAuthorized("Admin", "User"),
    payFine
)

export default router;