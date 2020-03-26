import { SET_ROOM_LIST_ITEMS_PER_PAGE } from "../../action-constants"

export default (itemsPerPage) => {
    return {
        type: SET_ROOM_LIST_ITEMS_PER_PAGE,
        payload: itemsPerPage
    }
}