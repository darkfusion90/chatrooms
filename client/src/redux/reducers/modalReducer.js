import { SHOW_MODAL, HIDE_MODAL } from '../action-constants'
import initialStates from '../initial-states'


export default (state = initialStates.modal, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                isModalOpen: true,
                ...action.payload
            }

        case HIDE_MODAL:
            return initialStates.modal

        default:
            return state
    }
}