import { JOIN_ROOM } from '../constants/action_constants';

import serverApi from '../server-api';

const joinRoom = (room) => {
    return {
        type: JOIN_ROOM,
        payload: room
    };
}

const tryJoiningRoom =
    (roomId, onSuccess, onPermissionPending, onPermissionRequestCompleted, onFailure) =>
        async dispatch => {
            await serverApi.joinRoom(roomId, (data) => {
                if (data.status === "ok") {
                    dispatch(joinRoom(data.room));
                    onSuccess();
                }
                else if (data.status === "permission_pending") {
                    onPermissionPending();
                    serverApi.onRoomJoinPermissionRecieved(onPermissionRequestCompleted);
                }
                else {
                    onFailure(data.reason);
                }
            });
        }

export default tryJoiningRoom;