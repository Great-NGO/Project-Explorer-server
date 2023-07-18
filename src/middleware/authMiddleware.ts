// Import interface/types for request and response from express
import { Request, Response, NextFunction } from "express";
import responseHandler from "../utils/responseHandler";

import jwt, { Secret } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../utils/secrets";

/** AuthRequest - Interface definition including the modified request object which includes the user object containing the user id and role if logged in else undefined if logged out. */
export interface AuthRequest extends Request {
    user?: {
        id: string,
        role: string
    }
}

const requireSignin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1] || req.cookies && req.cookies.authToken;

    if (!token) {
        return responseHandler(res, "Unauthorized!", 403)
    } else {

        try {

            const decoded = jwt.verify(token, JWT_SECRET_KEY as Secret) as {
                id: string,
                role: string
            };
            const { id, role } = decoded;

            req.user = { id, role };
            return next();

        } catch (error: any) {
            if (error.name === "TokenExpiredError") {
                return responseHandler(res, "Session has expired. Please Log in again.", 401);
            }
            return responseHandler(res, "Unauthorized!", 400);
        }

    }
}

const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "Admin") {
        return responseHandler(res, "Unauthorized! Access Denied!", 403);
    } else {
        return next();
    }
}

const isUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "User") {
        return responseHandler(res, "Unauthorized! Access Denied!", 403);
    } else {
        return next();
    }
}

const checkUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    // const token = header && header.split(" ")[1];
    const token = header && header.split(" ")[1] || req.cookies && req.cookies.authToken;

    if (!token) {
        req.user = undefined;
        return next();
    } else {

        try {

            const decoded = jwt.verify(token, JWT_SECRET_KEY as Secret) as {
                id: string,
                role: string
            };
            const { id, role } = decoded;

            req.user = { id, role };
            return next();

        } catch (error: any) {
            req.user = undefined;
            return next();
        }

    }
}

export { requireSignin, checkUser }
