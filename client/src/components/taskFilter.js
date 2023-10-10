import React, { Component } from "react";
import { connect } from "react-redux";
import { filterTasksByDueDate } from "../actions/taskActions";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

class TaskFilter extends Component {
  state = {
    selectedFilter: "all", // Keep track of the selected filter
  };

  handleFilter = (filterType) => {
    if (filterType === "all") {
      this.props.onFilterChange(""); // Set filter to empty string for "all" filter
    } else {
      this.props.onFilterChange(filterType);
    }
    this.props.filterTasksByDueDate(filterType);
    this.handleChangeTaskId("0");
    this.setState({ selectedFilter: filterType }); // Update the selected filter
  };

  handleChangeTaskId = (taskId) => {
    const newTaskId = taskId; // New value
    this.props.onSelectedTaskIdChange(newTaskId);
  };

  render() {
    const { selectedFilter } = this.state;

    return (
      <div>
        <h3>Task Filter</h3>
        <hr />
        <Button
          onClick={() => this.handleFilter("all")}
          className={selectedFilter === "all" ? "button buttonSelected" : "button"}
        >
          All Tasks <FontAwesomeIcon icon={faArrowRight} />
        </Button>
        <hr />
        <Button
          onClick={() => this.handleFilter("today")}
          className={selectedFilter === "today" ? "button buttonSelected" : "button"}
        >
          Todays Tasks <FontAwesomeIcon icon={faArrowRight} />
        </Button>{" "}
        <hr />
        <Button
          onClick={() => this.handleFilter("previous")}
          className={
            selectedFilter === "previous" ? "button buttonSelected" : "button"
          }
        >
          Previous Tasks
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>{" "}
        <hr />
        <Button
          onClick={() => this.handleFilter("upcoming")}
          className={
            selectedFilter === "upcoming" ? "button buttonSelected" : "button"
          }
        >
          Upcoming Tasks
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
    );
  }
}

TaskFilter.propTypes = {
  filterTasksByDueDate: PropTypes.func.isRequired,
  onSelectedTaskIdChange: PropTypes.func.isRequired,
};

export default connect(null, { filterTasksByDueDate })(TaskFilter);
