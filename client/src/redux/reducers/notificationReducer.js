import _ from 'lodash'
import {
    FETCH_ALL_NOTIFICATIONS,
    UPDATE_NOTIFICATION
} from '../action-constants';

const INITIAL_STATE = { length: 0, data: {} }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_NOTIFICATIONS:
            const data = action.payload
            return {
                ...state,
                length: data.length,
                data: _.mapKeys(data, '_id')
            }
        case UPDATE_NOTIFICATION:
            const notification = action.payload
            return {
                ...state,
                data: {
                    ...state.data,
                    [notification._id]: notification
                }
            }
        default:
            return state;
    }
}