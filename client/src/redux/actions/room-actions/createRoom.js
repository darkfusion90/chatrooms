import { createRoom } from '../../../server-communication/httpServer';
import { CREATE_ROOM } from '../../action-constants';

export default (roomName, roomType, onSuccess, onFailure) => async (dispatch) => {
    createRoom(
        roomName,
        roomType,
        (response) => {
            dispatch({ type: CREATE_ROOM, payload: response.data })
            onSuccess()
        },
        onFailure,
    )
}