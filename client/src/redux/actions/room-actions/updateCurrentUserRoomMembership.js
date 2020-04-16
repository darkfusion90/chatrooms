import { UPDATE_USER_ROOM_MEMBERSHIP } from '../../action-constants'
import { search } from '../../../api/http'


const getMembershipMeta = (searchResult) => {
    const isRoomMember = searchResult.length !== 0
    const payload = searchResult.payload

    return {
        isRoomMember,
        membership: isRoomMember && payload && payload[0]
    }
}

const getSearchResults = (roomId, currentUserId) => {
    return new Promise(async (resolve, _) => {
        try {
            const searchResponse = await search.searchRoomMember(roomId, currentUserId)
            resolve(searchResponse.data)
        } catch (err) {
            console.log('Search room member error: ', err, '\nResolving with "{}"')
            resolve({})
        }
    })
}

const updateCurrentUserRoomMembership = (roomId, currentUserId) => {
    return async dispatch => {
        const searchResult = await getSearchResults(roomId, currentUserId)

        dispatch({
            type: UPDATE_USER_ROOM_MEMBERSHIP,
            payload: { roomId, ...getMembershipMeta(searchResult) }
        })
    }
}


export default updateCurrentUserRoomMembership