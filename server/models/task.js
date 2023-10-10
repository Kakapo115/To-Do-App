// Schema definition file for the task collection data
var mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
var Schema = mongoose.Schema;
// Create a schema description of the tasks document structure
var taskSchema = new Schema(
  {
    userId: Number,
    taskId: String,
    name: String,
    description: String,
    notes: String,
    startDate: Date,
    dueDate: Date,
    completed: Boolean,
  },
  { collection: "tasks" },
  { versionKey: false }
);
module.exports = Task = mongoose.model("Task", taskSchema); 
