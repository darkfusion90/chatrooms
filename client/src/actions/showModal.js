import { SHOW_MODAL } from '../constants/actionConstants'

export default (modalName, modalProps) => {
    return {
        type: SHOW_MODAL,
        payload: { modalName, modalProps }
    }
}