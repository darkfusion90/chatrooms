import { deleteRoom } from '../server-communication/httpServer'
import { DELETE_ROOM } from '../constants/actionConstants'

export default (roomId, onSuccess, onFailure) => async dispatch => {
    deleteRoom(roomId).then(_ => {
        onSuccess()
        dispatch({ type: DELETE_ROOM, payload: roomId })
    }).catch(onFailure)
}