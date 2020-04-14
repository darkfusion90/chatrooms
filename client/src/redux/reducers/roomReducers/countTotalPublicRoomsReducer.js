import { SET_TOTAL_PUBLIC_ROOMS_COUNT } from "../../action-constants";

export default (state = 0, action) => {
    switch (action.type) {
        case SET_TOTAL_PUBLIC_ROOMS_COUNT:
            return action.payload
        default:
            return state
    }
}