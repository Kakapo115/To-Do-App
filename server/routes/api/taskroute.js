var express = require("express");
var router = express.Router();

//import the task model (schema) from the models folder
var tasks = require("../../models/task");

//@route GET /api/tasks
//@desc Get all tasks from the DB
//@access Public
router.get("/", function (req, res) {
  const { filter } = req.query;
  let query = {};

  if (filter === "today") {
    // Filter tasks with due date between start of today and end of today
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    query = { dueDate: { $gte: startOfDay, $lte: endOfDay } };
  } else if (filter === "previous") {
    // Filter tasks with due date before today
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day

    query = { dueDate: { $lt: today } };
  } else if (filter === "upcoming") {
    // Filter tasks with due date after today
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Set time to start of the day

    query = { dueDate: { $gt: today } };
  }

  tasks
    .find(query)
    .sort({ task: 1 })
    .then(function (task) {
      res.json(task);
    })
    .catch(function (err) {
      console.log(err);
    });
});

// GET /api/tasks?Id
// Get task by task Id
// Public access
router.get("/:Id?", function (req, res) {
  const taskreqId = req.params.Id;

  tasks
    .findOne({ taskId: taskreqId })
    .then(function (taskId) {
      if (!taskId) {
        // Handle case when task with the given name is not found
        res.status(404).json({ message: "Task not found" });
      } else {
        res.json(taskId);
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//@route POST /api/tasks/:task
//@desc Add a new task to the DB
//@access Public (for now – needs to be secured)
router.post("/", function (req, res) {
  var newTask = new Task({
    userId: req.body.userId,
    taskId: req.body.taskId,
    name: req.body.name,
    description: req.body.description,
    notes: req.body.notes,
    startDate: req.body.startDate,
    dueDate: req.body.dueDate,
    completed: req.body.completed,
  });
  newTask
    .save()
    .then(function (task) {
      res.json(task);
    })
    .catch(function (err) {
      console.log(err);
    });
});

//@route DELETE /api/tasks
//@desc Delete a task from the DB by task id
//@access Public (should be secured)
router.delete("/:id?", function (req, res) {
  tasks
    .find({ taskId: req.params.id })
    .then(function (taskId) {
      if (Object.keys(taskId).length != 0) {
        tasks.deleteOne({ taskId: req.params.id }).then(function () {
          res.json({ success: "task Deleted" });
        });
      } else {
        res.status(404).json({ success: "404 - task not Deleted" });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

//@route PUT /api/tasks/id
//@desc Update a Task in the DB by task id
//@access Public (should be secured)
router.put("/:id", function (req, res) {
  const updateFields = req.body; // Assuming the request body contains the fields to be updated

  tasks
    .findOneAndUpdate(
      { taskId: req.params.id },
      { $set: updateFields }, // Assuming you have the updated task value in the request body
      { new: true }
    )
    .then(function (taskId) {
      if (taskId) {
        res.json({ success: "Task Updated" });
      } else {
        res.status(404).json({ success: "404 - Task not found" });
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
