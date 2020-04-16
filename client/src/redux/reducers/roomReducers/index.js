import { combineReducers } from 'redux';

import countTotalPublicRoomsReducer from './countTotalPublicRoomsReducer'
import currentRoomsReducer from './currentRoomsReducer'
import currentUserRoomMembershipReducer from './currentUserRoomMembershipReducer'
import activeRoomReducer from './activeRoomReducer'


export default combineReducers({
    countTotalPublicRooms: countTotalPublicRoomsReducer,
    currentRooms: currentRoomsReducer,
    currentUserRoomMemberships: currentUserRoomMembershipReducer,
    activeRoom: activeRoomReducer
})
