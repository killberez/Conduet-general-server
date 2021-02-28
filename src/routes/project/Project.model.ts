import mongoose, { Document, Schema } from "mongoose";

export type ProjectDocument = Document & {
  name: string;
  userId: string;
  settings: object;
  lastModifiedOn: Date;
};

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  lastModifiedOn: Date,
  settings: Object,
});

export default mongoose.model<ProjectDocument>("Project", ProjectSchema);
