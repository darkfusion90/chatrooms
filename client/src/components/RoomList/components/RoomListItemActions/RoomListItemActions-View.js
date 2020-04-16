import React from 'react';
import { Link } from 'react-router-dom'
import { ButtonGroup } from 'react-bootstrap';

import { DeleteRoomModalTrigger } from '../../../standalone/RoomModalTriggers'
import { JoinRoomButton } from '../../../standalone/RoomActionButtons'


const getJoinRoomAction = (joinRoomProgress, onClick) => {
    return <JoinRoomButton
        progress={joinRoomProgress}
        propsProgressInitial={{
            label: 'Join',
            onClick
        }}
    />
}

const getDeleteRoomAction = (room) => {
    return <DeleteRoomModalTrigger room={room}>Delete</DeleteRoomModalTrigger>
}

const getOpenRoomAction = (room) => {
    return (
        <Link to={`/rooms/${room._id}`} className='btn btn-outline-primary'>
            Open
        </Link>
    )
}

const renderActions = ({ room, currentUserRoomMembership, ...restProps }) => {

    const isCurrentUserRoomMember = () => {
        return currentUserRoomMembership.isRoomMember
    }

    const isCurrentUserRoomAdmin = () => {
        const { membership } = currentUserRoomMembership
        return membership && membership.memberType === 'admin'
    }

    const getActionsForRoomMember = () => {
        return (
            <ButtonGroup>
                {getOpenRoomAction(room)}
                {isCurrentUserRoomAdmin() ? getDeleteRoomAction(room) : null}
            </ButtonGroup>
        )
    }

    const getActionsForNonRoomMember = () => {
        const { joinRoomProgress, onJoinRoomButtonClick } = restProps
        const onClick = () => onJoinRoomButtonClick(room ? room._id : '')
        return getJoinRoomAction(joinRoomProgress, onClick)
    }

    return isCurrentUserRoomMember() ? getActionsForRoomMember() : getActionsForNonRoomMember()
}

const renderLoadingActions = () => {
    return <p className='subtitle'>Loading actions...</p>
}

const RoomListItemActions = (props) => {
    const hasCurrentUserMembershipDetailsLoaded = () => {
        //Initially, currentUserRoomMembership is 'undefined', 
        //meaning it has not yet been determined
        //On determining it will be an object (empty {} -> not member or {...details} -> member)
        //Hence, simply using truthy/falsy value to determine whether details has been loaded, 
        //i.e., undefined is falsy and object (even if empty) is truthy
        return props.currentUserRoomMembership
    }

    return hasCurrentUserMembershipDetailsLoaded() ? renderActions(props) : renderLoadingActions()
}


export default RoomListItemActions
