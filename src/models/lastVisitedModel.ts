// Import the mongoose module
import mongoose, { model, Schema, Types, Document, InferSchemaType } from "mongoose";
const { ObjectId } = Schema.Types;

interface IProjectVisit extends Document {
    projectId: Types.ObjectId,
    userId: Types.ObjectId,
    visitCount?: number,
    lastVisited?: Date
}

// const ProjectVisitSchema = new Schema<ProjectVisitSchema>(
const ProjectVisitSchema = new Schema(
    {
        projectId: { type: ObjectId, required: true, ref: "Project" },
        userId: { type: ObjectId, required: true, ref: "User" },
        visitCount: { type:Number, default: 0 },
        lastVisited: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export type TProjectVisit = InferSchemaType<typeof ProjectVisitSchema>;

const ProjectVisit = model<TProjectVisit>("ProjectVisitSchema", ProjectVisitSchema);

export default ProjectVisit;
