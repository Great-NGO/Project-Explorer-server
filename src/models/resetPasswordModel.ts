
import { model, Schema, Types, Document, InferSchemaType } from "mongoose";
const { ObjectId } = Schema.Types;

/** IResetToken - ResetToken Model Interface */

interface IResetToken extends Document {
    userId: Types.ObjectId,
    token: string,
    expiryDate?: Date
}

const resetTokenSchema = new Schema<IResetToken>(
    {
        userId: {
            type: ObjectId,
            ref: "User",
            required: true
        },
        token: {
            type: String,
            required: true,
        },
        expiryDate: {
            type: Date,
            default: Date.now() + 1000 * 60 * 60 * 2  //Token should be valid for 2 hours by default
        },
    },
    { timestamps: true }
);

export type TResetToken = InferSchemaType<typeof resetTokenSchema>;

const ResetToken = model<IResetToken>("Reset-Token", resetTokenSchema);

export { IResetToken, ResetToken }