import { messages } from '../../../api/http'
import { FETCH_ROOM_MESSAGES } from '../../action-constants'


const getAction = (roomId, roomMessages) => {
    return {
        type: FETCH_ROOM_MESSAGES,
        payload: { roomId, roomMessages }
    }
}

export default (roomId, onFailure) => async dispatch => {
    try {
        const resp = await messages.getAllMessagesInRoom(roomId)
        dispatch(getAction(roomId, resp.data.messages))
    } catch (err) {
        console.log('Error: ', err)
        onFailure && onFailure(err)
    }
}