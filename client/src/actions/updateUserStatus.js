import { UPDATE_USER_INFO } from '../constants/actionConstants'

export default (valuesToUpdate) => {
    return {
        type: UPDATE_USER_INFO,
        payload: valuesToUpdate
    }
}