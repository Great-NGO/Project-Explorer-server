
// Import interface/types for request and response from express
import { Request, Response } from "express";
import { TControllerResponse } from "../utils/responseHandler";

class AuthController {

    public async googleLogin (req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async continueSignup (req: Request, res: Response): Promise<TControllerResponse | any> {

    }
 
}

export default AuthController;