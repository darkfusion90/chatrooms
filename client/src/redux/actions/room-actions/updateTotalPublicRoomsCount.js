import { SET_TOTAL_PUBLIC_ROOMS_COUNT } from '../../action-constants'
import { rooms } from '../../../api/http';


export default (fallbackCount) => async dispatch => {
    const getAction = (count) => {
        return { type: SET_TOTAL_PUBLIC_ROOMS_COUNT, payload: count }
    }

    rooms.countTotalPublicRooms()
        .then(response => {
            dispatch(getAction(response.data.count))
        })
        .catch(_ => dispatch(getAction(fallbackCount)))
}