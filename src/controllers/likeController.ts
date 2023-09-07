
// Import interface/types for request and response from express
import { Request, Response } from "express";
import { TControllerResponse } from "../utils/responseHandler";
import { AuthRequest } from "../middleware/authMiddleware";
import { Types } from "mongoose";

class LikeController {

    public async likeComment(req: AuthRequest, res: Response): Promise<TControllerResponse | any> {

        let { commentId, action } = req.body;
        const likerId: Types.ObjectId = new Types.ObjectId(req.user!.id);   //Convert the users id to type of Object Id

        
        
    }

    public async unlikeComment(req: Request, res: Response): Promise<TControllerResponse | any> {

    }
 
    public async editCommentLike(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async likeReply(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async unlikeReply(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async editReplyLike(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

}

export default LikeController;