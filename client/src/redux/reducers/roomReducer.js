import _ from 'lodash'

import {
    DELETE_ROOM,
    FETCH_PUBLIC_ROOMS,
    LEAVE_ROOM,
    JOIN_ROOM,
    FETCH_ROOM
} from '../action-constants';

const handleRoomMemberUpdate = (state, payload) => {
    const { roomId, updatedMembers } = payload
    return {
        ...state,
        [roomId]: {
            ...state[roomId],
            members: updatedMembers
        }
    }
}

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PUBLIC_ROOMS:
            return { ...state, ..._.mapKeys(action.payload, 'roomId') }
        case FETCH_ROOM:
            const room = action.payload
            return { ...state, [room.roomId]: room }
        case DELETE_ROOM:
            return _.omit(state, action.payload)
        case LEAVE_ROOM:
            return handleRoomMemberUpdate(state, action.payload)
        case JOIN_ROOM:
            return handleRoomMemberUpdate(state, action.payload)
        default:
            return state;
    }
}