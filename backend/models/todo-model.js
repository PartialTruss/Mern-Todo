import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    starred: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
      required: false,
    },
    dueTime: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
