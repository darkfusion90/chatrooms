import { SET_ROOM_LIST_CURRENT_PAGE_NUMBER } from "../../action-constants"

export default (currentPageNumber) => {
    return {
        type: SET_ROOM_LIST_CURRENT_PAGE_NUMBER,
        payload: currentPageNumber
    }
}