import { leaveRoom } from '../server-communication/httpServer'
import { LEAVE_ROOM } from '../constants/actionConstants'

const getMemberDocOfUser = (room, userId) => {
    for (let i = 0; i < room.members.length; i++) {
        let member = room.members[i]
        if (member && member.user && member.user._id === userId) {
            return member
        }
    }
}

export default (room, onSuccess, onFailure) => (dispatch, getState) => {
    if (!room) {
        return onFailure(new Error({ response: 'Not a room member' }))
    }

    const userId = getState().user.user._id
    let memberDocOfUser = getMemberDocOfUser(room, userId)

    if (!memberDocOfUser) {
        return onFailure(new Error({ response: 'Not a room member' }))
    }

    leaveRoom(room.roomId, memberDocOfUser._id).then(response => {
        dispatch({
            type: LEAVE_ROOM,
            payload: {
                roomId: room.roomId,
                updatedMembers: response.data.members
            }
        })
        onSuccess(response)
    }).catch(onFailure)
}