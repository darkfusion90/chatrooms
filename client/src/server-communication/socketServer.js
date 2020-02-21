import openSocket from 'socket.io-client';
import events from '../constants/serverEventConstants';

const socket = openSocket('/', { autoConnect: false });

export const connectToServer = (onConnectionFailed) => {
    socket.connect();
    socket.on('connect_error', onConnectionFailed);
}

export const onServerConnected = (callback) => {
    socket.on('connect', callback)
}

export const onServerDisconnected = (callback) => {
    socket.on('disconnect', callback)
}

export const onRoomJoinPermissionRecieved = (callback) => {
    socket.on(events.ROOM_EVENT, events.ROOM_JOIN_PERMISSION_RECIEVE, callback);
}

export const onUserIdRecieved = (callback) => {
    socket.on(events.USER_ID_RECIEVE, callback);
}

export const joinRoom = (roomId, callback) => {
    return socket.emit(events.ROOM_EVENT, events.JOIN_ROOM, roomId, callback);
}