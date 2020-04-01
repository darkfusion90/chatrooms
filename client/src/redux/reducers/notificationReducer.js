import _ from 'lodash'
import { FETCH_ALL_NOTIFICATIONS } from '../action-constants';

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
        default:
            return state;
    }
}