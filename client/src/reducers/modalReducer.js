import { SHOW_MODAL, HIDE_MODAL } from '../constants/actionConstants'

const INITIAL_STATE = {
    modal: {
        open: false,
        name: null
    }
}

export default (state, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                modal: {
                    open: true,
                    name: action.payload
                }
            }

        case HIDE_MODAL:
            return INITIAL_STATE

        default:
            return state
    }
}