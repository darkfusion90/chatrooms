import { rooms } from '../../../api/http';
import { SET_ACTIVE_ROOM } from '../../action-constants'

export default (roomId, onFailure) => dispatch => {
    rooms.getRoom(roomId).then(({ data }) => {
        dispatch({ type: SET_ACTIVE_ROOM, payload: data })
    }).catch(onFailure)
}