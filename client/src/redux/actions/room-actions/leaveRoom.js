import { UPDATE_USER_ROOM_MEMBERSHIP } from '../../action-constants'
import { roomMembers } from '../../../api/http'

const cb = () => { }

export default (roomId, currentUserMemberId, onSuccess = cb, onFailure = cb) => async dispatch => {
    roomMembers.leaveRoom(roomId, currentUserMemberId)
        .then(response => {
            console.log({ response })
            onSuccess()
            dispatch({
                type: UPDATE_USER_ROOM_MEMBERSHIP,
                payload: { roomId, isRoomMember: false, membership: response.data }
            })
        }).catch(onFailure)
}