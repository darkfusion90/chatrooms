import { rooms } from '../../../api/http';
import {
    FETCH_ROOM
} from '../../action-constants'

export default (roomId, onSuccess, onFailure) => dispatch => {
    rooms.getRoom(roomId).then(({ data }) => {
        onSuccess(data)
        dispatch({ type: FETCH_ROOM, payload: data })
    }).catch(onFailure)
}