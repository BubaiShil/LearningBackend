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
    location: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    requiredment: [{
      type: String
  }],
    salary: {
      type: Number,
      required: true,
    },
    jobtype: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
      },
    ],
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", JobSchema);
