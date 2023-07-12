// /** custom validator return value
//  *  Returning true means the data is valid according to your custom rule.
//     Returning false means the data is not valid according to your custom rule.
//     Returning a Promise object allows you to perform more complex validation tasks.
//     Returning a rejected Promise means there's a problem with the validation.

//  */


import { body } from "express-validator";

const createCommentValidator = [
    //Name, abstract must not be empty
    body("commentAuthorId", "Enter Comment Author's Id").optional().trim().notEmpty(),
    body("projectId", "Enter Project Id.").trim().notEmpty(),
    body("text", "Enter Comment").trim().notEmpty().escape(),
    body('type', "Enter 'Comment' as type.").custom((value, { req }) => {
        // const validTypes = ['Comment', 'comment'];
        if (value !== "Comment") {
            throw new Error("Comment type must be 'Comment'.");
        }
        return true;
    }),

];

const updateCommentValidator = [
    body("commentId", "Enter Comment's Id").trim().notEmpty(),
    body("projectId", "Enter Project Id.").trim().notEmpty(),
    body("text", "Enter Comment").trim().notEmpty().escape(),
    body('type', "Enter 'Comment' as type.").optional().custom((value, { req }) => {
        // const validTypes = ['Comment', 'comment'];
        if (value !== "Comment") {
            throw new Error("Feedback type must be 'Comment'.");
        }
        return true;
    }),
]

const deleteCommentValidator = [
    body("commentId", "Enter Comment's Id").trim().notEmpty(),
    body("projectId", "Enter Project Id.").trim().notEmpty(),
]

const createReplyValidator = [

    // body("commentAuthorId", "Enter Comment Author's Id").optional().trim().notEmpty(),
    body("projectId", "Enter Project Id.").trim().notEmpty(),
    body("commentId", "Enter Comment's Id").trim().notEmpty(),
    body("text", "Enter Reply to Comment.").trim().notEmpty().escape(),
    body('type', "Enter 'Reply' as type.").custom((value, { req }) => {
        // const validTypes = ['Reply', 'reply'];
        if (value !== "Reply") {
            throw new Error("Feedback type must be 'Reply'.");
        }
        return true;
    }),

];

const updateCommentReplyValidator = [
    body("replyId", "Enter Reply Id").trim().notEmpty(),
    body("commentId", "Enter Comment Id").trim().notEmpty(),
    body("projectId", "Enter Project Id.").trim().notEmpty(),
    body("text", "Enter Reply to Comment.").trim().notEmpty().escape(),
    body('type', "Enter 'Reply' as type.").optional().custom((value, { req }) => {
        // const validTypes = ['Reply', 'reply'];
        if (value !== "Reply") {
            throw new Error("Feedback type must be 'Reply'.");
        }
        return true;
    }),
];


const deleteReplyValidator = [
    body("replyId", "Enter Reply Id").trim().notEmpty(),
    body("commentId", "Enter Comment Id").trim().notEmpty(),
    body("projectId", "Enter Project Id.").trim().notEmpty(),
]



export {
    createCommentValidator,
    updateCommentValidator,
    deleteCommentValidator,
    createReplyValidator,
    updateCommentReplyValidator,
    deleteReplyValidator
};
