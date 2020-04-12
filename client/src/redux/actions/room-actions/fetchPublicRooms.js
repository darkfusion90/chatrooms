import { FETCH_PUBLIC_ROOMS } from '../../action-constants'
import { rooms } from '../../../api/http';

export default (onFailure) => async dispatch => {
    rooms.getAllRooms((response) => {
        dispatch({ type: FETCH_PUBLIC_ROOMS, payload: response.data })
    }, onFailure)
}