import React from 'react'
import { Link } from 'react-router-dom'
import { ButtonGroup, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSadCry } from '@fortawesome/free-solid-svg-icons'

import {
    JoinRoomButton,
    SendRoomJoinRequestButton
} from '../../../standalone/RoomActionButtons'


const RoomNotJoinedView = ({
    isPrivateRoom,
    roomActionProgress,
    onJoinRoomButtonClick,
    onSendJoinRequestButtonClick
}) => {

    const renderRoomActionButton = () => {
        if (isPrivateRoom) {
            return (
                <SendRoomJoinRequestButton
                    progress={roomActionProgress}
                    propsProgressInitial={{
                        onClick: onSendJoinRequestButtonClick
                    }}
                />
            )
        }
        return (
            <JoinRoomButton
                progress={roomActionProgress}
                propsProgressInitial={{
                    onClick: onJoinRoomButtonClick
                }}
            />
        )
    }

    //Using className for button (Link) because a 
    //Button component will cause page reload which isn't desired here
    //since Room and RoomList are supposed to look like same page application 
    //instead of separate
    return (
        <Container fluid className='centered-content h-100'>
            <div className='d-flex flex-column justify-content-between align-items-center mx-auto'>
                <FontAwesomeIcon icon={faSadCry} size='5x' color='#b7b9ba' className='mb-4' />
                <h4>You are not a member of this room</h4>
                <p className=' h-100 subtitle'>
                    To access, you must
                    {isPrivateRoom ? ' send a join request' : ' join the room'}
                </p>
                <ButtonGroup>
                    {renderRoomActionButton()}
                    <Link to='/rooms' className='btn btn-outline-secondary'>
                        Back to Rooms
                    </Link>
                </ButtonGroup>
            </div>
        </Container>
    )
}

export default RoomNotJoinedView