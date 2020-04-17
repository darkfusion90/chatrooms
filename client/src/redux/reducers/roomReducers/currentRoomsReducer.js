import _ from 'lodash'

import {
    DELETE_ROOM,
    FETCH_PUBLIC_ROOMS,
    UPDATE_ROOM
} from '../../action-constants';
import initialStates from '../../initial-states'

const handleUpdateRoom = (state, room) => {
    //This state (currentRooms) records the rooms displayed to user at a particular instance
    //However, the user may be interacting with a different room 
    //Example: maybe a room in page 2 is being operated but the list is in page 1.
    //Hence, to avoid adding that 'page-2-room' here in page 1 (arbitrary)
    //we update the room only if it already exists in the state
    const isRoomPresentInState = () => {
        return state[room._id]
    }

    if (isRoomPresentInState()) {
        return { ...state, [room._id]: room }
    }

    return state
}

export default (state = initialStates.rooms.currentRooms, action) => {
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