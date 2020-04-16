import {
    SET_ROOM_LIST_SORT_TECHNIQUE,
    SET_ROOM_LIST_ITEMS_PER_PAGE,
    SET_ROOM_LIST_CURRENT_PAGE_NUMBER,
    SET_ROOM_LIST_SEARCH_QUERY
} from '../action-constants'

const INITIAL_STATE = {
    sortBy: 'name-asc',
    itemsPerPage: 10,
    currentPageNumber: 1,
    searchQuery: null
}

const getOffset = (itemsPerPage, pageNumber) => {
    return itemsPerPage * (pageNumber - 1)
}

const getPageNumber = (itemsPerPage, offset) => {
    return Math.floor((offset + itemsPerPage) / itemsPerPage)
}

const adjustCurrentPageNumber = (state, newItemsPerPage) => {
    const offset = getOffset(state.itemsPerPage, state.currentPageNumber)
    const updatedPageNumber = getPageNumber(newItemsPerPage, offset)
    return updatedPageNumber
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ROOM_LIST_SORT_TECHNIQUE:
            return { ...state, sortBy: action.payload }
        case SET_ROOM_LIST_ITEMS_PER_PAGE:
            const newItemsPerPage = action.payload
            return {
                ...state,
                itemsPerPage: newItemsPerPage,
                currentPageNumber: adjustCurrentPageNumber(state, newItemsPerPage)
            }
        case SET_ROOM_LIST_CURRENT_PAGE_NUMBER:
            return { ...state, currentPageNumber: action.payload }
        case SET_ROOM_LIST_SEARCH_QUERY:
            return { ...state, searchQuery: action.payload }
        default:
            return state
    }
}