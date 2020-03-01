import { sendMessage } from '../server-communication/socketServer'
import { addMessageToRoom } from '../server-communication/httpServer'

export default (roomId, message, onSuccess, onFailure) => {
    addMessageToRoom(roomId, message, (response) => {
        sendMessage(roomId, response._id)
        onSuccess(response)
    }, onFailure)
}