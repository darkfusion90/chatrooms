import { SHOW_MODAL, HIDE_MODAL } from '../constants/actionConstants'

const INITIAL_STATE = {
    isModalOpen: false,
    modalName: null,
    modalProps: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                isModalOpen: true,
                ...action.payload
            }

        case HIDE_MODAL:
            return INITIAL_STATE

        default:
            return state
    }
}