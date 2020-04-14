import _ from 'lodash'

import {
    DELETE_ROOM,
    FETCH_PUBLIC_ROOMS,
    LEAVE_ROOM,
    JOIN_ROOM,
    FETCH_ROOM,
    UPDATE_ROOM
} from '../../action-constants';


const handleRoomMemberUpdate = (state, payload) => {
    const { roomId, updatedMembers } = payload
    return {
        ...state,
        [roomId]: {
            ...state.rooms[roomId],
            members: updatedMembers
        }
    }
}

const addRoomToState = (state, room) => {
    return { ...state, [room.roomId]: room }
}

export default (state={}, action) => {
    switch (action.type) {
        case FETCH_PUBLIC_ROOMS:
            return { ...state, ..._.mapKeys(action.payload, '_id'), }
        case FETCH_ROOM:
            return addRoomToState(state, action.payload)
        case DELETE_ROOM:
            return _.omit(state, action.payload)
        case LEAVE_ROOM:
            return handleRoomMemberUpdate(state, action.payload)
        case JOIN_ROOM:
            return handleRoomMemberUpdate(state, action.payload)
        case UPDATE_ROOM:
            return addRoomToState(state, action.payload)
        default:
            return state;
    }
}