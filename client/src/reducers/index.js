import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import serverReducer from './serverReducer';
import roomReducer from './roomReducer';
import notificationReducer from './notificationReducer';
import userReducer from './userReducer';

export default combineReducers({
    user: userReducer,
    serverConnection: serverReducer,
    roomMetadata: roomReducer,
    notifications: notificationReducer,
    form: formReducer,
})
