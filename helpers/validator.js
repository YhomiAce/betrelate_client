const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors
    });
};

const bookLoanRequestValidation = () => {
    return [
        body("books", "book is required").isArray(),
        body("userId", "user Id is required").notEmpty()
    ];
};

const userEnrollmentRequestValidation = () => {
    return [
        body("firstName", "First name is required").notEmpty(),
        body("lastName", "Last name is required").notEmpty(),
        body("email", "Email is required").isEmail()
    ];
};

const catalogueRequestValidation = () => {
    return [
        body("bookId", "book Id is required").notEmpty()
    ];
};

module.exports = {
    validate,
    bookLoanRequestValidation,
    catalogueRequestValidation,
    userEnrollmentRequestValidation
}