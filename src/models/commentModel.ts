// Import the mongoose module
import mongoose, { model, Schema, Types, Document, InferSchemaType } from "mongoose";
const { ObjectId } = Schema.Types;

interface IComment extends Document {
    commentAuthorId?: Types.ObjectId,
    projectId: Types.ObjectId,
    text: string,
    type: string,
    likes: Types.Array<Types.ObjectId>,
    date: Date,
    parentCommentId?: Types.ObjectId,
    // replies ?: Types.Array<Types.ObjectId>
}

// const CommentSchema = new Schema<IComment>(
const CommentSchema = new Schema(
    {
        commentAuthorId: { type: ObjectId, required: true, ref: "User" },
        projectId: { type: ObjectId, required: true, ref: "Project" },
        text: { type: String, required: true },
        type: { 
            type: String,
            enum: {
                values: ['Comment', 'Reply'],
                message: '{VALUE} is not a valid type of feedback. Feedback is either a "Comment" or a "Reply"'
            },
            required: true,
        },
        likes: [ { type: ObjectId, ref: "CommentLikes"}],
        date: { type: Date, default: Date.now },
        // replies: [ { type: ObjectId, ref: "Comment"}],
        parentCommentId: { type: ObjectId, ref: "Comment" }
    },
    { timestamps: true }
);

export type TComment = InferSchemaType<typeof CommentSchema>;

const Comment = model<TComment>("CommentSchema", CommentSchema);

export default Comment;
