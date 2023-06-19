// Import the mongoose module
import mongoose, { model, Schema, Types, Document, InferSchemaType } from "mongoose";
const { ObjectId } = Schema.Types;

interface IProject extends Document {
    name: string,
    accountVerified: boolean,
    abstract: string,
    authors: Types.Array<string>,
    tags?: Types.Array<string>,
    createdBy: Types.ObjectId,
    comments?: Types.Array<Types.ObjectId>
}

// const ProjectSchema = new Schema<IProject>(
const ProjectSchema = new Schema(
    {
        name: { type: String, required: true },
        abstract: { type: String, required: true },
        authors: { type: [String], required: true },
        tags: [String],
        createdBy: { type: ObjectId, required: true, ref: "User" },
        comments: [{ type: ObjectId, ref: "Comment" }]
    },
    { timestamps: true }
);

export type TProject = InferSchemaType<typeof ProjectSchema>;

const Project = model<TProject>("Project", ProjectSchema);

export default Project;
