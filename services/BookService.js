const User = require("../models/User");
const BorrowedBook = require("../models/BorrowedBook");

exports.addUser = async (data) => {
    try {
        const isUser = await User.findOne({ email: data.email });
        if (isUser) {
            return isUser;
        }
        const user = await User.create(data);
        return user;
    } catch (error) {
        console.log(error);
        return error;
    }
}

exports.findUser = async id => {
    const user = await User.findById(id);
    return user;
}

exports.getAllUsers = async () => {
    const users = await User.find();
    return users;
}

exports.borrowBook = async (data) => {
    const book = await BorrowedBook.create(data);
    return book;
}

exports.borrowBook = async (data) => {
    const book = await BorrowedBook.create(data);
    return book;
}

exports.findBorrowedBook = async where => {
    const book = await BorrowedBook.findOne(where).exec();
    return book;
}

exports.getAllBookBorrowed = async () => {
    const books = await BorrowedBook.find().populate({
        path: "user"
    }).sort({createdAt: "desc"});
    return books;
}

exports.getAllBookBorrowedWithCondition = async (where) => {
    const books = await BorrowedBook.find(where);
    return books;
}

exports.updateBorrowedBook = async (id, data) => {
    try {
        const book = await BorrowedBook.findOneAndUpdate({ id }, {$set: data}, {
            new: true
        }).exec();
        return book
    } catch (error) {
        return error;
    }
}

