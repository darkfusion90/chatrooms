import { UPDATE_ROOM } from "../actions/types";

export default (state = [], action) => {
    if (action.type === UPDATE_ROOM) {
        return {}
    }

    return state;
}