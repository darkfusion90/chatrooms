import { CREATE_ROOM } from '../constants/actionConstants';

import { createRoom } from '../server-communication/httpServer';

const attemptCreatingRoom = (roomName, roomType, onSuccess, onFailure) => async (dispatch) => {
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

export default attemptCreatingRoom;
