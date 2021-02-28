import mongoose, { Document, Schema } from "mongoose";

export type UserProjectsDocument = Document & {
  name: string;
};

export const UserProjectsSchema = new Schema({
  name: String,
});

export default mongoose.model<UserProjectsDocument>(
  "UserProjects",
  UserProjectsSchema
);
