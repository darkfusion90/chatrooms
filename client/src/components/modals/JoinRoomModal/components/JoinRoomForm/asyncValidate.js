import isEmpty from 'is-empty'
import { rooms } from '../../../../../api/http'

const createError = (reason, isPrivateRoomError) => {
    return { roomId: { reason, isAsyncValidationError: true, isPrivateRoomError } }
}

const getErrorFromResponse = (response) => {
    switch (response.status) {
        case 403:
            return createError('This is a private room. You need to send a join request', true)
        case 404:
            return createError('No rooms matching that roomId')
        default:
            return createError('Some error ocurred; Please try again after sometime')
    }
}

export default (values) => {
    const promise = new Promise((resolve, reject) => {
        if (isEmpty(values.roomId)) {
            return reject(createError('No rooms matching that roomId'))
        }

        rooms.getRoom(values.roomId)
            .then(resolve)
            .catch(({ response }) => {
                reject(getErrorFromResponse(response))
            })
    })

    return promise
}