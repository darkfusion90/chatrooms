import { SHOW_MODAL } from '../../action-constants'

export default (modalName, modalProps) => {
    return {
        type: SHOW_MODAL,
        payload: { modalName, modalProps }
    }
}