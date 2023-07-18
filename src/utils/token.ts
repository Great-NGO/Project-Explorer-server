import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { JWT_SECRET_KEY, RESET_SECRET_KEY } from "./secrets";
import { Types } from "mongoose";


/** Generate access token for user */
const generateAccessToken = (id: string | number | Types.ObjectId, role: string = "User"): string => {
    return jwt.sign({ id, role }, JWT_SECRET_KEY!, { expiresIn: '2h' })
}

const generateResetJWT = (id: string | number | Types.ObjectId, role = "User"): string => {
    // Generate token link valid for 30 minutes
    return jwt.sign({ id, role }, RESET_SECRET_KEY!, { expiresIn: '30m' })
}

/** VerifyResetJWT accepts Reset JWT as a param and checks its validity - if expired or invalid */
const verifyResetJWT = (token : string ) : [boolean, any | null | JwtPayload , string] => {
    try {
        const decoded = jwt.verify(token, RESET_SECRET_KEY as Secret);
        return [true, decoded, "Reset password link is valid."]
    } catch (error:any) {
        if (error.name === "TokenExpiredError") {
            return [false, null, "Reset password link has expired."];
        } else {
            return [false, null, "Reset password link is invalid."]
        }
    }
}


const generateARandomToken = () : string => {
    const token = crypto.randomBytes(40).toString('hex');
    console.log("Token ", token);
    return token;
}

generateARandomToken()

export { generateAccessToken, generateResetJWT, verifyResetJWT };