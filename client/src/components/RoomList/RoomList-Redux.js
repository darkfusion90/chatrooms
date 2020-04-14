import React from 'react';
import { connect } from 'react-redux'
import _ from 'lodash'

import RoomList from './RoomList-View'
import {
    fetchPublicRooms,
    updateTotalPublicRoomsCount,
    updateCurrentUserMemberRoles
} from '../../redux/actions/room-actions'
import {
    setSortTechnique,
    setCurrentPageNumber,
    setSearchQuery,
    setItemsPerPage
} from '../../redux/actions/room-list-display-settings-actions'
import isEmpty from 'is-empty';


class RoomListRedux extends React.Component {
    componentDidMount() {
        this.refreshStore()
    }

    componentDidUpdate(prevProps) {
        if (this.hasStoreChanged(prevProps)) {
            this.refreshStore()
        }
    }

    hasStoreChanged = (prevProps) => {
        const hasDisplaySettingsChanged = () => {
            const { roomListDisplaySettings: prevDisplaySettings } = prevProps
            const { roomListDisplaySettings: currentDisplaySettings } = this.props

            return !_.isEqual(prevDisplaySettings, currentDisplaySettings)
        }

        const hasUserDataChanged = () => {
            const { user: prevUser } = prevProps
            const { user: currentUser } = this.props

            return !_.isEqual(prevUser, currentUser)
        }

        const hasRoomsDataChanged = () => {
            const { user: prevRooms } = prevProps
            const { user: currentRooms } = this.props

            return !_.isEqual(prevRooms, currentRooms)
        }

        return hasDisplaySettingsChanged() || hasUserDataChanged() || hasRoomsDataChanged()
    }

    refreshStore = () => {
        this.props.updateTotalPublicRoomsCount()
        this.props.fetchPublicRooms(this.onRoomFetchSuccess, this.onRoomFetchFail)
    }

    onRoomFetchFail = ({ response }) => {
        console.log('RoomList fetch fail: ', response)
    }

    onRoomFetchSuccess = ({ data }) => {
        console.log('success: ', data)
        this.props.updateCurrentUserMemberRoles()
    }

    onDisplayControlsFormSubmit = ({ sortBy, itemsPerPage }) => {
        this.props.setSortTechnique(sortBy)
        this.props.setItemsPerPage(Math.min(itemsPerPage, this.props.countTotalPublicRooms))
    }

    onSearchFieldInputChange = (e) => {
        this.props.setSearchQuery(e.target.value)
    }

    getSearchQuery = () => {
        const { roomListDisplaySettings: { searchQuery } } = this.props
        return searchQuery && searchQuery.toLowerCase().trim()
    }

    render() {
        const {
            rooms,
            countTotalPublicRooms,
            roomListDisplaySettings,
            setCurrentPageNumber
        } = this.props

        const searchQuery = this.getSearchQuery()

        return (
            <RoomList
                countTotalPublicRooms={countTotalPublicRooms}
                rooms={rooms}
                isSearchResult={!isEmpty(searchQuery)}
                onDisplayControlsFormSubmit={this.onDisplayControlsFormSubmit}
                onSearchFieldInputChange={this.onSearchFieldInputChange}
                setCurrentPageNumber={setCurrentPageNumber}
                {...roomListDisplaySettings}
            />
        )
    }
}

const mapStateToProps = (state) => {
    const {
        user,
        rooms: { currentRooms, ...otherState },
        roomListDisplaySettings
    } = state

    return {
        user,
        roomListDisplaySettings,
        rooms: Object.values(currentRooms),
        ...otherState
    }
}

const mapDispatchToProps = ({
    fetchPublicRooms,
    updateTotalPublicRoomsCount,
    updateCurrentUserMemberRoles,
    setSortTechnique,
    setCurrentPageNumber,
    setSearchQuery,
    setItemsPerPage
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomListRedux);
