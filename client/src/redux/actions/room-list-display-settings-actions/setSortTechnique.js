import { SET_ROOM_LIST_SORT_TECHNIQUE } from "../../action-constants"

export default (technique) => {
    return {
        type: SET_ROOM_LIST_SORT_TECHNIQUE,
        payload: technique
    }
}