import { sendMessage } from '../api/socketIo'
import { messages } from '../api/http'

export default (roomId, message, onSuccess, onFailure) => {
    messages.createMessage(roomId, message, (response) => {
        sendMessage(roomId, response._id)
        onSuccess(response)
    }, onFailure)
}