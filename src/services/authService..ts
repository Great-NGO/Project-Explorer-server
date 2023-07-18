

import { Types } from "mongoose";
import { IResetToken, ResetToken, TResetToken } from "../models/resetPasswordModel"
import { logError } from "../utils/logging";
import { translateError } from "../utils/translateError";
import { BaseService, TServiceResponse } from "./baseService"
import { generateResetJWT, verifyResetJWT } from "../utils/token";
import { TUser } from "../models/userModel";

/** Reset Service Class - Manage every ResetToken related operation */
class ResetTokenService extends BaseService<IResetToken, Types.ObjectId | string> {

    constructor() {
        super(ResetToken)
    }

    /** 
     * @param {Types.ObjectId } userId
     * Reset create method for ResetTokenService class - expects a parameter of userId for which it generates a reset password token for
    */
    override async create(userId: Types.ObjectId): Promise<TServiceResponse<TResetToken>> {
        try {

            // Use the generate reset jwt function to generate token
            const token = generateResetJWT(userId);

            let resetToken = await this.model.create({ userId, token });

            if (resetToken) {
                return [true, resetToken, "Reset Token created successfully. ", { status: 201 }]
            }
            return [false, null, "Failed to create reset token.", { status: 400 }];

        } catch (error) {
            let errResponse = translateError(error, `creating reset token link for user`)
            logError("Create (Reset-token service)", errResponse);
            return errResponse;
        }
    }

    static async verifyResetToken(token: string = "") : Promise<[ boolean, any | null, string, { status: number, metadata?: any}]> {

        try {

            // Pipeline checks that the token actually exists and it has an actual user linked to it
            const pipeline = [
                {
                    '$match': {
                        'token': token
                    }
                }, {
                    '$lookup': {
                        'from': 'users',
                        'localField': 'userId',
                        'foreignField': '_id',
                        'as': 'user'
                    }
                }, {
                    '$unwind': {
                        'path': '$user'
                    }
                }, {
                    '$match': {
                        'user': {
                            '$ne': null
                        }
                    }
                }
            ]

            // Aggregation pipeline always returns an array, the actual resetToken data is in the first index
            const [userResetToken] = await ResetToken.aggregate(pipeline);

            // If not found from db
            if (!userResetToken) {
                return [false, null, 'Reset password link is invalid or has been used already.', { status: 400 }]
            }

            const isUserTokenValid = verifyResetJWT(token);
            console.log("Is User Token valid? ", isUserTokenValid);
            let [successVerification, data, verificationMessage] = isUserTokenValid;
            if (!successVerification) {
                await userResetToken.deleteOne();         //If link has expired, delete from database
                return [false, null, verificationMessage, { status: 400 }]
            }

            type TReturnedData = {
                user: TUser,
                userId: Types.ObjectId,
                token: string,
                tokenId: Types.ObjectId
            }
            const returnedData : TReturnedData = {
                user: userResetToken.user,
                userId: userResetToken.user._id || data.id, 
                token,
                tokenId: userResetToken._id
            }

            // Return success message of 200 and send data containing user object, token and token id back to controller. The tokenId would be used after reset password is successful to delete the token from our database
            return [true, returnedData, 'Reset password link is valid', { status: 200 }];

        } catch (error) {
            let errResponse = translateError(error, "verifying token.");
            logError("Verifying reset token (Reset token service)", errResponse);
            return errResponse;
        }

    }

}

export {
    ResetTokenService
}