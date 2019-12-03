import { UPDATE_ROOM } from "./types";

export default (room) => {
    return {
        type: UPDATE_ROOM,
        payload: room
    }
}