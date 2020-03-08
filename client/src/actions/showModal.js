import { SHOW_MODAL } from '../constants/actionConstants'

export default (modalName) => {
    return {
        type: SHOW_MODAL,
        payload: modalName
    }
}