import { UPDATE_USER_ROOM_MEMBERSHIP } from '../../action-constants'
import { roomMembers, search } from '../../../api/http'


const getResponseData = ({ data }) => data


const getUserRoomMemberData = async (roomId, userId) => {
    const searchResult = await search.searchRoomMember(roomId, userId).then(getResponseData)

    if (searchResult.length === 0) {
        return null
    }

    return searchResult.payload[0]
}


export default (room, onSuccess, onFailure) => async (dispatch, getState) => {
    const { user: { user } } = getState()

    try {
        const roomMemberData = await getUserRoomMemberData(room._id, user._id)
        roomMembers.leaveRoom(room._id, roomMemberData._id)
            .then(_ => {
                onSuccess()
                dispatch({ type: UPDATE_USER_ROOM_MEMBERSHIP, payload: room._id })
            }).catch(onFailure)
    } catch (err) {
        onFailure(err)
    }
}