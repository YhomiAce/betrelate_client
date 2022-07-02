const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BorrowedBookSchema = new Schema({
    bookId: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    noOfDaysBorrowed: {
        type: Number,
        required: true
    },
    hasReturned: {
        type: Boolean,
        default: false
    },
    dateToReturn: {
        type: Date
    },
    dateReturned: {
        type: Date
    }
}, { timestamps: true });

module.exports = BorrowedBook = mongoose.model("borrowed_books", BorrowedBookSchema);