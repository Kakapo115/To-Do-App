import axios from "axios";
import {
  GET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  TASKS_LOADING,
  GET_TASK_BY_ID,
  SET_TASK_ID,
} from "./constants";

export const getTasks = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(setTasksLoading());
      axios.get("/tasks")
        .then((res) => {
          dispatch({
            type: GET_TASKS,
            payload: res.data,
          });
          resolve(); // Resolve the promise
        })
        .catch((err) => {
          console.error('Error fetching tasks:', err);
          reject(err); // Reject the promise
        });
    });
  };
};

export const setTaskId = (taskId) => ({
  type: SET_TASK_ID,
  payload: taskId,
});

export const getTaskById = (taskId) => (dispatch) => {
  dispatch(setTasksLoading());
  axios.get(`/tasks/${taskId}`).then((res) => {
    dispatch({
      type: GET_TASK_BY_ID,
      payload: res.data,
    });
  });
};

export const deleteTask = (taskId) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/tasks/${taskId}`)
      .then((res) => {
        dispatch({
          type: DELETE_TASK,
          payload: taskId,
        });
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addTask = (task) => (dispatch) => {
  axios.post("/tasks", task).then((res) =>
    dispatch({
      type: ADD_TASK,
      payload: res.data,
    })
  );
};

export const setTasksLoading = () => {
  return {
    type: TASKS_LOADING,
  };
};

export const updateTask = (taskId, updatedTask) => (dispatch) => {
  axios.put(`/tasks/${taskId}`, updatedTask).then((res) => {
    dispatch({
      type: UPDATE_TASK,
      payload: res.data,
    });
  });
};

export const filterTasksByDueDate = (filterType) => (dispatch) => {
  dispatch(setTasksLoading());
  axios.get(`/tasks?filter=${filterType}`).then((res) =>
    dispatch({
      type: GET_TASKS,
      payload: res.data,
    })
  );
};