import _ from 'lodash'

import { DELETE_ROOM, FETCH_PUBLIC_ROOMS, LEAVE_ROOM, JOIN_ROOM } from '../action-constants';

const handleRoomMemberUpdate = (state, payload) => {
    const { roomId, updatedMembers } = payload
    //TODO: copy by value, not reference
    const roomToUpdate = state[roomId]
    if (!roomToUpdate) {
        return state
    }

    roomToUpdate.members = updatedMembers
    return { ...state, [roomId]: roomToUpdate }
}

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PUBLIC_ROOMS:
            return { ...state, ..._.mapKeys(action.payload, 'roomId') }
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