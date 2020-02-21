import { CREATE_ROOM } from '../constants/actionConstants';

import serverApi from '../server-api';

const tryCreatingRoom = (roomName, roomType, onSuccess, onFailure) =>
    async (dispatch) => {
        await serverApi.createRoom(roomName, roomType, (data) => {
            if (data.status === "success") {
                console.log(data.roomId);
                dispatch(createRoom(data.roomId));
                onSuccess();
                console.log("YAY!")
            }
            else {
                onFailure(data.reason);
                console.log("oops: ", data)
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
