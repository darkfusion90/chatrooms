import { UPDATE_USER_ID } from "../constants/action_constants";

export default (state = {}, action) => {
    if (action.type === UPDATE_USER_ID) {
        return { ...state, id: action.payload };
    }
    return state;
}