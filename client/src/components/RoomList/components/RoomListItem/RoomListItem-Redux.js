import React from 'react'
import { connect } from 'react-redux'

import RoomListItemContainer from './RoomListItem-Container'
import { joinRoom } from '../../../../redux/actions/room-actions'

const RoomListItemRedux = (props) => {
    return <RoomListItemContainer {...props} />
}

export default connect(null, { joinRoom })(RoomListItemRedux)