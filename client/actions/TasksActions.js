import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

import CategoriesActions from "./CategoriesActions";

const TasksActions = {

  loadTasks() {
      AppDispatcher.dispatch({
          type: Constants.LOAD_TASKS_REQUEST
      });

      api.listTasks()
      .then(({ data }) => {
          AppDispatcher.dispatch({
              type: Constants.LOAD_TASKS_SUCCESS,
              tasks: data
          })
      })
      .catch(err =>
          AppDispatcher.dispatch({
              type: Constants.LOAD_TASKS_FAIL,
              error: err
          })
      );
  },

  createTask(task) {
    api.createTask(task)
    .then(() => {
      this.loadTasks();
      CategoriesActions.loadCategories();
    })
    .catch(err => console.error(err));
  },

  editTask(task) {
    api.editTask(task)
    .then(() => {
      this.loadTasks();
      CategoriesActions.loadCategories();
    })
    .catch(err =>
      console.error(err)
    );
  },

  deleteTask(taskId) {
      api.deleteTask(taskId)
      .then(() => {
          this.loadTasks();
          CategoriesActions.loadCategories();
      })
      .catch(err =>
          console.error(err)
      );
  }
};

export default TasksActions;
