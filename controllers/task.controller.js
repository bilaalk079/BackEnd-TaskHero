import Task from "../models/task.model.js";
import mongoose from "mongoose";
export const getTasks = async (req, res) => {
  try {
    //pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    //filtering
    const { category, status, priority } = req.query;
    const filter = { createdBy: req.user.userID };
    if (category) {
      filter.category = category.toLowerCase();
    }
    if (status) {
      filter.status = status.toLowerCase();
    }
    if (priority) {
      filter.priority = Number(priority);
    }

    //sorting
    const sortBy = req.query.sortBy || "priority";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });
    const total = await Task.countDocuments(filter);
    return res.status(200).json({
      success: true,
      data: tasks,
      pagination: {
        totalTasks: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    });
  } catch (err) {
    console.error("Error in fetching Tasks", err.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getSingleTask = async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not Found" });
    }
    return res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};
export const createTask = async (req, res) => {
  const task = req.body;
  if (
    !task.title ||
    !task.content ||
    !task.priority ||
    !task.dueDate ||
    !task.category
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are Required" });
  }
  const newTask = new Task({
    title: task.title,
    priority: task.priority,
    dueDate: task.dueDate,
    category: task.category,
    content: task.content,
    createdBy: req.user.userID,
  });
  try {
    await newTask.save();
    return res.status(201).json({
      success: true,
      message: "New Task Created Successfully",
      data: newTask,
    });
  } catch (err) {
    console.error("Error in creating Task", err.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }
  try {
    const updated_product = await Task.findByIdAndUpdate(id, task, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Task Updated successfully",
      data: updated_product,
    });
  } catch (err) {
    console.error("Error in updating task", err.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }
  try {
    await Task.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: false, message: "Task Deleted Successfully" });
  } catch (err) {
    console.error("Error in deleting task", err.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
