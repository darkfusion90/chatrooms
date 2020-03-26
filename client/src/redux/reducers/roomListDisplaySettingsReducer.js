import {
    SET_ROOM_LIST_SORT_TECHNIQUE,
    SET_ROOM_LIST_ITEMS_PER_PAGE,
    SET_ROOM_LIST_CURRENT_PAGE_NUMBER
} from '../action-constants'

const INITIAL_STATE = {
    sortBy: 'name-asc',
    itemsPerPage: 10,
    currentPageNumber: 1
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ROOM_LIST_SORT_TECHNIQUE:
            return { ...state, sortBy: action.payload }
        case SET_ROOM_LIST_ITEMS_PER_PAGE:
            return { ...state, itemsPerPage: action.payload }
        case SET_ROOM_LIST_CURRENT_PAGE_NUMBER:
            return { ...state, currentPageNumber: action.payload }
        default:
            return state
    }
}