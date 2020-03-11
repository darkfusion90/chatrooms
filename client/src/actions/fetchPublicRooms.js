import { FETCH_PUBLIC_ROOMS } from '../constants/actionConstants'
import { getAllRooms } from '../server-communication/httpServer'

export default (onFailure) => async dispatch => {
    getAllRooms((response) => {
        dispatch({ type: FETCH_PUBLIC_ROOMS, payload: response.data })
    }, onFailure)
}