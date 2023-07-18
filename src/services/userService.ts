// const User = require("../models/userModel");
import { Model, Types } from "mongoose";

import { translateError } from "../utils/translateError";
import { BaseService, TServiceResponse } from "./baseService";
import { comparePassword, encryptPassword } from "../utils/password";
import { IUser, TUser, User } from "../models/userModel";
import { ResetToken } from "../models/resetPasswordModel";
import { AuthRequest } from "../middleware/authMiddleware";
import { logError } from "../utils/logging";




/** Type User without password */
type UserWithoutPassword = Omit<TUser, "password">

/** User Service Class - Manage every User related operation */
class UserService extends BaseService<IUser> {

    constructor() {
        super(User)
    }

    static async findByIdExcludingPassword(id: string | number | Types.ObjectId): Promise<TServiceResponse<UserWithoutPassword>> {
        try {

            const user = await User.findById(id).select('-password');
            if (user) {
                return [true, user, "User found", { status: 200 }];
            }
            return [false, null, "User not found.", { status: 404 }];
        } catch (error) {
            return translateError(error, "finding User by id.")
        }
    }

    static async login(email: string, password: string): Promise<TServiceResponse<UserWithoutPassword>> {
        try {
            const user = await User.findOne({ email }).lean();  //Use the lean method to convert response to an object, so we dont return back the mongoose related info (cluttered data)

            if (user && await comparePassword(password, user.password)) {
                const { password, ...userWithoutPassword } = user;  //Destructure password from user and spread the remaining properties of user into new variable (object) called userWithoutPassword

                return [true, userWithoutPassword, "User Login Successful", { status: 200 }];
            }
            return [false, null, "Incorrect Email/Password", { status: 400 }];

        } catch (error) {

            const errResponse = translateError(error, "authenticating user.");
            return errResponse;

        }
    }

    /** User Service - Update Password */
    static async updatePassword(id: Types.ObjectId | string, password: string): Promise<TServiceResponse<UserWithoutPassword>> {
        try {
            const hashedPassword = await encryptPassword(password);
            const updatedUser = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true }).select('-password');
            if (updatedUser) {
                return [true, updatedUser, `User Password updated successfully.`, { status: 200 }];
            }
            return [true, null, "Failed to update Users password", { status: 404 }];

        } catch (error) {
            const errResponse = translateError(error, "updating users password.");
            return errResponse;
        }
    }

    /** Reset Users password */
    static async resetPassword(userId: Types.ObjectId | string, password: string, tokenId: Types.ObjectId | string): Promise<TServiceResponse<UserWithoutPassword>> {
        try {
            const hashedPassword = await encryptPassword(password);
            const updatedUser = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true }).select('-password');
            if (updatedUser) {
                await ResetToken.findByIdAndDelete(tokenId);
                return [true, updatedUser, `User Password reset successfully.`, { status: 200 }];
            }
            return [true, null, "Failed to reset Users password", { status: 404 }];

        } catch (error) {
            const errResponse = translateError(error, "resetting users password.");
            return errResponse;
        }

    }

    /** User Service - Update profile - for updating user profile - handle cases of profile picture present or not  */
    static async updateProfile(req: AuthRequest): Promise<TServiceResponse<UserWithoutPassword> | any> {
        try {
            
        } catch (error) {
            let result = translateError(error, "updating Users profile details.");
            logError("Update Profile method (User Service)", result);
            return result;
        }
    }
}

export default UserService;