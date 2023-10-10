import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getTaskById,
  updateTask,
  getTasks,
  deleteTask,
} from "../actions/taskActions";
import PropTypes from "prop-types";
import { Container, Button, Label, Input } from "reactstrap";

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

class TaskSelected extends Component {
  state = {
    userId: "",
    taskId: "",
    name: "",
    description: "",
    notes: "",
    startDate: new Date(),
    dueDate: new Date(),
    completed: false,
  };

  componentDidMount() {
    if (this.props.selectedTaskId !== "0") {
      this.fetchTaskById();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedTaskId !== this.props.selectedTaskId) {
      if (this.props.selectedTaskId !== "0") {
        this.fetchTaskById();
      }
    }
    if (prevProps.task.selectedTask !== this.props.task.selectedTask) {
      const selectedTask = this.props.task.selectedTask;
      if (selectedTask) {
        this.setState({
          userId: selectedTask.userId,
          taskId: selectedTask.taskId,
          name: selectedTask.name,
          description: selectedTask.description,
          notes: selectedTask.notes,
          startDate: selectedTask.startDate,
          dueDate: selectedTask.dueDate,
          completed: selectedTask.completed,
        });
      }
    }
  }

  fetchTaskById() {
    const { selectedTaskId, getTaskById } = this.props;
    getTaskById(selectedTaskId);
  }

  handleStartDateChange = (date) => {
    this.setState({ startDate: date });
  };

  handleDueDateChange = (date) => {
    this.setState({ dueDate: date });
  };

  handleCompletedChange = (e) => {
    this.setState({ completed: e.target.checked });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  saveChangeSubmitted = (e) => {
    e.preventDefault();
    const { selectedTask } = this.props.task;

    const updatedTask = {};
    for (const key in this.state) {
      if (this.state[key] !== selectedTask[key]) {
        updatedTask[key] = this.state[key];
      }
    }

    // Add task via updateTask action
    this.props.updateTask(selectedTask.taskId, updatedTask);
    this.props.getTasks();
  };

  onDelete = (taskId) => {
    this.props
      .deleteTask(taskId)
      .then(() => {
        // Call getTasks action after deleting a task
        this.props.getTasks();
      })
      .catch((error) => {
        // Handle error if deleteTask fails
        console.log("Error deleting task:", error);
      });
    this.handleChangeTaskId("0");
  };

  handleChangeTaskId = (taskId) => {
    const newTaskId = taskId; // New value
    this.props.onSelectedTaskIdChange(newTaskId);
  };

  render() {
    const { selectedTask } = this.props.task;

    if (!selectedTask || this.props.selectedTaskId === "0") {
      return <div>No task selected</div>;
    }

    return (
      <Container>
        <h2>Task Details</h2>
        <hr />
        <Label for="taskId">Task ID:</Label>
        <br />
        <Label id="taskId" name="taskId">
          {this.state.taskId}
        </Label>
        <hr />
        <Label for="userId">User ID:</Label>
        <br />
        <Label id="userId" name="userId">
          {this.state.userId}
        </Label>
        <hr />
        <Label for="name">Name:</Label>
        <Input
          id="name"
          name="name"
          value={this.state.name}
          onChange={this.onChange}
        />
        <hr />
        <Label for="description">Description:</Label>{" "}
        <Input
          id="description"
          name="description"
          value={this.state.description}
          onChange={this.onChange}
        />
        <hr />
        <Label for="notes">Notes:</Label>
        <Input
          id="notes"
          name="notes"
          value={this.state.notes}
          onChange={this.onChange}
        />
        <hr />
        <Label for="startDate">Start Date:</Label>
        <br />
        <DateTimePicker
          id="startDate"
          name="startDate"
          value={this.state.startDate}
          onChange={this.handleStartDateChange}
          className="custom-datetime-picker"
        ></DateTimePicker>
        <hr />
        <Label for="dueDate">Due Date:</Label>
        <br />
        <DateTimePicker
          id="dueDate"
          name="dueDate"
          value={this.state.dueDate}
          onChange={this.handleDueDateChange}
          className="custom-datetime-picker"
        ></DateTimePicker>
        <hr />
        <Label for="completed">Completed: </Label>
        <Input
          id="completed"
          type="checkbox"
          checked={this.state.completed}
          onChange={this.handleCompletedChange}
        ></Input>
        <hr />
        <Button
          onClick={this.saveChangeSubmitted}
          className="saveButton button"
        >
          Save Change/s
        </Button>
        <Button
          className="deleteButton button"
          onClick={this.onDelete.bind(this, this.state.taskId)}
        >
          Delete Task &times;
        </Button>
      </Container>
    );
  }
}

TaskSelected.propTypes = {
  selectedTaskId: PropTypes.string.isRequired,
  getTaskById: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  task: state.task,
});

export default connect(mapStateToProps, {
  getTaskById,
  updateTask,
  getTasks,
  deleteTask,
})(TaskSelected);
