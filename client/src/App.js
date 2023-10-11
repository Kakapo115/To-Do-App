import React, { Component } from "react";

import AppNav from "./components/appNav";
import TaskList from "./components/taskList";
import TaskModal from "./components/taskModal";
import SelectedTask from "./components/taskSelected";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "reactstrap";

import TaskFilter from "./components/taskFilter";

import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTaskId: "0",
      filter: "All Tasks",
    };
  }

  componentDidMount() {
    axios.defaults.baseURL = "https://todoapp-6zt6.onrender.com/api";
    axios.defaults.withCredentials = true;
  }

  handleFilterChange = (filter) => {
    let filterString = "";

    if (filter === "") {
      filterString = "All Tasks";
    } else if (filter === "today") {
      filterString = "Today's Tasks";
    } else if (filter === "previous") {
      filterString = "Previous Tasks";
    } else if (filter === "upcoming") {
      filterString = "Upcoming Tasks";
    }

    this.setState({ filter: filterString, selectedTaskId: 0 });
  };

  handleSelectedTaskIdChange = (newTaskId) => {
    this.setState({ selectedTaskId: newTaskId });
    //console.log(this.state.selectedTaskId)
  };

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNav />
          <Container className="app-container">
            <div className="flex-container">
              <div className="flex-item">
                <TaskFilter
                  onFilterChange={this.handleFilterChange}
                  selectedTaskId={this.state.selectedTaskId}
                  onSelectedTaskIdChange={this.handleSelectedTaskIdChange}
                />
              </div>

              <div className="flex-item">
                <h1>{this.state.filter}</h1>
                <hr />
                <TaskModal />
                <hr />
                <TaskList
                  selectedTaskId={this.state.selectedTaskId}
                  onSelectedTaskIdChange={this.handleSelectedTaskIdChange}
                />
              </div>

              <div className="flex-item">
                <SelectedTask
                  selectedTaskId={this.state.selectedTaskId}
                  onSelectedTaskIdChange={this.handleSelectedTaskIdChange}
                />
              </div>
            </div>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
