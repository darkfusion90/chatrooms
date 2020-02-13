import { CREATE_NOTIFICATION } from "../constants/actionConstants";

const INITIAL_STATE = { length: 0, data: {} }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_NOTIFICATION:
            const { id, ...metadata } = action.payload;
            console.log('id: ' + id + "\nmetadata:");
            console.log(metadata)
            return {
                ...state,
                length: state.length + 1,
                data: { ...state.data, [id]: metadata }
            };

        default:
            return state;
    }
}