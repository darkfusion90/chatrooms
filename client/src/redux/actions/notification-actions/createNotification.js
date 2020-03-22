import crypto from 'crypto'
import { CREATE_NOTIFICATION } from '../../action-constants'

export default (title, content, actions) => {
    return {
        type: CREATE_NOTIFICATION,
        payload: { id: crypto.randomBytes(8), title, content, actions }
    }
}