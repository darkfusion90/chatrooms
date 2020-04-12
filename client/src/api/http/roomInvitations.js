import axios from './config'


export const sendRoomInvitation = (inviteeUserId, roomId, onRequestFulfilled, onRequestRejected) => {
    return axios.post(
        '/api/room_invitations',
        { invitee: inviteeUserId, roomId }
    ).then(onRequestFulfilled).catch(onRequestRejected)
}

export const acceptRoomInvitation = (invitationId, onRequestFulfilled, onRequestRejected) => {
    return axios.post(`/api/room_invitations/${invitationId}/accept`)
        .then(onRequestFulfilled).catch(onRequestRejected)
}