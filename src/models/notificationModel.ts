// Import the mongoose module
import mongoose, { model, Schema, Types, Document, InferSchemaType } from "mongoose";
const { ObjectId } = Schema.Types;

interface INotification extends Document {
    notificationOwner?: Types.ObjectId,
    notificationMaker?: Types.ObjectId,
    actionType: string,
    projectId?: Types.ObjectId,
    commentId?: Types.ObjectId,
    date: Date
}


// const NotificationSchema = new Schema <INotification>({
const NotificationSchema = new Schema({
    notificationOwner: { type: ObjectId, ref: "User"},
    notificationMaker: { type: ObjectId, ref: "User" },
    actionType: {
        type: String,
        enum: {
            values: ['Like', 'Reply', 'Comment'],
            message: '{VALUE} is not supported'
        },
        required: true
    },
    projectId: {type: ObjectId, ref: "Project"},
    commentId: {type: ObjectId, ref: "Comment"},
    date: {
        type: Date,
        default: Date.now
    }
},
    { timestamps: true }
);

export type TNotification = InferSchemaType<typeof NotificationSchema>;

const Notification = model<TNotification>("Notification", NotificationSchema);

export default Notification;
