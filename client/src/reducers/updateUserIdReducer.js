import { UPDATE_USER_ID } from "../actions/types";

export default (state = {}, action) => {
    if (action.type === UPDATE_USER_ID) {
        return { ...state, id: action.payload };
    }
    return state;
}