import { joinRoom } from '../../../server-communication/httpServer'
import { JOIN_ROOM } from '../../action-constants'

export default (roomId, onSuccess, onFailure) => dispatch => {
    joinRoom(roomId).then(({ data }) => {
        dispatch({ type: JOIN_ROOM, payload: { roomId, updatedMembers: data.members } })
        onSuccess()
    }).catch(onFailure)
}