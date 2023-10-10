import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
//import uuid from "uuid";

import { connect } from "react-redux";
import { getTasks, updateTask } from "../actions/taskActions";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

class TaskList extends Component {
  state = {
    completedTasks: [],
    incompleteTasks: [],
    selectedButton: "", // Keep track of the selected button task
  };

  componentDidMount() {
    this.props.getTasks();
  }

  handleChangeTaskId = (taskId) => {
    this.setState({
      selectedButton: taskId,
    });
    this.props.onSelectedTaskIdChange(taskId);

  };
  render() {
    const { tasks } = this.props.task;
    const completedTasks = tasks.filter((task) => task.completed);
    const uncompletedTasks = tasks.filter((task) => !task.completed);

    return (
      <Container>
        {uncompletedTasks.length > 0 && (
          <>
            <h2>Incomplete Tasks:</h2>
            <hr />
            <ListGroup>
              {uncompletedTasks.map(({ _id, name, taskId }) => (
                <ListGroupItem key={_id} className="taskListItem">
                  <Button
                    className={`task-btn button ${
                      this.state.selectedButton === taskId
                        ? "buttonSelected"
                        : ""
                    }`}
                    onClick={this.handleChangeTaskId.bind(this, taskId)}
                  >
                    {name}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </>
        )}

        {completedTasks.length > 0 && (
          <>
            <h2>Completed Tasks:</h2>
            <hr />
            <ListGroup>
              {completedTasks.map(({ _id, name, taskId }) => (
                <ListGroupItem key={_id} className="taskListItem">
                  <Button
                    className={`task-btn button ${
                      this.state.selectedButton === taskId
                        ? "buttonSelected"
                        : ""
                    }`}
                    onClick={this.handleChangeTaskId.bind(this, taskId)}
                  >
                    {name}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </>
        )}
      </Container>
    );
  }
}

TaskList.propTypes = {
  getTasks: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  onSelectedTaskIdChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  task: state.task,
});

export default connect(mapStateToProps, { getTasks, updateTask })(TaskList);
