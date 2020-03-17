import { SET_ROOM_LIST_SORT_TECHNIQUE } from "../constants/actionConstants"

const INITIAL_STATE = 'name-asc'

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ROOM_LIST_SORT_TECHNIQUE:
            return action.payload
        default:
            return state
    }
}