import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import serverReducer from './serverReducer';
import roomReducer from './roomReducer';
import notificationReducer from './notificationReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';
import roomListDisplaySettingsReducer from './roomListDisplaySettingsReducer'

export default combineReducers({
    user: userReducer,
    serverConnection: serverReducer,
    rooms: roomReducer,
    roomListDisplaySettings: roomListDisplaySettingsReducer,
    notifications: notificationReducer,
    form: formReducer,
    modal: modalReducer
})
