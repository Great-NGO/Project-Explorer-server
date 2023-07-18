
// Import interface/types for request and response from express
import { Request, Response } from "express";
import responseHandler, { TControllerResponse } from "../utils/responseHandler";
import { getGradYears, getPrograms } from "../utils/school";

class HomeController {

    public programs(req: Request, res: Response): TControllerResponse | any {
        const programs = getPrograms();
        // Sending the lists of programs (array) as a json response with a status of 200
        responseHandler(res, "List of Programs returned successfully.", 200, true, { programs })

    }

    public graduationYears(req: Request, res: Response): TControllerResponse | any {
        
        const gradYears = getGradYears();
        // Sending the list of graduation years (array) as a json response with a status of 200
        responseHandler(res, "List of Graduation Years returned successfully.", 200, true, { graduationYears: gradYears})

    }

}

export default HomeController;