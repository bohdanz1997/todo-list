import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _categories = [];
let _loadingError = null;
let _isLoading = true;

function formatCategory(cat) {
    return {
        id: cat.id,
        name: cat.name,
        tasks: cat.Tasks
    };
}

const CategoriesStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getCategories() {
      return _categories;
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
        case AppConstants.LOAD_CATEGORIES_REQUEST: {
            _isLoading = true;

            CategoriesStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CATEGORIES_SUCCESS: {
            _isLoading = false;
            _categories = action.categories.map(formatCategory);
            _loadingError = null;

            CategoriesStore.emitChange();
            break;
        }

        case AppConstants.LOAD_CATEGORIES_FAIL: {
            _loadingError = action.error;

            CategoriesStore.emitChange();
            break;
        }

        default: {
            //console.log('No such handler');
        }
    }
});

export default CategoriesStore;
