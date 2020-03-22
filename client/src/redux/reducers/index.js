import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import serverReducer from './serverReducer';
import roomReducer from './roomReducer';
import notificationReducer from './notificationReducer';
import userReducer from './userReducer';
import modalReducer from './modalReducer';
import roomListSortTechniqueReducer from './roomListSortTechniqueReducer'

export default combineReducers({
    user: userReducer,
    serverConnection: serverReducer,
    rooms: roomReducer,
    roomListSortTechnique: roomListSortTechniqueReducer,
    notifications: notificationReducer,
    form: formReducer,
    modal: modalReducer
})
