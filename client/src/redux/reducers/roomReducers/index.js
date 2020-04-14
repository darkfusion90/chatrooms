import { combineReducers } from 'redux';

import countTotalPublicRoomsReducer from './countTotalPublicRoomsReducer'
import currentRoomsReducer from './currentRoomsReducer'
import currentUserRoomRolesReducer from './currentUserRoomRolesReducer'

export default combineReducers({
    countTotalPublicRooms: countTotalPublicRoomsReducer,
    currentRooms: currentRoomsReducer,
    currentUserRoomRoles: currentUserRoomRolesReducer
})
