import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    requiredment: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    jobtype: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    applications: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", JobSchema);
