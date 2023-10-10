//import { v1 as uuid } from "uuid";
import {
  GET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  TASKS_LOADING,
  GET_TASK_BY_ID,
  SET_TASK_ID,
} from "../actions/constants";

const initialState = {
  loading: false,
  tasks: [],
  selectedTask: null,
};

export const taskReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_TASKS: {
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    }
    case DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    }
    case ADD_TASK: {
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    }
    case GET_TASK_BY_ID: {
      return {
        ...state,
        selectedTask: action.payload,
        loading: false,
      };
    }
    case SET_TASK_ID: {
      return {
        ...state,
        taskValue: action.payload,
      };
    }
    case UPDATE_TASK: {
      const updatedTask = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.taskId === updatedTask.taskId ? updatedTask : task
        ),
      };
    }
    case TASKS_LOADING: {
      return { ...state };
    }
    default: {
      return state;
    }
  }
}
