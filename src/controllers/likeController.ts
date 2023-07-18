
// Import interface/types for request and response from express
import { Request, Response } from "express";
import { TControllerResponse } from "../utils/responseHandler";

class LikeController {

    public async likeComment(req: Request, res: Response): Promise<TControllerResponse | any> {

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