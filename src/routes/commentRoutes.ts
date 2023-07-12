import express, { Router } from "express";
import CommentController from "../controllers/commentController";
import { checkUser, requireSignin } from "../middleware/authMiddleware";
import validate from "../middleware/validationMiddleware";
import { createCommentValidator, createReplyValidator, deleteCommentValidator, updateCommentValidator } from "../validators/commentValidation";
import { likeReplyValidator, likingCommentValidator, likingReplyValidator } from "../validators/likesValidation";
import LikeController from "../controllers/likeController";


class ProjectRoutes {
    public router:Router;
    private commentController : CommentController;
    private likeController : LikeController;

    constructor(){
        // this.router = express.Router();
        this.router = Router();
        this.commentController = new CommentController();
        this.likeController = new LikeController();
        this.initializeRoutes();

    }

    // Initialize Routes updates the public router property with the various routes/endpoints. However this method itself is not accessible outside of this class
    private initializeRoutes(): void {

        // Routes definitions
        this.router.post('/new-comment', checkUser, createCommentValidator, validate, this.commentController.createComment);
        this.router.put('/edit-comment', checkUser, updateCommentValidator, validate, this.commentController.editComment);
        this.router.post('/delete-comment', requireSignin, deleteCommentValidator, validate, this.commentController.deleteComment);
        
        this.router.post('/new-comment-reply', checkUser, createReplyValidator, validate, this.commentController.leaveReply);
        this.router.put('/edit-comment-reply', checkUser, updateCommentValidator, validate, this.commentController.editReply);
        this.router.post('/delete-comment-reply', requireSignin, deleteCommentValidator, validate, this.commentController.deleteReply);
        
        this.router.post('/comment-like', requireSignin, likingCommentValidator, validate, this.likeController.likeComment);
        this.router.post('/comment-reply-like', requireSignin, likingReplyValidator, validate, this.likeController.likeReply);

    }

}

export default ProjectRoutes;