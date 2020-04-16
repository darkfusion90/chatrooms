import { FETCH_PUBLIC_ROOMS } from '../../action-constants'
import { rooms } from '../../../api/http';


export default () => async (dispatch, getState) => {
    const { roomListDisplaySettings: { currentPageNumber, itemsPerPage } } = getState()
    const offset = itemsPerPage * (currentPageNumber - 1)

    rooms.getRooms(itemsPerPage, offset)
        .then(response => {
            dispatch({ type: FETCH_PUBLIC_ROOMS, payload: response.data })
        })
        .catch(err => console.log('Action fetchPublicRooms: Failure fetching rooms: ', err))
}