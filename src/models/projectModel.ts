// Import the mongoose module
import mongoose, { model, Schema, Types, Document, InferSchemaType } from "mongoose";
const { ObjectId } = Schema.Types;

/** IProject - Project Model Interface (represents the structure of the Project model and defines the properties and their types for a Project document)*/

interface IProject extends Document {
    name: string,
    abstract: string,
    authors: Types.Array<string>,
    tags?: Types.Array<string>,
    createdBy: Types.ObjectId,
    comments?: Types.Array<Types.ObjectId>,
    // attachedFile?: string
}

const ProjectSchema = new Schema<IProject>(
// const ProjectSchema = new Schema(
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

/** TProject - Project Model Type (Based on Project Schema model inference similar to IProject. It represents the inferred type of the Project model based on the schema, capturing its actual schema type and providing the type information for the Project model) */
export type TProject = InferSchemaType<typeof ProjectSchema>;

const Project = model<IProject>("Project", ProjectSchema);

export { IProject, Project };
