import {
    DELETE_ROOM,
    UPDATE_USER_ROOM_MEMBERSHIP,
    UPDATE_ROOM,
    SET_ACTIVE_ROOM
} from "../../action-constants";
import initialStates from '../../initial-states'


const handleDeleteRoom = (state, roomId) => {
    if (roomId === state.room._id) {
        return initialStates.rooms.activeRoom
    }
    return state
}

const handleUpdateRoom = (state, roomToUpdate) => {
    if (roomToUpdate._id === state.room._id) {
        return { ...state, room: roomToUpdate }
    }
    return state
}

const handleUpdateUserRole = (state, { roomId, ...currentUserRoomMembership }) => {
    if (roomId === state.room._id) {
        return { ...state, currentUserRoomMembership }
    }

    return state
}


export default (state = initialStates.rooms.activeRoom, action) => {
    switch (action.type) {
        case SET_ACTIVE_ROOM:
            return { ...state, room: action.payload }
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