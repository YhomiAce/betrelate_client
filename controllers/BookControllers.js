const moment = require("moment");
var ObjectId = require('mongoose').Types.ObjectId; 
const BookService = require("../services/BookService");
const Service = require("../services/services")

exports.enrollUser = async (req, res, next) => {
    try {
        const user = await BookService.addUser(req.body);
        return res.status(201).send({
            status: true,
            message: "User enrolled sucessfully",
            data: user
        })
    } catch (error) {
        return next(error);
    }
}

exports.getAllEnrolledUsers = async (req, res, next) => {
    try {
        const users = await BookService.getAllUsers();
        return res.status(201).send({
            status: true,
            message: "Enrolled users returned successfully",
            data: users
        })
    } catch (error) {
        return next(error);
    }
}

exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Service.Book.getAllBooks();
        return res.status(201).send({
            status: true,
            message: "All books returned successfully",
            data: books
        })
    } catch (error) {
        return next(error);
    }
}

exports.getAllBorrowedBooks = async (req, res, next) => {
    try {
        const books = await BookService.getAllBookBorrowed();
        const data = await Promise.all(
            books.map(async bookData =>{
                const book = await Service.Book.findBookById(bookData.bookId);
                return {
                    book:book.data,
                    borrowedDetails: bookData,
                    availableDay: bookData.dateToReturn
                }
            })
        )
        return res.status(201).send({
            status: true,
            message: "All books returned successfully",
            data
        })
    } catch (error) {
        return next(error);
    }
}

exports.getAllUsersWithBorrowedBooks = async (req, res, next) => {
    try {
        const users = await BookService.getAllUsers();
        const data = await Promise.all(
            users.map(async user =>{
                const where = {
                    user: ObjectId(user.id)
                }
                console.log(where);
                const borrowedBook = await BookService.getAllBookBorrowedWithCondition(where)
            })
        )
        return res.status(201).send({
            status: true,
            message: "All books returned successfully",
            data
        })
    } catch (error) {
        return next(error);
    }
}

exports.borrowBooks = async (req, res, next) => {
    try {
        const { books, userId } = req.body;
        const borrowedData = await Promise.all(
            books.map(async bookData => {
                const book = await Service.Book.findBookById(bookData.bookId);
                if (book.data == null || book.data.status === "unavailable") {
                    return {
                        book: book.data,
                        message: "This book is not available right now"
                    };
                }
                const dateToReturn = moment().add(bookData.noOfDaysBorrowed, "days");
                const data = {
                    bookId: bookData.bookId,
                    user: userId,
                    noOfDaysBorrowed: bookData.noOfDaysBorrowed,
                    dateToReturn
                };
                const borrowed = await BookService.borrowBook(data);
                const payload = {
                    status: "unavailable"
                }
                await Service.Book.updateBookAvailability(bookData.bookId, payload)
                return {
                    borrowed,
                    book: book.data
                }
            })
        )

        return res.status(201).send({
            status: true,
            message: "Books borrowed",
            data: borrowedData
        })
    } catch (error) {
        return next(error);
    }
}