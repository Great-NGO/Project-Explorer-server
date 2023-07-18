// Import interface/types for request and response from express
import { Request, Response } from "express";

/** Type of ResponseHandler */
export type TResponseHandler = {
    res: Response,
    message: string,
    status: number,
    boolean?: boolean,
    data?: any | null
};

/** Type of Controller response i.e. Request Response 
 *  TResponseHandler = { 
        res: Response,
        message : string,
        status: number,
        boolean?: boolean,
        data?: any | null
    };
    Response type of TResponseHandler ( Response<TResponseHandler> )
    TControllerResponse = Response<TResponseHandler>
    @type { Response<{  res: Response; 
                    message: string;
                    status: number;
                    boolean?: boolean | undefined;
                    data?: any | null
    }> }

     
*/
export type TControllerResponse = Response<TResponseHandler>;

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