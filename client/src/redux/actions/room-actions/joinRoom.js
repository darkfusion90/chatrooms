import { JOIN_ROOM } from '../../action-constants'
import { rooms } from '../../../api/http'


export default (roomId, onSuccess, onFailure) => dispatch => {
    rooms.joinRoom(roomId).then(({ data }) => {
        dispatch({ type: JOIN_ROOM, payload: { roomId, updatedMembers: data.members } })
        onSuccess()
    }).catch(onFailure)
}