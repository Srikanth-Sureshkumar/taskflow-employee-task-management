import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    empId: {
      type: String,
      required: [true, "Employee ID is required"],
      trim: true,
    },
    empName: {
      type: String,
      required: [true, "Employee Name is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Task Title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      enum: ["Frontend Developer", "Backend Developer", "UI/UX Designer", "PHP Developer"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["Completed", "In Process", "Pending"],
      default: "Pending",
    },
    startDate: {
      type: String,
      required: [true, "Start Date is required"],
    },
    dueDate: {
      type: String,
      required: [true, "Due Date is required"],
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
