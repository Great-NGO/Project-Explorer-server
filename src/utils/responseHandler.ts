// Import interface/types for request and response from express
import { Request, Response } from "express";

/** Response handler function used to handle returning api responses
*/
const responseHandler = (res: Response, message: string, statusCode: number, success: boolean = false, data: any = null) => {
    if (success === false) {
        return res.status(statusCode).json({
            success,
            error: message,
            status: statusCode
        })
    } else {
        return res.status(statusCode).json({
            success,
            message,
            status: statusCode,
            data

        })
    }
}

export default responseHandler;