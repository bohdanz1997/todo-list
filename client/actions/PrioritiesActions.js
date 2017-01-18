import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const PrioritiesActions = {
    loadPriorities() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_PRIORITIES_REQUEST
        });

        api.listPriorities()
        .then(({ data }) => {
            AppDispatcher.dispatch({
                type: Constants.LOAD_PRIORITIES_SUCCESS,
                priorities: data
            });
        })
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_PRIORITIES_FAIL,
                error: err
            })
        );
    }
};

export default PrioritiesActions;
