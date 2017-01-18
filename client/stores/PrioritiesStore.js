import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _priorities = [];
let _loadingError = null;
let _isLoading = true;

function formatPriority(pr) {
    const ret = {
        id: pr.id,
        name: pr.name
    };
    return ret;
}

const PrioritiesStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getPriorities() {
        return _priorities;
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
        case AppConstants.LOAD_PRIORITIES_REQUEST: {
            _isLoading = true;

            PrioritiesStore.emitChange();
            break;
        }

        case AppConstants.LOAD_PRIORITIES_SUCCESS: {
            _isLoading = false;
            _priorities = action.priorities.map( formatPriority );
            _loadingError = null;

            PrioritiesStore.emitChange();
            break;
        }

        case AppConstants.LOAD_PRIORITIES_FAIL: {
            _loadingError = action.error;

            PrioritiesStore.emitChange();
            break;
        }

        default: {
            //console.log('No such handler');
        }
    }
});

export default PrioritiesStore;
