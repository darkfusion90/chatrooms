import {
    DELETE_ROOM,
    UPDATE_USER_ROOM_MEMBERSHIP,
    UPDATE_ROOM,
    SET_ACTIVE_ROOM,
    FETCH_ROOM_MESSAGES
} from "../../action-constants";
import initialStates from '../../initial-states'


const getRoomIdInState = (state) => {
    return state.room && state.room._id
}

const handleDeleteRoom = (state, roomId) => {
    if (roomId === getRoomIdInState(state)) {
        return initialStates.rooms.activeRoom
    }
    return state
}

const handleUpdateRoom = (state, roomToUpdate) => {
    if (roomToUpdate._id === getRoomIdInState(state)) {
        return { ...state, room: roomToUpdate }
    }
    return state
}

const handleUpdateUserRole = (state, { roomId, ...currentUserRoomMembership }) => {
    if (roomId === getRoomIdInState(state)) {
        return { ...state, currentUserRoomMembership }
    }

    return state
}

const handleFetchRoomMessages = (state, { roomId, roomMessages }) => {
    if (roomId === getRoomIdInState(state)) {
        return { ...state, messages: roomMessages }
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
        case FETCH_ROOM_MESSAGES:
            return handleFetchRoomMessages(state, action.payload)
        default:
            return state
    }
}