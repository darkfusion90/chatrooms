import { roomInvitations } from '../../../api/http'
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

        roomInvitations.acceptRoomInvitation(invitationId, onSuccess, onRequestRejected)
    }
}