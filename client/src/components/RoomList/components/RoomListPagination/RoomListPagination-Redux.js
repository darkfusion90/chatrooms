import React from 'react';
import { connect } from 'react-redux'

import {
    setCurrentPageNumber
} from '../../../../redux/actions/room-list-display-settings-actions'
import RoomListPaginationView from './RoomListPagination-View'

const RoomListPaginationRedux = (props) => {
    return <RoomListPaginationView {...props} />
}

const mapStateToProps = (state) => {
    const {
        rooms: { countTotalPublicRooms },
        roomListDisplaySettings: { currentPageNumber, itemsPerPage }
    } = state

    return { countTotalPublicRooms, currentPageNumber, itemsPerPage }
}

export default connect(
    mapStateToProps,
    { setCurrentPageNumber }
)(RoomListPaginationRedux);
