// Import the mongoose module
import mongoose, { model, Schema, Types, Document, InferSchemaType} from "mongoose";
const { ObjectId } = Schema.Types;

interface IUser extends Document {
    googleId: string,
    accountVerified: boolean,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    matricNumber: string,
    program?: string,
    graduationYear?: string,
    profilePicture?: string,
    profilePicturePublicId ?: string
}

const UserSchema = new Schema<IUser>(
// const UserSchema = new Schema(
  {
    googleId: { type: String },
    accountVerified: {
      type: Boolean,
      default: false,
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    matricNumber: { type: String, required: true },
    program: { type: String },
    graduationYear: { type: String },
    profilePicture: { type: String, default: 'https://res.cloudinary.com/ngotech-dev/image/upload/v1638195018/main/avatar_yceqqb.png' },
    profilePicturePublicId: { type: String}
  },
  { timestamps: true }
);

export type TUser = InferSchemaType<typeof UserSchema>;

const User = model<TUser>("User", UserSchema);

export default User;
