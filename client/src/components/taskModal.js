import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { v1 as uuid } from "uuid";
import { connect } from "react-redux";
import { addTask } from "../actions/taskActions";

import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

class TaskModal extends Component {
  state = {
    modal: false,
    name: "",
    description: "",
    notes: "",
    startDate: new Date(),
    dueDate: new Date(),
    completed: false,
  };

  handleStartDateChange = (date) => {
    this.setState({ startDate: date });
  };

  handleDueDateChange = (date) => {
    this.setState({ dueDate: date });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      userId: 1, // Assuming the user ID is always 1 for now
      taskId: uuid(), // Generate a unique task ID
      name: this.state.name,
      description: this.state.description,
      notes: this.state.notes,
      startDate: this.state.startDate,
      dueDate: this.state.dueDate,
      completed: this.state.completed,
    };
    //Add task via addTask action
    this.props.addTask(newTask);
    // Close the Modal
    this.toggle();
  };
  render() {
    return (
      <div>
        <Button
          color="primary button"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add New Task
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add New Task</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Add Task Name"
                  onChange={this.onChange}
                />
                <Label for="description">Description</Label>
                <Input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="Add Task Description"
                  onChange={this.onChange}
                />
                <Label for="notes">Notes</Label>
                <Input
                  type="text"
                  name="notes"
                  id="notes"
                  placeholder="Add Task Name"
                  onChange={this.onChange}
                />
                <Label for="startDate">Start Date</Label><br/>
                <DateTimePicker
                  id="startDate"
                  value={this.state.startDate}
                  onChange={this.handleStartDateChange}
                  className="custom-datetime-picker"
                /><br/>
                <Label for="dueDate">Due Date</Label><br/>
                <DateTimePicker
                  id="dueDate"
                  value={this.state.dueDate}
                  onChange={this.handleDueDateChange}
                  className="custom-datetime-picker"
                />
                <Button color="primary" style={{ marginTop: "2rem" }} block>
                  Add Task
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.userId,
  taskId: state.taskId,
  name: state.name,
  description: state.description,
  notes: state.notes,
  startDate: state.startDate,
  dueDate: state.dueDate,
  completed: state.completed !== undefined ? state.completed : false,
});
export default connect(mapStateToProps, { addTask })(TaskModal);
