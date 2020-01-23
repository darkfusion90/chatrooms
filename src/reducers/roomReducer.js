import {
    CREATE_ROOM,
    JOIN_ROOM

}
    from '../constants/actionConstants';

export default (state = {}, action) => {
    const room = action.payload;
    switch (action.type) {
        case CREATE_ROOM:
            return { ...state, [room.id]: room };
        case JOIN_ROOM:
            return { ...state, [room.id]: room };
        default:
            return state;
    }
}