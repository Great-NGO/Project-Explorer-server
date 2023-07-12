// /** custom validator return value
//  *  Returning true means the data is valid according to your custom rule.
//     Returning false means the data is not valid according to your custom rule.
//     Returning a Promise object allows you to perform more complex validation tasks.
//     Returning a rejected Promise means there's a problem with the validation.

//  */


import { body, check } from "express-validator";

const likeCommentValidator = [
    // check("commentId", "Enter Comment Id").trim().notEmpty(),
    body("commentId", "Enter Comment Id to like comment.").trim().notEmpty(),
];

const unlikeCommentValidator = [
    // check("commentId", "Enter Comment Id").trim().notEmpty(),
    body("commentId", "Enter Comment Id to unlike comment").trim().notEmpty(),
];

const likingCommentValidator = [
    body("commentId", "Enter Comment Id").trim().notEmpty(),
    body("action", "Enter action type. (Like or Unlike)").trim().notEmpty(),
    body("action", "Enter action type. (Like or Unlike)").custom((value: any) => {
        const options = ["Like", "like", "UnLike", "Unlike", "unlike"];

        if (!options.includes(value)) {
            throw new Error("Invalid action type. Enter 'Like' to like comment and 'Unlike' to unlike comment. ");
        }
        return true;
    })

]

const likeReplyValidator = [
    // check("replyId", "Enter Reply Id").trim().notEmpty(),
    body("replyId", "Enter Reply Id to like comment reply.").trim().notEmpty(),
];

const unlikeReplyValidator = [
    // check("replyId", "Enter Reply Id").trim().notEmpty(),
    body("replyId", "Enter Reply Id to unlike comment reply").trim().notEmpty(),
];

const likingReplyValidator = [
    body("replyId", "Enter Reply Id").trim().notEmpty(),
    body("action", "Enter action type. (Like or Unlike)").trim().notEmpty(),
    body("action", "Enter action type. (Like or Unlike)").custom((value: any) => {
        const options = ["Like", "like", "UnLike", "Unlike", "unlike"];

        if (!options.includes(value)) {
            throw new Error("Invalid action type. Enter 'Like' to like reply and 'Unlike' to unlike reply. ");
        }
        return true;
    })

]

const likeCommentReplyValidator = [
    body("replyId", "Enter Reply Id.").trim().notEmpty(),
    body("commentId", "Enter Comment Id.").trim().notEmpty(),
];

const unlikeCommentReplyValidator = [
    body("replyId", "Enter Reply Id.").trim().notEmpty(),
    body("commentId", "Enter Comment Id.").trim().notEmpty(),
];

const likingCommentReplyValidator = [
    body("replyId", "Enter Reply Id").trim().notEmpty(),
    body("commentId", "Enter Comment Id").trim().notEmpty(),
    body("action", "Enter action type. (Like or Unlike)").trim().notEmpty(),
    body("action", "Enter action type. (Like or Unlike)").custom((value: any) => {
        const options = ["Like", "like", "UnLike", "Unlike", "unlike"];

        if (!options.includes(value)) {
            throw new Error("Invalid action type. Enter 'Like' to like reply and 'Unlike' to unlike reply. ");
        }
        return true;
    })

]




export {
    likeCommentValidator,
    unlikeCommentValidator,
    likingCommentValidator,
    likeReplyValidator,
    unlikeReplyValidator,
    likingReplyValidator,
    likeCommentReplyValidator,
    unlikeCommentReplyValidator,
    likingCommentReplyValidator

};
