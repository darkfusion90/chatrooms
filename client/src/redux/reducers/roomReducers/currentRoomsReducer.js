import _ from 'lodash'

import {
    DELETE_ROOM,
    FETCH_PUBLIC_ROOMS,
    FETCH_ROOM,
    UPDATE_ROOM
} from '../../action-constants';


const handleUpdateRoom = (state, room) => {
    return { ...state, [room.roomId]: room }
}

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PUBLIC_ROOMS:
            return _.mapKeys(action.payload, '_id')
        case DELETE_ROOM:
            return _.omit(state, action.payload)
        case UPDATE_ROOM:
            return handleUpdateRoom(state, action.payload)
        default:
            return state;
    }
}