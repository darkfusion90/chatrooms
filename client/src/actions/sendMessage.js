import { sendMessage } from '../server-communication/socketServer'

export default (roomId, message, onSuccessCallback, onFailureCallback) => async dispatch => {
    sendMessage(roomId, message, (response) => {
        if (response.status === 200) {
            console.log('Message Sent. Room updated: ', response.data)
            onSuccessCallback(response)
        }
        else {
            console.log('Error! Message not sent: ', response)
            onFailureCallback(response)
        }
    })
    dispatch({ type: 'yay' })
}