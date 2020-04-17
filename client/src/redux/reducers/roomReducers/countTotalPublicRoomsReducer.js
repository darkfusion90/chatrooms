import { SET_TOTAL_PUBLIC_ROOMS_COUNT } from "../../action-constants";
import initialStates from '../../initial-states'

export default (state = initialStates.rooms.countTotalPublicRooms, action) => {
    switch (action.type) {
        case SET_TOTAL_PUBLIC_ROOMS_COUNT:
            return action.payload
        default:
            return state
    }
}