import { FETCH_PUBLIC_ROOMS } from '../../action-constants'
import { rooms } from '../../../api/http';


export default (onFailure) => async (dispatch, getState) => {
    const { roomListDisplaySettings: { currentPageNumber, itemsPerPage } } = getState()
    const offset = itemsPerPage * (currentPageNumber - 1)

    rooms.getRooms(itemsPerPage, offset)
        .then(({ data }) => dispatch({ type: FETCH_PUBLIC_ROOMS, payload: data }))
        .catch(onFailure)
}