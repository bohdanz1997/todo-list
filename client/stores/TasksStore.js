import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _tasks = [];
let _loadingError = null;
let _isLoading = true;

function formatTask(task) {
    return {
        id: task.id,
        name: task.name,
        category: task.Category,
        categoryId: task.CategoryId,
        isDone: task.isDone,
        priority: task.Priority,
        priorityId: task.PriorityId
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getTasks() {
        return _tasks;
    },

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_TASKS_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_TASKS_SUCCESS: {
            _isLoading = false;
            _tasks = action.tasks.map( formatTask );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_TASKS_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        default: {
            //console.log('No such handler');
        }
    }
});

export default TasksStore;
