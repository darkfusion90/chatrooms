import { UPDATE_USER_ROOM_MEMBERSHIP } from '../../action-constants'
import { roomMembers } from '../../../api/http'


const getAction = (roomId) => {
    return {
        type: UPDATE_USER_ROOM_MEMBERSHIP,
        payload: { roomId }
    }
}

export default (roomId, onSuccess, onFailure) => dispatch => {
    roomMembers.joinRoom(roomId).then(_ => {
        dispatch(getAction(roomId))
        onSuccess()
    }).catch(onFailure)
}