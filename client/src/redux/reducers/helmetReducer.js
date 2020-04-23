import { SET_DOCUMENT_TITLE } from '../action-constants'
import initialStates from '../initial-states'


export default (state = initialStates.helmet, action) => {
    switch (action.type) {
        case SET_DOCUMENT_TITLE:
            return { ...state, title: action.payload }
        default:
            return state
    }
}