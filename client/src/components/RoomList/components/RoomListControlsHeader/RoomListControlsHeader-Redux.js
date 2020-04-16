import React from 'react';
import { connect } from 'react-redux'

import {
    setCurrentPageNumber,
    setSortTechnique,
    setSearchQuery,
    setItemsPerPage
} from '../../../../redux/actions/room-list-display-settings-actions'
import RoomListControlsHeaderView from './RoomListControlsHeader-View'

const RoomListControlsHeaderRedux = ({
    setSortTechnique,
    setItemsPerPage,
    setSearchQuery,
    maxItemsPerPage
}) => {

    const onDisplayFilterFormSubmit = ({ sortBy, itemsPerPage }) => {
        setSortTechnique(sortBy)
        setItemsPerPage(itemsPerPage)
    }

    const onSearchFieldInputChange = (e) => {
        setSearchQuery(e.target.value)
    }

    return (
        <RoomListControlsHeaderView
            onDisplayFilterFormSubmit={onDisplayFilterFormSubmit}
            onSearchFieldInputChange={onSearchFieldInputChange}
            maxItemsPerPage={maxItemsPerPage}
        />
    )
}

const mapStateToProps = (state) => {
    return { maxItemsPerPage: state.rooms.countTotalPublicRooms }
}

const mapDispatchToProps = {
    setCurrentPageNumber,
    setSortTechnique,
    setSearchQuery,
    setItemsPerPage
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomListControlsHeaderRedux);
