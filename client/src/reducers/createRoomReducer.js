import { CREATE_ROOM } from "../actions/types";

export default (state = null, action) => {
    if (action.type === CREATE_ROOM) {
        return { ...action.payload };
    }
    return state;
}