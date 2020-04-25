import React from 'react'

import withLayout from '../../components/hoc/WithLayout'
import RoomJoinRequestList from '../../components/RoomJoinRequestList'


const RouteJoinRequests = (props) => {
    return withLayout(<RoomJoinRequestList {...props} />)
}


export default RouteJoinRequests