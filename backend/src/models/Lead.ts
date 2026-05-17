import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  status: "New" | "Contacted" | "Qualified" | "Lost" | "Accepted";
  source: "Website" | "Instagram" | "Referral";
  assignedTo?: mongoose.Types.ObjectId;
  requestedBy?: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Lost", "Accepted"],
      default: "New",
    },
    source: {
      type: String,
      enum: ["Website", "Instagram", "Referral"],
      required: true,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    requestedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Lead = mongoose.model<ILead>("Lead", leadSchema);
