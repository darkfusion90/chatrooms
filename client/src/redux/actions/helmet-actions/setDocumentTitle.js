import { SET_DOCUMENT_TITLE } from '../../action-constants'

export default (title) => {
    return {
        type: SET_DOCUMENT_TITLE,
        payload: title
    }
}