import mongoose, { Document, Schema } from "mongoose";
export type UserDocument = Document & {
  username?: string;
  email: string;
  googleId: string;
  firstName?: string;
  familyName?: string;
  picture?: string;
};

const userSchema = new mongoose.Schema({
  username: { type: String, default: "" },
  email: String,
  googleId: String,
  firstName: String || undefined,
  familyName: String || undefined,
  picture: String || undefined,
});

export default mongoose.model<UserDocument>("User", userSchema);
