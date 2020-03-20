import React from 'react';
import isEmpty from 'is-empty'
import { connect } from 'react-redux';

import RoomListItemActions from './RoomListItemActions-View'

class RoomListItemActionsRedux extends React.Component {
    getMemberReferenceOfCurrentUser = () => {
        const { room, currentUser } = this.props
        if (!room || !currentUser) {
            return null
        }

        const currentUserMatchesRoomMemberUser = (roomMember) => {
            return roomMember && roomMember.user && roomMember.user._id === currentUser._id
        }

        return room.members.find(currentUserMatchesRoomMemberUser)
    }

    isCurrentUserRoomMember = (currentUserMemberReference) => {
        return !isEmpty(currentUserMemberReference)
    }

    isCurrentUserRoomAdmin = (currentUserMemberReference) => {
        if (!this.isCurrentUserRoomMember(currentUserMemberReference)) {
            return false
        }

        const currentUserMemberType = currentUserMemberReference.memberType
        return currentUserMemberType === 'admin'
    }

    render() {
        const currentUserMemberReference = this.getMemberReferenceOfCurrentUser()
        const props = {
            isCurrentUserRoomMember: this.isCurrentUserRoomMember(currentUserMemberReference),
            isCurrentUserRoomAdmin: this.isCurrentUserRoomAdmin(currentUserMemberReference),
            room: this.props.room
        }
        return (
            <RoomListItemActions {...props} />
        )
    }
}

const mapStateToProps = (state) => {
    return { currentUser: state.user.user, isUserLoggedIn: state.user.isLoggedIn }
}

export default connect(mapStateToProps)(RoomListItemActionsRedux);