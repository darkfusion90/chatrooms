import { getAllNotifications } from '../../../server-communication/httpServer'
import { FETCH_ALL_NOTIFICATIONS } from '../../action-constants'

export default () => async dispatch => {
    const onFulfilled = ({ data }) => {
        console.log('actions notif: ', data)
        dispatch({ type: FETCH_ALL_NOTIFICATIONS, payload: data })
    }

    getAllNotifications(onFulfilled,
        ({ response }) => console.log('notification fetch failed: ', response)
    )
}