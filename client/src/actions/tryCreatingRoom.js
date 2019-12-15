import { CREATE_ROOM } from '../constants/action_constants';

import serverApi from '../server-api';

const tryCreatingRoom = (roomName, roomType, onSuccess, onFailure) =>
    async (dispatch, getState) => {
        await serverApi.createRoom(roomName, roomType, getState().user.id, (data) => {
            if (data.status === "ok") {
                console.log(data.room);
                dispatch(createRoom(data.room));
                onSuccess();
            }
            else {
                onFailure(data.reason);
            }
        });
    }

const createRoom = (createdRoom) => {
    return {
        type: CREATE_ROOM,
        payload: createdRoom
    };
}

export default tryCreatingRoom;
