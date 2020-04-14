import * as roles from '../../../constants/roomMemberRoles'
import { UPDATE_USER_ROOM_ROLE } from '../../action-constants'
import { search } from '../../../api/http'

const determineUserRole = (membershipData) => {
    if (membershipData.length === 0) {
        return roles.NOT_A_MEMBER
    }

    switch (membershipData.payload[0].memberType) {
        case 'participant':
            return roles.PARTICIPANT
        case 'admin':
            return roles.ADMIN
        default:
            return roles.NOT_A_MEMBER
    }
}

const getAction = (roomId, userRole) => {
    return { type: UPDATE_USER_ROOM_ROLE, payload: { roomId, userRole } }
}

export default () => async (dispatch, getState) => {
    const { rooms: { currentRooms }, user: { user } } = getState()
    const currentUserId = user._id

    Object.keys(currentRooms).forEach(roomId => {
        search.searchRoomMember(roomId, currentUserId)
            .then(response => {
                const userRole = determineUserRole(response.data)
                dispatch(getAction(roomId, userRole))
            })
            .catch(_ => dispatch(getAction(roomId, roles.NOT_A_MEMBER)))
    })
}