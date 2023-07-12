import { validationResult } from "express-validator";

import { Request, Response, NextFunction } from "express";

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors: string[] = [];
    errors.array().map((err) => extractedErrors.push(err.msg));

    return res.status(400).json({
        success: false,
        error: extractedErrors[0],
        errors: extractedErrors,
        status: 400
    })
}

export default validate;
