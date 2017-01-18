import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {

  listCategories() {
    return axios.get(`${apiPrefix}/category`);
  },

  createCategory(data) {
    return axios.post(`${apiPrefix}/category`, data);
  },

  deleteCategory(categoryId) {
    return axios.delete(`${apiPrefix}/category/${categoryId}`);
  },

  listTasks() {
    return axios.get(`${apiPrefix}/task`);
  },

  getTask(id) {
    return axios.get(`${apiPrefix}/task/${id}`);
  },

  createTask(data) {
    return axios.post(`${apiPrefix}/task`, data);
  },

  editTask(data) {
    return axios.post(`${apiPrefix}/task/edit`, data);
  },

  deleteTask(taskId) {
    return axios.delete(`${apiPrefix}/task/${taskId}`);
  },

  listPriorities() {
    return axios.get(`${apiPrefix}/priority`);
  }
}
