import { DELETE_ROOM } from '../../action-constants'
import { rooms } from '../../../api/http';

export default (roomId, onSuccess, onFailure) => async dispatch => {
    rooms.deleteRoom(roomId).then(_ => {
        onSuccess()
        dispatch({ type: DELETE_ROOM, payload: roomId })
    }).catch(onFailure)
}