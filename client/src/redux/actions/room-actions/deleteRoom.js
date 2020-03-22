import { deleteRoom } from '../../../server-communication/httpServer'
import { DELETE_ROOM } from '../../action-constants'

export default (roomId, onSuccess, onFailure) => async dispatch => {
    deleteRoom(roomId).then(_ => {
        onSuccess()
        dispatch({ type: DELETE_ROOM, payload: roomId })
    }).catch(onFailure)
}