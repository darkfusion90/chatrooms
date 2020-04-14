import { UPDATE_USER_ROOM_ROLE } from "../../action-constants";

export default (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_ROOM_ROLE:
            const { roomId, userRole } = action.payload
            return { ...state, [roomId]: userRole }
        default:
            return state
    }
}