import { CREATE_ROOM } from '../../action-constants';
import { rooms } from '../../../api/http';

export default (roomName, roomType, onSuccess, onFailure) => async (dispatch) => {
    rooms.createRoom(
        roomName,
        roomType,
        (response) => {
            dispatch({ type: CREATE_ROOM, payload: response.data })
            onSuccess()
        },
        onFailure,
    )
}