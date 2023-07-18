
// Import interface/types for request and response from express
import { Request, Response } from "express";
import UserService from "../services/userService";
import { encryptPassword } from "../utils/password";
import responseHandler, { TControllerResponse, TResponseHandler } from "../utils/responseHandler";
import { generateAccessToken } from "../utils/token";
import { sendResetPwdMail } from "../utils/sendMail";
import { ResetTokenService } from "../services/authService.";
import { AuthRequest } from "../middleware/authMiddleware";

class UserController {

    // public async signup(req: Request, res: Response): Promise<Response<TResponseHandler>> {
    public async signup(req: Request, res: Response): Promise<TControllerResponse | any> {

        const { firstname, lastname, email, password, matricNumber, program, graduationYear } = req.body;

        let hashedPassword = await encryptPassword(password);
        let newUser = { firstname, lastname, email, password: hashedPassword, matricNumber, program, graduationYear };
        let [success, data, message, metadata] = await new UserService().create(newUser);
        if (success) {
            return responseHandler(res, "User Signup successful!", metadata?.status || 201, true, { user: data });
        }

        return responseHandler(res, "Failed to create user", metadata?.status || 400);

    }

    public async login(req: Request, res: Response): Promise<TControllerResponse | any> {
        const { email, password } = req.body;

        let [success, data, message, metadata] = await UserService.login(email, password);
        console.log("Login Data ", data);
        if (success) {
            // Clear every cookie first, before sending new cookie back
            //  res.clearCookie('authToken');
            const { _id } = data!;
            const token = generateAccessToken(_id)
            // Send cookie to frontend
            res.cookie('authToken', token, {
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24,    //24hours
                httpOnly: true
            })
            // Return JSON response
            return responseHandler(res, "User Login successful", metadata?.status || 200, true, { token, user: data });

        }
        return responseHandler(res, message, metadata?.status || 400);

    }

    public logout(req: Request, res: Response): TControllerResponse | any {
        res.clearCookie('authToken');;
        return responseHandler(res, "User Logout Successful", 200, true)
    }

    public async forgotPassword(req: Request, res: Response): Promise<TControllerResponse | any> {
        // To reset password - must enter email address
        const { email } = req.body;

        // Confirm User account with Email exists
        let [success, data, message, metadata] = await new UserService().getOne({ email });
        if (!success) {
            return responseHandler(res, message, metadata?.status || 400)
        }


        const { _id, firstname, lastname } = data!;
        let userFullName : string = `${firstname} ${lastname}`;

        // Create new token (reset password link) to send to user
        const [tokenSuccess, tokenData, tokenMessage, tokenMetadata] = await new ResetTokenService().create(_id)
        if(!tokenSuccess){
            return responseHandler(res, "Something went wrong in sending reset password link to user.", tokenMetadata?.status || 400)
        }
        // const [sendMailSuccess] = await sendResetPwdMail(email, userFullName, tokenData!.token)    //Send Email to User
        const sendMailSuccess = true;    //For test
        if (!sendMailSuccess) {
            return responseHandler(res, "Something went wrong in sending reset password link to user.", 500)
        }
        return responseHandler(res, "A reset password link has been sent to your email. This link expires in 30 minutes.", 200, true, { data })
    }

    public async resetPassword(req: Request, res: Response): Promise<TControllerResponse | any> {
        const { token, newPassword } = req.body;
        // Verify token details
        let [success, data, message, metadata] = await ResetTokenService.verifyResetToken(token);
        if (!success) {
            return responseHandler(res, message, metadata?.status || 400);
        }
    
        // Proceed with password reset, get the user id and the token id which would be used to reset the users password and delete token after reset is complete using the token id.
        const { userId, tokenId } = data;
        [success, data, message, metadata] = await UserService.resetPassword(userId, newPassword, tokenId);
        if (success) {
            return responseHandler(res, message, metadata?.status || 200, true, { student: data })
        }
        return responseHandler(res, message, metadata?.status || 400);
    
    }

    public async editDetails(req: Request, res: Response): Promise<TControllerResponse | any> {
        const check = await UserService.updateProfile(req);
        console.log("User update ", check);
        let [success, data, message, metadata] = check;
    
        if (success) {
            return responseHandler(res, message, metadata?.status || 200, true, { user: data });
        }
        return responseHandler(res, message, metadata?.status || 400);
    }

    public async deleteAccount(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async editPassword(req: AuthRequest, res: Response): Promise<TControllerResponse | any> {
        const { id } = req.user!;
        const { confirmPassword } = req.body;
    
        let [success, data, message, metadata] = await UserService.updatePassword(id, confirmPassword);
        if (success) {
            return responseHandler(res, message, metadata?.status || 200, true, { user: data })
        }
        return responseHandler(res, message, metadata?.status || 400)
    
    }

    public async removeProfilePicture(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async getUsers(req: Request, res: Response): Promise<TControllerResponse | any> {
        // Would use async handler
        res.json("YY")
    }

    public async getUserDetails(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async getNotification(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async getNotifications(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async deleteNotification(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

    public async deleteNotifications(req: Request, res: Response): Promise<TControllerResponse | any> {

    }

}

export default UserController;