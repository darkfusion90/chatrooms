import { FETCH_PUBLIC_ROOMS } from '../../action-constants'
import { rooms } from '../../../api/http';


export default (onSuccess, onFailure) => async (dispatch, getState) => {
    const { roomListDisplaySettings: { currentPageNumber, itemsPerPage } } = getState()
    const offset = itemsPerPage * (currentPageNumber - 1)

    rooms.getRooms(itemsPerPage, offset)
        .then(response => {
            onSuccess(response)
            dispatch({ type: FETCH_PUBLIC_ROOMS, payload: response.data })
        })
        .catch(onFailure)
}