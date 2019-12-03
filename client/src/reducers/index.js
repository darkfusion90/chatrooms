import { combineReducers } from 'redux';

import connectToServerReducer from './connectToServerReducer';
import recieveMessageReducer from './recieveMessageReducer';

export default combineReducers({
    serverConnection: connectToServerReducer,
    messages: recieveMessageReducer
})