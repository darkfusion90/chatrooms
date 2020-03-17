import { SET_ROOM_LIST_SORT_TECHNIQUE } from "../constants/actionConstants"

export default (technique) => {
    return {
        type: SET_ROOM_LIST_SORT_TECHNIQUE,
        payload: technique
    }
}