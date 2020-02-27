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

export const joinRoom = (roomId, callback) => {
    return socket.emit(events.ROOM_EVENT, events.JOIN_ROOM, roomId, callback);
}

export const checkUsername = (username, callback) => {
    return socket.emit(events.USER_EVENT, events.CHECK_USERNAME, username, callback)
}

export const sendMessage = (roomId, message, callback) => {
    return socket.emit(events.MESSAGE_EVENT, events.SEND_MESSAGE, roomId, message, callback)
}