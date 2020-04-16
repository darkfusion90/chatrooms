import {
    DELETE_ROOM,
    UPDATE_USER_ROOM_MEMBERSHIP,
    UPDATE_ROOM
} from "../../action-constants";


const INITIAL_STATE = {
    room: {},
    currentUserRoomMembership: {
        isRoomMember: false,
        meta: {}
    }
}


const handleDeleteRoom = (state, roomId) => {
    if (roomId === state.room._id) {
        return INITIAL_STATE
    }
    return state
}

const handleUpdateRoom = (state, roomToUpdate) => {
    if (roomToUpdate._id === state.room._id) {
        return { ...state, room: roomToUpdate }
    }
    return state
}

const handleUpdateUserRole = (state, { roomId, membershipDetails }) => {
    if (roomId === state.room._id) {
        return { ...state, currentUserRoomMembership: membershipDetails }
    }
    return state
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DELETE_ROOM:
            return handleDeleteRoom(state, action.payload)
        case UPDATE_ROOM:
            return handleUpdateRoom(state, action.payload)
        case UPDATE_USER_ROOM_MEMBERSHIP:
            return handleUpdateUserRole(state, action.payload)
        default:
            return state
    }
}