import { combineReducers } from 'redux';

import connectToServerReducer from './connectToServerReducer';
import recieveMessageReducer from './recieveMessageReducer';
import createRoomReducer from './createRoomReducer';
import updateUserIdReducer from './updateUserIdReducer';

export default combineReducers({
    user: updateUserIdReducer,
    serverConnection: connectToServerReducer,
    room: createRoomReducer,
    messages: recieveMessageReducer
})
