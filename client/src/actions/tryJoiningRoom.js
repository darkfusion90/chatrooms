import { JOIN_ROOM } from '../constants/actionConstants';

import { joinRoom } from '../server-communication/socketServer';

const tryJoiningRoom =
    (roomId, onSuccess, onPermissionPending, onPermissionRequestCompleted, onFailure) =>
        async dispatch => {
            await joinRoom(roomId, (data) => {
                if (data.status === "ok") {
                    dispatch({ type: JOIN_ROOM, payload: roomId });
                    onSuccess();
                }
                else if (data.status === "permission_pending") {
                    onPermissionPending();
                    //onRoomJoinPermissionRecieved(onPermissionRequestCompleted);
                }
                else {
                    onFailure(data.reason);
                }
            });
        }

export default tryJoiningRoom;