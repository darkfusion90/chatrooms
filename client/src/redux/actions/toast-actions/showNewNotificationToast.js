import { SHOW_TOAST } from '../../action-constants'

export default () => {
    return {
        type: SHOW_TOAST,
        payload: { name: 'NewNotification' }
    }
}