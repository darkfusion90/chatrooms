import { UPDATE_USER_ROOM_MEMBERSHIP } from "../../action-constants";


const handleUpdateRoomMembership = (state, payload) => {
    const { roomId, isRoomMember, membership } = payload
    return {
        ...state,
        [roomId]: { isRoomMember, membership }
    }
}

export default (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_ROOM_MEMBERSHIP:
            return handleUpdateRoomMembership(state, action.payload)
        default:
            return state
    }
}