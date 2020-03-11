import _ from 'lodash'

import { DELETE_ROOM, FETCH_PUBLIC_ROOMS } from '../constants/actionConstants';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_PUBLIC_ROOMS:
            return action.payload
        case DELETE_ROOM:
            return _.omit(state, action.payload)
        default:
            return state;
    }
}