import mongoose from "mongoose";
const CATEGORIES = ['work', 'personal','home', 'study', 'health', 'finance', 'family','shopping', 'hobbies', 'travels', 'events'];
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    priority: {
      type: Number,
      enum: [1,2,3],
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    category:{
      type:String,
      required: true,
      enum: CATEGORIES,
    },
  },
  { timestamps: true }
);
const Task = mongoose.model("Task", taskSchema)
export default Task
