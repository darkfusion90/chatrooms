import { combineReducers } from 'redux';

import serverReducer from './serverReducer';
import messageReducer from './messageReducer';
import roomReducer from './roomReducer';
import updateUserIdReducer from './updateUserIdReducer';

export default combineReducers({
    user: updateUserIdReducer,
    serverConnection: serverReducer,
    roomMetadata: roomReducer,
    messages: messageReducer
})
