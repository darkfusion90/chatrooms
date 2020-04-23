import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import serverReducer from './serverReducer';
import roomReducer from './roomReducers';
import notificationReducer from './notificationReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';
import roomListDisplaySettingsReducer from './roomListDisplaySettingsReducer'
import toastReducer from './toastReducer'
import helmetReducer from './helmetReducer'


export default combineReducers({
    user: userReducer,
    serverConnection: serverReducer,
    rooms: roomReducer,
    roomListDisplaySettings: roomListDisplaySettingsReducer,
    notifications: notificationReducer,
    form: formReducer,
    modal: modalReducer,
    toast: toastReducer,
    helmet: helmetReducer
})
