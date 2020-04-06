import { acceptRoomInvitation } from '../../../server-communication/httpServer'
import { UPDATE_ROOM } from '../../action-constants'

export default (invitationId, onRequestFulfilled, onRequestRejected) => {
    return async dispatch => {
        const onSuccess = (response) => {
            dispatch({
                type: UPDATE_ROOM,
                payload: response.data
            })
            onRequestFulfilled(response)
        }

        acceptRoomInvitation(invitationId, onSuccess, onRequestRejected)
    }
}