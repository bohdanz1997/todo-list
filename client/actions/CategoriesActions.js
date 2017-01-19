import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import TasksActions from "./TasksActions";

import api from '../api';

const CategoriesActions = {
    loadCategories() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_CATEGORIES_REQUEST
        });

        api.listCategories()
        .then(({ data }) => {
            AppDispatcher.dispatch({
                type: Constants.LOAD_CATEGORIES_SUCCESS,
                categories: data
            })
        })
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_CATEGORIES_FAIL,
                error: err
            })
        );
    },

    createCategory(task) {
        api.createCategory(task)
        .then(() =>
            this.loadCategories()
        )
        .catch(err =>
            console.error(err)
        );
    },

    editCategory(cat) {
      api.editCategory(cat)
      .then(() =>
        this.loadCategories()
      )
      .catch(err =>
        console.error(err)
      );
    },

    deleteCategory(categoryId) {
      AppDispatcher.dispatch({
          type: Constants.DELETE_CATEGORIES_REQUEST
      });

      api.deleteCategory(categoryId)
      .then(() => {
          AppDispatcher.dispatch({
              type: Constants.DELETE_CATEGORIES_SUCCESS
          });
          this.loadCategories();
          TasksActions.loadTasks();
      })
      .catch(err =>
          AppDispatcher.dispatch({
              type: Constants.DELETE_CATEGORIES_FAIL,
              error: err
          })
      );
    }
};

export default CategoriesActions;
