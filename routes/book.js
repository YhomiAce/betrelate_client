const express = require("express");
const router = express.Router();
const BookController = require("../controllers/BookControllers");
const {
    validate,
    bookLoanRequestValidation,
    catalogueRequestValidation,
    userEnrollmentRequestValidation
} = require("../helpers/validator");

router.route("/enroll/user")
    .post(userEnrollmentRequestValidation(), validate, BookController.enrollUser);

router.route("/enrolled/users").get(BookController.getAllEnrolledUsers);

router.route("/books").get(BookController.getAllBooks);

router.route("/books/borrow").get(BookController.getAllBorrowedBooks);

router.route("/users/books/borrow").get(BookController.getAllUsersWithBorrowedBooks);

router.route("/books/borrow")
    .post(bookLoanRequestValidation(), validate, BookController.borrowBooks);



module.exports = router;