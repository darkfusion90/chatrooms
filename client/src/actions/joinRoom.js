import { CREATE_ROOM } from './types';

import serverApi from '../server-api';

export default (roomName, roomType) => async (dispatch, getState) => {
    await serverApi.createRoom(roomName, roomType, getState().user.id, (data) => {
        console.log("Create room");
        console.log(data);
        dispatch({
            type: CREATE_ROOM,
            payload: {
                status: data.status,
                room: {
                    id: data.room.id,
                    name: roomName,
                    type: roomType
                }
            }
        });
    });
}