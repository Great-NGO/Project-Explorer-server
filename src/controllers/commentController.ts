
// Import interface/types for request and response from express
import { Request, Response } from "express";
import { TControllerResponse } from "../utils/responseHandler";

class CommentController {

    public async createComment(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async editComment(req: Request, res: Response): Promise<TControllerResponse | any> {

    }
 
    public async deleteComment(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async leaveReply(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async editReply(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async deleteReply(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

}

export default CommentController;