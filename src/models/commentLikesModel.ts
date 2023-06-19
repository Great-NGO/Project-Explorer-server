// Import the mongoose module
import mongoose, { model, Schema, Types, Document, InferSchemaType } from "mongoose";
const { ObjectId } = Schema.Types;

interface ICommentLikes extends Document {
    likerId: Types.ObjectId,
    commentId: Types.ObjectId,
}

// const CommentLikesSchema = new Schema<ICommentLikes>(
const CommentLikesSchema = new Schema(
    {
        likerId: { type: ObjectId, required: true, ref: "User" },
        commentId: { type: ObjectId, required: true, ref: "Comment" }
    },
    { timestamps: true }
);

export type TCommentLikes = InferSchemaType<typeof CommentLikesSchema>;

const CommentLikes = model<TCommentLikes>("CommentLikesSchema", CommentLikesSchema);

export default CommentLikes;
