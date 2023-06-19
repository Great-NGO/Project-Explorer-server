
// Import interface/types for request and response from express
import { Request, Response } from "express";

class UserController {

    public async getUsers( req: Request, res: Response) : Promise<void> {
        // Would use async handler
        res.json("YY")
    }
}

export default UserController;