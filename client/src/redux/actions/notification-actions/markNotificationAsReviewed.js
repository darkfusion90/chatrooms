import {
    notifications
} from '../../../api/http'
import { UPDATE_NOTIFICATION } from '../../action-constants'

export default (notificationId) => async dispatch => {
    console.log({ notificationId })
    const onSuccess = (response) => {
        dispatch({
            type: UPDATE_NOTIFICATION,
            payload: response.data
        })
    }

    notifications.markNotificationAsReviewed(notificationId, onSuccess)
}
