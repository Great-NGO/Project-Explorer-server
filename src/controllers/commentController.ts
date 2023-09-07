
// Import interface/types for request and response from express
import { Request, Response } from "express";
import responseHandler, { TControllerResponse } from "../utils/responseHandler";
import { AuthRequest } from "../middleware/authMiddleware";
import { Types } from "mongoose";
import CommentService from "../services/commentService";

class CommentController {

    public async createComment(req: AuthRequest, res: Response): Promise<TControllerResponse | any> {

        let { projectId, text, type } = req.body;
        type TCommentAuthorId = Types.ObjectId | undefined;
        let commentAuthorId: TCommentAuthorId = new Types.ObjectId(req.user?.id)

        let newComment = { projectId, text, type, commentAuthorId };

        let [success, data, message, metadata] = await new CommentService().create(newComment);

        if (success) {
            return responseHandler(res, "Comment created successfully.", 201, true, { comment: data });
        }
        return responseHandler(res, "Failed to create comment", metadata?.status || 400);


    }

    public async editComment(req: Request, res: Response): Promise<TControllerResponse | any> {

        let { commentId, projectId, text} = req.body;

        let [ success, data, message, metadata ] = await new CommentService().update(commentId, { text });

        if (success) {
            return responseHandler(res, "Comment updated successfully.", 201, true, { comment: data });
        }
        return responseHandler(res, "Failed to update comment", metadata?.status || 400)

    }

    public async deleteComment(req: Request, res: Response): Promise<TControllerResponse | any> {

        const { commentId, projectId } = req.body;

        let [ success, data, message, metadata ] = await new CommentService().delete(commentId);

        if (success) {
            return responseHandler(res, "Comment deleted successfully.", 201, true, { comment: data });
        }
        return responseHandler(res, "Failed to deleted comment", metadata?.status || 400)

    }

    public async leaveReply(req: AuthRequest, res: Response): Promise<TControllerResponse | any> {

        let { projectId, commentId, text, type } = req.body;
        type TCommentAuthorId = Types.ObjectId | undefined;
        let commentAuthorId: TCommentAuthorId = new Types.ObjectId(req.user?.id)

        let newReply = { projectId, parentCommentId: commentId, text, type, commentAuthorId };

        let [success, data, message, metadata] = await new CommentService().create(newReply);

        if (success) {
            return responseHandler(res, "Comment Reply created successfully.", 201, true, { reply: data });
        }
        return responseHandler(res, "Failed to create comment reply.", metadata?.status || 400);

    }

    public async editReply(req: Request, res: Response): Promise<TControllerResponse | any> {

        let { replyId, commentId, projectId, text} = req.body;

        let [ success, data, message, metadata ] = await new CommentService().update(replyId, { text });

        if (success) {
            return responseHandler(res, "Comment reply updated successfully.", 201, true, { comment: data });
        }
        return responseHandler(res, "Failed to update comment reply.", metadata?.status || 400);

    }

    public async deleteReply(req: Request, res: Response): Promise<TControllerResponse | any> {

        const { replyId, commentId } = req.body;

        let [ success, data, message, metadata ] = await new CommentService().delete(replyId);

        if (success) {
            return responseHandler(res, "Reply deleted successfully.", 201, true, { comment: data });
        }
        return responseHandler(res, "Failed to delete reply.", metadata?.status || 400)

    }

}

export default CommentController;