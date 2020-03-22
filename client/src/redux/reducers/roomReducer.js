import _ from 'lodash'

import { DELETE_ROOM, FETCH_PUBLIC_ROOMS, LEAVE_ROOM } from '../action-constants';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_PUBLIC_ROOMS:
            return { ...state, ..._.mapKeys(action.payload, 'roomId') }
        case DELETE_ROOM:
            return _.omit(state, action.payload)
        case LEAVE_ROOM:
            const { roomId, updatedMembers } = action.payload
            console.log('mems: ', updatedMembers)
            const roomLeft = state[roomId]
            if (!roomLeft) {
                return state
            }
            roomLeft.members = updatedMembers
            return { ...state, [roomId]: roomLeft }
        default:
            return state;
    }
}