import { getRoom } from '../../../server-communication/httpServer'
import {
    FETCH_ROOM
} from '../../action-constants'

export default (roomId, onSuccess, onFailure) => dispatch => {
    getRoom(roomId).then(({ data }) => {
        onSuccess(data)
        dispatch({ type: FETCH_ROOM, payload: data })
    }).catch(onFailure)
}