import { SET_ROOM_LIST_SEARCH_QUERY } from "../../action-constants";

export default (searchQuery) => {
    return {
        type: SET_ROOM_LIST_SEARCH_QUERY,
        payload: searchQuery
    }
}