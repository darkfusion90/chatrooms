import { SET_TOTAL_PUBLIC_ROOMS_COUNT } from '../../action-constants'
import { rooms } from '../../../api/http';


const onFailureFallback = (err) => console.log('update public rooms count fail: ', err)

export default (onFailure = onFailureFallback) => async dispatch => {
    const getAction = (count) => {
        return { type: SET_TOTAL_PUBLIC_ROOMS_COUNT, payload: count }
    }

    rooms.countTotalPublicRooms()
        .then(response => {
            dispatch(getAction(response.data.count))
        })
        .catch(onFailure)
}