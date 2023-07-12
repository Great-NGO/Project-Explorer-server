
// Import interface/types for request and response from express
import { Request, Response } from "express";

class HomeController {

    public async programs(req: Request, res: Response): Promise<void> {

    }

    public async graduationYears(req: Request, res: Response): Promise<void> {
        // Would use async handler
        res.json("YY")
    }

}

export default HomeController;